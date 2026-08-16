import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.config";
import prisma from "../lib/prisma.orm";

interface DecodedType extends JwtPayload {
  userId: string;
}

export const protectOrganizationRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedType;

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token not found" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not found in token" });
    }

    (req as any).user = user;

    next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
