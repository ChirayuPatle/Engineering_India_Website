"use client";
import { account, AppwriteService, userService } from "@/libs/appwrite/config";
import { Button } from "@/components/ui/button";
import LeftPage from "@/features/auth/components/left-segment/page";
import RightSegment from "@/features/auth/components/right-segment/page";
import Input from "@/components/ui/input";
import SignUpForm from "@/features/auth/components/final-sigin-form/form";
import RightQR from "@/features/event-registration-response/rightQR/page";
import Responseform from "@/features/event-registration-response/submit_response/responseform";
import FinalForm from "@/features/event-registration-response/finalform/finalForm";
import EventMiniLoadingpage from "@/features/events/eventP2/event";
import EventImage from "@/features/events/eventP2/eventP2-image/image";

export default function Home() {
  const loginUser = async () => {
    const response = await userService.loginWithGoogle();
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
      <div className="w-full min-h-screen bg-black text-white">
        <Button onClick={loginUser}>Login with Google</Button>
      </div>
    </>
  );
}
