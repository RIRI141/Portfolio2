"use client";

import Image from "next/image";
import { useState } from "react";

const AboutMe = () => {
  const [isChasing, setIsChasing] = useState(false);

  const handleMonsterClick = () => {
    setIsChasing(true);
  };

  return (
    <>
      <div className="px-4 sm:px-6 pt-6 mt-[69px]">
        <h2 className="neon-text-flicker text-lg font-medium">ABOUT ME</h2>

        <div className="hidden md:flex justify-center gap-4 relative overflow-hidden">
          <div className="flex flex-col text-left text-white">
            <div className="relative w-full h-auto">
              <Image
                src="/assets/img/Hero/Monster.png"
                alt="Monster character"
                width={500}
                height={500}
                className={`object-contain opacity-60 cursor-pointer transition-transform duration-300 
                  ${isChasing ? "shake-bottom" : "hover:scale-102"}`}
                onClick={handleMonsterClick}
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 pointer-events-none">
                <h1 className="mb-2 font-bold text-4xl drop-shadow-lg">
                  Hello, I'm Ryoga
                </h1>
                <p className="text-sm drop-shadow-lg">
                  A bilingual web developer based in Vancouver CA. <br />
                  I'm passionate about building beautiful and interactive web
                  applications using React(Next), TypeScript, and Tailwind CSS.{" "}
                  <br />
                  With experience in both English and Japanese environments, I
                  love collaborating in diverse teams and bridging communication
                  gaps.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center relative">
            <div
              className={`transition-all duration-500 ${
                isChasing
                  ? "translate-x-8 opacity-100 shake-horizontal"
                  : "translate-x-0 opacity-0 absolute"
              }`}
            >
              <Image
                src="/assets/img/Hero/CryMan.png"
                alt="My image"
                width={400}
                height={400}
                className="object-contain"
              />
              {/* <Image
                src="/assets/img/Hero/RunningMan.png"
                alt="Running character"
                width={400}
                height={400}
                className="object-contain cursor-pointer"
                onClick={handleMonsterClick}
              /> */}
            </div>

            <div
              className={`transition-all duration-500 ${
                isChasing ? "opacity-0 absolute" : "opacity-100"
              }`}
            >
              {/* <Image
                src="/assets/img/Hero/StandingMan.png"
                alt="Standing character"
                width={450}
                height={450}
                className="object-contain"
              /> */}
               <Image
                src="/assets/img/Hero/Man.png"
                alt="My image"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex justify-center gap-4 mb-6">
            <div className="relative">
              <Image
                src="/assets/img/Hero/Monster.png"
                alt="Monster character"
                width={200}
                height={200}
                className={`object-contain cursor-pointer transition-transform duration-300 ${
                  isChasing ? "shake-bottom" : "hover:scale-102"
                }`}
                onClick={handleMonsterClick}
              />
            </div>

            <div className="relative">
              <div
                className={`transition-all duration-500 ${
                  isChasing
                    ? "translate-x-4 opacity-100 shake-horizontal"
                    : "translate-x-0 opacity-0 absolute"
                }`}
              >
                {/* <Image
                  src="/assets/img/Hero/RunningMan.png"
                  alt="Running character"
                  width={150}
                  height={150}
                  className="object-contain cursor-pointer"
                  onClick={handleMonsterClick}
                /> */}
                 <Image
                src="/assets/img/Hero/CryMan.png"
                alt="My image"
                width={150}
                height={150}
                className="object-contain"
              />
              </div>

              <div
                className={`transition-all duration-500 ${
                  isChasing ? "opacity-0 absolute" : "opacity-100"
                }`}
              >
                {/* <Image
                  src="/assets/img/Hero/StandingMan.png"
                  alt="Standing character"
                  width={180}
                  height={180}
                  className="object-contain"
                /> */}
                 <Image
                src="/assets/img/Hero/Man.png"
                alt="My image"
                width={150}
                height={150}
                className="object-contain"
              />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center text-white">
            <h1 className="mb-4 font-bold text-2xl sm:text-3xl drop-shadow-lg">
              Hello, I'm Ryoga
            </h1>
            <p className="text-sm sm:text-base drop-shadow-lg leading-relaxed">
              A bilingual web developer based in Vancouver CA. <br />
              I'm passionate about building beautiful and interactive web
              applications using React(Next), TypeScript, and Tailwind CSS.{" "}
              <br />
              With experience in both English and Japanese environments, I love
              collaborating in diverse teams and bridging communication gaps.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center md:justify-end mt-6">
        <div className="h-px neon-border-top w-4/5 md:w-7/8"></div>
      </div>
    </>
  );
};

export default AboutMe;
