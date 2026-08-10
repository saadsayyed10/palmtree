import prisma from "../lib/prisma.orm";

export const connectToDB = async () => {
  try {
    const conn = await prisma.$connect();
    console.log(`Connected to PostgreSQL DB: ${conn}`);
  } catch (error: any) {
    console.log(`Failed to connect to PostgreSQL DB: ${error.message}`);
  }
};
