"use client";
import { useParams } from "next/navigation";
import { teamMembers, Devlopers } from "@/team-info";
import { useState } from "react";
import Link from "next/link";
import {
  Github,
  Instagram,
  LinkedinIcon,
  MessageSquareHeartIcon,
  Twitter,
} from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

function TeamInfoPage(): JSX.Element {
  const { id } = useParams();
  const [userid, setid] = useState<number>(Number(id) - 1);
  const [logo, setlogo] = useState([
    <LinkedinIcon key="linkedin" />,
    <Instagram key="instagram" />,
    <Twitter key="twitter" />,
    <Github key="github" />,
    <MessageSquareHeartIcon key="message" />,
  ]);

  return (
    <div className="h-screen w-full">
      <div className="flex h-80 w-full items-center justify-center border-b-4 border-dotted bg-[#4286F5] bg-[url(https://i.pinimg.com/736x/32/b6/bf/32b6bf0d142ae2c4b05aa64f68e04115.jpg)] bg-no-repeat">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-32 w-32 overflow-hidden rounded-full border-2">
            <img
              className="h-full w-full object-cover"
              src={`${
                Devlopers[userid] ? Devlopers[userid].image : "not found"
              }`}
              alt=""
            />
          </div>
          <div className="leading-2 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">
              {teamMembers[userid]
                ? Devlopers[userid]?.name
                : "Member not found"}
            </h1>
            <h1 className="text-md font-bold text-zinc-200">
              {teamMembers[userid]
                ? Devlopers[userid]?.position
                : "Member not found"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex h-96 w-full flex-col items-center justify-start gap-16 md:flex-row md:pl-48">
        <div className="hidden h-36 w-80 lg:block">
          <img src="/image/logo.png" alt="" />
        </div>
        <div className="flex h-96 w-96 flex-col items-center justify-start py-16">
          <h1 className="text-2xl">Connect with Our Team</h1>
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex items-center justify-center gap-1 text-zinc-600">
              {logo[1]}
              <Link target="_blank" href={`${Devlopers[userid]?.linkedin}`}>
                <h1 className="cursor-pointer text-xl">Linkedin</h1>
              </Link>
            </div>
            {Devlopers[userid]?.Email !== "" && (
              <div className="flex items-center justify-center gap-1 text-zinc-600">
                {logo[4]}
                <h1 className="cursor-pointer text-xl">
                  {Devlopers[userid]?.Email}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamInfoPage;
