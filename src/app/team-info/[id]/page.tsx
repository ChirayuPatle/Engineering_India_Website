"use client";
import { useParams } from "next/navigation";
import teamMembers from "@/team-info";
import { useState } from "react";
import {
  Github,
  Instagram,
  LinkedinIcon,
  MessageSquareHeartIcon,
  Twitter,
  
} from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
// import { Linkedin, LinkedinIcon } from "lucide-react";

function TeamInfoPage(): JSX.Element {
  const { id } = useParams() as { id: string };
  const [userid, setid] = useState<number>(Number(id) - 1);
  const [logo, setlogo] = useState([
    <LinkedinIcon />,
    <Instagram />,
    <Twitter />,
    <Github />,
    <MessageSquareHeartIcon />,
  ]);
  console.log();

  return (
    <div className="h-screen w-full">
      <div className="flex h-80 w-full items-center justify-center border-b-4  border-dotted
         bg-[url(https://i.pinimg.com/736x/32/b6/bf/32b6bf0d142ae2c4b05aa64f68e04115.jpg)]
         bg-[#4286F5]
          bg-no-repeat">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="h-32 w-32 overflow-hidden rounded-full border-2">
            <img
              className="h-full w-full object-cover"
              src={`${teamMembers[userid] ? teamMembers[userid].image : "not found"}`}
              alt=""
            />
          </div>
          <div className="leading-2 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">
              {teamMembers[userid]
                ? teamMembers[userid].name
                : "Member not found"}
            </h1>
            <h1 className="text-md font-bold text-zinc-200">
              {teamMembers[userid]
                ? teamMembers[userid].position
                : "Member not found"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex h-96 w-full flex-col items-center justify-start gap-16 md:flex-row md:pl-48">
        <div className="hidden h-36 w-80 lg:block">
          <img src="/image/logo.png" alt="" />
        </div>
        <div className="flex h-96 w-96 flex-col items-center justify-start py-16 ">
          <h1 className="text-2xl">Connect with Our Team</h1>
          <div className="flex flex-col gap-1 mt-3"> 
            {["Linkedin", "Instagram", "X", "Github","Email"].map((items,index) => (
             <div key={items} className="flex items-center justify-start gap-1 text-zinc-600 ">
               {logo[index]}
               <h1 className="text-xl cursor-pointer">{items}</h1>
             </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamInfoPage;
