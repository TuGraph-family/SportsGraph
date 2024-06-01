import React from "react";
import "./index.less";

const LightTop: React.FC = () => {
  return (
    <div className="light-top">
      <svg
        width="140px"
        height="227px"
        viewBox="0 0 140 227"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>编组</title>
        <defs>
          <rect id="light-top" x="0" y="0" width="140" height="227"></rect>
          <linearGradient
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="light-top-linearGradient-3"
          >
            <stop
              stopColor="#FFFFFF"
              stopOpacity="0.999262456"
              offset="0%"
            ></stop>
            <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
          </linearGradient>
          <filter
            x="-21.4%"
            y="-11.2%"
            width="142.9%"
            height="122.3%"
            filterUnits="objectBoundingBox"
            id="light-top-filter-4"
          >
            <feGaussianBlur
              stdDeviation="10"
              in="SourceGraphic"
            ></feGaussianBlur>
          </filter>
          <linearGradient
            x1="50%"
            y1="22.849645%"
            x2="50%"
            y2="101.923159%"
            id="light-top-linearGradient-5"
          >
            <stop stopColor="#FFFFFF" offset="0%"></stop>
            <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
          </linearGradient>
          <filter
            x="-150.0%"
            y="-9.0%"
            width="400.0%"
            height="117.9%"
            filterUnits="objectBoundingBox"
            id="light-top-filter-6"
          >
            <feGaussianBlur
              stdDeviation="4"
              in="SourceGraphic"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g
          id="页面-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="light-top-g" transform="translate(-118, 0)">
            <g id="编组" transform="translate(118, 0)">
              <mask id="light-top-mask-2" fill="white">
                <use xlinkHref="#light-top"></use>
              </mask>
              <g id="蒙版"></g>
              <g mask="url(#light-top-mask-2)" id="矩形">
                <g transform="translate(0, -44)">
                  <polygon
                    fill="url(#light-top-linearGradient-3)"
                    opacity="0.9"
                    filter="url(#light-top-filter-4)"
                    points="51.3761468 6.99960923e-15 88.6238532 -1.93655855e-14 140 269 -2.2824355e-13 269"
                  ></polygon>
                  <rect
                    fill="url(#light-top-linearGradient-5)"
                    opacity="0.8"
                    filter="url(#light-top-filter-6)"
                    transform="translate(63, 91) rotate(0) translate(-63, -91)"
                    x="64"
                    y="24"
                    width="10"
                    height="134"
                  ></rect>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default LightTop;
