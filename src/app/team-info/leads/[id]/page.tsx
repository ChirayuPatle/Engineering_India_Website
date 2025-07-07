"use client";
import { useParams } from "next/navigation";
import { teamMembers } from "@/team-info";
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

const TeamInfoPageSkeleton = () => (
  <div className="h-screen w-full">
    <div className="flex h-80 w-full items-center justify-center border-b-4 border-dotted bg-[#4286F5] bg-[url(https://i.pinimg.com/736x/32/b6/bf/32b6bf0d142ae2c4b05aa64f68e04115.jpg)] bg-no-repeat">
      <div className="flex flex-col items-center justify-center gap-2">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="leading-2 flex flex-col items-center justify-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-32 mt-2" />
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
  const [lead, setLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundLead = teamMembers.find((member) => member.teamId === Number(id));
        if (foundLead) {
          setLead(foundLead);
        } else {
          setError("Team lead not found");
        }
      } catch (_e: any) { // eslint-disable-line @typescript-eslint/no-unused-vars
        setError("Failed to load team lead data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  if (isLoading) {
    return <TeamInfoPageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-400 bg-red-50 p-6 text-center text-red-700 shadow-sm">
          <TriangleAlert className="h-12 w-12 text-red-500 mb-4" />
          <span className="text-xl font-semibold">Error: {error}</span>
          <p className="mt-2 text-sm">
            Please try again later or go back to the team page.
          </p>
          <Link href="/team">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go to Team Page</button>
          </Link>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-6 text-center text-muted-foreground shadow-sm">
          <TriangleAlert className="h-12 w-12 text-muted-foreground mb-4" />
          <Typography variant="h1" className="mb-6">
            Team Lead Not Found
          </Typography>
          <Typography className="mb-8 text-muted-foreground">
            The team lead you're looking for doesn't exist.
          </Typography>
          <Link href="/team">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Back to Team</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <div className="flex h-80 w-full items-center justify-center border-b-4 border-dotted bg-[#4286F5] bg-[url(https://i.pinimg.com/736x/32/b6/bf/32b6bf0d142ae2c4b05aa64f68e04115.jpg)] bg-no-repeat">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-32 w-32 overflow-hidden rounded-full border-2">
            <Image
              className="h-full w-full object-cover"
              src={lead.image}
              alt={lead.name}
              fill
            />
          </div>
          <div className="leading-2 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">
              {lead.name}
            </h1>
            <h1 className="text-md font-bold text-zinc-200">
              {lead.position}
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
            {lead.linkedin && (
              <div className="flex items-center justify-center gap-1 text-zinc-600">
                <LinkedinIcon />
                <Link target="_blank" href={lead.linkedin}>
                  <h1 className="cursor-pointer text-xl">Linkedin</h1>
                </Link>
              </div>
            )}
            {lead.Email && (
              <div className="flex items-center justify-center gap-1 text-zinc-600">
                <MessageSquareHeartIcon />
                <h1 className="cursor-pointer text-xl">
                  {lead.Email}
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
