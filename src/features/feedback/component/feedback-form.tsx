import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {Input}  from "@/components/ui/input";
import { Button } from "@/components/ui/button";

 function FeedbackForm() {

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Feedback Form</h1>
        <p className="text-gray-600 mb-4">
          We would love to hear your thoughts, suggestions, or concerns to help us improve!
        </p>
        <hr className="mb-4" />

        <div className="mb-6">
          <label className="block font-medium mb-2">Feedback Type</label>
          <RadioGroup className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="comments" id="comments" />
              <label htmlFor="comments" className="cursor-pointer">Comments</label>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="suggestions" id="suggestions" />
              <label htmlFor="suggestions" className="cursor-pointer">Suggestions</label>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="questions" id="questions" />
              <label htmlFor="questions" className="cursor-pointer">Questions</label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Enter your feedback:</label>
          <textarea typeof="text"
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Type here..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Full Name</label>
            <Input id="name" placeholder="Your name" className="w-full" />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <Input id="email" type="email" placeholder="Your email" className="w-full" />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="w-full md:w-auto">Submit</Button>
        </div>

      </div>
    </main>
  );
}
 export default FeedbackForm;