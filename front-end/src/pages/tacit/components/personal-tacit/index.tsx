import PersonalTacitGraph from "@/components/personal-tacit-graph";
import PlayerNode from "@/components/player-node";
import { PlayersInfoResult } from "@/interfaces";
import { GraphData } from "@antv/g6";
import { Mask } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import React from "react";
import "./index.less";
import IconFont from "@/components/icon-font";

interface TacitGraphProps {
  personalTacitData: GraphData;
  playerInfo?: PlayersInfoResult;
  visible: boolean;
  setVisible: (val: boolean) => void;
}

const PersonalTacit: React.FC<TacitGraphProps> = ({
  personalTacitData,
  playerInfo,
  visible,
  setVisible,
}) => {
  return (
    <Mask
      color="#060c34b8"
      visible={visible}
      destroyOnClose={true}
      onMaskClick={() => setVisible(false)}
    >
      <div className="personal-tacit">
        <div className="personal-graph">
          <PersonalTacitGraph
            containerId="personalTacit"
            graphData={personalTacitData}
          />
          <div onClick={() => setVisible(false)} className="close">
            <IconFont type="euro-icon-danchuang-guanbi" style={{color:'#fff'}} />
          </div>
        </div>

        {playerInfo && (
          <div className="player-info">
            <div className="player">
              <div className="player-left">
                <PlayerNode
                  playerInfo={{ ...playerInfo!, nodeSize: 20 }}
                  showName={false}
                />
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
