import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";

const OrganizationSettings = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-y-10 p-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-start flex-col gap-y-1.5">
          <h1 className="text-neutral-800 font-semibold text-2xl">
            Founder Profile
          </h1>
          <h5 className="text-neutral-400 text-sm">
            Manage your personal information, address and verified identities.
          </h5>
        </div>
        <Button className="bg-blue-700 hover:bg-blue-800 text-neutral-200">
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
