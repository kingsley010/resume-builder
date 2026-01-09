import type { Request, Response } from "express";
import { generateResume } from "../services/resumeService.js";
import { prisma } from "../config/db.js";

export async function generateResumeHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { resume, jobDescription } = req.body as {
    resume: string;
    jobDescription: string;
  };

  const result = await generateResume(resume, jobDescription);

  res.json(result);
}
