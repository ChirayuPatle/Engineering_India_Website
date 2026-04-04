import { getTeamMemberData, type TeamMemberData } from './team-database';

type TeamMember = {
  name: string;
  position: string;
  teamId: number;
  image: string;
  linkedin: string;
  Email: string;
  bio?: string;
  github?: string;
  resume?: string;
  department?: string;
};

type DepartmentCoordinator = {
  name: string;
  department: string;
  teamId: number;
  image: string;
  linkedin: string;
  Email: string;
  bio?: string;
  github?: string;
  position: string;
  resume?: string;
};

// Helper function to create team member with consistent data
function createTeamMember(name: string, position: string, teamId: number, overrides?: Partial<TeamMemberData>): TeamMember {
  const data = getTeamMemberData(name);
  return {
    teamId,
    name,
    position,
    image: data.image,
    linkedin: data.linkedin,
    Email: data.Email,
    bio: data.bio,
    github: data.github,
    resume: data.resume,
    department: data.department,
    ...overrides,
  };
}

function createDepartmentCoordinator(name: string, department: string, teamId: number, overrides?: Partial<TeamMemberData>): DepartmentCoordinator {
  const data = getTeamMemberData(name);
  return {
    teamId,
    name,
    department,
    position: "Departmental Coordinator",
    image: data.image,
    linkedin: data.linkedin,
    Email: data.Email,
    bio: data.bio,
    github: data.github,
    resume: data.resume,
    ...overrides,
  };
}

const coreCommittee: TeamMember[] = [
  createTeamMember("Samyak Umathe", "College Coordinator\nCollege President", 1),
  createTeamMember("V. S. Pavithra", "Club Head\nVice President", 2),
  createTeamMember("Chirayu Patle", "Secretary & Database Head", 3),
  createTeamMember("Shailaija Patle", "Secretary & Event Management Head", 4),
  createTeamMember("Mansi Jalandhar", "Secretary", 5),
  createTeamMember("Priyanshu Kayarkar", "Technical Head", 6),
  createTeamMember("Harsh Kapte", "Publicity Head", 7),
  createTeamMember("Siddheshwar Madne", "Publicity Head", 8),
  createTeamMember("Ishika Lanjewar", "Publicity Head", 9),
  createTeamMember("Aarya Kothe", "Design Head", 10),
  createTeamMember("Om Ingle", "Design Head", 11),
  createTeamMember("Payal Dongre", "Literature Head", 12),
  createTeamMember("Sakshi Kadu", "Literature Head", 13),
  createTeamMember("Sayali Padmane", "Photography Head", 14),
];

const departmentalCoordinators: DepartmentCoordinator[] = [
  createDepartmentCoordinator("Aliya Sayyed", "CSE", 1),
  createDepartmentCoordinator("Parth Dehare", "CSE AIML", 2),
  createDepartmentCoordinator("Muchkundraje Thote", "AIDS", 3),
  createDepartmentCoordinator("Piyush Meshram", "IT / CSD", 4),
  createDepartmentCoordinator("Saakshi Krishnani", "C-Tech", 5),
  createDepartmentCoordinator("Rudresh Bokade", "Mechanical", 6),
  createDepartmentCoordinator("Sakshi Vairagade", "ETC / VLSI / IOT / EE", 7),
  createDepartmentCoordinator("Khushi Chaudhari", "Electrical", 8),
];

// Keep the old teamMembers array for backward compatibility
const teamMembers = coreCommittee;

const SecondYear: TeamMember[] = [
  createTeamMember("Aliya Sayyed", "Member", 1),
  createTeamMember("Gauri Ganeshrao Lokhande", "Member", 2),
  createTeamMember("Harsh Kapte", "Member", 3),
  createTeamMember("Manasvi Totewar", "Member", 4),
  createTeamMember("Mayur Rasik Buddhe", "Member", 5),
  createTeamMember("Milind Anil Late", "Member", 6),
  createTeamMember("Saakshi Krishnani", "Member", 7),
  createTeamMember("Sakshi Vairagade", "Member", 8),
  createTeamMember("Sandesh Pakhidde", "Member", 9),
  createTeamMember("Shraddha Dinesh Shingnapure", "Member", 10),
  createTeamMember("Shravani Prashant Aney", "Member", 11),
  createTeamMember("Aditya Rajendra Thakare", "Member", 12),
  createTeamMember("Aarya Kothe", "Member", 13),
  createTeamMember("Dnyanata Wakode", "Member", 15),
  createTeamMember("Ishika Lanjewar", "Member", 16),
  createTeamMember("Mansi Jalandhar", "Member", 17),
  createTeamMember("Muchkundraje Thote", "Member", 18),
  createTeamMember("Rutuja Nareshrao Gondane", "Member", 19),
  createTeamMember("Bhagyashri Vaidya", "Member", 20),
  createTeamMember("Sanskruti Sanjay Moundekar", "Member", 21),
  createTeamMember("Sujal Sawalkar", "Member", 22),
  createTeamMember("Akanksha Sawant", "Member", 23),
  createTeamMember("Parth Dehare", "Member", 24),
  createTeamMember("Rudresh Bokade", "Member", 25),
  createTeamMember("Himanshu Chaudhari", "Member", 26),
  createTeamMember("Lavanya Ukey", "Member", 27),
  createTeamMember("Samyak Umathe", "Member", 28),
  createTeamMember("Soukhya Sasankar", "Member", 29),
  createTeamMember("Aman Kolhe", "Member", 30),
  createTeamMember("Prathamesh Mandhane", "Member", 31),
  createTeamMember("Vidhi Lonarkar", "Member", 32),
  createTeamMember("Parth Dhurve", "Member", 33),
  createTeamMember("Vedang Kulkarni", "Member", 34),
  createTeamMember("Sia Khurana", "Member", 35),
  createTeamMember("Shailaja Patle", "Member", 36),
  createTeamMember("Sayali Padmane", "Member", 37),
  createTeamMember("Khushi Chaudhary", "Member", 38),
  createTeamMember("Anandi Thakre", "Member", 39),
  createTeamMember("Divya Dhule", "Member", 40),
  createTeamMember("Payal Dongre", "Member", 41),
  createTeamMember("Muskan Dhengre", "Member", 42),
];

const ThirdYear: TeamMember[] = [
  createTeamMember("Aastha Chilbilwar", "Member", 1),
  createTeamMember("Aditya Dharpure", "Member", 2),
  createTeamMember("Atharva Pophali", "Member", 3),
  createTeamMember("Dnyaneshwar Itankar", "Member", 4),
  createTeamMember("Himanshi Bakde", "Member", 5),
  createTeamMember("Himanshu Kukde", "Member", 6),
  createTeamMember("Janhvi Parshivnikar", "Member", 7),
  createTeamMember("Laxmikant Sanjay Dhawade", "Member", 8),
  createTeamMember("Lokesh Dhurve", "Member", 9),
  createTeamMember("Malay Lokhande", "Member", 10),
  createTeamMember("Om Bhate", "Member", 11),
  createTeamMember("Om Rajulwar", "Member", 12),
  createTeamMember("Piyush Piprewar", "Member", 13),
  createTeamMember("Pragati Wange", "Member", 14),
  createTeamMember("Prathmesh Somkuwar", "Member", 15),
  createTeamMember("Pratik Borkar", "Member", 16),
  createTeamMember("Rewant Chaudhari", "Member", 17),
  createTeamMember("Romi Pun", "Member", 18),
  createTeamMember("Sakshi Gedam", "Member", 19),
  createTeamMember("Sejula Chopde", "Member", 20),
  createTeamMember("Shivam Saraf", "Member", 21),
  createTeamMember("Surbhi Ninave", "Member", 22),
  createTeamMember("Swastika Tinkhede", "Member", 23),
  createTeamMember("Ujjwal Bokde", "Member", 24),
  createTeamMember("Vaideesh Deshmukh", "Member", 25),
  createTeamMember("Vanshvardhan Sorte", "Member", 26),
  createTeamMember("Virendra Lokhande", "Member", 27),
];

const Devlopers: TeamMember[] = [
  createTeamMember("Priyanshu Kayarkar", "Co-ordinator", 1),
  createTeamMember("Chirayu Patle", "Co-ordinator", 2),
  createTeamMember("Muchkundraje Thote", "Co-ordinator", 3),
  createTeamMember("Samyak Umathe", "Co-ordinator", 4),
];
export {
  coreCommittee,
  departmentalCoordinators,
  teamMembers,
  Devlopers,
  SecondYear,
  ThirdYear,
  type TeamMember,
  type DepartmentCoordinator,
};
