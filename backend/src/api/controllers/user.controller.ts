import { Request, Response } from "express";
import * as userServices from "../services/user.service";

export const registerFounderController = async (
  req: Request,
  res: Response,
) => {
  const { name, email, password, contact, address, aadharNumber, panNumber } =
    req.body;

  const data = {
    name,
    email,
    password,
    contact,
    address,
    aadharNumber,
    panNumber,
  };
  if (!data) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const { token, founder } = await userServices.registerFounderService(
      name,
      email,
      password,
      contact,
      address,
      aadharNumber,
      panNumber,
    );

    res
      .status(201)
      .json({ message: `Founder account created for: ${founder.name}`, token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
