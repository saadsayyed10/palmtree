"use client";

import { fetchOrganizationAPI } from "@/_api/organization-api";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { Building2, FileCog, Info } from "lucide-react";
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
    <div className="flex justify-start items-start w-full min-h-screen gap-x-4">
      <div className="flex justify-start items-start w-[50%] flex-col shadow rounded-xl border border-neutral-200">
        <div className="flex justify-between items-center w-full p-4 bg-neutral-200 rounded-t-xl">
          <div className="flex justify-start items-center w-full gap-x-4">
            <span className="p-2 bg-blue-700/50 rounded-full">
              <Building2 size={24} />
            </span>

            <h4 className="text-xl font-semibold text-neutral-800">
              Business Details
            </h4>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col w-full py-8 px-4 gap-y-8">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-start items-start flex-col w-full">
              <h6 className="text-xs text-neutral-400 uppercase">
                Business Name
              </h6>
              <h6 className="text-sm text-neutral-800 font-medium">
                {data?.orgName}
              </h6>
            </div>

            <div className="flex justify-start items-start flex-col w-full">
              <h6 className="text-xs text-neutral-400 uppercase">GSTIN</h6>
              <h6 className="text-sm text-neutral-800 font-medium">
                {data?.gstin}
              </h6>
            </div>
          </div>

          <div className="flex justify-start items-start flex-col w-full">
            <h6 className="text-xs text-neutral-400 uppercase">
              Business Registered Address
            </h6>
            <h6 className="text-sm text-neutral-800 font-medium">
              {data?.orgAddress}
            </h6>
          </div>
        </div>
      </div>

      <div className="flex justify-start items-start w-[50%] flex-col shadow rounded-xl border border-neutral-200">
        <div className="flex justify-between items-center w-full p-4 bg-neutral-200 rounded-t-xl">
          <div className="flex justify-start items-center w-full gap-x-4">
            <span className="p-2 bg-red-300/50 rounded-full">
              <FileCog size={24} />
            </span>

            <h4 className="text-xl font-semibold text-neutral-800">
              Preferences
            </h4>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col w-full py-8 px-4 gap-y-8">
          <div className="flex justify-start items-start flex-col w-full">
            <h6 className="text-xs text-neutral-400 uppercase">
              Business Unique ID
            </h6>
            <h6 className="text-sm text-neutral-800 font-medium">{data?.id}</h6>
          </div>

          <div className="flex justify-start items-start flex-col w-full">
            <h6 className="text-xs text-neutral-400 uppercase">
              Business Registered Date
            </h6>
            <h6 className="text-sm text-neutral-800 font-medium">
              {data?.createdAt.split("T")[0]}
            </h6>
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="flex justify-start items-start flex-col w-full">
              <h6 className="text-xs text-neutral-400 uppercase">
                Fiscal Year Start
              </h6>
              <h6 className="text-sm text-neutral-800 font-medium">
                {data?.fiscalYearStart
                  ? format(new Date(data.fiscalYearStart), "MMMM yyyy")
                  : ""}
              </h6>
            </div>

            <div className="flex justify-start items-start flex-col w-full">
              <h6 className="text-xs text-neutral-400 uppercase">
                Fiscal Year Start
              </h6>
              <h6 className="text-sm text-neutral-800 font-medium">
                {data?.fiscalYearEnd
                  ? format(new Date(data.fiscalYearEnd), "MMMM yyyy")
                  : ""}
              </h6>
            </div>
          </div>

          <div className="flex justify-start items-start flex-col w-full">
            <h6 className="text-xs text-neutral-400 uppercase">
              Approval Status
            </h6>
            <h6 className="text-sm text-neutral-800 font-medium">
              {data?.isApproved ? "Yes" : "No"}
            </h6>

            <div className="flex justify-start items-start w-full gap-x-2 mt-10">
              <Info color="gray" size={20} />
              <h6 className="text-xs text-neutral-400">
                Please wait until PalmTree approves your business to access the
                enterprise application.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrganization;
