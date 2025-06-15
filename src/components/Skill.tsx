"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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
  const radius = isMobile ? 120 : 140; 
  const circleRadius = isMobile ? 30 : 35;
  const iconSize = isMobile ? 35 : 40; 
  const fontSize = isMobile ? "11" : "12"; 
  const textOffset = isMobile ? 40 : 50;
  const calculateCircularPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const renderLanguageIcon = (language: any, index: number) => {
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

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <h2 className="neon-text-flicker text-lg font-medium mb-4">
          Programming Skills
        </h2>

        <div
          className="relative w-full mx-auto"
          style={{
            aspectRatio: "550/420",
            maxWidth: isMobile ? "90%" : "70%", 
          }}
        >
          <svg
            viewBox="0 0 550 420"
            className="w-full h-full absolute inset-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx={centerX}
              cy={centerY}
              r={isMobile ? 25 : 30}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={2}
              strokeDasharray="5,5"
              opacity={animationStarted ? 0.5 : 0}
              style={{
                animation: "rotate 20s linear infinite",
                transition: "opacity 1s ease 0.5s",
              }}
            />

            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={1}
              strokeDasharray={isMobile ? "8,8" : "10,10"}
              opacity={animationStarted ? 0.3 : 0}
              style={{
                animation: "rotate 30s linear infinite reverse",
                transition: "opacity 1s ease 1s",
              }}
            />

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

        {/* {hoveredLanguage && (
          <div
            className={`mb- p-3 sm:p-4 bg-white rounded-lg shadow-lg border-l-4 border-yellow-300 max-w-max mx-auto ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            <p className="text-slate-600">
              <span className="font-semibold text-slate-800">
                {hoveredLanguage}
              </span>{" "}
              -
              {hoveredLanguage === "JavaScript" &&
                " Modern ES6+ development & DOM manipulation"}
              {hoveredLanguage === "TypeScript" &&
                " Type-safe application development & large-scale projects"}
              {hoveredLanguage === "React" &&
                " Interactive UI development & component architecture"}
              {hoveredLanguage === "Next.js" &&
                " Full-stack React framework & server-side rendering"}
              {hoveredLanguage === "Node.js" &&
                " Server-side development & REST API creation"}
              {hoveredLanguage === "HTML" &&
                " Semantic markup & web accessibility standards"}
              {hoveredLanguage === "CSS" &&
                " Responsive design & modern layout techniques"}
              {hoveredLanguage === "Git" &&
                " Version control & collaborative development workflows"}
            </p>
          </div>
        )} */}
      </div>

      <div className="w-full flex justify-end">
        <div className="h-px neon-border-top w-7/8"></div>
      </div>
    </>
  );
};

export default Skill;
