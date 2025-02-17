import { useState, useEffect, useCallback, useRef } from 'react';

const AutoScrollSlider = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const scrollSpeed = useRef(0);
  const animationFrameId = useRef<number>();
  const lastTime = useRef<number>(Date.now());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const findScrollContainer = () => {
      const container = document.getElementById('root') as HTMLDivElement | null;
      if (container) {
        scrollContainerRef.current = container;
      } else {
        requestAnimationFrame(findScrollContainer);
      }
    };
    findScrollContainer();
  }, []);

  const autoScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const now = Date.now();
    const deltaTime = now - lastTime.current;
    lastTime.current = now;
    const container = scrollContainerRef.current;

    if (container && Math.abs(scrollSpeed.current) > 0) {
      const direction = Math.sign(scrollSpeed.current);
      const pixelsPerSecond = Math.abs(scrollSpeed.current) * 100;
      const scrollStep = (pixelsPerSecond * deltaTime) / 1000;

      // Scroll the container instead of window
      container.scrollTop += scrollStep * direction;

      // Check container scroll boundaries
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      const isAtTop = container.scrollTop === 0;

      if ((direction === 1 && isAtBottom) || (direction === -1 && isAtTop)) {
        scrollSpeed.current = 0;
        setSliderValue(50);
      } else {
        animationFrameId.current = requestAnimationFrame(autoScroll);
      }
    }
  }, []);

  useEffect(() => {
    if (scrollSpeed.current !== 0) {
      animationFrameId.current = requestAnimationFrame(autoScroll);
    }
    return () => {
      animationFrameId.current && cancelAnimationFrame(animationFrameId.current);
    };
  }, [autoScroll]);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    
    const normalizedValue = (value - 50) / 50;
    const baseSpeed = Math.sign(normalizedValue) * Math.pow(Math.abs(normalizedValue), 3) * 200;
    
    scrollSpeed.current = baseSpeed;
    lastTime.current = Date.now();
    
    animationFrameId.current && cancelAnimationFrame(animationFrameId.current);
    if (value !== 50) {
      animationFrameId.current = requestAnimationFrame(autoScroll);
    }
  };

  return (
      <input
        type="range"
        min="50"
        max="70"
        value={sliderValue}
        onChange={handleSpeedChange}
        className="w-64 accent-primary transition-transform duration-200 hover:scale-105"
        aria-label="Scroll speed control"
      />
  );
};

export default AutoScrollSlider;