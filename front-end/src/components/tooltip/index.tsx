import React from "react";
import "./index.less";

interface TooltipProps {
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <div className="sg-tooltip">{children}</div>;
};

export default Tooltip;
