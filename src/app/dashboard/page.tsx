"use client";
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from "react";

type UserDetail = {
  user: { email: string | null };
};

const Page = () => {
  const [user, setUser] = useState<UserDetail | null>(null);
  const data = async () => {
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    setUser(data as UserDetail);
    return data;
  };
  useEffect(() => {
    data();
  }, []);
  if (user?.user) {
    return <div>{user?.user?.email || "Error"}</div>;
  } else {
    return <div>Loading...</div>;
  }
};

export default Page;
