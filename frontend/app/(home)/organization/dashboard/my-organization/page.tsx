"use client";

import { fetchOrganizationAPI } from "@/_api/organization-api";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface FetchOrganization {
  createdAt: string;
  fiscalYearEnd: string;
  fiscalYearStart: string;
  gstin: string;
  id: string;
  isApproved: boolean;
  orgAddress: string;
  orgName: string;
}

const MyOrganization = () => {
  const { token } = useAuth();
  const [data, setData] = useState<FetchOrganization | null>(null);

  const handleFetchOrganization = async () => {
    try {
      await fetchOrganizationAPI(token!).then((res) => {
        const orgData = res.data.profile.organization;

        console.log(orgData);
        setData(orgData);
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchOrganization();
  }, [token]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex justify-start items-start w-[50%] h-60 flex-col shadow rounded-xl border border-neutral-200">
        <div className="flex justify-between items-center w-full p-8 bg-neutral-200 rounded-t-xl"></div>
      </div>
    </div>
  );
};

export default MyOrganization;
