"use client"

import ColoumChart  from "@/components/chart/Coloum";
import LineChart from "@/components/chart/line";
import PieChart from "@/components/chart/piechart";

export default async function DashboardPage() {


  return (
    <div className=" h-screen w-full  p-4 ">
       <h1 className="text-2xl font-bold">Dashboard</h1>
       <div className="flex items-center  flex-wrap gap-2">
       <div className="h-96 w-[48%]">
             <LineChart/>
       </div> 
       <div className="w-1/2 h-[25rem] mt-5  border-2 p-5  rounded-md ">
        
        <h1 className="text-center font-bold">
        Overview
        </h1>
       <div className="flex justify-between items-center px-3 ">
       <div>
            Number Of Users
            <h1 className="text-xl font-bold">300</h1>
       </div>

       <div>
            Number Of Events
            <h1 className="text-xl font-bold">40</h1>
       </div>

       </div>
       </div>
       
      
       </div>
       



    </div>
  );
}
