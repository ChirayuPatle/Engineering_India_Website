import LeftPage from "@/features/auth/components/leftSegment";
import RightSegment from "@/features/auth/components/rightSegment";

function SignUpForm() {
  return (
    <section className="flex flex-row justify-center items-center h-screen space-x-10">
      <LeftPage />
      <RightSegment />
    </section>
  );
}

export default SignUpForm;
