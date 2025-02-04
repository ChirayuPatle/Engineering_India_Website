import { Button } from "@/components/ui/button";
import EventImage from "../eventP2-image/image";

function EventMiniLoadingpage() {
  return (
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 px-6 md:px-20 rounded-xl p-6 bg-gray-100 w-fit shadow-lg mx-auto my-10">
      {/* Left */}
      <div className="leftCard flex-shrink-0">
        <EventImage />
      </div>
      {/* Right */}
      <div className="rightText border-2 p-6 rounded-xl bg-white shadow-md max-w-2xl text-center overflow-hidden">
        <h1 className="text-orange-600 text-2xl font-bold">GYANDEEP 2.0</h1>
        <p className="text-gray-700 mt-2 text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, ea ipsa! Illum odit dolorem amet harum velit quo obcaecati error? Repudiandae expedita ipsa odio earum dignissimos eos dolor quibusdam, labore quos adipisci nisi quaerat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptas illo ducimus expedita consequatur architecto dolorum harum fuga iure cupiditate.
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 justify-center">
          <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">Register Now!</Button>
          <Button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Community Page</Button>
        </div>
      </div>
    </div>
  )
}

export default EventMiniLoadingpage;
