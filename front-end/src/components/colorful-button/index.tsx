import React from "react";
import "./index.less";

interface ColorfulButtonProps {
  children?: React.ReactNode;
}

const ColorfulButton: React.FC<ColorfulButtonProps> = ({ children }) => {
  return (
    <div className="colorful-button-wrapper">
      <svg
        width="35.0020355px"
        height="15.2532632px"
        viewBox="0 0 35.0020355 15.2532632"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>act_img_ line_red@2x</title>
        <defs>
          <linearGradient
            x1="100%"
            y1="50%"
            x2="2.05738204e-13%"
            y2="50%"
            id="linearGradient-1"
          >
            <stop stopColor="#D84A50" offset="0%"></stop>
            <stop stopColor="#D84A50" stopOpacity="0" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="1-1"
            transform="translate(-119, -289.9827)"
            stroke="url(#linearGradient-1)"
            strokeWidth="2"
          >
            <polyline
              id="act_img_-line_red@2x"
              className="ecg ecg-left"
              points="119 297.82341 133.147761 297.82341 136.739385 293 136.739385 302.593806 140.977616 297.796903 154 297.82341"
            ></polyline>
          </g>
        </g>
      </svg>
      <div className="colorful-button">
        <div className="colorful-button-content">
          {children}
          </div>
      </div>

      <svg
        width="40.0020355px"
        height="15.2532632px"
        viewBox="0 0 40.0020355 15.2532632"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>act_img_ line_blue@2x</title>
        <defs>
          <linearGradient
            x1="100%"
            y1="50%"
            x2="-5.95501715%"
            y2="50%"
            id="linearGradient-2"
          >
            <stop stopColor="#1677FF" offset="0%"></stop>
            <stop stopColor="#1677FF" stopOpacity="0" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="2-2"
            transform="translate(-219.998, -289.9827)"
            stroke="url(#linearGradient-2)"
            strokeWidth="2"
          >
            <polyline
              id="act_img_-line_blue@2x"
              className="ecg ecg-right"
              transform="translate(240, 297.7969) scale(-1, 1) translate(-240, -297.7969)"
              points="220 297.82341 239.147761 297.82341 242.739385 293 242.739385 302.593806 246.977616 297.796903 260 297.82341"
            ></polyline>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ColorfulButton;
