import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function FeedbackForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Feeback</h1>
        <p className="text-balance text-sm text-muted-foreground">
          We would love to hear your thoughts, suggestions, or concerns to help
          us improve!
        </p>
      </div>
      <hr />
      <div className="grid gap-6 mt-4 md:mt-7 ">
        <div className="grid gap-2">
          <Label className="block font-medium mb-2">Feedback Type</Label>
          <RadioGroup className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="comments" id="comments" />
              <Label htmlFor="comments" className="cursor-pointer">
                Comments
              </Label>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="suggestions" id="suggestions" />
              <Label htmlFor="suggestions" className="cursor-pointer">
                Suggestions
              </Label>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="questions" id="questions" />
              <Label htmlFor="questions" className="cursor-pointer">
                Questions
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="my-2">
          <Label className="block font-medium mb-2">Enter Feedback</Label>
          <textarea
            typeof="text"
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 placeholder:text-sm "
            placeholder="Type here..."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="block mb-1">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              className="w-full placeholder:text-sm "
            />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              className="w-full placeholder:text-sm "
            />
          </div>
        </div>
        <Button className=" w-full">Submit</Button>
      </div>
    </form>
  );
}
