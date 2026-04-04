// Centralized team member database to ensure consistency across all arrays
// This prevents data duplication and ensures same person has same data everywhere

export interface TeamMemberData {
  name: string;
  image: string;
  linkedin: string;
  Email: string;
  bio?: string;
  github?: string;
  resume?: string;
  department?: string;
}

export const TEAM_MEMBER_DATABASE: Record<string, TeamMemberData> = {
  // Core Committee Members
  "Samyak Umathe": {
    name: "Samyak Umathe",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3Yxs8hweLapZLNdSFOi1eyCwz342kPKltEIQr0",
    linkedin: "https://www.linkedin.com/in/samyak-umathe-9b8a6a295/",
    Email: "samyakumathe@gmail.com",
    bio: "I am proud to serve as the College President and College Coordinator of Engineering India. I am passionate about technology and innovation, and I am dedicated to driving the club's growth and fostering a culture of excellence.",
  },
  "V. S. Pavithra": {
    name: "V. S. Pavithra",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "https://www.linkedin.com/in/pavitthra-v-s-32478b322/",
    Email: "",
  },
  "Chirayu Patle": {
    name: "Chirayu Patle",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YKmvvV1TRBNfpGxchseSwoU2buA0HQ3jCVYOP",
    linkedin: "https://www.linkedin.com/in/chirayupatle/",
    Email: "chirayupatle2@gmail.com",
    bio: "Passionate about technology and innovation, I'm dedicated to driving the club's growth and fostering a culture of creativity and collaboration. As Secretary & Database Head, I focus on streamlining operations and building strong connections within our community.",
  },
  "Shailaija Patle": {
    name: "Shailaija Patle",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YXpW7RnMNk4ohSiMGKTxj9CpfcPyez0JaB87r",
    linkedin: "https://www.linkedin.com/in/shailaja-patle-967971289?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    Email: "shailajapatle17@gmail.com",
    bio: "Grateful (and super excited!) to serve as the Event Management Head at the Engineering India Club. From brainstorming fun ideas to turning them into successful events, I love being part of every step — planning, organizing, and making sure everything runs smoothly. I enjoy bringing people together, creating memorable experiences, and adding a little extra energy to every event. For me, it's all about teamwork, good vibes, and making each club activity better than the last!",
  },
  "Mansi Jalandhar": {
    name: "Mansi Jalandhar",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YBUmcB9dX07nFuGgApY3LIbBDVxsaiEWvk4qN",
    linkedin: "",
    Email: "",
  },
  "Priyanshu Kayarkar": {
    name: "Priyanshu Kayarkar",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YwowtJzUiYMgLRNj147yBaeFsUHhvAoqJcbdW",
    linkedin: "https://linkedin.com/in/priyanshukayarkar",
    Email: "priyanshudotdev@gmail.com",
    bio: "Person who love's to build stuff.",
  },
  "Harsh Kapte": {
    name: "Harsh Kapte",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YRH9jwebsECkVBO3tDbHI2PpL7mWqcvT1N6KG",
    linkedin: "",
    Email: "",
  },
  "Siddheshwar Madne": {
    name: "Siddheshwar Madne",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YSXDGuPZyCJH4Ua8uPBSgrmMOknAQEtLKY7cN",
    linkedin: "https://www.linkedin.com/in/sidhashwar-madne/",
    Email: "",
  },
  "Ishika Lanjewar": {
    name: "Ishika Lanjewar",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YvJsTwjcOBfKwjtA7i6CNnraLcWTPvEsD0JMH",
    linkedin: "https://www.linkedin.com/in/ishika-lanjewar-59465b359",
    Email: "lanjewarishika@gmail.com",
    github: "https://github.com/account",
    bio: "My name is Ishika Lanjewar from 6th sem IT, YCCE. I am a student with a strong interest in software development and AI-based systems. I have hands-on experience working with Spring Boot, SQL databases, and frontend technologies like HTML and CSS. I enjoy building real-world projects such as authentication systems and AI-powered chatbots and I am continuously learning to enhance my technical and problem-solving skills.",
  },
  "Aarya Kothe": {
    name: "Aarya Kothe",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3Yg1eRy3FTq1JW2LQ8ZiVj3bh0NczFX7KGso9w",
    linkedin: "https://www.linkedin.com/in/aarya-kothe-3887b62b5/",
    Email: "aarryakothe2@gmail.com",
  },
  "Om Ingle": {
    name: "Om Ingle",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YPxqMonHWc4F8GNPCblUYokEgpSthiByjT26d",
    linkedin: "https://www.linkedin.com/in/om-ingle-55811028b/",
    Email: "omingle71@gmail.com",
    github: "https://github.com/Om-ingle",
    bio: "Love Exploring",
  },
  "Payal Dongre": {
    name: "Payal Dongre",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YLr8sqgKNvlAtR9SFIuEYU4OWr7TZ8eML5igB",
    linkedin: "https://www.linkedin.com/in/payal-dongare?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    Email: "payaldongare94@gmail.com",
    github: "",
    bio: "I am currently pursuing my third year in Computer Technology and serve as Literature Head of Engineering India Club. I combine my technical knowledge with creativity to manage content writing, event documentation, and literary coordination within the club.",
  },
  "Sakshi Kadu": {
    name: "Sakshi Kadu",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3Y3sECXJ5UxkNCoJRpD2yuWGnilqgjMTBm7EeX",
    linkedin: "https://www.linkedin.com/in/sakshi-kadu-40a441322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    Email: "kadusakshi945@gmail.com",
    github: "",
    bio: "I'm Full Stack Developer.",
  },
  "Sayali Padmane": {
    name: "Sayali Padmane",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YMiRZSyJCRHOYLQvmMWn8KB1A73Jd9PwU20tp",
    linkedin: "",
    Email: "",
  },

  // Departmental Coordinators
  "Aliya Sayyed": {
    name: "Aliya Sayyed",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
    department: "CSE",
  },
  "Parth Dehare": {
    name: "Parth Dehare",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YKeb4qw4TRBNfpGxchseSwoU2buA0HQ3jCVYO",
    linkedin: "https://www.linkedin.com/in/parth-dehare-b91a53293/",
    Email: "parthdehare97@gmail.com",
    github: "https://github.com/ParthDehare",
    bio: "CSE (AI & ML) student passionate about AI, software development, and building real-world tech solutions through projects.",
    department: "CSE AIML",
  },
  "Muchkundraje Thote": {
    name: "Muchkundraje Thote",
    image: "https://res.cloudinary.com/priyanshukayarkar/image/upload/v1753201045/much-org-1_xp2amh.jpg",
    linkedin: "https://www.linkedin.com/in/muchkund-thote/",
    Email: "muchkundthote@gmail.com",
    department: "AIDS",
  },
  "Piyush Meshram": {
    name: "Piyush Meshram",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
    department: "IT / CSD",
  },
  "Saakshi Krishnani": {
    name: "Saakshi Krishnani",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
    department: "C-Tech",
  },
  "Rudresh Bokade": {
    name: "Rudresh Bokade",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
    department: "Mechanical",
  },
  "Sakshi Vairagade": {
    name: "Sakshi Vairagade",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
    department: "ETC / VLSI / IOT / EE",
  },
  "Khushi Chaudhari": {
    name: "Khushi Chaudhari",
    image: "https://xxdyayurwn.ufs.sh/f/U6UD7bkQZy3YOJ0VXOectmvHhMGYNVSTXoy324adFLuEADnr",
    linkedin: "https://www.linkedin.com/in/khushichaudhari",
    Email: "khushichaudhari1805@gmail.com",
    bio: "Electrical Engineering student passionate about Cybersecurity, Power Systems, and Blockchain.",
    department: "Electrical",
  },

  // Additional members with default data
  "Gauri Ganeshrao Lokhande": {
    name: "Gauri Ganeshrao Lokhande",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Manasvi Totewar": {
    name: "Manasvi Totewar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Mayur Rasik Buddhe": {
    name: "Mayur Rasik Buddhe",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Milind Anil Late": {
    name: "Milind Anil Late",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Sandesh Pakhidde": {
    name: "Sandesh Pakhidde",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Shraddha Dinesh Shingnapure": {
    name: "Shraddha Dinesh Shingnapure",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Shravani Prashant Aney": {
    name: "Shravani Prashant Aney",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Aditya Rajendra Thakare": {
    name: "Aditya Rajendra Thakare",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Dnyanata Wakode": {
    name: "Dnyanata Wakode",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Rutuja Nareshrao Gondane": {
    name: "Rutuja Nareshrao Gondane",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Bhagyashri Vaidya": {
    name: "Bhagyashri Vaidya",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Sanskruti Sanjay Moundekar": {
    name: "Sanskruti Sanjay Moundekar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Sujal Sawalkar": {
    name: "Sujal Sawalkar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Akanksha Sawant": {
    name: "Akanksha Sawant",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Himanshu Chaudhari": {
    name: "Himanshu Chaudhari",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Lavanya Ukey": {
    name: "Lavanya Ukey",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Soukhya Sasankar": {
    name: "Soukhya Sasankar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Aman Kolhe": {
    name: "Aman Kolhe",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Prathamesh Mandhane": {
    name: "Prathamesh Mandhane",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Vidhi Lonarkar": {
    name: "Vidhi Lonarkar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Parth Dhurve": {
    name: "Parth Dhurve",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Vedang Kulkarni": {
    name: "Vedang Kulkarni",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Sia Khurana": {
    name: "Sia Khurana",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Khushi Chaudhary": {
    name: "Khushi Chaudhary",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Anandi Thakre": {
    name: "Anandi Thakre",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Divya Dhule": {
    name: "Divya Dhule",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Muskan Dhengre": {
    name: "Muskan Dhengre",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },

  // Third Year members
  "Aastha Chilbilwar": {
    name: "Aastha Chilbilwar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Aditya Dharpure": {
    name: "Aditya Dharpure",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Atharva Pophali": {
    name: "Atharva Pophali",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Dnyaneshwar Itankar": {
    name: "Dnyaneshwar Itankar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Himanshi Bakde": {
    name: "Himanshi Bakde",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Himanshu Kukde": {
    name: "Himanshu Kukde",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Janhvi Parshivnikar": {
    name: "Janhvi Parshivnikar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Laxmikant Sanjay Dhawade": {
    name: "Laxmikant Sanjay Dhawade",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Lokesh Dhurve": {
    name: "Lokesh Dhurve",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Malay Lokhande": {
    name: "Malay Lokhande",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Om Bhate": {
    name: "Om Bhate",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Om Rajulwar": {
    name: "Om Rajulwar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Piyush Piprewar": {
    name: "Piyush Piprewar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Pragati Wange": {
    name: "Pragati Wange",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Prathmesh Somkuwar": {
    name: "Prathmesh Somkuwar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Pratik Borkar": {
    name: "Pratik Borkar",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Rewant Chaudhari": {
    name: "Rewant Chaudhari",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Romi Pun": {
    name: "Romi Pun",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Sakshi Gedam": {
    name: "Sakshi Gedam",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Sejula Chopde": {
    name: "Sejula Chopde",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Shivam Saraf": {
    name: "Shivam Saraf",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Surbhi Ninave": {
    name: "Surbhi Ninave",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Swastika Tinkhede": {
    name: "Swastika Tinkhede",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Ujjwal Bokde": {
    name: "Ujjwal Bokde",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Vaideesh Deshmukh": {
    name: "Vaideesh Deshmukh",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Vanshvardhan Sorte": {
    name: "Vanshvardhan Sorte",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
  "Virendra Lokhande": {
    name: "Virendra Lokhande",
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  },
};

// Helper function to get team member data
export function getTeamMemberData(name: string): TeamMemberData {
  return TEAM_MEMBER_DATABASE[name] || {
    name,
    image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
    linkedin: "",
    Email: "",
  };
}
