import Image from "next/image";
import React from "react";

export type NotFoundProps = {
  message?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const NotFound: React.FC<NotFoundProps> = ({
  message = "No registrations found.",
  imageSrc = "/notfound.svg",
  imageWidth = 400,
  imageHeight = 400,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 text-center text-gray-500">
      <h1 className="text-xl font-semibold md:text-2xl">{message}</h1>
      <Image
        src={imageSrc}
        alt={message}
        width={imageWidth}
        height={imageHeight}
        className="h-auto max-w-full"
      />
    </div>
  );
};

export default NotFound;
