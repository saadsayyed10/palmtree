import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";

const OrganizationSignIn = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen lg:px-132">
      <Card className="w-full shadow-md">
        <CardHeader className="flex justify-center items-center w-full flex-col lg:gap-y-2">
          <div className="w-16 h-16 bg-blue-700 rounded-[100%] flex justify-center items-center lg:mb-2">
            <Building2 color="white" size={40} />
          </div>
          <h1 className="text-4xl font-semibold text-center text-neutral-800">
            Welcome back
          </h1>
          <h5 className="text-center text-neutral-600">
            Sign in to manage your organization.
          </h5>
        </CardHeader>
        <CardContent className="flex justify-start items-start w-full flex-col lg:gap-y-6 lg:mt-10">
          <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
            <Label>Email address</Label>
            <Input className="w-full lg:py-5 bg-muted-foreground/10" />
          </div>
          <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
            <Label>Password</Label>
            <Input className="w-full lg:py-5 bg-muted-foreground/10" />
          </div>
          <Button
            size={"lg"}
            className="bg-blue-700 hover:bg-blue-800 w-full lg:py-6 lg:mt-4"
          >
            Log In
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center items-center w-full text-center">
          <p className="text-sm text-neutral-600">
            Don&apos;t have an organization account?
            <br />
            <span className="font-medium text-blue-800 cursor-pointer">
              Create an organization account
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationSignIn;
