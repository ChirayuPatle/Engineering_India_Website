import { GalleryVerticalEnd } from "lucide-react";
import { FeedbackForm } from "./feedbackForm";

export default function Feedback() {
  return (
    <div className="grid w-full my-10 md:my-12 text-black min-h-screen lg:grid-cols-2">
      {/* Feedback Form Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <FeedbackForm />
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="bg-transparent">
        <img
          src="https://res.cloudinary.com/priyanshukayarkar/image/upload/v1739173756/Reports_2023-24_emxnkr.jpg"
          alt="Image"
          className="w-full h-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
