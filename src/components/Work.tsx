"use client";

import { useState } from "react";
import { Banner } from "./shared/Banner";
import { workData } from "@/data/workData";
import { WorkData } from "@/types/work";

const Work = () => {
  const [currentWork, setCurrentWork] = useState<WorkData>(workData[0]);

  const handleSlideChange = (work: WorkData) => {
    setCurrentWork(work);
  };

  return (
    <>
      <div className="px-4 sm:px-6 pt-6">
        <h2 className="neon-text-flicker text-lg font-medium">WORKS</h2>
        <div className="mx-auto flex items-center justify-between">
          <div className="max-w-150">
            <div className="">
              <h1 className="text-white mb-4 text-4xl text-center flex items-center justify-center overflow-hidden">
                <span
                  className="truncate"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                  title={currentWork.title}
                >
                  {currentWork.title}
                </span>
              </h1>
            </div>

            <div className="border-border-primary rounded-lg w-96 h-64 text-center justify-center overflow-hidden">
              <div
                className="text-white text-sm leading-relaxed h-full overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 14,
                  WebkitBoxOrient: "vertical",
                }}
                title={`${currentWork.description}\n\n${currentWork.detailedDescription}`}
              >
                {currentWork.description}
                <br />
                <br />
                {currentWork.detailedDescription}
              </div>
            </div>
          </div>
          <div className="w-[3px] h-96 neon-bg-flicker mx-12"></div>
          <Banner onSlideChange={handleSlideChange} />
        </div>
      </div>
      <div className="w-full flex justify-start mt-12">
      <div className="h-px neon-border-top w-7/8"></div>
    </div>
    </>
  );
};

export default Work;
