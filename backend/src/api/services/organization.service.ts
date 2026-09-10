import prisma from "../../lib/prisma.orm";

export const setupOrganizationService = async (
  gstin: string,
  orgName: string,
  orgAddress: string,
  fiscalYearStart: string,
  fiscalYearEnd: string,
  panNumber: string,
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
      id: `${orgName.replace(/\s/g, "")}-${userId}`,
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
      panNumber,
    },
  });

  return { organization, updateFounder };
};

export const fetchOrganizationService = async (userId: string) => {
  const organization = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      organization: {
        select: {
          createdAt: true,
          fiscalYearEnd: true,
          fiscalYearStart: true,
          gstin: true,
          id: true,
          isApproved: true,
          orgAddress: true,
          orgName: true,
        },
      },
    },
  });

  return organization;
};

export const deleteOrganizationService = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  await prisma.organization.delete({
    where: {
      id: user?.organizationId!,
    },
  });

  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      hasOrganization: false,
    },
  });

  return user;
};
