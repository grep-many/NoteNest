import React from "react";
import { usePage } from "@/context/PageProvider";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const ServerBad = () => {
  const { checkServerStatus } = usePage()

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="p-6 shadow-lg rounded-xl text-center max-w-sm w-full">
        <CardContent>
          <AlertCircle className="h-8 w-8 mx-auto" stroke="crimson" />
          <h2 className="text-xl font-semibold mt-4 text-error">
            Unable to connect to the server
          </h2>
          <p className="text-secondary mt-2">
            We are having trouble connecting to our servers. Please try again later.
          </p>
          <Button onClick={checkServerStatus} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerBad;
