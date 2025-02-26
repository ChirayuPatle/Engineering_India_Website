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
    <div className="perspective-1000 hover:rotate-x-3 hover:rotate-y-3 md:mt-10 group relative flex h-96 w-72 transform flex-col items-center rounded-2xl border border-gray-300 bg-gray-100 p-6 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-green-500 opacity-20 transition-opacity duration-500 group-hover:opacity-40" />

      {/* Profile Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/128/456/456212.png"
        alt="Profile"
        className="mt-6 h-36 w-36 rounded-full border-4 p-1 border-black object-cover shadow-lg"
      />

      {/* Member Details */}
      <div className="relative z-10 mt-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
        <p className="text-lg text-gray-600 text-md py-3"> {branch} </p>
        <p className="text-xl text-gray-500 font-bold"> {year} year</p>
      </div>
    </div>
  );
};

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
        name: "Aayush Kapale",
        branch: "ELECTRICAL ENGINEERING",
        year: "2nd",
        image: "",
    },
    {
        name: "Abhinav Tomar",
        branch: "COMPUTER SCIENCE AND ENGINEERING",
        year: "2nd",
        image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    },
    {
        name: "Aliya Sayyed",
        branch: "COMPUTER SCIENCE AND ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Gauri Ganeshrao Lokhande",
        branch: "INFORMATION TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Harsh Kapte",
        branch: "ELECTRONICS AND TELECOMMUNICATION",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Manasvi Totewar",
        branch: "VLSI",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Mansi Belekar",
        branch: "ELECTRONICS AND TELECOMMUNICATION",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Mayur Rasik Buddhe",
        branch: "COMPUTER SCIENCE AND ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Milind Anil Late",
        branch: "CSE (AIML)",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Mrunmayee Panhalkar",
        branch: "CIVIL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Omkar Suhas Akojwar",
        branch: "CIVIL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Pragati Pradeep Khandre",
        branch: "ELECTRONICS ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Saakshi Krishnani",
        branch: "COMPUTER TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Sakshi Vairagade",
        branch: "ELECTRONICS AND TELECOMMUNICATION",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Sandesh Pakhidde",
        branch: "ELECTRICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Shraddha dinesh shingnapure",
        branch: "INFORMATION TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Shravani Prashant Aney",
        branch: "COMPUTER TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Shrawani Hedaoo",
        branch: "ELECTRICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Tejaswini Tingase",
        branch: "CIVIL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Aditya Rajendra Thakare",
        branch: "ELECTRONICS AND TELECOMMUNICATION",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Aarya kothe",
        branch: "ELECTRONICS ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Adwait Manish Shardul",
        branch: "ETC",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "atharva kangali",
        branch: "MECHANICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Charvi Kadbe",
        branch: "CIVIL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Dnyanata Wakode",
        branch: "ELECTRICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Ishika Lanjewar",
        branch: "INFORMATION TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Mansi jalandhar",
        branch: "ELECTRICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Muchkundraje thote",
        branch: "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE (AIDS)",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Prasanna Dhotarkar",
        branch: "CSE (AIML)",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "RUTUJA NARESHRAO GONDANE",
        branch: "CSE (IOT)",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Vaibhav Dhyani",
        branch: "COMPUTER TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Bhagyashri Vaidya",
        branch: "ELECTRICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Sanskruti Sanjay Moundekar",
        branch: "CIVIL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Sujal Sawalkar",
        branch: "COMPUTER TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Akanksha Sawant",
        branch: "ELECTRONICS ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Saurabh Kulavi",
        branch: "COMPUTER SCIENCE AND ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Parth Dehare",
        branch: "CSE (AIML)",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Rudresh Bokade",
        branch: "MECHANICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Lakshya kumar gupta",
        branch: "CIVIL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Himanshu chaudhari",
        branch: "COMPUTER SCIENCE AND ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Lavanya ukey",
        branch: "ELECTRICAL ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Samyak umathe",
        branch: "INFORMATION TECHNOLOGY",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Shravani Gadhave",
        branch: "ELECTRONICS ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Soukhya Sasankar",
        branch: "COMPUTER SCIENCE AND ENGINEERING",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Aman Kolhe",
        branch: "CSD",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Prathamesh Mandhane",
        branch: "AIDS",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Ashleshaa Pohekar",
        branch: "EL-VSL",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Vidhi Lonarkar",
        branch: "CSE",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Parth Dhurve",
        branch: "CTECH",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Vedang Kulkarni",
        branch: "CTECH",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Sia Khurana",
        branch: "IT",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Shelja Patle",
        branch: "CTECH",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Sayali Padmane",
        branch: "CTECH",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Khushi Chaudhary",
        branch: "EE",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Anondi thakre",
        branch: "ETC",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "divya dhule",
        branch: "C tech",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "payal dongre",
        branch: "Ctech",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Kashish buddhe",
        branch: "Electrical",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Mihir Thakre",
        branch: "EE",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Rutvik Gusarkar",
        branch: "AIDS",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Sakshi Kadu",
        branch: "CSE",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Piyush Meshram",
        branch: "IT",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Pavitra",
        branch: "ETC",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Chirayu Jiyalal patle",
        branch: "CSD",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Muskan Dhengre",
        branch: "ETC",
        year: "2nd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Mayur Choudhary",
        branch: "MECHANICAL",
        year: "3rd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Dnyaneshwar Itankar",
        branch: "CSE",
        year: "3rd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Shweta Sorte",
        branch: "IOT",
        year: "3rd",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Janvi Shinde",
        branch: "IOT",
        year: "3rd",
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
