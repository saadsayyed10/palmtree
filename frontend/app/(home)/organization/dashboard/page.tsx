"use client";

import { setupOrganizationAPI } from "@/_api/organization-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { fetchDataFromGSTIN } from "@/lib/gstin";
import {
  ArrowRight,
  Building2,
  ChartColumnStacked,
  FolderKanban,
  GitCompareArrows,
  Handshake,
  Hourglass,
  IdCardLanyard,
  Loader2,
  Lock,
  Phone,
  Rocket,
  RotateCwFadingClock,
  SendHorizonal,
  User2,
} from "lucide-react";
import { useState } from "react";

const OrganizationDashboard = () => {
  const { hydrate, token, user } = useAuth();

  const [gstin, setGstin] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [orgAddress, setOrgAddress] = useState<string>("");
  const [fiscalYearStart, setFiscalYearStart] = useState<string>("");
  const [fiscalYearEnd, setFiscalYearEnd] = useState<string>("");

  const [_turnOffHero, setTurnOffHero] = useState<boolean>(false);
  const [heroLoading, setHeroLoading] = useState<boolean>(false);
  const [gstinLoading, setGstinLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSetupDialog, setOpenSetupDialog] = useState<boolean>(false);
  const [fetchGSTINData, setFetchGSTINData] = useState<boolean>(false);

  const handleFetchDataFromGSTIN = async () => {
    setGstinLoading(true);
    try {
      const res = await fetchDataFromGSTIN(gstin);
      console.log(res.data);

      const addr = res.data.taxpayerInfo.adadr[0].addr;

      setOrgName(res.data.taxpayerInfo.lgnm);
      setOrgAddress(
        `${addr.bnm} ${addr.loc}, ${addr.st}, ${addr.dst} - ${addr.pncd}, ${addr.stcd}`,
      );

      setFetchGSTINData(true);
    } catch (error: any) {
      console.log(error.message);
      toast.add({
        type: "error",
        description: error.message,
      });
    } finally {
      setGstinLoading(false);
    }
  };

  const handleSetupOrganization = async () => {
    setLoading(true);
    try {
      await setupOrganizationAPI(
        gstin,
        orgName,
        orgAddress,
        fiscalYearStart,
        fiscalYearEnd,
        token!,
      )
        .then((res) => {
          console.log(res.data.message);

          hydrate();
          setOpenSetupDialog(false);

          toast.add({
            type: "success",
            description: res.data.message,
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
          toast.add({
            type: "error",
            description: err.response.data.error,
          });
        });
    } catch (error: any) {
      console.log(error.message);
      toast.add({
        type: "error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-10">
      {!user?.hasOrganization ? (
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
            setup to unlock PalmTree
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
              onClick={() => setOpenSetupDialog(true)}
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
      ) : (
        <div className="flex justify-center items-center flex-col w-full lg:gap-y-8 lg:p-6">
          <div className="flex justify-center items-center w-full flex-col gap-y-2">
            <h1 className="text-4xl text-neutral-800 font-semibold">
              Organization Setup Complete
            </h1>
            <h5 className="text-sm text-neutral-500">
              Your application has been successfully transmitted to the PalmTree
              administration queue.
            </h5>
          </div>

          <div className="flex justify-center items-center w-full gap-x-4">
            <div className="flex justify-start items-start w-full flex-col gap-y-6 h-120 border rounded-xl shadow-lg p-6">
              <Button
                size={"lg"}
                variant={"ghost"}
                className={
                  "px-8 py-1 rounded-full text-neutral-500 hover:text-neutral-500"
                }
              >
                Application Journey
              </Button>

              <div className="relative flex justify-start items-start w-full flex-col gap-y-10">
                {/* Timeline line */}
                <div className="absolute left-5 top-5 bottom-5 w-px bg-neutral-200" />

                {/* Step 1 */}
                <div className="relative z-10 flex justify-start items-center w-full gap-x-4">
                  <span className="w-10 h-10 bg-blue-700 flex shrink-0 justify-center items-center rounded-full">
                    <User2 size={20} color="white" />
                  </span>

                  <h4 className="text-neutral-800 font-medium">
                    Founder Profile
                  </h4>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex justify-start items-center w-full gap-x-4">
                  <span className="w-10 h-10 bg-blue-700 flex shrink-0 justify-center items-center rounded-full">
                    <Building2 size={20} color="white" />
                  </span>

                  <h4 className="text-neutral-800 font-medium">
                    Organization Created
                  </h4>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex justify-start items-center w-full gap-x-4">
                  <span className="w-10 h-10 bg-blue-700 flex shrink-0 justify-center items-center rounded-full">
                    <SendHorizonal size={20} color="white" />
                  </span>

                  <h4 className="text-neutral-800 font-medium">Submitted</h4>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 flex justify-start items-center w-full gap-x-4">
                  <span className="w-10 h-10 bg-neutral-100 flex shrink-0 justify-center items-center rounded-full">
                    <RotateCwFadingClock
                      className="animate-spin"
                      size={20}
                      color="blue"
                    />
                  </span>

                  <h4 className="text-neutral-800 font-medium">
                    Enterprise Approval
                  </h4>
                </div>

                {/* Step 5 */}
                <div className="relative z-10 flex justify-start items-center w-full gap-x-4">
                  <span className="w-10 h-10 bg-neutral-100 flex shrink-0 justify-center items-center rounded-full">
                    <Lock size={20} color="gray" />
                  </span>

                  <h4 className="text-neutral-800 font-medium">Activated</h4>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-start flex-col w-full lg:gap-y-8 lg:p-6 rounded-xl bg-blue-700 h-120">
              <Button
                size={"lg"}
                className={
                  "bg-white/10 hover:bg-white/10 cursor-default px-8 py-1 rounded-full text-white uppercase tracking-wide font-medium"
                }
              >
                <Hourglass /> Status: Pending
              </Button>

              <h1 className="text-white font-bold text-5xl">
                What happens next?
              </h1>

              <p className="lg:text-base font-medium text-neutral-100/80 w-full">
                Our Enterprise Compliance team is currently reviewing your
                organizational documents and other related information. This
                typically takes 24-48 business hours. You will receive an email
                once the activation is final.
              </p>

              <div className="flex justify-start items-start w-full lg:gap-x-6 mt-6">
                <Button
                  size={"lg"}
                  variant={"secondary"}
                  className={"lg:p-6 text-blue-700"}
                >
                  Check Organization <ArrowRight />
                </Button>

                <Button
                  size={"lg"}
                  className={"lg:p-6 bg-white/10 hover:bg-white/5"}
                >
                  <Phone /> Contact Support
                </Button>
              </div>
            </div>
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

      <Dialog open={openSetupDialog} onOpenChange={setOpenSetupDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">
              Setup Organization
            </DialogTitle>
            <DialogDescription>
              Setup your organization here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {!fetchGSTINData && (
            <div className="flex justify-start items-start w-full flex-col gap-y-2">
              <Label>GSTIN</Label>
              <Input
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                placeholder="27AA********1Z7"
              />
            </div>
          )}
          {fetchGSTINData && (
            <div className="flex justify-start items-start flex-col w-full gap-y-6">
              <div className="flex justify-start items-start w-full flex-col gap-y-2">
                <Label>Organization Name</Label>
                <Input value={orgName} disabled />
              </div>
              <div className="flex justify-start items-start w-full flex-col gap-y-2">
                <Label>Organization Address</Label>
                <Textarea
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                />
              </div>
              <div className="flex justify-start items-start w-full flex-col gap-y-2">
                <Label>Fiscal Year Start</Label>
                <Input
                  value={fiscalYearStart}
                  placeholder="April, 2026"
                  onChange={(e) => setFiscalYearStart(e.target.value)}
                />
              </div>
              <div className="flex justify-start items-start w-full flex-col gap-y-2">
                <Label>Fiscal Year End</Label>
                <Input
                  value={fiscalYearEnd}
                  placeholder="October, 2026"
                  onChange={(e) => setFiscalYearEnd(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between items-center w-full">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            {!fetchGSTINData && (
              <Button
                onClick={handleFetchDataFromGSTIN}
                className="bg-blue-700 hover:bg-blue-800"
              >
                {gstinLoading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <GitCompareArrows size={16} />
                )}{" "}
                Fetch Business Details
              </Button>
            )}
            {fetchGSTINData && (
              <Button
                onClick={handleSetupOrganization}
                className="bg-blue-700 hover:bg-blue-800"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  " Save changes"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizationDashboard;
