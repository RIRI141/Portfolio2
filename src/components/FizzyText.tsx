import React, { useEffect, useRef, useState, useCallback } from "react";

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontSizeMobile?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  breakpoint?: number; 
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = "6rem",
  fontSizeMobile = "2.5rem",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  breakpoint = 768,
}) => {
  const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void}>(null);
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    checkIsMobile(); 
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [checkIsMobile]);

  const currentFontSize = isMobile ? fontSizeMobile : fontSize;

  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === "inherit"
          ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
          : fontFamily;

      const fontSizeStr =
        typeof currentFontSize === "number" ? `${currentFontSize}px` : currentFontSize;
      let numericFontSize: number;
      if (typeof currentFontSize === "number") {
        numericFontSize = currentFontSize;
      } else {
        const temp = document.createElement("span");
        temp.style.fontSize = currentFontSize;
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join("");

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent =
        metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = isMobile ? 20 : 50; 
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${canvas.width / dpr}px`;
      canvas.style.height = `${canvas.height / dpr}px`;
      
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = isMobile ? 20 : 30;

      const run = () => {
        if (isCancelled) return;
        ctx.clearRect(
          -fuzzRange,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange,
          tightHeight + 2 * fuzzRange
        );
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(
            offscreen,
            0,
            j,
            offscreenWidth,
            1,
            dx,
            j,
            offscreenWidth,
            1
          );
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft &&
        x <= interactiveRight &&
        y >= interactiveTop &&
        y <= interactiveBottom;

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("touchmove", handleTouchMove, {
          passive: false,
        });
        canvas.addEventListener("touchend", handleTouchEnd);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseleave", handleMouseLeave);
          canvas.removeEventListener("touchmove", handleTouchMove);
          canvas.removeEventListener("touchend", handleTouchEnd);
        }
      };

      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [
    children,
    currentFontSize, 
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
    isMobile,
  ]);

  return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />;
};

export default FuzzyText;