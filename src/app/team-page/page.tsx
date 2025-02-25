
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
    <div className="group relative w-72 h-96 bg-gray-100 rounded-2xl shadow-xl border border-gray-300 p-6 flex flex-col items-center 
                transition-all duration-500 ease-out transform perspective-1000 hover:rotate-x-3 hover:rotate-y-3 hover:shadow-2xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-green-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Profile Image */}
      <img
        src="https://images.pexels.com/photos/10678361/pexels-photo-10678361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Profile"
        className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg mt-6"
      />

      {/* Member Details */}
      <div className="relative z-10 text-center mt-4">
        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
        <p className="text-gray-600 text-sm"> {branch} </p>
        <p className="text-gray-500 text-xs"> {year} year</p>
      </div>
    </div>
  );
};

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { name: "John Doe", branch: "Computer Science", year: "3rd", image: "https://via.placeholder.com/150" },
    { name: "Jane Smith", branch: "Information Tech", year: "2nd", image: "https://via.placeholder.com/150" },
    { name: "John Doe", branch: "Computer Science", year: "3rd", image: "https://via.placeholder.com/150" },
    { name: "Jane Smith", branch: "Information Tech", year: "2nd", image: "https://via.placeholder.com/150" },
    { name: "John Doe", branch: "Computer Science", year: "3rd", image: "https://via.placeholder.com/150" },
    { name: "Jane Smith", branch: "Information Tech", year: "2nd", image: "https://via.placeholder.com/150" },
    { name: "John Doe", branch: "Computer Science", year: "3rd", image: "https://via.placeholder.com/150" },
    { name: "Jane Smith", branch: "Information Tech", year: "2nd", image: "https://via.placeholder.com/150" },
    { name: "Alex Brown", branch: "Electronics", year: "4th", image: "https://via.placeholder.com/150" }
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-10">
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
