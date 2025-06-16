"use client";
import { useState, useEffect } from "react";
import FuzzyText from "./FizzyText";
import Link from "next/link";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textArray = [
    "Hello World!",
    "こんにちは世界！",
    "¡Hola Mundo!",
    "Hallo Welt!",
    "Ciao Mondo!",
    "Bonjour le monde!",
    "Привет мир!",
  ];

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % textArray.length;
      const fullText = textArray[current];

      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-700 px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span
              className="text-gray-300 text-sm ml-4 font-mono"
              style={{
                fontFamily: "JetBrains Mono, Consolas, Monaco, monospace",
              }}
            >
              ~/ryoga-ishii/portfolio
            </span>
          </div>

          <div
            className="ml-8 text-gray-400 font-mono h-16"
            style={{
              fontFamily: "JetBrains Mono, Consolas, Monaco, monospace",
            }}
          >
            <span className="text-yellow-400">console</span>
            <span className="text-gray-300">.</span>
            <span className="text-yellow-400">log</span>
            <span className="text-gray-300">(</span>
            <span className="text-green-400">&quot;</span>
            <span className="text-green-400 relative">
              {displayedText}
              <span className="animate-pulse text-white">|</span>
            </span>
            <span className="text-green-400">&quot;</span>
            <span className="text-gray-300">);</span>
          </div>

          <div
            className="border-t border-gray-700 bg-black p-4  h-20"
            style={{
              fontFamily: "JetBrains Mono, Consolas, Monaco, monospace",
            }}
          >
            <div className="text-green-400 font-mono text-sm">
              <div className="text-gray-500 mb-2">$ node hello.js</div>
              <div className="text-green-300">
                {displayedText && (
                  <span className="animate-pulse">▶ {displayedText}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
          >
            I started from here...
          </FuzzyText>
          <div className="inline-flex items-center group cursor-pointer">
            <span className="text-white mr-3 mt-4 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <Link href="/content">
              <p className="text-white mt-4 text-lg transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-green-400">
                Let&quot;s start to know about me, same as my past
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
