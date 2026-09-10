import axios from "axios";
import { apiUrl } from "./apiUrl";

export const registerOrganizationFounderAPI = async (
  name: string,
  email: string,
  password: string,
  contact: string,
  address: string,
  aadharNumber: string,
) => {
  return await axios.post(`${apiUrl}/organization/founder`, {
    name,
    email,
    contact,
    password,
    address,
    aadharNumber,
  });
};

export const loginOrganizationUserAPI = async (
  email: string,
  password: string,
) => {
  return await axios.post(`${apiUrl}/organization/user/login`, {
    email,
    password,
  });
};

export const fetchOrganizationUserProfileAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/organization/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setupOrganizationAPI = async (
  gstin: string,
  orgName: string,
  orgAddress: string,
  fiscalYearStart: string,
  fiscalYearEnd: string,
  panNumber: string,
  token: string,
) => {
  return await axios.post(
    `${apiUrl}/organization/setup`,
    { gstin, orgName, orgAddress, fiscalYearStart, fiscalYearEnd, panNumber },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchOrganizationAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/organization/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteOrganizationAPI = async (token: string) => {
  return await axios.delete(`${apiUrl}/organization/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
