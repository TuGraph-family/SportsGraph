import React, { useEffect } from "react";

interface AnimateNumberProps {
  count: number;
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimateNumber: React.FC<AnimateNumberProps> = ({
  count = 0,
  id,
  className,
  style
}) => {
  const animateValue = (
    obj: HTMLElement,
    start: number,
    end: number,
    duration: number
  ) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration || 1),
        1
      );
      obj.innerHTML = String(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const ele = document.getElementById(id);
    if (ele) {
      animateValue(ele, 0, count, count * 10);
    }
  }, [id, count]);

  return (
    <div
      id={id}
      className={`animate-number ${className ? className : ""}`}
      style={style}
    >
      {count}
    </div>
  );
};

export default AnimateNumber;
