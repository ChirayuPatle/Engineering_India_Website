import { Button } from "@/components/ui/button";
import LeftPage from "@/features/auth/components/left-segment/page";
import RightSegment from "@/features/auth/components/right-segment/page";
import Input from "@/components/ui/input";

function SignUpForm() {
  return (
    <section className="flex flex-row justify-center items-center h-screen space-x-10">
      <LeftPage />
      <RightSegment />
      </section>
  )
}

export default SignUpForm
