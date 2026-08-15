"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowBigRight, Loader2, Rocket } from "lucide-react";
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
              Set Up Organization <ArrowBigRight />
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

      <div>Hi</div>
    </div>
  );
};

export default OrganizationDashboard;
