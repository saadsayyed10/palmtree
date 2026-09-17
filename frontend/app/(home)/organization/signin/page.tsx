"use client";

import { loginOrganizationUserAPI } from "@/_api/organization-api";
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
import { useAuth } from "@/hooks/useAuth";
import { Building2, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrganizationSignIn = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
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

    setLoading(true);
    try {
      await loginOrganizationUserAPI(emailAddress, password)
        .then((res) => {
          const token = res.data.token!;
          const user = res.data.user;

          setAuth(token, user);

          toast.add({
            type: "success",
            description: res.data.message!,
          });

          router.push("/organization/dashboard");
        })
        .catch((err) => {
          toast.add({ type: "error", description: err.response.data.error });
        });
    } catch (error: any) {
      toast.add({ type: "error", description: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <Card className="w-full max-w-100 shadow-md">
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
              autoComplete="off"
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

            <div className="relative w-full">
              <Input
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="w-full lg:py-5 bg-muted-foreground/10 pr-10"
                placeholder="****************"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>
          <Button
            size={"lg"}
            className="bg-blue-700 hover:bg-blue-800 w-full lg:py-6 lg:mt-4"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
          </Button>
        </CardContent>
        <div className="flex justify-center items-center w-full lg:px-8">
          <Separator className="w-full" />
        </div>
        <CardFooter className="flex justify-center items-center w-full text-center py-6">
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
