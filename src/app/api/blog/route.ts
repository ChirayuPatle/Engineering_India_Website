import { NextResponse } from "next/server";
export async function GET() {
  const blogContainer = [
    {
      img: "./image/Veer vandana.jpg",
      fulltext: `     <b> On 18th January 2025, Vinayakrao Deshmukh High School & Science Junior College, Nagpur </b> witnessed an unforgettable event <b> Veer Vandan!</b> Organized by <b> IMCTF, Nagpur</b> this patriotic event aimed to ignite the spirit of nationalism among the youth.     <br>      ✨ The highlight of the event was the presence of Param Veer Chakra Awardee, Grenadier Yogendra Singh Yadav. His inspiring journey left over <b>4,000 students from 30+ schools </b> in awe, instilling deep respect for our brave soldiers.      <br>      🚀<b> From 9:30 AM to 12:00 PM </b>, students reflected on the sacrifices that won us independence and the courage that keeps our nation strong. The event, passionately organized by Engineering India, wasn’t just a gathering—it was a powerful reminder of India's rich history of valor and sacrifice.            🇮🇳 Veer Vandan was more than an event—it was an emotion! A day filled with pride, patriotism, and learning that left an indelible mark on every participant’s heart.`,
      header: "VEER VANDANA",
    },
    {
      img: "./image/RASHTRABHIMAN.png",
      fulltext: ` On <b>26th January 2025</b>, we celebrated the Republic Day of India to commemorate the sacrifices of freedom fighters, soldiers, and many others, because of whom we attained independence and became a Republic. <br><br>📍 <b>Location:</b> Traffic Park, Dharampeth, Nagpur <br>🎓 <b>Organized by:</b> 7 prestigious colleges: <br>- Yeshwantrao Chavan College of Engineering (YCCE) <br>- Shri Ramdeobaba University <br>- G H Raisoni College of Engineering <br>- Priyadarshini College of Engineering <br>- Cummins College of Engineering for Women <br>- KDK College of Engineering <br><br><b>🌟 Rashtrabhiman Event Highlights:</b><br>✅ <b>150+ volunteers</b> from these colleges joined hands to make this event a grand success. <br>✅ The Chief Guests were welcomed with a <b>memento & sapling</b> as a token of appreciation. 🌱<br>✅ A mesmerizing dance performance on <b>'Ae Watan'</b> by a student of St. Vincent Pallotti College of Engineering and Technology. 💃<br>✅ A <b>tear-jerking skit</b> by students of Shri Ramdeobaba University, portraying the sacrifices of our brave soldiers. 🎭❤️<br>✅ The performance left everyone in awe and was the most applauded moment of the event. 👏🔥<br><br>      <b>🇮🇳 Jai Hind! 🇮🇳</b><br><br>`,
      header: "RASHTRABHIMAN",
    },
  ];
  return NextResponse.json(blogContainer);
}
