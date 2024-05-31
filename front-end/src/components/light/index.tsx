import React from "react";
import "./index.less";

const Light: React.FC<{ isLeft: boolean }> = ({ isLeft }) => {
  return (
    <div style={{ transform: `rotateY(${isLeft ? 0 : 180}deg)` }}>
      <div className="light">
        <div className="light-img" />
      </div>
    </div>
  );
};

export default Light;
