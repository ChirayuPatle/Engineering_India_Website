import React from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface ModifiedCardProps {
  title: string;
  description: string;
  content: string;
  imagelink: string;
}

function ModifiedCard({
  title,
  description,
  imagelink,
  content,
}: ModifiedCardProps) {
  return (
    <div className="flex justify-center items-center p-4">
      <Card className="text-center w-80 shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <div className="flex flex-col items-center gap-2 p-4">
            <img
              src={imagelink}
              alt={title || "Image"}
              className="w-36 h-36 border rounded-full object-cover"
            />
            <CardTitle className="text-lg font-semibold text-gray-800">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm leading-relaxed px-4">
            {content}
          </p>
        </CardContent>
        <CardFooter className="space-x-4 justify-center">
          <Button rightIcon="linkedIn"></Button>
          <Button rightIcon="github"></Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ModifiedCard;
