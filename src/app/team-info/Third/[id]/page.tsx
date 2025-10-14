"use client";
import { useParams } from "next/navigation";
import { ThirdYear } from "@/team-info";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LinkedinIcon,
  MessageSquareHeartIcon,
  TriangleAlert,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const TeamInfoPageSkeleton = () => (
  <div className="h-screen w-full">
    <div className="flex h-80 w-full items-center justify-center border-b-4 border-dotted bg-[#4286F5] bg-[url(https://i.pinimg.com/736x/32/b6/bf/32b6bf0d142ae2c4b05aa64f68e04115.jpg)] bg-no-repeat">
      <div className="flex flex-col items-center justify-center gap-2">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="leading-2 flex flex-col items-center justify-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-6 w-32" />
        </div>
      </div>
    </div>
    <div className="flex h-96 w-full flex-col items-center justify-start gap-16 md:flex-row md:pl-48">
      <div className="hidden h-36 w-80 lg:block">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex h-96 w-96 flex-col items-center justify-start py-16">
        <Skeleton className="h-8 w-64" />
        <div className="mt-3 flex flex-col gap-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
    </div>
  </div>
);

function TeamInfoPage(): JSX.Element {
  const { id } = useParams();
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundMember = ThirdYear.find((mem) => mem.teamId === Number(id));
        if (foundMember) {
          setMember(foundMember);
        }
      } catch (e: any) {
        console.error("Failed to load member data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (isLoading) {
    return <TeamInfoPageSkeleton />;
  }

  if (!member && !isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-6 text-center text-muted-foreground shadow-sm">
          <TriangleAlert className="mb-4 h-12 w-12 text-muted-foreground" />
          <Typography variant="h1" className="mb-6">
            Member Not Found
          </Typography>
          <Typography className="mb-8 text-muted-foreground">
            The member you're looking for doesn't exist.
          </Typography>
          <Button>
            <Link href="/team">Back to Team</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <div className="flex h-80 w-full items-center justify-center border-b-4 border-dotted bg-[#4286F5] bg-[url(https://i.pinimg.com/736x/32/b6/bf/32b6bf0d142ae2c4b05aa64f68e04115.jpg)] bg-no-repeat">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2">
            <Image
              className="object-cover"
              src={member.image}
              alt={member.name}
              fill
            />
          </div>
          <div className="leading-2 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">{member.name}</h1>
            <h1 className="text-md font-bold text-zinc-200">
              {member.position}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex h-96 w-full flex-col items-center justify-start gap-16 md:flex-row md:pl-48">
        <div className="hidden h-36 w-80 lg:block">
          <Image src="/image/logo.png" alt="" width={50} height={50} />
        </div>
        <div className="flex h-96 w-96 flex-col items-center justify-start py-16">
          <h1 className="text-2xl">Connect with Our Team</h1>
          <div className="mt-3 flex flex-col gap-1">
            {member.linkedin && (
              <div className="flex items-center justify-center gap-1 text-zinc-600">
                <LinkedinIcon />
                <Link target="_blank" href={member.linkedin}>
                  <h1 className="cursor-pointer text-xl">Linkedin</h1>
                </Link>
              </div>
            )}
            {member.Email && (
              <div className="flex items-center justify-center gap-1 text-zinc-600">
                <MessageSquareHeartIcon />
                <h1 className="cursor-pointer text-xl">{member.Email}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamInfoPage;
