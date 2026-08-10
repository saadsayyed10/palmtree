import axios from "axios";
import { apiUrl } from "./apiUrl";

export const registerOrganizationFounderAPI = async (
  name: string,
  email: string,
  password: string,
  contact: string,
  address: string,
  aadharNumber: string,
  panNumber: string,
) => {
  return await axios.post(`${apiUrl}/organization/founder`, {
    name,
    email,
    contact,
    password,
    address,
    aadharNumber,
    panNumber,
  });
};
