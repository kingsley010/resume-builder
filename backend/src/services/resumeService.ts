import fetch from "node-fetch";
import { MOCK_RESUME_RESPONSE } from "../mocks/mockResume.js";
import { mock } from "node:test";

interface UserBio {
    firstName: string;
    lastName: string;
    city: string;
    state: string
    PostalCode?: string;
    phone?: string;
    email: string;
    linkedin?: string;
    github?: string;
    technicalSkills: string;
}

interface ProfessionalExperience {
    role: string;
    company: string;
    startYear: string;
    endYear: string;
}

interface Education {
    degree: string;
    university: string;
    startYear: string;
    endYear: string;
}

interface ResumeResponse {
  header: {
    fullName: string;
    contactInfo: string; 
    links: string;       
  };
  professionalSummary: string;
  technicalSkills: any [];
  professionalExperience: any[];
  education: any[];
}

const MOCK_DATA: ResumeResponse = MOCK_RESUME_RESPONSE.data;

// Define a standard wrapper
interface ServiceResponse {
  success: boolean;
  data: ResumeResponse;
}

export class ResumeService {
  private static readonly GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

  static async generateResume(jobDescription: string, bio: UserBio, professionalExperience: ProfessionalExperience[], education: Education[]): Promise<ServiceResponse> {

    const apiKey = process.env.GEMINI_API_KEY;
    const fullURL = `${this.GEMINI_URL}?key=${apiKey}`;

    if (!apiKey) {
      throw new Error("CONFIG_ERROR: GEMINI_API_KEY is missing.");
    }

    const prompt = `
      Act as an expert Technical Career Coach and Resume Writer. 
      Your goal is to rewrite the user's experience to perfectly align with a specific Job Description.
      Generate a professional resume for: ${bio.firstName} ${bio.lastName}.
      The resume should be structured in a way that is easy to read and easy to understand.

      ### USER CONTEXT:
      - Location: ${bio.city}, ${bio.state} ${bio.PostalCode} 
      - Email: ${bio.email}
      ${bio.phone ? `- Phone: ${bio.phone}` : ""}
      ${bio.linkedin ? `- LinkedIn: ${bio.linkedin}` : ""}
      ${bio.github ? `- GitHub: ${bio.github}` : ""}
      - Skills: ${bio.technicalSkills}

      Use the following guidelines to create a compelling and ATS-optimized resume:
      ### TASK:
      1. Use Strong Action Verbs (e.g., "Architected," "Spearheaded," "Optimized").
      2. Focus on Quantifiable Metrics (e.g., "Reduced latency by 20%," "Increased user retention by 15%").
      3. Use the Google XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].
      4. Ensure all content remains truthful to the original experience provided.
      5. Tailor the experience to closely match the keywords and requirements in the Job Description.
      6. Align everything to this Job Description: ${jobDescription}.

      ### INPUT DATA:
      - Job Description: ${jobDescription}
      - Professional Experiences: ${JSON.stringify(professionalExperience)}
      - Education: ${JSON.stringify(education)}

      ### OUTPUT FORMAT (JSON ONLY):
      Return ONLY a valid JSON object with this structure:
      {
        "header": {
            "fullName": "${bio.firstName} ${bio.lastName}",
            "contactInfo": "City, State Postal Code | Phone | Email",
            "links": "LinkedIn | GitHub"
        },
        "professionalSummary": "A 2-3 sentence high-impact summary.",
        "technicalSkills": ["Skill 1", "Skill 2"],
        "professionalExperience": [
          {
            "role": "Role Title",
            "company": "Company Name",
            "years": "Start Year - End Year",
            "bulletPoints": ["Bullet 1", "Bullet 2", "Bullet 3", Buller 4, Bullet 5]
          }
        ],
        "Education": [
          {
            "degree": "Degree Name",
            "institution": "Institution Name",
            "yearOfCompletion": "Year"
          }
        ]
      }

      Ensure the JSON is properly formatted and can be parsed without errors.
    `;

    if (process.env.USE_MOCK_AI === "true") {
      console.log( "Using Mock Resume Data");
      return { success: true, data: MOCK_DATA }; 
    }

    try {
      const response = await fetch(fullURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Google API Error Details:", errorData);
        throw new Error("GOOGLE_API_COMMUNICATION_ERROR");
      }

      const data: any = await response.json();
      
      // Extracting text from Google's response structure
      let content = data.candidates[0].content.parts[0].text;

      // Remove markdown code fences if present
      content = content.replace(/```json|```/g, "").trim();

      return JSON.parse(content);
    } catch (error) {
      console.error("AIService Error:", error);
      throw new Error("AI_GENERATION_FAILED");
    }
  }
}
