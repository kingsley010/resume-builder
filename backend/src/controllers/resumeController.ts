import type { Request, Response } from "express";
import { ResumeService } from "../services/resumeService.js";

export const generateResumeHandler = async (req: Request, res: Response) => {
  const { 
    jobDescription, 
    firstName, 
    lastName, 
    city, 
    state,
    PostalCode,
    cityState: cityState = `${city}, ${state}`,
    phone, 
    email, 
    linkedin, 
    github, 
    technicalSkills, 
    education, 
    professionalExperience
  } = req.body;

  if (!jobDescription) {
    return res.status(400).json({ 
      success: false, 
      error: "Please fill in required fields" 
    });
  }

  try {
    const result = await ResumeService.generateResume(jobDescription, {
      firstName,
      lastName,
      city,
      state,
      PostalCode,
      phone,
      email,
      linkedin,
      github,
      technicalSkills
    }, professionalExperience, education);
    
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to generate the structured resume." 
    });
  }
};
