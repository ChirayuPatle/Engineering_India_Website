"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingCloud } from "@/components/landing/FloatingCloud";
import { useParams, useRouter } from "next/navigation";
import {
  coreCommittee,
  departmentalCoordinators,
  Devlopers,
  type TeamMember,
} from "@/team-info";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TriangleAlert,
  Mail,
  Linkedin,
  Github,
  FileText,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

const TeamInfoPageSkeleton = () => (
  <div className="min-h-screen bg-[#0F1B40] text-white">
    <div className="flex h-[40vh] w-full items-center justify-center bg-gradient-to-b from-[#6183B1] to-[#0F1B40]">
      <div className="flex flex-col items-center justify-center gap-6">
        <Skeleton className="h-40 w-40 rounded-full bg-white/10" />
        <div className="space-y-4">
          <Skeleton className="mx-auto h-10 w-64 bg-white/10" />
          <Skeleton className="mx-auto h-6 w-48 bg-white/10" />
        </div>
      </div>
    </div>
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <Skeleton className="h-64 w-full rounded-[40px] bg-white/5" />
    </div>
  </div>
);

function TeamInfoPage(): JSX.Element {
  const { type, id } = useParams();
  const router = useRouter();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        let foundMember: TeamMember | null = null;

        switch (type) {
          case "leadership":
          case "secretaries":
          case "domain":
            foundMember =
              coreCommittee.find((m) => m.teamId === Number(id)) ?? null;
            break;
          case "departmental":
            foundMember =
              departmentalCoordinators.find((m) => m.teamId === Number(id)) ??
              null;
            break;
          case "developers":
            foundMember =
              Devlopers.find((m) => m.teamId === Number(id)) ?? null;
            break;
        }

        if (foundMember) {
          setMember(foundMember);
        }
      } catch (e: unknown) {
        console.error("Failed to load member data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMember();
  }, [type, id]);

  if (isLoading) {
    return <TeamInfoPageSkeleton />;
  }

  if (!member && !isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0F1B40] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-[40px] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl"
        >
          <TriangleAlert className="mb-6 h-16 w-16 text-[#D4EBFF]" />
          <h1 className="font-fraunces mb-4 text-3xl font-bold text-white">
            Team Member Not Found
          </h1>
          <p className="mb-8 max-w-sm text-white/50">
            We couldn't find the team member you're looking for.
          </p>
          <Button
            variant="premium"
            size="lg"
            onClick={() => router.push("/team")}
          >
            Back to Team
          </Button>
        </motion.div>
      </div>
    );
  }

  const getPosition = (): string => {
    if (type === "departmental" && member?.department) {
      return `Departmental Coordinator - ${member.department}`;
    }
    return member?.position || "";
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0F1B40] pb-24 text-white">
      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[45vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#0F1B40] px-4 pb-20 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* Profile Image */}
          <div className="group relative mb-8">
            <div className="absolute inset-0 rounded-full bg-[#D4EBFF] opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105 md:h-56 md:w-56">
              <Image
                src={member?.image || ""}
                alt={member?.name || ""}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-fraunces text-4xl font-bold text-white md:text-6xl">
              {member?.name}
            </h1>
            <p className="whitespace-pre-wrap font-sans text-sm font-bold uppercase tracking-[0.3em] text-[#D4EBFF]">
              {getPosition()}
            </p>
          </div>
        </motion.div>

        <FloatingCloud
          top="10%"
          left="5%"
          speed={0.5}
          cloudNum={1}
          opacity="opacity-20"
        />
        <FloatingCloud
          top="30%"
          left="85%"
          speed={0.8}
          cloudNum={2}
          opacity="opacity-15"
          scale={0.8}
        />
      </section>

      {/* Info Section */}
      <section className="relative z-20 -mt-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-16"
          >
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {/* Bio/About */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-fraunces mb-6 text-3xl font-bold text-white">
                    About
                  </h2>
                  <p className="font-sans text-lg leading-relaxed text-white/60">
                    {member?.bio ||
                      (type === "leadership"
                        ? "A key member of our leadership team, driving the vision and strategic direction of Engineering India."
                        : type === "secretaries"
                          ? "An essential part of our secretarial team, ensuring smooth operations and effective communication."
                          : type === "domain"
                            ? "A domain expert leading technical initiatives and innovation in their specialized area."
                            : type === "departmental"
                              ? "A dedicated coordinator representing their department and fostering inter-departmental collaboration."
                              : type === "developers"
                                ? "A core developer at Engineering India, building robust digital solutions and driving technological progress."
                                : "A valued member of the Engineering India team contributing to our mission and goals.")}
                  </p>
                </div>
              </div>

              {/* Connections */}
              <div className="space-y-8">
                <h2 className="font-fraunces mb-6 text-3xl font-bold text-white">
                  Connect
                </h2>

                <div className="space-y-4">
                  {member?.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-[#D4EBFF] hover:text-[#0F1B40]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-white/20">
                        <Linkedin className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                          LinkedIn
                        </p>
                        <p className="flex items-center gap-2 text-lg font-bold">
                          Profile <ExternalLink className="h-4 w-4" />
                        </p>
                      </div>
                    </Link>
                  )}

                  {member?.github && (
                    <Link
                      href={member.github}
                      target="_blank"
                      className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-[#D4EBFF] hover:text-[#0F1B40]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-white/20">
                        <Github className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                          GitHub
                        </p>
                        <p className="flex items-center gap-2 text-lg font-bold">
                          Profile <ExternalLink className="h-4 w-4" />
                        </p>
                      </div>
                    </Link>
                  )}

                  {member?.Email && (
                    <Link
                      href={`mailto:${member.Email}`}
                      className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#D4EBFF]/30"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4EBFF]/10 text-[#D4EBFF] transition-colors">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                          Email
                        </p>
                        <p className="max-w-[200px] truncate text-lg font-bold">
                          {member?.Email}
                        </p>
                      </div>
                    </Link>
                  )}

                  {member?.resume && (
                    <Link
                      href={member.resume}
                      target="_blank"
                      className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-[#D4EBFF] hover:text-[#0F1B40]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-white/20">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                          Resume
                        </p>
                        <p className="flex items-center gap-2 text-lg font-bold">
                          View Resume <ExternalLink className="h-4 w-4" />
                        </p>
                      </div>
                    </Link>
                  )}

                  {!member?.linkedin &&
                    !member?.github &&
                    !member?.Email &&
                    !member?.resume && (
                      <p className="rounded-3xl border-2 border-dashed border-white/5 py-8 text-center italic text-white/40">
                        No contact information available at the moment.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Background Decor - Wrapped to fix overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloatingCloud
          top="70%"
          left="-5%"
          speed={0.4}
          cloudNum={3}
          opacity="opacity-10"
          scale={1.5}
        />
        <FloatingCloud
          top="85%"
          left="90%"
          speed={0.6}
          cloudNum={4}
          opacity="opacity-10"
          scale={1.2}
        />
      </div>
    </main>
  );
}

export default TeamInfoPage;
