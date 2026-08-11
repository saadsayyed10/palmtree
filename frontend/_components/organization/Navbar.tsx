"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrganizationNavbar = () => {
  const { logout } = useAuth();
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
      <h1>MyOrg</h1>
      <Button
        variant={"outline"}
        onClick={handleLogout}
        className="bg-red-500/30 hover:bg-red-500/40"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : <LogOut />}
      </Button>
    </div>
  );
};

export default OrganizationNavbar;
