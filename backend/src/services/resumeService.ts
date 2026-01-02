import fetch from "node-fetch";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

interface ResumeResponse {
  resumeHighlights: string[];
  coverLetter: string;
}

export async function generateResume(
  resume: string,
  jobDescription: string
): Promise<ResumeResponse> {
  const prompt = `
You are a professional technical recruiter.

TASKS:
1. Rewrite resume bullet points to match the job description
2. Generate a concise, professional cover letter

RULES:
- Do NOT invent experience
- Use strong action verbs
- Output valid JSON ONLY:

{
  "resumeHighlights": [],
  "coverLetter": ""
}

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}
`;

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data: any = await response.json();

  let content: string = data.choices[0].message.content;

  // Remove markdown code fences if present
  content = content.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(content) as ResumeResponse;
  } catch (error) {
    console.error("AI returned invalid JSON:", content);
    throw new Error("Failed to parse AI response as JSON");
  }
}
