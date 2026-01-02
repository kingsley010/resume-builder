import { Router } from "express";
import { generateResumeHandler } from "../controllers/resumeController.js";

const router = Router();

router.post("/resume/generate", generateResumeHandler);

export default router;
