import Responseform from "@/features/event/component/eventResponseForm";
import { Button } from "@/components/ui/button";

function FinalForm() {
  return (
    <main className="w-fit md:px-10 px-2 pb-10 pt-5 md:mx-auto md:justify-center md:align-center md:items-center bg-white rounded-lg shadow-lg overflow-hidden">
      <div>
        <div className="flex flex-row mx-auto justify-between items-center">
          <div className="left text-xl">EVENT PASS</div>
          {/* <div className="left text-xl">EI EVENT PASS</div> */}
          <div className="right pb-3 md:space-x-3 space-x-1">
            <Button>Share</Button>
            <Button>Download</Button>
          </div>
        </div>
        <Responseform />
      </div>
    </main>
  );
}

export default FinalForm;
