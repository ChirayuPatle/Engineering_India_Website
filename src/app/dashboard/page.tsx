"use client";

import { useAuth } from "@/context/authContext";

const Page = () => {
  const { userDetails } = useAuth();

  console.log(userDetails?.full_name);

  return <div className="">Welcome, {userDetails?.full_name} to Dasboard</div>;
};

export default Page;
