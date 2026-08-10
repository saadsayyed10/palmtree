import { Router } from "express";
import userRouter from "./user.route";

const mainRouter = Router();

mainRouter.use("/organization", userRouter);

export default mainRouter;
