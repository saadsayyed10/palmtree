"use client";

import { Button } from "@/components/ui/button";
import {
  Building2,
  FolderKanban,
  Handshake,
  IdCardLanyard,
  LayoutDashboard,
  Lock,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const OrganizationSidebar = () => {
  const { user } = useAuth();

  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="fixed left-0 flex h-full w-64 flex-col items-start justify-start overflow-y-auto hide-scrollbar border-r lg:px-4 lg:pt-32 lg:pb-20 bg-white lg:gap-y-4">
      <Button
        className={`flex justify-start items-center transition duration-300 gap-x-4 w-full ${pathName === "/organization/dashboard" ? "bg-blue-700/80 hover:bg-blue-700/80 text-neutral-200" : "bg-transparent hover:bg-blue-700/60 text-neutral-800 hover:text-neutral-200"}`}
        size={"lg"}
        onClick={() => {
          if (pathName !== "/organization/dashboard") {
            router.push("/organization/dashboard");
          }
        }}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Dashboard</span>
      </Button>

      <Button
        disabled={!user?.hasOrganization}
        className={`flex justify-start items-center transition duration-300 gap-x-4 w-full ${pathName === "/organization/dashboard/my-organization" ? "bg-blue-700/80 hover:bg-blue-700/80 text-neutral-200" : "bg-transparent hover:bg-blue-700/60 text-neutral-800 hover:text-neutral-200"}`}
        size={"lg"}
        onClick={() => {
          if (pathName !== "/organization/dashboard/my-organization") {
            router.push("/organization/dashboard/my-organization");
          }
        }}
      >
        <Building2 className="w-4 h-4" />
        <span>Organization</span>
        {!user?.hasOrganization && (
          <Lock size={20} className="relative left-12" />
        )}
      </Button>

      <Button
        disabled={!user?.hasOrganization}
        className={`flex justify-start items-center transition duration-300 gap-x-4 w-full ${pathName === "/organization/employees" ? "bg-blue-700/80 hover:bg-blue-700/80 text-neutral-200" : "bg-transparent hover:bg-blue-700/60 text-neutral-800 hover:text-neutral-200"}`}
        size={"lg"}
        onClick={() => {
          if (pathName !== "/organization/employees") {
            router.push("/organization/employees");
          }
        }}
      >
        <IdCardLanyard className="w-4 h-4" />
        <span>Employees</span>
        {!user?.hasOrganization && (
          <Lock size={20} className="relative left-14" />
        )}
      </Button>

      <Button
        disabled={!user?.hasOrganization}
        className={`flex justify-start items-center transition duration-300 gap-x-4 w-full ${pathName === "/organization/projects" ? "bg-blue-700/80 hover:bg-blue-700/80 text-neutral-200" : "bg-transparent hover:bg-blue-700/60 text-neutral-800 hover:text-neutral-200"}`}
        size={"lg"}
        onClick={() => {
          if (pathName !== "/organization/projects") {
            router.push("/organization/projects");
          }
        }}
      >
        <FolderKanban className="w-4 h-4" />
        <span>Projects</span>
        {!user?.hasOrganization && (
          <Lock size={20} className="relative left-18" />
        )}
      </Button>

      <Button
        disabled={!user?.hasOrganization}
        className={`flex justify-start items-center transition duration-300 gap-x-4 w-full ${pathName === "/organization/service-providers" ? "bg-blue-700/80 hover:bg-blue-700/80 text-neutral-200" : "bg-transparent hover:bg-blue-700/60 text-neutral-800 hover:text-neutral-200"}`}
        size={"lg"}
        onClick={() => {
          if (pathName !== "/organization/service-providers") {
            router.push("/organization/service-providers");
          }
        }}
      >
        <Handshake className="w-4 h-4" />
        <span>Service Providers</span>
        {!user?.hasOrganization && (
          <Lock size={20} className="relative left-2" />
        )}
      </Button>

      <Button
        size={"lg"}
        variant={"ghost"}
        className={`flex justify-start items-center gap-x-4 w-[85%] absolute bottom-4 ${pathName === "/organization/dashboard/settings" && "bg-neutral-200/50"}`}
        onClick={() => {
          if (pathName !== "/organization/dashboard/settings") {
            router.push("/organization/dashboard/settings");
          }
        }}
      >
        <Settings className="w-4 h-4" />
        <span>Settings</span>
      </Button>
    </div>
  );
};

export default OrganizationSidebar;
