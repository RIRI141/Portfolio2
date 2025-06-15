"use client";

import { useState } from "react";
import { Banner } from "./shared/Banner";
import { workData } from "@/data/workData";
import { WorkData } from "@/types/work";

const techIconMap: { [key: string]: string } = {
  "React": "react.svg",
  "Next.js": "next.js.svg",
  "TypeScript": "typescript.svg",
  "Tailwind CSS": "tailwind.svg",
  "Node.js": "node.js.svg",
  "MongoDB": "mongodb.svg",
  "Vercel": "vercel.svg",
  "PostgreSQL": "postgre.svg",
  "Nest.js": "nest.svg",
  "WebSocket": "socket.svg",
  "Stripe": "stripe.svg",
  "Gsap": "gsap.svg",
  "FireBase": "firebase.svg",
  "Javascript": "javascript.svg",
  "HTML": "html.svg",
  "CSS": "css.svg",
  "Prisma": "prisma.svg",
  "JWT": "jwt.svg",
  "Jest": "jest.svg",
  "Githubactions": "gitaction.svg",
  "GraphQL": "graph.svg",
  "Supabase": "supabase.svg"
};

const TechnologyIcons = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {technologies
        .filter(tech => tech.trim() !== "") 
        .map((tech, index) => {
          const iconPath = techIconMap[tech];
          if (!iconPath) return null;
          
          return (
            <div
              key={index}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-white/50 p-1 hover:bg-white transition-colors"
              title={tech}
            >
              <img
                src={`/assets/svg/${iconPath}`}
                alt={tech}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

const Work = () => {
  const [currentWork, setCurrentWork] = useState<WorkData>(workData[0]);

  const handleSlideChange = (work: WorkData) => {
    setCurrentWork(work);
  };

  return (
    <>
      <div className="px-4 sm:px-6 pt-6">
        <h2 className="neon-text-flicker text-lg font-medium mb-6">WORKS</h2>

        <div className="hidden lg:flex mx-auto items-center justify-between">
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
                  WebkitLineClamp: 12,
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

            <TechnologyIcons technologies={currentWork.technologies} />
          </div>
          <div className="w-[3px] h-96 neon-bg-flicker mx-12"></div>
          <Banner onSlideChange={handleSlideChange} />
        </div>

        <div className="lg:hidden">
          <div className="mb-8 flex justify-center">
            <Banner onSlideChange={handleSlideChange} />
          </div>

          <div className="w-full flex justify-center mb-8">
            <div className="h-px neon-bg-flicker w-3/4"></div>
          </div>

          <div className="max-w-full">
            <div className="mb-6">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl text-center overflow-hidden px-4">
                <span
                  className="block"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                  title={currentWork.title}
                >
                  {currentWork.title}
                </span>
              </h1>
            </div>

            <div className="border-border-primary rounded-lg mx-auto max-w-md sm:max-w-lg md:max-w-xl text-center overflow-hidden p-4">
              <div
                className="text-white text-sm sm:text-base leading-relaxed overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 8,
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

            <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl">
              <TechnologyIcons technologies={currentWork.technologies} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-start mt-12  lg:block">
        <div className="h-px neon-border-top w-7/8"></div>
      </div>
    </>
  );
};

export default Work;