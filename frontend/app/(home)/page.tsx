"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Loader2, ShieldCheck, UserCog } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [orgLoading, setOrgLoading] = useState<boolean>(false);
  const [servLoading, setServLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center w-full lg:p-6">
      <header className="flex justify-between items-center w-full">
        <h1 className="lg:text-3xl font-semibold">PalmTree</h1>
        <div className="flex justify-end items-end w-full lg:gap-x-6 text-neutral-600 font-medium">
          <Link href={"/support"}>Support</Link>
          <Link href={"/documentation"}>Documentation</Link>
        </div>
      </header>

      <div className="flex flex-col justify-center items-center w-full gap-y-6 lg:mt-20">
        <Badge className="font-semibold uppercase bg-blue-500/30 text-blue-700">
          <ShieldCheck /> Secure Enterprise management
        </Badge>
        <h1 className="text-4xl font-semibold text-center text-neutral-800">
          Welcome to your organization
          <br /> management platform
        </h1>
        <h5 className="text-center text-neutral-600">
          A centralized ecosystem designed for seamless collaboration between
          <br />
          corporate entities and specialized service providers.
        </h5>
      </div>

      <div className="flex justify-center items-center w-full lg:gap-x-10 lg:mt-32 lg:px-32">
        <Card className="w-full">
          <CardHeader>
            <div className="w-10 h-10 bg-blue-700/50 rounded-[100%] flex justify-center items-center">
              <Building2 />
            </div>
          </CardHeader>
          <CardContent className="flex justify-start items-start w-full flex-col gap-y-4">
            <h6 className="text-xl font-medium text-neutral-800">
              Organization
            </h6>
            <p className="w-[80%] text-muted-foreground">
              Manage your corporate structure, internal employees, strategic
              projects, and external service providers in a single unified
              dashboard.
            </p>
          </CardContent>

          <CardFooter className="flex justify-center items-center w-full">
            <Button
              onClick={() => {
                setOrgLoading(true);
                setTimeout(() => {
                  setOrgLoading(false);
                }, 2000);
                router.push("/organization/signin");
              }}
              size={"lg"}
              className="bg-blue-700 hover:bg-blue-800 w-full lg:py-6"
            >
              {orgLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Log in as Organization"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <div className="w-10 h-10 bg-blue-700/50 rounded-[100%] flex justify-center items-center">
              <UserCog />
            </div>
          </CardHeader>
          <CardContent className="flex justify-start items-start w-full flex-col gap-y-4">
            <h6 className="text-xl font-medium text-neutral-800">
              Service Provider
            </h6>
            <p className="w-[80%] text-muted-foreground">
              Access your vendor portal to manage service delivery, submit
              project updates, and collaborate directly with the client
              organization.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center items-center w-full">
            <Button
              onClick={() => {
                setServLoading(true);
                setTimeout(() => {
                  setServLoading(false);
                }, 2000);
                router.push("/service-provider/signin");
              }}
              variant={"secondary"}
              size={"lg"}
              className="w-full lg:py-6 bg-blue-500/20 hover:bg-blue-500/30"
            >
              {servLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Log in as Service Provider"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <footer className="flex justify-between items-center w-full lg:mt-32">
        <h1 className="lg:text-sm text-neutral-600 w-full">
          &copy; Groven Inc. All rights reserved.
        </h1>
        <div className="flex justify-end items-end w-full lg:gap-x-6 text-neutral-600 font-medium">
          <Link href={"/privacy-policy"}>Privacy Policy</Link>
          <Link href={"/terms-of-service"}>Terms of Service</Link>
          <Link href={"/security"}>Security</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
