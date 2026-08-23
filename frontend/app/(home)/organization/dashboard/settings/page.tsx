"use client";

import { fetchOrganizationUserProfileAPI } from "@/_api/organization-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, MapPin, Pencil, ShieldCheck, User } from "lucide-react";
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
          <Pencil /> Request Edit
        </Button>
      </div>

      <div className="flex justify-between items-start w-full">
        <Card className="shadow-md w-150">
          <CardHeader className="text-lg font-medium text-neutral-800 flex items-center gap-x-2">
            <User className="w-4 h-4 text-blue-700" />{" "}
            <span>Personal Information</span>
          </CardHeader>
          <CardContent className="flex justify-start items-start w-full flex-col gap-y-4">
            <div className="flex justify-start items-start w-full flex-col gap-y-2">
              <Label className="text-sm font-light text-neutral-400">
                Full Name
              </Label>
              <Label>{profile?.name}</Label>
            </div>
            <div className="flex justify-start items-start w-full flex-col gap-y-2">
              <Label className="text-sm font-light text-neutral-400">
                Email Address
              </Label>
              <Label>{profile?.email}</Label>
            </div>
            <div className="flex justify-start items-start w-full flex-col gap-y-2">
              <Label className="text-sm font-light text-neutral-400">
                Contact Number
              </Label>
              <Label>{profile?.contact}</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end items-end w-full flex-col gap-y-6 px-4">
          {profile?.role === "FOUNDER" && (
            <Card className="shadow-md w-150">
              <CardHeader className="text-lg font-medium text-neutral-800 flex items-center gap-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />{" "}
                <span>Identity Verification</span>
              </CardHeader>
              <CardContent className="flex justify-start items-start w-full flex-col gap-y-4">
                <div className="flex justify-start items-start w-full flex-col gap-y-2">
                  <Label className="text-sm font-light text-neutral-400">
                    Unique ID
                  </Label>
                  <Label>{profile?.id}</Label>
                </div>
                <div className="flex justify-start items-start w-full flex-col gap-y-2">
                  <Label className="text-sm font-light text-neutral-400">
                    PAN Number
                  </Label>
                  <Label>{profile?.panNumber}</Label>
                </div>
                <div className="flex justify-start items-start w-full flex-col gap-y-2">
                  <Label className="text-sm font-light text-neutral-400">
                    Aadhar Number
                  </Label>
                  <Label>{profile?.aadharNumber}</Label>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-start items-start w-full">
        <Card className="shadow-md w-full">
          <CardHeader className="text-lg font-medium text-neutral-800 flex items-center gap-x-2">
            <MapPin className="w-4 h-4 text-blue-700" />{" "}
            <span>Address Details</span>
          </CardHeader>
          <CardContent className="flex justify-start items-start w-full flex-col gap-y-4">
            <div className="flex justify-start items-start w-full flex-col gap-y-2">
              <Label className="text-sm font-light text-neutral-400">
                Address
              </Label>
              <Label>{profile?.address}</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationSettings;
