import { Router } from "express";

import userRouter from "./user.route";
import organizationRouter from "./organization.route";

const mainRouter = Router();

mainRouter.use("/organization", userRouter);
mainRouter.use("/organization", organizationRouter);

export default mainRouter;
