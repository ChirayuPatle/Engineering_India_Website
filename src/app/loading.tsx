import React from "react";

const Loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-20 ">
      <div className="w-full h-[300px] bg-muted animate-pulse rounded-lg" />
    </div>
  );
};

export default Loading;
