import { PlayersInfoResult } from "@/interfaces";
import { ExtensionCategory, register } from "@antv/g6";
import { ReactNode } from "@antv/g6-extension-react";
import React from "react";
import "./index.less";

register(ExtensionCategory.NODE, "react", ReactNode);

const ratio = 0.01;
const minScale = 0.7;
const maxScale = 1;

interface PlayerNodeProps {
  playerInfo: PlayersInfoResult;
  showName?: boolean;
  onClick?: (playerInfo: PlayersInfoResult) => void;
  animation?: {
    animationDelay?: string[];
    animationType?: Array<"scale" | "translate" | "fade">;
    animationDuration?: string[];
  };
  scale?: number;
  dataAspm?: string;
  isActive?: boolean;
}

const PlayerNode: React.FC<PlayerNodeProps> = React.memo(
  ({
    playerInfo,
    showName = true,
    onClick,
    animation,
    scale = 1,
    dataAspm,
    isActive,
    dataAspm,
  }) => {
    const {
      animationDelay = [],
      animationType = [],
      animationDuration = [],
    } = animation || {};

    const {
      isTeamA,
      player_shirtnumber,
      player_name,
      nodeSize = 60,
      isGoalKeeper,
    } = playerInfo;
    const shirtScale = ratio * nodeSize;
    const realShirtScale =
      shirtScale < minScale
        ? minScale
        : shirtScale > maxScale
          ? maxScale
          : shirtScale;

    return (
      <div
        data-aspm-click={dataAspm}
        data-aspm-param={`playerNam=${player_name}`}
        className={`player-node ${animation ? animationType.join(" ") : ""} ${isActive ? "active" : ""} `}
        onClick={() => onClick?.(playerInfo)}
        style={{
          animationDelay: `${animationDelay.join(",")}`,
          animationName: animationType.join(","),
          animationDuration: animationDuration.join(","),
          transform: `scale(${scale}) ${animationType.includes("translate") ? "translateY(10px)" : ""}`,
        }}
      >
        <div
          className={`shirt`}
          style={{
            transform: `scale(${showName ? realShirtScale : "none"})`,
            transformOrigin: showName ? "bottom" : "top",
          }}
        >
          {isActive && (
            <img
              src={
                "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*N7fkTKjmv64AAAAAAAAAAAAADsvfAQ/original"
              }
              className="active-bg"
            />
          )}
          <img
            src={
              isTeamA === "1"
                ? isGoalKeeper
                  ? "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*lbBjRJEnuc4AAAAAAAAAAAAADsvfAQ/original"
                  : "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*0oAaS42vqWcAAAAAAAAAAAAADsvfAQ/original"
                : isGoalKeeper
                  ? "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*npULQol60WIAAAAAAAAAAAAADsvfAQ/original"
                  : "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*BYH5SauBNecAAAAAAAAAAAAADsvfAQ/original"
            }
          />
          <div className="shirt-number">{player_shirtnumber}</div>
        </div>
        {showName && (
          <div className="label">
            <div className="label-text">{player_name}</div>
          </div>
        )}
      </div>
    );
  }
);

export default PlayerNode;
