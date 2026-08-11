import { Button } from "@/components/ui/button";

const OrganizationNavbar = () => {
  return (
    <div className="flex justify-between items-center w-full lg:py-6 lg:px-12 border-b fixed top-0 bg-white z-50">
      <h1>MyOrg</h1>
      <Button variant={"outline"}>Setup Organization</Button>
    </div>
  );
};

export default OrganizationNavbar;
