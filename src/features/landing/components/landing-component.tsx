import React from 'react'
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] }); 
function LandingComponent() {
  return (
    <div className={`relative z-10 w-full flex lg:flex-row flex-col items-center justify-center gap-4 lg:gap-10 ${inter.className} lg-mt-0 mt-5`}>
     <div className="lg:h-96 h-24 lg:w-[30rem]  lg:px-5 px-5 lg:py-16 ">
      <h1 className="text-4xl lg:text-5xl font-bold text-blue-primary ">Engineering India | Ycce</h1>
    </div>
      <div className="h-96 lg:w-[40rem] w-[20rem] lg:px-5 lg:py-10 px-6  ">
        <div>
          <p className="lg:w-[30rem]  text-xl text-blue-primary ">
        Build your entire backend within minutes and scale effortlessly using Appwrite's open-source platform. Add Authentication, Databases, Functions, Storage, and Messaging to your projects using the frameworks and languages of your choice.
          </p>
          <div className="flex lg:flex-row flex-col items-start justify-start lg:gap-10 gap-4 mt-6">
          <button className="px-10 py-2 whitespace-nowrap bg-blue-primary text-white rounded-2xl hover:bg-white hover:outline-2 hover:text-blue-primary transition-all ease-in-out">Get Started</button>
          <button className="px-10 py-2 whitespace-nowrap bg-blue-primary text-white rounded-2xl hover:bg-white  hover:text-blue-primary transition-all ease-in-out">Community Page</button>
        </div>
      </div>
      </div>
        </div>
  )
}

export default LandingComponent