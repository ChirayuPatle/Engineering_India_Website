"use client";
import { Button } from "@/components/ui/button";
import { userService } from "@/libs/appwrite/config";
import EventInfo from "@/app/event-info/page";
import ModifiedCard from "@/components/modified-card"; 

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
      {/* <EventInfo /> */}
      {/* <Button onClick={loginUser}>Login With Google</Button> */}
      <ModifiedCard title="Lead" description="Virendra Lokhande" imagelink="./images/signup.png" content=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat natus labore molestiae impedit debitis voluptatum voluptate autem, error exercitationem tempora deserunt placeat animi repudiandae, voluptates reprehenderit nemo amet facilis. Dolor."/>
     
    </>
  );
}
