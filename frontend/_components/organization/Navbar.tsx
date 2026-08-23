"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { Bell, Loader2, LogOut, User, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrganizationNavbar = () => {
  const { logout, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    logout();

    toast.add({
      type: "success",
      description: "You have been logged out from you account",
    });

    router.replace("/organization/signin");
  };

  return (
    <div className="flex justify-between items-center w-full lg:py-6 lg:px-12 border-b fixed top-0 bg-white z-50">
      <h1>{/* TODO: Organization name here */}</h1>

      <div className="flex justify-end items-center w-full gap-x-4">
        <Button size={"icon-lg"} variant={"ghost"}>
          <Bell />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="rounded-full bg-blue-700 hover:bg-blue-800 duration-300 transition"
                size={"icon-lg"}
              />
            }
          >
            <User2 />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push("/organization/dashboard/settings")}
              className="flex justify-between items-center w-full"
            >
              <span>Profile</span>
              <User className="w-2 h-2 opacity-50" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex justify-between items-center w-full"
              disabled={loading}
            >
              <span>Logout</span>
              {loading ? (
                <Loader2 className="w-2 h-2 opacity-50 animate-spin" />
              ) : (
                <LogOut className="w-2 h-2 opacity-50" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default OrganizationNavbar;
