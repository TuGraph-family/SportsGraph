import React from "react";
import "./index.less";

interface TriangleButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  buttonType?: "left" | "right";
}

const TriangleButton: React.FC<TriangleButtonProps> = ({
  children,
  buttonType = "left",
  ...others
}) => {
  return (
    <div {...others} className={`triangle-button ${buttonType}`}>
      {children}
    </div>
  );
};

export default TriangleButton;
