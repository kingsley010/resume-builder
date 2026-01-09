import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = (() => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing");
  }
  return process.env.JWT_SECRET;
})();

export const GEMINI_API_KEY = (() => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }
  return process.env.GEMINI_API_KEY;
})();

export const USE_MOCK_AI = (() => {
  if (!process.env.USE_MOCK_AI) {
    throw new Error("USE_MOCK_AI is missing");
  }
  return process.env.USE_MOCK_AI;
})();
