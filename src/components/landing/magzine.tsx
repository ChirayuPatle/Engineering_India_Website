import React, { useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

function magzine() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <h1 className="mt-10 text-4xl font-semibold text-zinc-700">
        Check out Our EI Magazine
      </h1>

      <HTMLFlipBook
        width={400}
        height={600}
        size="fixed"
        minWidth={0}
        maxWidth={0}
        minHeight={0}
        maxHeight={0}
        showCover={true}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={true}
        startPage={0}
        maxShadowOpacity={0.5}
        className=""
        style={{}}
        startZIndex={0}
        autoSize={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-br-xl rounded-tr-xl border-4 object-cover"
            src="/image/magazine/1.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-bl-xl rounded-tl-xl border-4 object-cover"
            src="/image/magazine/2.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-br-xl rounded-tr-xl border-4 object-cover"
            src="/image/magazine/3.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-bl-xl rounded-tl-xl border-4 object-cover"
            src="/image/magazine/4.png"
            alt=""
          />{" "}
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-br-xl rounded-tr-xl border-4 object-cover"
            src="/image/magazine/5.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-bl-xl rounded-tl-xl border-4 object-cover"
            src="/image/magazine/6.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-br-xl rounded-tr-xl border-4 object-cover"
            src="/image/magazine/8.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-bl-xl rounded-tl-xl border-4 object-cover"
            src="/image/magazine/9.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-br-xl rounded-tr-xl border-4 object-cover"
            src="/image/magazine/10.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-bl-xl rounded-tl-xl border-4 object-cover"
            src="/image/magazine/11.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-br-xl rounded-tr-xl border-4 object-cover"
            src="/image/magazine/12.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <img
            className="w-full rounded-bl-xl rounded-tl-xl border-4 object-cover"
            src="/image/magazine/13.png"
            alt=""
          />
        </div>
        <div className="demoPage w-48">
          {" "}
          <div className="flex h-[95%] w-full flex-col items-center justify-center rounded-br-xl rounded-tr-xl border-2 bg-zinc-300">
            <h1 className="text-xl">Check out our full Magazine here</h1>
            <a href="https://drive.google.com/file/d/1WMluuxtqOV73IiqzbUaA_4Fb7wm2WN6h/view?usp=drivesdk">
              <button className="hover:blue-200 mt-2 rounded-xl bg-zinc-400 px-2 py-2">
                Click!!{" "}
              </button>
            </a>
          </div>{" "}
        </div>
      </HTMLFlipBook>
    </div>
  );
}

export default magzine;
