"use client";
import { teamMembers, SecondYear, ThridYear, Devlopers } from "@/team-info";
import { useRouter } from "next/navigation";
type TeamCardProps = {
  name: string;
  position: string;
  teamId: number;
};

const TeamCard: React.FC<TeamCardProps> = ({ name, position, teamId }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/team-info/${teamId}`)}
      className="perspective-1000 hover:rotate-x-3 hover:rotate-y-3 group relative flex h-96 w-72 transform cursor-pointer flex-col items-center rounded-2xl border border-gray-300 bg-gray-100 p-6 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl md:mt-10"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-green-500 opacity-20 transition-opacity duration-500 group-hover:opacity-40" />

      {/* Profile Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/128/456/456212.png"
        alt="Profile"
        className="mt-6 h-36 w-36 rounded-full border-4 border-black object-cover p-1 shadow-lg"
      />

      {/* Member Details */}
      <div className="relative z-10 mt-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
        <p className="text-md py-3 text-lg text-gray-600"> {position} </p>
      </div>
    </div>
  );
};

const TeamPage: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="-mb-10 mt-20 text-center text-4xl font-bold text-zinc-600">
          Our Team Leads
        </h1>
        <div className="mt-[2rem] flex flex-wrap justify-center gap-6 p-10">
          <div className="my-[4rem]"></div>
          {teamMembers.map((details, index) => (
            <TeamCard
              key={index}
              name={details.name}
              position={details.position}
              teamId={details.teamId}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="-mb-10 mt-20 text-center text-4xl font-bold text-zinc-600">
          2rd Year Coordinators
        </h1>
        <div className="mt-[2rem] flex flex-wrap justify-center gap-6 p-10">
          <div className="my-[4rem]"></div>
          {SecondYear.map((details, index) => (
            <TeamCard
              key={index}
              name={details.name}
              position={details.position}
              teamId={details.teamId}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="-mb-10 mt-20 text-center text-4xl font-bold text-zinc-600">
          3rd Year Coordinators
        </h1>
        <div className="mt-[2rem] flex flex-wrap justify-center gap-6 p-10">
          <div className="my-[4rem]"></div>
          {ThridYear.map((details, index) => (
            <TeamCard
              key={index}
              name={details.name}
              position={details.position}
              teamId={details.teamId}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="-mb-10 mt-20 text-center text-4xl font-bold text-zinc-600">
          Devlopers
        </h1>
        <div className="mt-[2rem] flex flex-wrap justify-center gap-6 p-10">
          <div className="my-[4rem]"></div>
          {Devlopers.map((details, index) => (
            <TeamCard
              key={index}
              name={details.name}
              position={details.position}
              teamId={details.teamId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamPage;
