
import { useState, useEffect } from 'react';

export const useCountingAnimation = (endValue: number, duration: number = 2000, startDelay: number = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutCubic);
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [endValue, duration, startDelay]);

  return count;
};
