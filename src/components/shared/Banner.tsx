"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { WorkData } from "@/types/work";
import { workData } from "@/data/workData";

type ScreenType = "mobile" | "tablet" | "desktop";

interface BannerProps {
  onSlideChange?: (workData: WorkData) => void;
}

export function Banner({ onSlideChange }: BannerProps) {
  const [, setScreenType] = useState<ScreenType>("desktop");
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateScreenType = useCallback(() => {
    const width = window.innerWidth;
    if (width > 640)  {
      setScreenType("desktop");
      setCurrentSlide((prev) => (prev > workData.length ? 1 : prev));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      updateScreenType();
      setIsLoading(false);
      window.addEventListener("resize", updateScreenType);
      return () => window.removeEventListener("resize", updateScreenType);
    }
  }, [updateScreenType]);

  useEffect(() => {
    if (onSlideChange && !isTransitioning && currentSlide >= 1 && currentSlide <= workData.length) {
      onSlideChange(workData[currentSlide - 1]);
    }
  }, [currentSlide, isTransitioning, onSlideChange]);

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  }, [isTransitioning]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      next();
    }, 10000);
  }, [next]);

  useEffect(() => {
    if (!isLoading) {
      resetTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer, isLoading]);

  const handleNext = () => {
    next();
    resetTimer();
  };

  const handlePrev = () => {
    prev();
    resetTimer();
  };

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(slideIndex + 1);
    resetTimer();
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const container = slideContainerRef.current;
    if (!container) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      if (currentSlide >= workData.length + 1) {
        container.style.transition = "none";
        setCurrentSlide(1);
        container.style.transform = "translateX(-100%)";

        setTimeout(() => {
          container.style.transition = "transform 700ms ease-in-out";
        }, 10);
      } else if (currentSlide <= 0) {
        container.style.transition = "none";
        setCurrentSlide(workData.length);
        container.style.transform = `translateX(-${workData.length * 100}%)`;

        setTimeout(() => {
          container.style.transition = "transform 700ms ease-in-out";
        }, 10);
      }
    };

    container.addEventListener("transitionend", handleTransitionEnd);
    return () => container.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentSlide, isTransitioning]);

  useEffect(() => {
    const container = slideContainerRef.current;
    if (container) {
      container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const renderSlides = () => {
    const extendedSlides = [
      { src: workData[workData.length - 1].image, id: `clone-last-${workData.length - 1}` },
      ...workData.map((work, idx) => ({ src: work.image, id: `original-${idx}` })),
      { src: workData[0].image, id: "clone-first-0" },
    ];

    return (
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full absolute top-0 left-0"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        ref={slideContainerRef}
      >
        {extendedSlides.map((slide, i) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <Image
              src={slide.src}
              alt={`Slide ${i + 1}`}
              fill
              className="object-cover rounded-lg"
              priority={i === 1}
              onLoad={i === 1 ? () => setIsLoading(false) : undefined}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderDots = () => {
    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {workData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index + 1 
                ? "bg-pink-600" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="w-full relative overflow-hidden">
        <div className="relative w-full h-64 md:h-80 lg:h-96 animate-pulse bg-gray-200 rounded-lg" />
      </section>
    );
  }

  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
        {renderSlides()}
        {renderDots()}
      </div>

      <div className="absolute inset-0 flex justify-between items-center px-4 z-10 pointer-events-none">
      <button
  onClick={handlePrev}
  className="group flex items-center justify-center w-12 h-12 text-text-primary bg-black/100 hover:bg-black/50 rounded-full pointer-events-auto cursor-pointer transition-all backdrop-blur-sm"
  aria-label="Previous slide"
>
  <FaChevronLeft size={18} className="transition-transform duration-200 group-hover:scale-125" />
</button>

<button
  onClick={handleNext}
  className="group flex items-center justify-center w-12 h-12 text-text-primary bg-black/100 hover:bg-black/50 rounded-full pointer-events-auto cursor-pointer transition-all backdrop-blur-sm"
  aria-label="Next slide"
>
  <FaChevronRight size={18} className="transition-transform duration-200 group-hover:scale-125" />
</button>

      </div>
    </section>
  );
}