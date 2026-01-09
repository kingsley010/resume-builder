import { type FC, type ChangeEvent, useState } from "react";

interface ResumeFormProps {
  // Define props here if needed
}

const ResumeForm: FC<ResumeFormProps> = () => {
  const [resume, setResume] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async (): Promise<void> => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:3000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ 
          resume, 
          jobDescription: job 
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Generation Successful:", result);
      
    } catch (error) {
      console.error("Technical Error during generation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "20px" }}>
      <textarea 
        placeholder="Paste your Resume here..."
        value={resume}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setResume(e.target.value)} 
        rows={10}
      />
      <textarea 
        placeholder="Paste the Job Description here..."
        value={job}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJob(e.target.value)} 
        rows={10}
      />
      <button 
        onClick={submit} 
        disabled={isSubmitting || !resume || !job}
      >
        {isSubmitting ? "Processing..." : "Generate Tailored Resume"}
      </button>
    </div>
  );
};

export default ResumeForm;
