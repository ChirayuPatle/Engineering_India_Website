import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function InputField() {
  return (
  <main className="md:p-4 mx-auto flex justify-center items-center">
  <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
    {/* Left Side: Image - Hidden on mobile */}
    <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
      <img
        src="./images/signup.png"
        alt="Signup"
        className="w-full h-auto object-cover"
      />
    </div>

    {/* Right Side: Form */}
    <div className="w-screen m-1 md:w-1/3 md:order-2 md:border-2 p-8 overflow-hidden md:p-9 rounded-xl">
    <div className="md:text-2xl text-xl font-bold text-center mb-4">Register Now!</div>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Full name
          </label>
          <Input id="name" placeholder="Full name" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email Id
          </label>
          <Input id="email" placeholder="Email Id" />
        </div>

        <div className="mb-4">
          <label htmlFor="mobile" className="block font-medium mb-1">
            Mobile number
          </label>
          <Input id="mobile" placeholder="Mobile number" />
        </div>

        <div className="mb-4">
          <label htmlFor="college" className="block font-medium mb-1">
            College name
          </label>
          <Input id="college" placeholder="College name" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Year</label>
          <RadioGroup>
            <div className="flex items-center space-x-2 mb-2 cursor-pointer">
              <RadioGroupItem value="option-one" id="option-one" />
              <label htmlFor="option-one" className="cursor-pointer">1st Year</label>
            </div>
            <div className="flex items-center space-x-2 mb-2 cursor-pointer">
              <RadioGroupItem value="option-two" id="option-two" />
              <label htmlFor="option-two" className="cursor-pointer">2nd Year</label>
            </div>
            <div className="flex items-center space-x-2 mb-2 cursor-pointer">
              <RadioGroupItem value="option-three" id="option-three" />
              <label htmlFor="option-three" className="cursor-pointer">3rd Year</label>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="option-four" id="option-four" />
              <label htmlFor="option-four" className="cursor-pointer">4th Year</label>
            </div>
          </RadioGroup>
        </div>
      </form>
      <Button className="">Submit</Button>
    </div>
  </div>
</main>
  )
}

export default InputField;
