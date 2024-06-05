import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import "./index.less";

interface SliderProps {
  value: number;
  id: string;
  isShow?: boolean;
}

const Slider: React.FC<SliderProps> = ({ value, id, isShow }) => {
  const [state, setState] = useImmer<{ containerWidth: number }>({
    containerWidth: 0,
  });
  const { containerWidth } = state;
  useEffect(() => {
    const container = document.getElementById(id);
    setState((draft) => {
      draft.containerWidth = container?.offsetWidth || 0;
    });
  }, [value]);
  return (
    <div className="slider" style={{ opacity: isShow ? 1 : 0 }} id={id}>
      <div
        className="slider-left"
        style={{
          width: (value / 100) * containerWidth,
        }}
      />
      <div
        className="slider-right"
        style={{
          width: ((100 - value) / 100) * containerWidth,
        }}
      />
    </div>
  );
};
export default Slider;
