"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  ChartColumnStacked,
  FolderKanban,
  Handshake,
  IdCardLanyard,
  Loader2,
  Lock,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrganizationDashboard = () => {
  const { hydrate } = useAuth();

  const [turnOffHero, setTurnOffHero] = useState<boolean>(false);
  const [heroLoading, setHeroLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-10">
      {!turnOffHero && (
        <div className="flex justify-start items-start flex-col w-full lg:gap-y-8 lg:p-6 rounded-xl bg-blue-700">
          <Button
            size={"lg"}
            className={
              "bg-white/10 hover:bg-white/10 cursor-default px-8 py-1 rounded-full text-white"
            }
          >
            <Rocket /> Get Started
          </Button>

          <h1 className="text-white font-bold text-5xl">
            Complete your organization
            <br />
            setup to unlock PalmTree.
          </h1>

          <p className="lg:text-base font-medium text-neutral-100/80 w-[60%]">
            You are just a few steps away from managing your global workforce.
            Define your legal entity, setup billing, and invite your core team.
          </p>

          <div className="flex justify-start items-start w-full lg:gap-x-6 mt-6">
            <Button
              size={"lg"}
              variant={"secondary"}
              className={"lg:p-6 text-blue-700"}
              onClick={() => router.push("/organization/setup")}
            >
              Set Up Organization <ArrowRight />
            </Button>

            <Button
              size={"lg"}
              className={"lg:p-6 bg-white/10 hover:bg-white/5"}
              onClick={() => {
                setHeroLoading(true);

                setTimeout(() => {
                  setHeroLoading(false);
                  setTurnOffHero(true);
                }, 1600);
              }}
              disabled={heroLoading}
            >
              {heroLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Skip For Now"
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-start items-start w-full lg:gap-x-10">
        <div className="border shadow-lg rounded-xl w-100 h-60 bg-white flex justify-start items-start flex-col lg:gap-y-4 lg:p-4">
          <div className="flex justify-between items-center w-full">
            <Button size={"lg"} variant={"secondary"} disabled>
              <IdCardLanyard />
            </Button>

            <Badge>
              <Lock /> Locked
            </Badge>
          </div>

          <div className="flex justify-start items-start flex-col lg:gap-y-2">
            <h3 className="text-2xl font-semibold text-neutral-800">
              Employees
            </h3>

            <p className="text-neutral-400 text-sm">
              View and manage your internal workforce, roles and hierarchies.
            </p>
          </div>
        </div>

        <div className="border shadow-lg rounded-xl w-100 h-60 bg-white flex justify-start items-start flex-col lg:gap-y-4 lg:p-4">
          <div className="flex justify-between items-center w-full">
            <Button size={"lg"} variant={"secondary"} disabled>
              <FolderKanban />
            </Button>

            <Badge>
              <Lock /> Locked
            </Badge>
          </div>

          <div className="flex justify-start items-start flex-col lg:gap-y-2">
            <h3 className="text-2xl font-semibold text-neutral-800">
              Projects
            </h3>

            <p className="text-neutral-400 text-sm">
              Track roadmap progress, budget allocations and cross-team
              delivery.
            </p>
          </div>
        </div>

        <div className="border shadow-lg rounded-xl w-100 h-60 bg-white flex justify-start items-start flex-col lg:gap-y-4 lg:p-4">
          <div className="flex justify-between items-center w-full">
            <Button size={"lg"} variant={"secondary"} disabled>
              <Handshake />
            </Button>

            <Badge>
              <Lock /> Locked
            </Badge>
          </div>

          <div className="flex justify-start items-start flex-col lg:gap-y-2">
            <h3 className="text-2xl font-semibold text-neutral-800">
              Service Providers
            </h3>

            <p className="text-neutral-400 text-sm">
              Manage external vendors, contracts and specialized service
              agreements.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full flex-col lg:gap-y-1 lg:mt-10 text-center">
        <span className="p-4 bg-neutral-100 rounded-full">
          <ChartColumnStacked className="w-10 h-10 stroke-2 text-neutral-400" />
        </span>

        <h4 className="text-xl font-semibold text-neutral-800 mt-6">
          No data to display
        </h4>

        <h6 className="text-sm text-neutral-400">
          Analytics and reporting will appear here once your
          <br /> organization is fully configured and approved.
        </h6>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
