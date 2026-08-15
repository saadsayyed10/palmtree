"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OrganizationDashboard = () => {
  const { hydrate } = useAuth();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div>
      <h1>OrganizationDashboard</h1>
    </div>
  );
};

export default OrganizationDashboard;
