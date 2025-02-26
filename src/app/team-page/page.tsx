type TeamMember = {
  name: string;
  branch: string;
  year: string;
  image: string;
};

type TeamCardProps = {
  name: string;
  branch: string;
  year: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ name, branch, year }) => {
  return (
    <div className="perspective-1000 hover:rotate-x-3 hover:rotate-y-3 group relative flex h-96 w-72 transform flex-col items-center rounded-2xl border border-gray-300 bg-gray-100 p-6 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-green-500 opacity-20 transition-opacity duration-500 group-hover:opacity-40" />

      {/* Profile Image */}
      <img
        src="https://images.pexels.com/photos/10678361/pexels-photo-10678361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Profile"
        className="mt-6 h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg"
      />

      {/* Member Details */}
      <div className="relative z-10 mt-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-600"> {branch} </p>
        <p className="text-xs text-gray-500"> {year} year</p>
      </div>
    </div>
  );
};

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "John Doe",
      branch: "Computer Science",
      year: "3rd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      branch: "Information Tech",
      year: "2nd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "John Doe",
      branch: "Computer Science",
      year: "3rd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      branch: "Information Tech",
      year: "2nd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "John Doe",
      branch: "Computer Science",
      year: "3rd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      branch: "Information Tech",
      year: "2nd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "John Doe",
      branch: "Computer Science",
      year: "3rd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      branch: "Information Tech",
      year: "2nd",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Alex Brown",
      branch: "Electronics",
      year: "4th",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-10">
      {teamMembers.map((details, index) => (
        <TeamCard
          key={index}
          name={details.name}
          year={details.year}
          branch={details.branch}
        />
      ))}
    </div>
  );
};

export default TeamPage;
