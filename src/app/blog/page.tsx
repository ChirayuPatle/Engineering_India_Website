import BlogCard from "@/components/blogs/page";
import { Heart, MessageCircle, Share } from "lucide-react";

function blog() {
  // Blog Data
  const blogContainer = [
    {
      img: "./image/Veer vandana.jpg",
      fulltext: `
     <b> On 18th January 2025, Vinayakrao Deshmukh High School & Science Junior College, Nagpur </b> witnessed an unforgettable event <b> Veer Vandan!</b> Organized by <b> IMCTF, Nagpur</b> this patriotic event aimed to ignite the spirit of nationalism among the youth.
     <br>
      ✨ The highlight of the event was the presence of Param Veer Chakra Awardee, Grenadier Yogendra Singh Yadav. His inspiring journey left over <b>4,000 students from 30+ schools </b> in awe, instilling deep respect for our brave soldiers.
      <br>
      🚀<b> From 9:30 AM to 12:00 PM </b>, students reflected on the sacrifices that won us independence and the courage that keeps our nation strong. The event, passionately organized by Engineering India, wasn’t just a gathering—it was a powerful reminder of India's rich history of valor and sacrifice.
      
      🇮🇳 Veer Vandan was more than an event—it was an emotion! A day filled with pride, patriotism, and learning that left an indelible mark on every participant’s heart.`,
      header: "VEER VANDANA",
    },
    {
      img: "./image/RASHTRABHIMAN.png",
      fulltext: `
 On <b>26th January 2025</b>, we celebrated the Republic Day of India to commemorate the sacrifices of freedom fighters, soldiers, and many others, because of whom we attained independence and became a Republic. <br><br>

📍 <b>Location:</b> Traffic Park, Dharampeth, Nagpur <br>
🎓 <b>Organized by:</b> 7 prestigious colleges: <br>
- Yeshwantrao Chavan College of Engineering (YCCE) <br>
- Shri Ramdeobaba University <br>
- G H Raisoni College of Engineering <br>
- Priyadarshini College of Engineering <br>
- Cummins College of Engineering for Women <br>
- KDK College of Engineering <br><br>

<b>🌟 Rashtrabhiman Event Highlights:</b><br>
✅ <b>150+ volunteers</b> from these colleges joined hands to make this event a grand success. <br>
✅ The Chief Guests were welcomed with a <b>memento & sapling</b> as a token of appreciation. 🌱<br>
✅ A mesmerizing dance performance on <b>'Ae Watan'</b> by a student of St. Vincent Pallotti College of Engineering and Technology. 💃<br>
✅ A <b>tear-jerking skit</b> by students of Shri Ramdeobaba University, portraying the sacrifices of our brave soldiers. 🎭❤️<br>
✅ The performance left everyone in awe and was the most applauded moment of the event. 👏🔥<br><br>

      <b>🇮🇳 Jai Hind! 🇮🇳</b><br><br>`,
      header: "RASHTRABHIMAN",
    },
  ];

  return (
    <>
      <div
        id="main"
        className="flex min-h-screen w-full items-start justify-center gap-3 bg-gray-100 py-14"
      >
        <div className="min-h-30 sticky top-20 hidden w-[250px] gap-7 rounded-xl bg-slate-200 py-10 pt-[3rem] shadow-md lg:block">
          <div className="m-wun flex w-full items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300">
              MT
            </div>
            <h1>Muchkund Thote</h1>
          </div>
        </div>
        <div className="min-h-screen w-[600px] rounded-xl border-2 bg-slate-200 p-2 shadow-md md:w-[700px] md:p-10">
          <h1 className="md;ml-0 ml-2 text-3xl font-bold"> Blogs</h1>
          {blogContainer.map((blog, index: number) => (
            <BlogCard
              key={index}
              text={blog.fulltext || ""}
              imgurl={blog.img || ""}
              header={blog.header || ""}
            />
          ))}
        </div>

        <div className="sticky top-20 ml-2 hidden h-[330px] w-[370px] overflow-hidden rounded-xl bg-slate-200 lg:block">
          <div className="w-full p-3">
            <h1 className="text-xl">
              <b> What is Engineering India Blogs ?</b>
            </h1>
            <p>
              Engineering India Blogs keeps the engineering community updated on
              events, guides, and current affairs, fostering innovation and
              technical excellence.
            </p>
          </div>
          <img src="/image/logo.png" alt="" />
          <hr />
          <div className="mt-2 flex w-full items-center justify-around">
            <Heart />
            <MessageCircle />
            <Share />
          </div>
        </div>
      </div>
    </>
  );
}

export default blog;
