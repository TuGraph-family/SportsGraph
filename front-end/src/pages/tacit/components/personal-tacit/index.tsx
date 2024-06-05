import IconFont from "@/components/icon-font";
import PersonalTacitGraph from "@/components/personal-tacit-graph";
import { PlayersInfoResult } from "@/interfaces";
import { GraphData } from "@antv/g6";
import { Mask } from "antd-mobile";
import React from "react";
import "./index.less";

interface TacitGraphProps {
  personalTacitData: GraphData;
  playerInfo?: PlayersInfoResult;
  visible: boolean;
  setVisible: (val: boolean) => void;
  onNodeClick?: (playerid: string, playerInfo: PlayersInfoResult) => void;
}

const PersonalTacit: React.FC<TacitGraphProps> = ({
  personalTacitData,
  playerInfo,
  visible,
  setVisible,
  onNodeClick,
}) => {
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Mask
      color="#060c34b8"
      visible={visible}
      destroyOnClose={true}
      className="personal-mask"
    >
      <div className="personal-tacit">
        <div className="personal-graph">
          <PersonalTacitGraph
            containerId="personalTacit"
            graphData={personalTacitData}
            onNodeClick={onNodeClick}
          />
          <div onClick={onClose} className="close">
            <IconFont
              type="euro-icon-danchuang-guanbi"
              style={{ color: "#fff" }}
            />
          </div>
        </div>

        {playerInfo && (
          <div className="player-info">
            <div className="player">
              <div className="player-left">
                <img
                  src={
                    playerInfo?.isTeamA === "1"
                      ? playerInfo?.isGoalKeeper
                        ? "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*lbBjRJEnuc4AAAAAAAAAAAAADsvfAQ/original"
                        : "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*0oAaS42vqWcAAAAAAAAAAAAADsvfAQ/original"
                      : playerInfo?.isGoalKeeper
                        ? "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*npULQol60WIAAAAAAAAAAAAADsvfAQ/original"
                        : "https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*BYH5SauBNecAAAAAAAAAAAAADsvfAQ/original"
                  }
                />
                <div className="player_shirtNumber">
                  {playerInfo?.player_shirtnumber}
                </div>
              </div>
              <div className="player-right">
                <div className="name">{playerInfo?.player_name}</div>
                <div className="en-name">{playerInfo?.player_enName}</div>
              </div>
            </div>
            <div className="description">
              {playerInfo?.player_name}
              为国家队出战{playerInfo?.caps}
              次，他与队友的默契程度通过历史上共同比赛的战绩计算得出。
            </div>
          </div>
        )}
      </div>
    </Mask>
  );
};

export default PersonalTacit;
