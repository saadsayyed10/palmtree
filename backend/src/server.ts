import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env.config";

const PORT = env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ health: "OK", status: 200 });
  } catch (error: any) {
    return res.status(500).json({ health: "BAD", status: 500 });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
