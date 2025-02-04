"use client";
import { Button } from "@/components/ui/button";
import { userService } from "@/libs/appwrite/config";

export default function Home() {
  const loginUser = async () => {
    await userService.loginWithGoogle();
    const response = await userService.getCurrentUserDetail();
  };

  return (
    <>
      {/* <h1>This is main page</h1> */}
      {/* <SignUpForm /> */}
      {/* <RightQR /> */}
      {/* <Responseform /> */}
      {/* <FinalForm /> */}
      {/* <EventMiniLoadingpage /> */}
      {/* <EventImage /> */}
      <Button onClick={loginUser}>Login With Google</Button>
    </>
  );
}
