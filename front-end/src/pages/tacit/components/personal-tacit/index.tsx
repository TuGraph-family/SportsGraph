import { PlayersInfoResult } from "@/interfaces";
import { GraphData } from "@antv/g6";
import React from "react";
import { Mask, Space } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import PlayerNode from "@/components/player-node";
import "./index.less";
import PersonalTacitGraph from "@/components/personal-tacit-graph";

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
      <div onClick={() => setVisible(false)} className="close">
        <CloseOutline color="#ddd" />
      </div>
      <PersonalTacitGraph
        containerId="personalTacit"
        graphData={personalTacitData}
      />
      <div className="player-info">
        <Space>
          <div className="icon">
            <PlayerNode playerInfo={playerInfo!} />
          </div>
          <div style={{ marginTop: 14 }}>
            <div className="player-name">{playerInfo?.player_name}</div>
            <div className="player-en-name">{playerInfo?.player_enName}</div>
          </div>
        </Space>
        <div className="description">
          {playerInfo?.player_name}
          为国家队出战XX次，他与队友的默契程度通过历史上共同比赛的战绩计算得出
        </div>
      </div>
    </Mask>
  );
};

export default PersonalTacit;
