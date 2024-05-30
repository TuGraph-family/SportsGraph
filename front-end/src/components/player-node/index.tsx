import { PlayersInfoResult } from "@/interfaces";
import { ExtensionCategory, register } from "@antv/g6";
import { ReactNode } from "@antv/g6-extension-react";
import React from "react";
import "./index.less";

register(ExtensionCategory.NODE, "react", ReactNode);
const minWidth = 30;
const maxWidth = 60;
const ratio = 0.2;
const maxFontSize = 10;
const fontSizeRatio = 0.2;
const maxShirtNumberFontSize = 18;

interface PlayerNodeProps {
  playerInfo: PlayersInfoResult;
  showName?: boolean;
}

const PlayerNode: React.FC<PlayerNodeProps> = React.memo(
  ({ playerInfo, showName = true }) => {
    const {
      isTeamA,
      player_shirtnumber,
      player_name,
      nodeSize = 40
    } = playerInfo;
    const mapWidth = nodeSize * ratio + 30;
    const width =
      mapWidth < minWidth
        ? minWidth
        : mapWidth > maxWidth
          ? maxWidth
          : mapWidth;
    const mapFontSize = width * fontSizeRatio;
    const fontSize = mapFontSize < maxFontSize ? mapFontSize : maxFontSize;
    const shirtFontSize =
      mapFontSize < maxShirtNumberFontSize
        ? mapFontSize
        : maxShirtNumberFontSize;

    return (
      <div className="player-node" style={{ minHeight: 60 }}>
        <div className={`shirt`} style={{ width, height: width - 3 }}>
          <img
            style={{ width }}
            src={
              isTeamA === "1"
                ? "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*0oAaS42vqWcAAAAAAAAAAAAADsvfAQ/original"
                : "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*BYH5SauBNecAAAAAAAAAAAAADsvfAQ/original"
            }
          />
          <div className="shirt-number" style={{ fontSize: shirtFontSize }}>
            {player_shirtnumber}
          </div>
          {showName && (
            <div className="label">
              <div className="label-text" style={{ fontSize: 8 }}>
                {player_name}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default PlayerNode;
