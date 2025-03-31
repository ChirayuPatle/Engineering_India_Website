type TeamMember = {
  name: string;
  position: string;
  teamId: number;
  image: string;
  linkedin: string;
  Email: string;
};

const teamMembers: TeamMember[] = [
  {
    teamId: 1,
    name: "Laxmikant Dhawade",
    position: "College Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/LaxmikantDhawande.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9MYXhtaWthbnREaGF3YW5kZS5qcGciLCJpYXQiOjE3NDM0MzM3MDEsImV4cCI6MjA1ODc5MzcwMX0.WnU4mIIkhJZWXSHEWP-NsNAitfE-cVERObIuyRJN6js",
    Email: "",
    linkedin: "https://www.linkedin.com/in/laxmikant-dhawade/",
  },
  {
    teamId: 2,
    name: "Swastika Tinkhede",
    position: "Club Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/SwastikaTinkhede.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9Td2FzdGlrYVRpbmtoZWRlLmpwZyIsImlhdCI6MTc0MzI3MzM4NSwiZXhwIjoyMDU4NjMzMzg1fQ.1H87ZxOvBIqRXuy6W7oC7E79C5yqYiDt1SJYntxja5g",
    Email: "swastikatinkhede@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/swastika-tinkhede-544141263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    teamId: 3,
    name: "Virendra Lokhande",
    position: "Secretary",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/VirendraLokhande.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9WaXJlbmRyYUxva2hhbmRlLkpQRyIsImlhdCI6MTc0MzI3MzA3OSwiZXhwIjoyMDU4NjMzMDc5fQ.QJYAXihJf2FLe2ynsezIovAZj6seE5iekj31W-m6XoU",
    Email: "virendralokhande007@gmail.com",
    linkedin: "http://www.linkedin.com/in/virendralokhande",
  },
  {
    teamId: 4,
    name: "Piyush Piprewar",
    position: "Database Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/PiyushPiprewar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9QaXl1c2hQaXByZXdhci5wbmciLCJpYXQiOjE3NDMzNTI3NzMsImV4cCI6MjA1ODcxMjc3M30.336VFziEQj0nYlihIEiLyE9LJLKsRnHEMnrBiyAh7us",
    Email: "piyushnpiprewar07@gmail.com",
    linkedin: "https://www.linkedin.com/in/piyush-piprewar/",
  },
  {
    teamId: 5,
    name: "Jahanvi Parshivninkar",
    position: "Secretary - Event Management",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/JanhviParshivanikar.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9KYW5odmlQYXJzaGl2YW5pa2FyLmpwZyIsImlhdCI6MTc0MzI3MjgzOCwiZXhwIjoyMDU4NjMyODM4fQ.YGiIealMC5HTPijm-URU2-tBXiYgpY5LffzMVRvCEk8",
    Email: "parshivanikarjanhvi@gmail.com",
    linkedin: "https://www.linkedin.com/in/janhvi-parshivanikar-974596264/",
  },
  {
    teamId: 6,
    name: "Ujwal Bokde",
    position: "Secretary - Technical Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/UjjwalBokde.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9Vamp3YWxCb2tkZS5qcGciLCJpYXQiOjE3NDMyNzE5ODUsImV4cCI6MjA1ODYzMTk4NX0.HjoALjVAeVOFi7vyt0wIlsosS1rV3Sxnzct2-fzuz-s",
    Email: "ujjwalbokde370@gmail.com",
    linkedin: "https://www.linkedin.com/in/ujjwal370",
  },
  {
    teamId: 7,
    name: "Himanshu Kukde",
    position: "Secretary - Publicity Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Himanshukukde.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9IaW1hbnNodWt1a2RlLmpwZyIsImlhdCI6MTc0MzI3MTg1NSwiZXhwIjoyMDU4NjMxODU1fQ.y_Z4hnc5hRV-oXmSEA9Q64lHPDLV4Hmiy4ryFMFwlCU",
    Email: "kukdehimanshu2@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/himanshu-kukde-916179280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    teamId: 8,
    name: "Surbhi Ninawe",
    position: "Secretary - Other Colleges Co-ordination",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/SurbhiNinawe.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9TdXJiaGlOaW5hd2UuanBlZyIsImlhdCI6MTc0MzM1NTg5MSwiZXhwIjoyMDU4NzE1ODkxfQ.N4TGaxcTIS94zsHwO3Qf_2uNTi_2p--75NKsvcA5JSY",
    Email: " surbhininave7@gmail.com",
    linkedin: "https://www.linkedin.com/in/surbhi-ninave/",
  },
  {
    teamId: 9,
    name: "Sejula Chopde",
    position: "Joint Secretary",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Sejula.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9TZWp1bGEuSlBHIiwiaWF0IjoxNzQzMzUyNjgwLCJleHAiOjIwNTg3MTI2ODB9.LuTfPU9KNvBpgK5C0rfmzegYVGxtsrNqTt7gGBpzmfM",
    Email: "",
    linkedin: "https://www.linkedin.com/in/sejula-chopde/",
  },
  {
    teamId: 10,
    name: "Shivam Saraf",
    position: "Social Media and Photography Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Shivam.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9TaGl2YW0uanBlZyIsImlhdCI6MTc0MzM1MjY1MCwiZXhwIjoyMDU4NzEyNjUwfQ.XNrx33-h0u9LbvTE6C7EpcaDo_a1bwjTC3M7BfgJfQA",
    Email: "",
    linkedin: "https://www.linkedin.com/in/shivam-saraf-342707288/",
  },
  {
    teamId: 11,
    name: "Astha Chilbilwar",
    position: "Design Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/AasthaChilbilwar.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9BYXN0aGFDaGlsYmlsd2FyLmpwZyIsImlhdCI6MTc0MzI3MjA1NywiZXhwIjoyMDU4NjMyMDU3fQ.5VlT_mzRMqmwcYilO7gsnvzN5Lb8MQbsH_peZeCaK_4",
    Email: "aastha.04ac@gmail.com",
    linkedin: "https://www.linkedin.com/in/aastha-chilbilwar",
  },
  {
    teamId: 12,
    name: "Malay Lokhande",
    position: "Design Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Malay.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9NYWxheS5qcGVnIiwiaWF0IjoxNzQzMjczNTA1LCJleHAiOjIwNTg2MzM1MDV9.2nV3X2YDCdZ3Y8FoAUTcN6efaj-KDJ8lgjvEG6m40vI",
    Email: "",
    linkedin: "https://www.linkedin.com/in/malay-lokhande/",
  },
  {
    teamId: 13,
    name: "Vanshvardhan Sorte",
    position: "Public Relation and Event Management Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Vanshwardhan.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9WYW5zaHdhcmRoYW4uSlBHIiwiaWF0IjoxNzQzMjczNDUyLCJleHAiOjIwNTg2MzM0NTJ9.yIiTnbXwx0M-SnqVBMqqoXwB-kpb05SQxjmUlUsbIGQ",

    Email: "",
    linkedin: "https://www.linkedin.com/in/vanshvardhan-sorte-550717280/",
  },
  {
    teamId: 14,
    name: "Pragati Wange",
    position: "Literature Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/PRAGATIWANGE.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9QUkFHQVRJV0FOR0UuanBnIiwiaWF0IjoxNzQzMjcyNDcyLCJleHAiOjE3NjkxOTI0NzJ9.l3dyn8tktHgKBX16Uowk5YAMdxjvHYSWtKX7EzXNN4o",
    Email: "wangepragati21@gmail.com",
    linkedin: "https://www.linkedin.com/in/pragati-wange-she-her-7931b1347",
  },
  {
    teamId: 15,
    name: "Sakshi Gedam",
    position: "Literature Head",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/SakshiGedam.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9TYWtzaGlHZWRhbS5qcGciLCJpYXQiOjE3NDMyNzIzNTQsImV4cCI6MjA1ODYzMjM1NH0.C37MOVsKKxwvjnYHqLjM-kxAwvGMX3brKlVJtsGsM6Q",
    Email: "sakshigedam80@gmail.com ",
    linkedin:
      "https://www.linkedin.com/in/sakshi-gedam-b10568281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    teamId: 16,
    name: "Romi Pun",
    position: "IT Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/RomiPun.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9Sb21pUHVuLmpwZyIsImlhdCI6MTc0MzI3MjUyOSwiZXhwIjoyMDU4NjMyNTI5fQ.n2z1TE-pabt_HGgZZBm0FMRPVZfM7_y9qfntdbvPldY",
    Email: "romipun81@gmail.com",
    linkedin: "https://www.linkedin.com/in/romipun/",
  },
  {
    teamId: 17,
    name: "Vaideesh Deshmukh",
    position: "CSE Departmental Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Vaidesh.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9WYWlkZXNoLnBuZyIsImlhdCI6MTc0MzM1MjczMywiZXhwIjoyMDU4NzEyNzMzfQ.b8JN5whXjGblnSm9uIxol9kwUYTI7AYGvD5rK-nmpQM",
    Email: "",
    linkedin: "https://www.linkedin.com/in/vaideesh-deshmukh/",
  },
  {
    teamId: 18,
    name: "Pratik Borkar",
    position: "Mechanical Department Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/PratikBorkar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9QcmF0aWtCb3JrYXIucG5nIiwiaWF0IjoxNzQzMzUyNzAxLCJleHAiOjIwNTg3MTI3MDF9.z66MiqiTPUoLUnUNurLOb5XoSTdv7qaE4UhqrFQEGyI",
    Email: "pratikborkar1507@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/pratik-borkar-83a203280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    teamId: 19,
    name: "Rewant Chaudhari",
    position: "ETC Departmental Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Rewant.Chaudhari.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9SZXdhbnQuQ2hhdWRoYXJpLmpwZyIsImlhdCI6MTc0MzI3MTc2NSwiZXhwIjoyMDU4NjMxNzY1fQ.cKxoLkCCIyngrvBE_qSI50Wt-Z-Mmpnanbwd_90TPkc",
    Email: "rewantc95@gmail.com",
    linkedin: "https://www.linkedin.com/in/rewant-chaudhari-031a27260",
  },
  {
    teamId: 20,
    name: "Atharva Pophali",
    position: "C-Tech Departmental Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/AtharvaPophali.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9BdGhhcnZhUG9waGFsaS5wbmciLCJpYXQiOjE3NDMyNzIyNDIsImV4cCI6MjA1ODYzMjI0Mn0.qZeK6tL63mOD8qXQ5-ETk-6o7NP0kehBBMQ7aOHtTkY",
    Email: "atharvapophali3@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/atharva-pophali-a90061257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

// const SecondYear = [
//   {
//     teamId: 1,
//     name: "Aliya Sayyed",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 2,
//     name: "Gauri Ganeshrao Lokhande",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 3,
//     name: "Harsh Kapte",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 4,
//     name: "Manasvi Totewar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 5,
//     name: "Mayur Rasik Buddhe",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 6,
//     name: "Milind Anil Late",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 7,
//     name: "Saakshi Krishnani",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 8,
//     name: "Sakshi Vairagade",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 9,
//     name: "Sandesh Pakhidde",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 10,
//     name: "Shraddha Dinesh Shingnapure",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 11,
//     name: "Shravani Prashant Aney",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 12,
//     name: "Aditya Rajendra Thakare",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 13,
//     name: "Aarya Kothe",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 14,
//     name: "Charvi Kadbe",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 15,
//     name: "Dnyanata Wakode",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 16,
//     name: "Ishika Lanjewar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 17,
//     name: "Mansi Jalandhar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 18,
//     name: "Muchkundraje Thote",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 19,
//     name: "Rutuja Nareshrao Gondane",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 20,
//     name: "Bhagyashri Vaidya",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 21,
//     name: "Sanskruti Sanjay Moundekar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 22,
//     name: "Sujal Sawalkar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 23,
//     name: "Akanksha Sawant",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 24,
//     name: "Parth Dehare",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 25,
//     name: "Rudresh Bokade",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 26,
//     name: "Himanshu Chaudhari",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 27,
//     name: "Lavanya Ukey",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 28,
//     name: "Samyak Umathe",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 29,
//     name: "Soukhya Sasankar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 30,
//     name: "Aman Kolhe",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 31,
//     name: "Prathamesh Mandhane",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 32,
//     name: "Vidhi Lonarkar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 33,
//     name: "Parth Dhurve",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 34,
//     name: "Vedang Kulkarni",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 35,
//     name: "Sia Khurana",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 36,
//     name: "Shailaja Patle",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 37,
//     name: "Sayali Padmane",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 38,
//     name: "Khushi Chaudhary",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 39,
//     name: "Anandi Thakre",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 40,
//     name: "Divya Dhule",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 41,
//     name: "Payal Dongre",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 42,
//     name: "Muskan Dhengre",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
// ];

// const ThridYear: TeamMember[] = [
//   {
//     teamId: 1,
//     name: "Aastha Chilbilwar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 2,
//     name: "Aditya Dharpure",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 3,
//     name: "Atharva Pophali",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 4,
//     name: "Dnyaneshwar Itankar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 5,
//     name: "Himanshi Bakde",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 6,
//     name: "Himanshu Kukde",
//     position: "Member",
//     image:
//       "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Himanshukukde.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9IaW1hbnNodWt1a2RlLmpwZyIsImlhdCI6MTc0MzI3MTg1NSwiZXhwIjoyMDU4NjMxODU1fQ.y_Z4hnc5hRV-oXmSEA9Q64lHPDLV4Hmiy4ryFMFwlCU",
//   },
//   {
//     teamId: 7,
//     name: "Janhvi Parshivnikar",
//     position: "Member",
//     image:
//       "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/janhviParshivanikar.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9qYW5odmlQYXJzaGl2YW5pa2FyLmpwZyIsImlhdCI6MTc0MzI3MTkzMCwiZXhwIjoyMDU4NjMxOTMwfQ.OAWC_x3SUUWuYIyJgbPVbuoGMIpVj-F0M4NBzuQ1Wco",
//   },
//   {
//     teamId: 8,
//     name: "Laxmikant Sanjay Dhawade",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 9,
//     name: "Lokesh Dhurve",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 10,
//     name: "Malay Lokhande",
//     position: "Member",
//     image:
//       "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Leads-Images/Malay.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0xlYWRzLUltYWdlcy9NYWxheS5qcGVnIiwiaWF0IjoxNzQzMjczNTA1LCJleHAiOjIwNTg2MzM1MDV9.2nV3X2YDCdZ3Y8FoAUTcN6efaj-KDJ8lgjvEG6m40vI",
//   },
//   {
//     teamId: 11,
//     name: "Om Bhate",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 12,
//     name: "Om Rajulwar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 13,
//     name: "Piyush Piprewar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 14,
//     name: "Pragati Wange",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 15,
//     name: "Prathmesh Somkuwar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 16,
//     name: "Pratik Borkar",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 17,
//     name: "Rewant Chaudhari",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 18,
//     name: "Romi Pun",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 19,
//     name: "Sakshi Gedam",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 20,
//     name: "Sejula Chopde",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 21,
//     name: "Shivam Saraf",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 22,
//     name: "Surbhi Ninave",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 23,
//     name: "Swastika Tinkhede",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 24,
//     name: "Ujjwal Bokde",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 25,
//     name: "Vaideesh Deshmukh",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 26,
//     name: "Vanshvardhan Sorte",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
//   {
//     teamId: 27,
//     name: "Virendra Lokhande",
//     position: "Member",
//     image: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
//   },
// ];

const Devlopers: TeamMember[] = [
  {
    teamId: 1,
    name: "Priyanshu Kayarkar",
    position: "Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Devs-Images/PriyanshuKayarkar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0RldnMtSW1hZ2VzL1ByaXlhbnNodUtheWFya2FyLnBuZyIsImlhdCI6MTc0MzM1NDU5MSwiZXhwIjoyMDU4NzE0NTkxfQ.688wSsq0XWzsmmPd_dRPFKam8zq_BtmqgRKP2J3FqJc",
    linkedin: "https://www.linkedin.com/in/priyanshu-li/",
    Email: "priyanshu.kayarkar009@gmail.com",
  },
  {
    teamId: 2,
    name: "Chirayu Patel",
    position: "Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Devs-Images/ChirayuPatle.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0RldnMtSW1hZ2VzL0NoaXJheXVQYXRsZS5qcGVnIiwiaWF0IjoxNzQzMzU0NjEwLCJleHAiOjIwNTg3MTQ2MTB9.RLwY6x6oo76SEhVg7Ixka9I64JkR4gkBwgX9QmDjWzo",
    linkedin: "https://www.linkedin.com/in/chirayu-patle-a78502290/",
    Email: "chirayupatle2@gmail.com",
  },
  {
    teamId: 3,
    name: "Muchkundraje Thote",
    position: "Co-ordinator",
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743320282/12-crop_m1lwb0.jpg",
    linkedin: "https://www.linkedin.com/in/muchkund-thote/",
    Email: "muchkundthote@gmail.com",
  },
  {
    teamId: 4,
    name: "Samyak Umathe",
    position: "Co-ordinator",
    image:
      "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Devs-Images/SamyakUmathe.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0RldnMtSW1hZ2VzL1NhbXlha1VtYXRoZS5qcGVnIiwiaWF0IjoxNzQzMzU0NzA1LCJleHAiOjIwNTg3MTQ3MDV9.Rj5V06cg9dJjrJbpCRemMs5gnmarh4HHYm2vwBT9F-Y",
    linkedin: "https://www.linkedin.com/in/samyak-umathe-9b8a6a295/",
    Email: "samyakumathe@gmail.com",
  },
];
export { teamMembers, Devlopers };
