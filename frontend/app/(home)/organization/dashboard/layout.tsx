import OrganizationNavbar from "@/_components/organization/Navbar";
import OrganizationSidebar from "@/_components/organization/Sidebar";
import { ReactNode } from "react";

const OrganizationDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <header>
        <OrganizationNavbar />
      </header>
      <aside>
        <OrganizationSidebar />
      </aside>
      <div className="flex justify-start items-start lg:pl-72 lg:pr-12 lg:py-28 w-full">
        {children}
      </div>
    </main>
  );
};

export default OrganizationDashboardLayout;
