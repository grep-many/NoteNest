import { Loader2 } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

const ServerCheck = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="p-6 shadow-lg rounded-xl text-center max-w-sm w-full">
        <CardContent>
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Checking server status...</h2>
          <p className="text-secondary mt-2">
            Please wait while we ensure everything is up and running.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerCheck;
