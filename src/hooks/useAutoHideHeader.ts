import { useState, useEffect, useCallback } from 'react';

export const useAutoHideHeader = (hideDelay = 5000) => {
    const [isVisible, setIsVisible] = useState(true); 
    const [hasScrolled, setHasScrolled] = useState(false); 
  
    const showHeader = useCallback(() => {
      setIsVisible(true);
    }, []);
  
    const hideHeader = useCallback(() => {
      setIsVisible(false);
    }, []);
  
    useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
      let lastScrollY = window.scrollY;
  
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          if (!hasScrolled) {
            setHasScrolled(true);
          }
          
          showHeader();
          
          clearTimeout(timeoutId);
          timeoutId = setTimeout(hideHeader, hideDelay);
          
          lastScrollY = currentScrollY;
        }
      };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(timeoutId);
    };
  }, [showHeader, hideHeader, hideDelay]);

  return { isVisible, showHeader, hideHeader };
};