"use client";
import React from 'react'
import { TimelineDemo } from '@/features/event-info/components/timeline';

function page() {
  
  return (
    <>
    
    <div className="page1 min-h-screen lg:h-screen w-full   ">

    <div className="h-full  w-ful flex flex-col-reverse lg:flex-row  items-center justify-center">

        <div className="h-full w-full lg:w-1/2 py-14 lg:px-20 px-6 lg:mt-32 ">
          <h1 className="text-5xl text-green-600">Youth Parliament</h1>
          <h2 className="text-4xl mt-3 font-bold" >Description</h2>
          <p className="w-full  mt-6 ">Weekend UX, is a UI/UX Design Academy in Delhi involved in User Experience and User Interface Training and Consulting. It was started in 2023 and passionate towards User Interface Design/ User Experience Design, Human Computer Interaction Design. Humanoid is gushing towards competence to acquire knowledge and have a wide understanding towards the sphere through the foremost courses in the area of UI/UX Design, by strengthening up your skills, for your golden future</p>
        </div>

        <div className="h-full w-full lg:w-1/2 flex justify-center lg:items-start lg:mt-40 items-center py-10 lg:py-0 relative  ">
              <div className='h-[12rem] w-72 bg-red-400 rounded-lg ml-4 absolute bottom-20 left-16 hidden lg:block'></div>
              <div className="h-[26rem] w-80 bg-blue-400 rounded-lg" ></div>
              <div className='h-[12rem] w-72 bg-orange-300 rounded-lg ml-4 absolute left-96 hidden lg:block'></div>
             
        </div>
    </div>
  
  </div>

 
 <div className='w-full '>
         <TimelineDemo/>
 </div>

 <div className='w-full h-screen'>
         <div className='text-center text-6xl font-bold'><h1>Our Organizers</h1></div>
         <div className = " min-h-full w-full p-10">
            
            <div  className='flex flex-wrap items-start justify-center gap-10 mt-10'>
            
             <div className='h-80 w-64 bg-blue-400 rounded-lg'></div>
             <div className='h-80 w-64 bg-blue-400 rounded-lg'></div>
             <div className='h-80 w-64 bg-blue-400 rounded-lg'></div>
             <div className='h-80 w-64 bg-blue-400 rounded-lg'></div>
             <div className='h-80 w-64 bg-blue-400 rounded-lg'></div>
             <div className='h-80 w-64 bg-blue-400 rounded-lg'></div>




            </div>

         </div>
 </div>
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default page