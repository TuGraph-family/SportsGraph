import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import "./index.less";

interface SliderProps {
  value: number;
  id: string;
  growingSide: "left" | "right";
}

const Slider: React.FC<SliderProps> = ({ value, id, growingSide }) => {
  const [state, setState] = useImmer<{ containerWidth: number }>({
    containerWidth: 0
  });
  const { containerWidth } = state;
  const isLeft = growingSide === "left";
  useEffect(() => {
    const container = document.getElementById(id);
    setState((draft) => {
      draft.containerWidth = container?.offsetWidth || 0;
    });
  }, [value]);
  return (
    <div className="slider" id={id}>
      <div
        className="slider-left"
        style={{
          width: (value / 100) * containerWidth,
          flex: !isLeft ? 1 : undefined
        }}
      />
      <div
        className="slider-right"
        style={{
          width: ((100 - value) / 100) * containerWidth,
          flex: isLeft ? 1 : undefined
        }}
      />
    </div>
  );
};
export default Slider;
