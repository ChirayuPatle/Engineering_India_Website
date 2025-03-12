import BlogCard from "@/components/blogs/page";
import { Heart, MessageCircle, Share } from "lucide-react";

function blog() {
  const img = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSut9HYsccLxpMYIn7lt6dOrYiVpB_9R3MjEg&s",
    "https://thumbs.dreamstime.com/b/special-day-modern-calligraphy-quote-decorative-elements-white-ink-vector-illustration-170638472.jpg",
    "https://marketplace.canva.com/EAFap1V35Zg/1/0/1600w/canva-blue-illustrative-simple-8-march-international-womens-day-instagram-post-9Aa_0jK1Nd8.jpg",
  ];
  const fulltext = [
    "We are thrilled to announce an exciting placement opportunity at YCCE! This is your chance to join a dynamic and innovative team, where you can grow your skills and build a successful career. The placement drive will be held on [Insert Date] at [Insert Time] in [Insert Location]. Don’t miss this opportunity to showcase your talents and take the next step toward a bright future. Make sure to prepare thoroughly and bring all necessary documents. We look forward to seeing you there!",
    `Today is a special day! 🎉 We are thrilled to announce that YCCE has achieved a remarkable milestone in campus placements this year. With record-breaking job offers from top multinational companies, students have secured roles in AI, Data Science, and Software Development. 

In addition to placements, the college has introduced new training programs to upskill students in cutting-edge technologies. Dont miss out on our upcoming career counseling session to boost your job prospects.

Stay tuned for more updates and success stories! 🚀`,
    "Happy wommen days",
  ];

  const header = ["Placement at YCCE 🚨", "Special day", " Happy Women day"];

  return (
    <>
      <div
        id="main"
        className="flex min-h-screen w-full items-start justify-center gap-3 bg-gray-100 py-14"
      >
        <div className="min-h-30 sticky top-20 hidden w-[250px] gap-7 rounded-xl bg-slate-200 py-10 shadow-md lg:block">
          <div className="m-wun flex w-full items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300">
              MT
            </div>
            <h1>Muchkund Thote</h1>
          </div>
        </div>
        <div className="min-h-screen w-[600px] rounded-xl border-2 bg-slate-200 p-2 shadow-md md:w-[700px] md:p-10">
          <h1 className="md;ml-0 ml-2 text-3xl font-bold"> Blogs</h1>
          {fulltext.map((text, index) => (
            <BlogCard
              key={index}
              text={text}
              imgurl={img[index] || ""}
              header={header[index] || ""}
            />
          ))}
        </div>

        <div className="h-[330px] w-[370px] bg-slate-200 sticky top-20 ml-2  rounded-xl hidden lg:block overflow-hidden">
          
           
           <div className=" w-full p-3">
            <h1 className="text-xl" ><b> What is Engineering India Blogs ?</b></h1>
          <p >Engineering India Blogs keeps the engineering community updated on events, guides, and current affairs, fostering innovation and technical excellence.</p>
           </div>
          <img  src="/image/logo.png" alt="" />
           <hr />
           <div className="w-full  flex items-center mt-2 justify-around">
            <Heart/>
            <MessageCircle/>
            <Share/>
            </div>

 
        </div>
      </div>
    </>
  );
}

export default blog;
