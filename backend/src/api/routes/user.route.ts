import { Router } from "express";
import * as controllers from "../controllers/user.controller";
import { protectOrganizationRoute } from "../../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/founder", controllers.registerFounderController);

userRouter.post("/user/login", controllers.loginUserController);

userRouter.get(
  "/user/profile",
  protectOrganizationRoute,
  controllers.fetchOrganizationUserProfileController,
);

export default userRouter;
