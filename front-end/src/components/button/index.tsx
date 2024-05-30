import { Button as Btn, ButtonProps } from "antd-mobile";
import React, { ReactNode } from "react";
import "./index.less";
interface Props {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  style?: Record<string, any>;
  disabled?: boolean;
  isShowHighlightBorder?: boolean;
}

const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  style,
  disabled,
  isShowHighlightBorder,
}) => {
  return (
    <div
      onClick={() => {
        if (disabled) return;
        onClick?.();
      }}
      className="sg-btn"
    >
      <div
        style={style}
        className={`${className} sg-btn-bg ${disabled ? "sg-btn-disabled" : ""}`}
      >
        <span>{children}</span>
      </div>
      {isShowHighlightBorder && <div className="highlight-border" />}
    </div>
  );
};

export default Button;
