import { v4 as uuid } from "uuid";
import bcryptjs from "bcryptjs";
import prisma from "../../lib/prisma.orm";
import { UserType } from "@prisma/client";
import { generateToken } from "../../lib/token";

export const registerFounderService = async (
  name: string,
  email: string,
  password: string,
  contact: string,
  address: string,
  aadharNumber: string,
  panNumber: string,
) => {
  const id = `founder-${uuid()}`;

  const existingFounder = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (existingFounder) throw new Error("Founder account already exists");

  const hashPassword = await bcryptjs.hash(password, 10);

  const founder = await prisma.users.create({
    data: {
      id,
      name,
      email,
      password: hashPassword,
      contact,
      address,
      aadharNumber,
      panNumber,
      role: UserType.FOUNDER,
    },
  });

  const token = generateToken(founder.id!);

  return { token, founder };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new Error("Your account does not exist");

  const isValidPassword = await bcryptjs.compare(password, user?.password!);
  if (!isValidPassword) throw new Error("Password is incorrect");

  const token = generateToken(user?.id!);

  return { token, user };
};

export const fetchOrganizationUserProfileService = async (userId: string) => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
};
