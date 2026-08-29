import * as controllers from "../controllers/organization.controller";
import { protectOrganizationRoute } from "../../middleware/auth.middleware";
import { Router } from "express";

const organizationRouter = Router();

organizationRouter.post(
  "/setup",
  protectOrganizationRoute,
  controllers.setupOrganizationController,
);

organizationRouter.get(
  "/profile",
  protectOrganizationRoute,
  controllers.fetchOrganizationController,
);

organizationRouter.delete(
  "/delete",
  protectOrganizationRoute,
  controllers.deleteOrganizationController,
);

export default organizationRouter;
