"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrganizationSignIn = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!emailAddress) {
      toast.add({
        type: "error",
        description: "Email address was not provided",
      });
      return;
    }
    if (!emailAddress.includes("@")) {
      toast.add({
        type: "error",
        description: "Email address is invalid",
      });
      return;
    }

    if (!password) {
      toast.add({
        type: "error",
        description: "Password was not provided",
      });
      return;
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen lg:px-136">
      <Card className="w-full shadow-md">
        <CardHeader className="flex justify-center items-center w-full flex-col lg:gap-y-2">
          <div className="w-16 h-16 bg-blue-700 rounded-[100%] flex justify-center items-center lg:mb-2">
            <Building2 color="white" size={40} />
          </div>
          <h1 className="text-4xl font-semibold text-center text-neutral-800">
            Welcome back
          </h1>
          <h5 className="text-center text-neutral-600">
            Sign in to manage your organization.
          </h5>
        </CardHeader>
        <CardContent className="flex justify-start items-start w-full flex-col lg:gap-y-6 lg:mt-10">
          <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
            <Label>Email address</Label>
            <Input
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              type="email"
              className="w-full lg:py-5 bg-muted-foreground/10"
              placeholder="samikhed@palm.com"
            />
          </div>
          <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
            <div className="flex justify-between items-center w-full">
              <Label>Password</Label>
              <Label className="text-blue-800 cursor-pointer">
                {/* TODO: Implement dialog for reset password */}
                Forgot Password?
              </Label>
            </div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full lg:py-5 bg-muted-foreground/10"
              placeholder="****************"
            />
          </div>
          <Button
            size={"lg"}
            className="bg-blue-700 hover:bg-blue-800 w-full lg:py-6 lg:mt-4"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </CardContent>
        <div className="flex justify-center items-center w-full lg:px-8">
          <Separator className="w-full" />
        </div>
        <CardFooter className="flex justify-center items-center w-full text-center">
          <p className="text-sm text-neutral-600">
            Don&apos;t have an organization account?
            <br />
            <span
              onClick={() =>
                router.push("/organization/signup/founder/personal")
              }
              className="font-medium text-blue-800 cursor-pointer"
            >
              Create an organization account
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationSignIn;
