"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Language = {
  name: string;
  color: string;
}

const Skill = () => {
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setAnimationStarted(true);

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const languages = [
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#fff" },
    { name: "Node.js", color: "#339933" },
    { name: "HTML", color: "#E34F26" },
    { name: "CSS", color: "#1572B6" },
    { name: "Git", color: "#F05032" },
  ];

  const centerX = 275;
  const centerY = 200;
  const radius = isMobile ? 120 : 145; 
  const circleRadius = isMobile ? 30 : 35;
  const iconSize = isMobile ? 40 : 45; 
  const fontSize = isMobile ? "11" : "12"; 
  const textOffset = isMobile ? 40 : 50;
  const calculateCircularPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const renderLanguageIcon = (language: Language, index: number) => {
    const isHovered = hoveredLanguage === language.name;
    const scale = isHovered ? 1.2 : 1;
    const opacity = animationStarted ? 1 : 0;

    const position = calculateCircularPosition(index, languages.length);
    const iconX = position.x;
    const iconY = position.y;

    return (
      <g key={language.name}>
        <circle
          cx={iconX}
          cy={iconY}
          r={circleRadius}
          fill="rgba(255, 255, 255, 0.1)"
          opacity={opacity}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: `${iconX}px ${iconY}px`,
            transition: "all 0.4s ease",
            transitionDelay: `${index * 0.1}s`,
          }}
        />

        <text
          x={iconX}
          y={iconY + textOffset}
          fontSize={fontSize}
          fill={isHovered ? language.color : "#fff"}
          fontWeight={isHovered ? "600" : "500"}
          textAnchor="middle"
          opacity={isHovered ? 1 : 0.8}
          style={{
            transition: "all 0.3s ease",
          }}
        >
          {language.name}
        </text>

        {isHovered && (
          <>
            <circle
              cx={iconX}
              cy={iconY}
              r={circleRadius - 10}
              fill="none"
              stroke={language.color}
              strokeWidth={2}
              opacity={0.6}
              style={{
                animation: "pulse 2s infinite",
              }}
            />
            <circle
              cx={iconX}
              cy={iconY}
              r={circleRadius - 5}
              fill="none"
              stroke={language.color}
              strokeWidth={1}
              opacity={0.3}
              style={{
                animation: "pulse 2s infinite 0.3s",
              }}
            />
          </>
        )}
      </g>
    );
  };

  return (
    <>
      <div className="px-4 sm:px-6 pt-6">
        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }

          @keyframes moveCircle1 {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(calc(90vw - 200px), 50px);
            }
            50% {
              transform: translate(calc(90vw - 150px));
            }
            75% {
              transform: translate(50px, calc(100% - 50px));
            }
            100% {
              transform: translate(0, 0);
            }
          }

          @keyframes moveCircle2 {
            0% {
              transform: translate(calc(100% - 100px), 0);
            }
            25% {
              transform: translate(calc(90vw - 20vw), calc(50% - 20px));
            }
            50% {
              transform: translate(0, calc(50% + 20px));
            }
            75% {
              transform: translate(100px, 50vh);
            }
            100% {
              transform: translate(calc(100% - 80px), 0);
            }
          }

          @keyframes moveCircle3 {
            0% {
              transform: translate(calc(90vw - 100px), 0);
            }
            33% {
              transform: translate(20px, calc(33% + 24px));
            }
            66% {
              transform: translate(calc(100% + 70px), calc(66% + 20px));
            }
            100% {
              transform: translate(calc(50% - 24px), 0);
            }
          }
        `}</style>

        <h2 className="neon-text-flicker text-lg font-medium mb-4">
          Programming Skills
        </h2>

        <div
          className="relative w-full mx-auto overflow-hidden"
          style={{
            height: isMobile ? "300px" : "400px",
            maxWidth: isMobile ? "90%" : "100%",
          }}
        >
          <div
            className="absolute w-16 h-16 border-2 rounded-full"
            style={{
              borderColor: "#D5DC14",
              opacity: animationStarted ? 0.7 : 0,
              transition: "opacity 1s ease 0.5s",
              animation: "moveCircle1 15s linear infinite",
            }}
          />
          <div
            className="absolute w-20 h-20 border rounded-full"
            style={{
              borderColor: "#ea4ae2",
              opacity: animationStarted ? 0.5 : 0,
              transition: "opacity 1s ease 1s",
              animation: "moveCircle2 12s linear infinite reverse",
            }}
          />
          <div
            className="absolute w-12 h-12 border  rounded-full"
            style={{
              borderColor: "#14b8a6",
              opacity: animationStarted ? 0.6 : 0,
              transition: "opacity 1s ease 1.5s",
              animation: "moveCircle3 18s linear infinite",
            }}
          />

          <svg
            viewBox="0 0 600 450"
            className="w-full h-full absolute inset-0"
            preserveAspectRatio="xMidYMid meet"
          >
            {languages.map((language, index) =>
              renderLanguageIcon(language, index)
            )}

            {languages.map((language, index) => {
              const position = calculateCircularPosition(
                index,
                languages.length
              );
              const opacity = animationStarted ? 1 : 0;

              return (
                <foreignObject
                  key={`img-${language.name}`}
                  x={position.x - iconSize / 2}
                  y={position.y - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  style={{
                    opacity: opacity,
                    transition: "opacity 0.4s ease",
                    transitionDelay: `${index * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredLanguage(language.name)}
                  onMouseLeave={() => setHoveredLanguage(null)}
                  onTouchStart={() => setHoveredLanguage(language.name)}
                  onTouchEnd={() =>
                    setTimeout(() => setHoveredLanguage(null), 2000)
                  }
                >
                  <Image
                    src={`/assets/svg/${language.name.toLowerCase()}.svg`}
                    alt={language.name}
                    width={iconSize}
                    height={iconSize}
                    className="w-full h-full object-contain"
                  />
                </foreignObject>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <div className="h-px neon-border-top w-7/8"></div>
      </div>
    </>
  );
};

export default Skill;