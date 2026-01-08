import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const signToken = (userId: number) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: "3600s" });
