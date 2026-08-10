import express from "express";
import cors from "cors";
import { env } from "./config/env.config";

const PORT = env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
