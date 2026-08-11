import { Router } from "express";
import * as controllers from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/founder", controllers.registerFounderController);

userRouter.post("/user/login", controllers.loginUserController);

export default userRouter;
