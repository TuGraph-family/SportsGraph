import React from "react";
import "./index.less";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return loading ? (
    <div className="sg-loading">
      <div className="mask">
        <div className="loading">
          <svg
            width="100.083261px"
            height="48.0832611px"
            viewBox="0 0 100.083261 48.0832611"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title>act_popovers_ loading@2x</title>
            <defs>
              <rect
                id="loading-path-1"
                x="0"
                y="-7.10542736e-15"
                width="100"
                height="48"
              ></rect>
              <linearGradient
                x1="100%"
                y1="9.14635615e-14%"
                x2="60.3273606%"
                y2="40.1211408%"
                id="loading-linearGradient-3"
              >
                <stop stopColor="#D84A50" offset="0%"></stop>
                <stop stopColor="#D84A50" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="104.170579%"
                y1="-2.53360565e-14%"
                x2="67.2857295%"
                y2="38.3079583%"
                id="loading-linearGradient-4"
              >
                <stop stopColor="#1677FF" offset="0%"></stop>
                <stop stopColor="#1677FF" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="100%"
                y1="9.14635615e-14%"
                x2="59.197367%"
                y2="38.7448363%"
                id="loading-linearGradient-5"
              >
                <stop stopColor="#D84A50" offset="0%"></stop>
                <stop stopColor="#D84A50" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="109.07266%"
                y1="-7.84398183%"
                x2="68.0555491%"
                y2="32.0857497%"
                id="loading-linearGradient-6"
              >
                <stop stopColor="#1677FF" offset="0%"></stop>
                <stop stopColor="#1677FF" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="100%"
                y1="9.14635615e-14%"
                x2="50%"
                y2="50%"
                id="loading-linearGradient-7"
              >
                <stop stopColor="#D84A50" offset="0%"></stop>
                <stop stopColor="#D84A50" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="112.65216%"
                y1="-16.3140503%"
                x2="50%"
                y2="44.1969827%"
                id="loading-linearGradient-8"
              >
                <stop stopColor="#1677FF" offset="0%"></stop>
                <stop stopColor="#1677FF" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="loading-页面-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="loading-首页/有预测备份-3"
                transform="translate(-137, -324)"
              >
                <g
                  id="loading-act_popovers_-loading@2x"
                  transform="translate(138, 324)"
                >
                  <mask id="loading-mask-2" fill="white">
                    <use xlinkHref="#loading-path-1"></use>
                  </mask>
                  <g id="loading-矩形"></g>
                  <g id="loading-蒙版" mask="url(#mask-2)">
                    <g transform="translate(-1, 0)">
                      <g
                        id="loading-编组"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <polygon
                          id="loading-red1"
                          className="loading-arrow"
                          fill="url(#loading-linearGradient-3)"
                          fillRule="nonzero"
                          transform="translate(24.0416, 24.0416) rotate(45) translate(-24.0416, -24.0416)"
                          points="41.0416306 7.04163056 41.0416306 41.0416306 37.6973683 41.0416306 37.6972605 10.3857851 7.04163056 10.3858929 7.04163056 7.04163056"
                        ></polygon>
                        <polygon
                          id="loading-blue1"
                          className="loading-arrow"
                          fill="url(#loading-linearGradient-4)"
                          fillRule="nonzero"
                          transform="translate(76.0416, 24.0416) scale(-1, 1) rotate(45) translate(-76.0416, -24.0416)"
                          points="93.0416306 7.04163056 93.0416306 41.0416306 89.6973683 41.0416306 89.6971745 10.3857851 59.0416306 10.3858929 59.0416306 7.04163056"
                        ></polygon>
                      </g>
                      <polygon
                        id="loading-red2"
                        className="loading-arrow"
                        fill="url(#loading-linearGradient-5)"
                        fillRule="nonzero"
                        opacity="0.65"
                        transform="translate(20.5919, 25.0416) rotate(45) translate(-20.5919, -25.0416)"
                        points="30.5918831 15.0416306 30.5918831 35.0416306 27.1633117 35.0416306 27.1632903 18.4700915 10.5918831 18.470202 10.5918831 15.0416306"
                      ></polygon>
                      <polygon
                        id="loading-blue2"
                        className="loading-arrow"
                        fill="url(#loading-linearGradient-6)"
                        fillRule="nonzero"
                        opacity="0.65"
                        transform="translate(78.5919, 25.0416) scale(-1, 1) rotate(45) translate(-78.5919, -25.0416)"
                        points="88.5918831 15.0416306 88.5918831 35.0416306 85.1633117 35.0416306 85.1632903 18.4700915 68.5918831 18.470202 68.5918831 15.0416306"
                      ></polygon>
                      <polygon
                        id="loading-red3"
                        className="loading-arrow"
                        fill="url(#loading-linearGradient-7)"
                        fillRule="nonzero"
                        opacity="0.36"
                        transform="translate(13.5416, 25.9914) rotate(45) translate(-13.5416, -25.9914)"
                        points="20.0416306 19.491378 20.0416306 32.491378 16.6503262 32.491378 16.650146 22.8825731 7.04163056 22.8826824 7.04163056 19.491378"
                      ></polygon>
                      <polygon
                        id="loading-blue3"
                        className="loading-arrow"
                        fill="url(#loading-linearGradient-8)"
                        fillRule="nonzero"
                        opacity="0.36"
                        transform="translate(87.5416, 25.9914) scale(-1, 1) rotate(45) translate(-87.5416, -25.9914)"
                        points="94.0416306 19.491378 94.0416306 32.491378 90.6503262 32.491378 90.650146 22.8825731 81.0416306 22.8826824 81.0416306 19.491378"
                      ></polygon>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div className="title">加载中</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Loading;
