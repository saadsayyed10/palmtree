"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useFounderRegister } from "@/hooks/useFounderRegister";
import axios from "axios";
import {
  ArrowBigRight,
  ChartColumnStacked,
  Info,
  Loader2,
  PhoneCall,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrganizationSignUpFounderSecurity = () => {
  const {
    state,
    setState,
    city,
    setCity,
    localAddress,
    setLocalAddress,
    aadharNumber,
    setAadharNumber,
    panNumber,
    setPanNumber,
  } = useFounderRegister();
  const [pincode, setPincode] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSecurityDetails = () => {
    if (!state) {
      toast.add({
        type: "error",
        description: "Please provide your state within India",
      });
      return;
    }

    if (!city) {
      toast.add({
        type: "error",
        description: "Please provide your city within India",
      });
      return;
    }

    if (!city) {
      toast.add({
        type: "error",
        description: "Please provide your living address",
      });
      return;
    }

    if (!aadharNumber) {
      toast.add({
        type: "error",
        description: "Please provide your Aadhar Card number",
      });
      return;
    }

    if (aadharNumber.length != 12) {
      toast.add({
        type: "error",
        description: "Provided Aadhar Number is invalid",
      });
      return;
    }

    if (!panNumber) {
      toast.add({
        type: "error",
        description: "Please provide your PAN number",
      });
      return;
    }

    if (panNumber.length != 10) {
      toast.add({
        type: "error",
        description: "Provided PAN is invalid",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    router.push("/organization/signup/founder/review");
  };

  const handleFetchAddress = async () => {
    if (pincode.length !== 6) {
      setState("");
      setCity("");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );

      const data = res.data[0];

      if (data.Status === "Success" && data.PostOffice?.length > 0) {
        setState(data.PostOffice[0].State);
        setCity(data.PostOffice[0].District);
      } else {
        setState("");
        setCity("");
      }
    } catch (error: any) {
      console.log(error.message);
      setState("");
      setCity("");
    }
  };

  useEffect(() => {
    handleFetchAddress();
  }, [pincode]);

  return (
    <div className="flex justify-between items-center w-full lg:p-20">
      <div className="flex justify-start items-start w-[60%] flex-col lg:gap-y-10">
        <div className="flex justify-start items-start flex-col lg:gap-y-2 w-full">
          <h5 className="uppercase text-2xl text-blue-800 font-medium tracking-wide">
            Registration
          </h5>
          <h6 className="text-neutral-800 font-semibold text-lg">
            Founder Account
          </h6>
        </div>

        <div className="flex justify-start items-start w-full flex-col lg:gap-y-4">
          <div className="flex justify-start items-start w-70 flex-col lg:gap-y-2">
            <Label>Pincode</Label>
            <Input
              autoComplete="off"
              className="w-full lg:py-5 bg-muted-foreground/10"
              placeholder="411048"
              value={pincode}
              maxLength={6}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPincode(value);
              }}
            />
          </div>

          <div className="flex justify-start items-start w-full lg:gap-x-20">
            <div className="flex justify-start items-start w-70 flex-col lg:gap-y-2">
              <Label>State</Label>
              <Input
                autoComplete="off"
                className="w-full lg:py-5 bg-muted-foreground/10"
                disabled
                value={state}
              />
            </div>
            <div className="flex justify-start items-start w-70 flex-col lg:gap-y-2">
              <Label>City</Label>
              <Input
                autoComplete="off"
                className="w-full lg:py-5 bg-muted-foreground/10"
                disabled
                value={city}
              />
            </div>
          </div>

          <div className="flex justify-start items-start w-160 flex-col lg:gap-y-2 mt-4">
            <Label>Local Address</Label>
            <Input
              autoComplete="off"
              placeholder="Clover Hills, B-104, NIBM"
              className="w-full lg:py-5 bg-muted-foreground/10"
              value={localAddress}
              onChange={(e) => setLocalAddress(e.target.value)}
            />
          </div>

          <div className="flex justify-start items-start w-full lg:gap-x-20 lg:mt-8">
            <div className="flex justify-start items-start w-70 flex-col lg:gap-y-2">
              <Label>Aadhar Number</Label>
              <Input
                autoComplete="off"
                className="w-full lg:py-5 bg-muted-foreground/10"
                placeholder="1111 0001 1010"
                maxLength={12}
                value={aadharNumber.replace(/\s/g, "")}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-start items-center w-full lg:gap-x-52">
            <h6 className="text-sm text-neutral-600/80 flex items-center gap-x-2">
              <Info size={14} /> Please login if founder account already exists
            </h6>
            <Button
              size={"lg"}
              className="bg-blue-700 hover:bg-blue-800"
              onClick={handleSecurityDetails}
            >
              Continue{" "}
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowBigRight />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end w-[40%] flex-col lg:gap-y-6">
        <div className="flex justify-end items-end w-full flex-col lg:gap-y-2">
          <div className="flex justify-between items-end w-full">
            <h6 className="font-medium text-neutral-600">
              Step 3 of 4: Security Details
            </h6>
            <h6 className="font-medium text-blue-800">75%</h6>
          </div>
        </div>

        <div className="flex justify-start items-start h-2 w-full bg-neutral-600/30 rounded-full">
          <div className="flex justify-start items-start h-2 w-[80%] bg-blue-800 rounded-full" />
        </div>

        <div className="grid grid-cols-4 justify-start items-start w-full lg:gap-x-28">
          <h6 className="text-neutral-600">Personal</h6>
          <h6 className="text-neutral-600">Contact</h6>
          <h6 className="font-medium text-blue-800">Security</h6>
          <h6 className="text-neutral-600">Review</h6>
        </div>

        <Card className="w-full bg-blue-500/20 border border-blue-700/20">
          <CardHeader className="lg:text-lg font-semibold text-neutral-800">
            Why create a Founder account?
          </CardHeader>
          <CardContent className="flex justify-start items-start w-full flex-col lg:gap-y-8 mt-2">
            <div className="flex justify-start items-center w-full lg:gap-x-2">
              <ShieldCheck size={20} color="darkblue" />
              <h6 className="text-blue-900">
                Primary authority for organization settings and fiscal
                approvals.
              </h6>
            </div>
            <div className="flex justify-start items-center w-full lg:gap-x-2">
              <Users size={20} color="darkblue" />
              <h6 className="text-blue-900">
                Invite directors, admins, and service providers to your
                ecosystem.
              </h6>
            </div>
            <div className="flex justify-start items-center w-full lg:gap-x-2">
              <ChartColumnStacked size={20} color="darkblue" />
              <h6 className="text-blue-900">
                Access high-level dashboards and organizational health metrics.
              </h6>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="lg:text-lg font-semibold text-neutral-800">
            {/* TODO: Implement AI chat support */}
            Need Assistance?
          </CardHeader>
          <CardContent className="flex justify-start items-start w-full flex-col lg:gap-y-4 mt-2">
            <div className="flex justify-start items-center w-full lg:gap-x-4">
              <PhoneCall size={20} />
              <h6>Our support team is available 24/7 for verification help.</h6>
            </div>
            <span className="text-blue-800 font-medium cursor-pointer">
              Contact Support.
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationSignUpFounderSecurity;
