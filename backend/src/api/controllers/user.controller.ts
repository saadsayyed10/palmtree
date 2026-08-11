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

    res.status(201).json({
      message: `Founder account created for: ${founder.name}`,
      token,
      user: founder,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = {
    email,
    password,
  };
  if (!data) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const { token, user } = await userServices.loginUserService(
      email,
      password,
    );

    res.status(200).json({
      message: `Log in successful: ${user?.name}`,
      token,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
