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
}

const PlayerNode: React.FC<PlayerNodeProps> = React.memo(
  ({ playerInfo, showName = true, onClick, animation, scale = 1 }) => {
    const {
      animationDelay = [],
      animationType = [],
      animationDuration = []
    } = animation || {};

    const {
      isTeamA,
      player_shirtnumber,
      player_name,
      nodeSize = 60
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
        className={`player-node ${animation ? animationType.join(" ") : ""}`}
        onClick={() => onClick?.(playerInfo)}
        style={{
          animationDelay: `${animationDelay.join(",")}`,
          animationName: animationType.join(","),
          animationDuration: animationDuration.join(","),
          transform: `scale(${scale}) ${animationType.includes("translate") ? "translateY(10px)" : ""}`
        }}
      >
        <div
          className={`shirt`}
          style={{
            transform: `scale(${realShirtScale})`,
            transformOrigin: showName ? "bottom" : "top"
          }}
        >
          <img
            src={
              isTeamA === "1"
                ? "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*0oAaS42vqWcAAAAAAAAAAAAADsvfAQ/original"
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
