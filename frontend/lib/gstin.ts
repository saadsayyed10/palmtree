import axios from "axios";

export const fetchDataFromGSTIN = async (gstin: string) => {
  return await axios.get(
    `https://appyflow.in/api/verifyGST?gstNo=${gstin}&key_secret=8eDHAF7B2BTSqiUzndbXJwi1lmk1`,
  );
};
