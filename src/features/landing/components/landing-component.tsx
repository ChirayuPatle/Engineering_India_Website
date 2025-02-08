import React from 'react'
import { Poppins } from "next/font/google";
import { useRouter } from 'next/navigation';

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] }); 
function LandingComponent() {
  const router = useRouter();
  return (
    <div className={`page-1 relative z-10 w-full flex lg:flex-row flex-col items-center justify-center gap-4 lg:gap-10 ${inter.className} lg-mt-0 mt-5`}>
     <div className="lg:h-96 h-24 lg:w-[32rem]  lg:px-5 px-5 lg:py-16 ">
      <h1 className="text-4xl lg:text-5xl font-bold text-blue-primary ">Engineering <span className='px-1 text-white bg-orange-500'>IN</span><span className='px-1  bg-white text-purple-900'>D</span><span className='px-1 text-white bg-green-600'>AI</span>  | Ycce</h1>
    </div>
      <div className="h-96 lg:w-[40rem] w-[20rem] lg:px-5 lg:py-10 px-6  ">
        <div>
          <p className="lg:w-[30rem]  text-xl text-blue-primary ">
        Build your entire backend within minutes and scale effortlessly using Appwrite's open-source platform. Add Authentication, Databases, Functions, Storage, and Messaging to your projects using the frameworks and languages of your choice.
          </p>
          <div className="flex lg:flex-row flex-col items-start justify-start lg:gap-10 gap-4 mt-6">
          <button   onClick={() => router.push("/auth/login")} className="px-10 py-2 whitespace-nowrap bg-blue-primary text-white rounded-2xl hover:bg-white hover:outline-2 hover:text-blue-primary transition-all ease-in-out">Get Started</button>
          <button className="px-10 py-2 whitespace-nowrap bg-blue-primary text-white rounded-2xl hover:bg-white  hover:text-blue-primary transition-all ease-in-out">Community Page</button>
        </div>
      </div>
      </div>
        </div>
  )
}

export default LandingComponent