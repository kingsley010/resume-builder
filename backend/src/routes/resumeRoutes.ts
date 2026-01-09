import { Router } from "express";
import { generateResumeHandler } from "../controllers/resumeController.js";
import auth from "../middleware/authMiddleware.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/resume/generate", aiLimiter, generateResumeHandler);

export default router;
