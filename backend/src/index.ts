import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import resume from "./routes/resumeRoutes.js";

dotenv.config();

const app: Application = express();
app.use(express.json());

const port: number = Number(process.env.PORT) || 3000;

app.use("/api/v1", resume);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
