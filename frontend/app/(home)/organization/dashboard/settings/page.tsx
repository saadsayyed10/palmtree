"use client";

import { fetchOrganizationUserProfileAPI } from "@/_api/organization-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface OrganizationUserProfileType {
  id: string;
  name: string;
  email: string;
  role: string;
  contact: string;
  address: string;
  aadharNumber: string;
  panNumber: string;
  hasOrganization: boolean;
  createdAt: string;
}

const OrganizationSettings = () => {
  const { token, hydrate } = useAuth();
  const [profile, setProfile] = useState<OrganizationUserProfileType | null>(
    null,
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchOrganizationUserProfile = async () => {
    setLoading(true);
    try {
      await fetchOrganizationUserProfileAPI(token!)
        .then((res) => {
          console.log(res.data.user);
          setProfile(res.data.user);
        })
        .catch((err) => {
          toast.add({
            type: "error",
            description: err.response.data.message,
          });
        });
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hydrate || !token) return;

    handleFetchOrganizationUserProfile();
  }, [hydrate, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full flex-col gap-y-10 p-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-start flex-col gap-y-1.5">
          {profile?.role === "FOUNDER" && (
            <h1 className="text-neutral-800 font-semibold text-2xl">
              Founder Profile
            </h1>
          )}
          {profile?.role === "EMPLOYEE" && (
            <h1 className="text-neutral-800 font-semibold text-2xl">
              Employee Profile
            </h1>
          )}
          <h5 className="text-neutral-400 text-sm">
            Manage your personal information, address and verified identities.
          </h5>
        </div>
        <Button
          disabled
          className="bg-blue-700 hover:bg-blue-800 text-neutral-200"
        >
          <Pencil /> Edit Profile
        </Button>
      </div>

      <div className="flex justify-between items-center w-full">
        <Card></Card>
        <div className="flex justify-end items-end w-full flex-col gap-y-6">
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettings;
