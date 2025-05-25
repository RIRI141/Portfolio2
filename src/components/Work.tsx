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
    <div className="bg-gradient-to-br px-4 sm:px-6 pt-6 mt-[69px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="max-w-150">
          <div className="h-32">
            <h2 className="text-text-primary text-lg font-medium">WORK</h2>
            <h1 className="text-white text-4xl  text-center h-20 flex items-center justify-center overflow-hidden">
              <span 
                className="truncate"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
                title={currentWork.title}
              >
                {currentWork.title}
              </span>
            </h1>
          </div>
          
          <div className="border-teal-400 rounded-lg w-96 h-64 text-center justify-center overflow-hidden">
            <div 
              className="text-white text-sm leading-relaxed h-full overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 14,
                WebkitBoxOrient: 'vertical'
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
        
        <div className="w-[2px] h-96 bg-teal-400 mx-12"></div>
        <Banner onSlideChange={handleSlideChange} />
      </div>
      <div className="w-full h-px bg-teal-400 mt-6"></div>
    </div>
  );
};

export default Work;