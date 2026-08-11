import { Router } from "express";
import * as controllers from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/founder", controllers.registerFounderController);

export default userRouter;
