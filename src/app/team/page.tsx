"use client";
// import DataNetwork from "@/components/animations/DataNetwork";
// import TechLeadershipNetwork from "@/components/animations/TechLeadershipNetwork";
import HolographicHexField from "@/components/animations/HolographicHexField";
import { teamMembers, Devlopers, departmentalCoordinators } from "@/team-info";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
// import { FloatingCloud } from "@/components/landing/FloatingCloud";
import { ArrowRight } from "lucide-react";

type DepartmentCoordinatorProps = {
  name: string;
  department: string;
  teamId: number;
  image: string;
  type: string;
  index: number;
};

const DepartmentCoordinatorCard = ({
  name,
  department,
  teamId,
  image,
  type,
  index,
}: DepartmentCoordinatorProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onClick={() => router.push(`/team-info/${type}/${teamId}`)}
      className="group relative flex w-full max-w-[280px] cursor-pointer flex-col items-center rounded-[32px] border border-cyan-200/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-6 pt-12 shadow-[0_0_40px_rgba(0,200,255,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-300/40 hover:shadow-[0_20px_50px_rgba(0,200,255,0.15)]"
    >
      {/* Profile Image Container */}
      <div className="relative mb-6">
        <div className="h-32 w-32 scale-105 overflow-hidden rounded-full border-4 border-white/10 transition-all duration-500 md:h-40 md:w-40">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            priority
          />
        </div>
      </div>

      {/* Details */}
      <div className="mb-6 space-y-2 text-center">
        <h3 className="whitespace-nowrap font-fraunces text-xl font-bold text-white transition-colors group-hover:text-[#D4EBFF] md:text-2xl">
          {name}
        </h3>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 md:text-sm">
          {department}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto flex translate-y-2 transform items-center gap-2 pt-4 text-[#D4EBFF] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs font-bold uppercase tracking-widest">
          Profile
        </span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
};

type TeamCardProps = {
  name: string;
  position: string;
  teamId: number;
  image: string;
  type: string;
  index: number;
};

const TeamCard = ({
  name,
  position,
  teamId,
  image,
  type,
  index,
}: TeamCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onClick={() => router.push(`/team-info/${type}/${teamId}`)}
      className="group relative flex w-full max-w-[280px] cursor-pointer flex-col items-center rounded-[32px] border border-cyan-200/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-6 pt-12 shadow-[0_0_40px_rgba(0,200,255,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-300/40 hover:shadow-[0_20px_50px_rgba(0,200,255,0.15)]"
    >
      {/* Profile Image Container */}
      <div className="relative mb-6">
        <div className="h-32 w-32 scale-105 overflow-hidden rounded-full border-4 border-white/10 transition-all duration-500 md:h-40 md:w-40">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            priority
          />
        </div>
      </div>

      {/* Details */}
      <div className="mb-6 space-y-2 text-center">
        <h3 className="whitespace-nowrap font-fraunces text-xl font-bold text-white transition-colors group-hover:text-[#D4EBFF] md:text-2xl">
          {name}
        </h3>
        <p className="whitespace-pre-wrap font-sans text-xs uppercase tracking-[0.2em] text-white/50 md:text-sm">
          {position}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto flex translate-y-2 transform items-center gap-2 pt-4 text-[#D4EBFF] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs font-bold uppercase tracking-widest">
          Profile
        </span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
};

export default function TeamPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[#071426]">
      {/* Technical Background */}
        <HolographicHexField z-50/>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid */}
        <div className="bg-[linear-gradient(#ffffff_1px,transparent_1px), linear-gradient(90deg,#ffffff_1px,transparent_1px)] absolute inset-0 bg-[size:50px_50px] opacity-[0.08]" />

        {/* Glow Nodes */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[10%] top-[60%] h-96 w-96 rounded-full bg-blue-500/20 blur-[150px]"
        />

        <div className="absolute right-[10%] top-[60%] h-96 w-96 rounded-full bg-blue-500/20 blur-[150px]" />
      </div>

      {/* --------------Hero Section----------------- */}

      <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center bg-gradient-to-b from-[#123B5D] via-[#0B1F33] to-[#071426] px-4 pb-20 pt-40 text-center text-white">
        {/* <HolographicHexField /> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl"
        >
          <h1 className="mb-6 font-fraunces text-4xl font-bold md:text-7xl">
            Meet the{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent">
              Minds
            </span>
          </h1>
          <p className="mx-auto max-w-xl font-sans text-white/70">
            Our team is a diverse group of passionate students dedicated to
            driving technical innovation and social impact.
          </p>
        </motion.div>

        {/* <FloatingCloud
          top="15%"
          left="10%"
          speed={0.5}
          cloudNum={1}
          opacity="opacity-30"
        /> */}
      </section>

      {/* Team Sections */}
      <section className="relative z-20 px-4 py-24 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Leadership */}
          <div className="mb-32">
            <div className="mb-16 text-center md:text-left">
              <h2 className="mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text font-fraunces text-3xl font-semibold text-transparent md:text-5xl">
                Leadership
              </h2>
              <div className="hidden h-1 w-20 rounded-full bg-[#D4EBFF]/30 md:block" />
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
              {teamMembers.slice(0, 2).map((details, index) => (
                <TeamCard
                  key={`leadership-${index}`}
                  index={index}
                  name={details.name}
                  position={details.position}
                  teamId={details.teamId}
                  image={details.image}
                  type="leadership"
                />
              ))}
            </div>
          </div>

          {/* Secretaries */}
          <div className="mb-32">
            <div className="mb-16 text-center md:text-left">
              <h2 className="mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text font-fraunces text-3xl font-semibold text-transparent md:text-5xl">
                Secretaries
              </h2>
              <div className="hidden h-1 w-20 rounded-full bg-[#D4EBFF]/30 md:block" />
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.slice(2, 5).map((details, index) => (
                <TeamCard
                  key={`secretary-${index}`}
                  index={index}
                  name={details.name}
                  position={details.position}
                  teamId={details.teamId}
                  image={details.image}
                  type="secretaries"
                />
              ))}
            </div>
          </div>

          {/* Domain Heads */}
          <div className="mb-32">
            <div className="mb-16 text-center md:text-left">
              <h2 className="mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text font-fraunces text-3xl font-semibold text-transparent md:text-5xl">
                Domain Heads
              </h2>
              <div className="hidden h-1 w-20 rounded-full bg-[#D4EBFF]/30 md:block" />
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.slice(5).map((details, index) => (
                <TeamCard
                  key={`domain-${index}`}
                  index={index}
                  name={details.name}
                  position={details.position}
                  teamId={details.teamId}
                  image={details.image}
                  type="domain"
                />
              ))}
            </div>
          </div>

          {/* Departmental Coordinators */}
          <div className="mb-32">
            <div className="mb-16 text-center md:text-left">
              <h2 className="mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text font-fraunces text-3xl font-semibold text-transparent md:text-5xl">
                Departmental Coordinators
              </h2>
              <div className="hidden h-1 w-20 rounded-full bg-[#D4EBFF]/30 md:block" />
            </div>

            {departmentalCoordinators.length > 0 ? (
              <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {departmentalCoordinators.map((details, index) => (
                  <DepartmentCoordinatorCard
                    key={`dept-${index}`}
                    index={index}
                    name={details.name}
                    department={details.department}
                    teamId={details.teamId}
                    image={details.image}
                    type="departmental"
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center font-fraunces text-white/30">
                No departmental coordinators to display at the moment.
              </div>
            )}
          </div>

          {/* Developers */}
          <div>
            <div className="mb-16 text-center md:text-left">
              <h2 className="mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text font-fraunces text-3xl font-semibold text-transparent md:text-5xl">
                The Developers
              </h2>
              <div className="hidden h-1 w-20 rounded-full bg-[#D4EBFF]/30 md:block" />
            </div>

            {Devlopers.length > 0 ? (
              <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Devlopers.map((details, index) => (
                  <TeamCard
                    key={`dev-${index}`}
                    index={index}
                    name={details.name}
                    position={details.position}
                    teamId={details.teamId}
                    image={details.image}
                    type="developers"
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center font-fraunces text-white/30">
                No developers to display at the moment.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
