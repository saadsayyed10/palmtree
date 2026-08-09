import axios from "axios";
import { apiUrl } from "./apiUrl";

export const registerOrganizationFounderAPI = async (
  name: string,
  email: string,
  role: string,
  contact: string,
  address: string,
  aadharNumber: string,
  panNumber: string,
) => {
  return await axios.post(`${apiUrl}/organization/founder`, {
    name,
    email,
    role,
    contact,
    address,
    aadharNumber,
    panNumber,
  });
};
