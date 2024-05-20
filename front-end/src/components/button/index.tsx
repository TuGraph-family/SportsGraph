import { Button as Btn, ButtonProps } from "antd-mobile";
import React from "react";
import "./index.less";

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className="sg-btn">
      <Btn {...props} />
    </div>
  );
};

export default Button;
