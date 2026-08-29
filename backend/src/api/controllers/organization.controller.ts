import { Request, Response } from "express";
import * as organizationService from "../services/organization.service";

let errorMessage;

export const setupOrganizationController = async (
  req: Request,
  res: Response,
) => {
  const { gstin, orgName, orgAddress, fiscalYearStart, fiscalYearEnd } =
    req.body;

  const data = { gstin, orgName, orgAddress, fiscalYearStart, fiscalYearEnd };
  if (!data) {
    errorMessage = "Missing fields are required";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const userId = (req as any).user.id;
    if (!userId) {
      errorMessage =
        "Unauthorized: Founder must be logged in to setup organization";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { organization, updateFounder } =
      await organizationService.setupOrganizationService(
        gstin,
        orgName,
        orgAddress,
        fiscalYearStart,
        fiscalYearEnd,
        userId,
      );

    res.status(201).json({
      message: `Dear Founder ${updateFounder.name}, your organization (${organization.orgName}) setup is complete, please wait until PalmTree approves. Once verified and approved, you may start using all services.`,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchOrganizationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      errorMessage =
        "Unauthorized: Founder must be logged in to setup organization";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const organization =
      await organizationService.fetchOrganizationService(userId);
    res.status(200).json({ profile: organization });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
