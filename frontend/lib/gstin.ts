import axios from "axios";

export const fetchDataFromGSTIN = async (gstin: string) => {
  return await axios.get(
    `https://appyflow.in/api/verifyGST?gstNo=${gstin}&key_secret=${process.env.GST_API!}`,
  );
};
