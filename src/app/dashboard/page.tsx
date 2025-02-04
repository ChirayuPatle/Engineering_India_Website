"use client";

import { Button } from "@/components/ui/button";
import { userService } from "@/libs/appwrite/config";
import React from "react";

const page = () => {
  const getDetail = async () => {
    const details = await userService.getCurrentUserDetail();
  };
  return (
    <div>
      <Button onClick={getDetail}>Get Details</Button>
    </div>
  );
};

export default page;
