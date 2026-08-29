import prisma from "../../lib/prisma.orm";

export const setupOrganizationService = async (
  gstin: string,
  orgName: string,
  orgAddress: string,
  fiscalYearStart: string,
  fiscalYearEnd: string,
  userId: string,
) => {
  const existingOrganization = await prisma.organization.findUnique({
    where: {
      gstin,
    },
  });
  if (existingOrganization) throw new Error("This organization already exist");

  const organization = await prisma.organization.create({
    data: {
      id: `${orgName}-${userId}`,
      gstin,
      orgName,
      orgAddress,
      fiscalYearStart,
      fiscalYearEnd,
    },
  });

  const updateFounder = await prisma.users.update({
    where: {
      id: userId,
      role: "FOUNDER",
      hasOrganization: false,
    },
    data: {
      organizationId: organization.id,
      hasOrganization: true,
    },
  });

  return { organization, updateFounder };
};
