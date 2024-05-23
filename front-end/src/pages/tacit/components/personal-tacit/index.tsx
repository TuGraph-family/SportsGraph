import { PlayersInfoResult } from "@/interfaces";
import { GraphData } from "@antv/g6";
import React from "react";
import TacitGraph from "@/components/tacit-graph";
import { Mask, Space } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import PlayerNode from "@/components/player-node";
import "./index.less";
import PersonalTacitGraph from "@/components/tacit-graph-graph";

interface TacitGraphProps {
  personalTacitData: GraphData;
  playerInfo?: PlayersInfoResult;
  bestTacitPlayerInfo?: Record<string, string>;
  visible: boolean;
  setVisible: (val: boolean) => void;
}

const PersonalTacit: React.FC<TacitGraphProps> = ({
  personalTacitData,
  playerInfo,
  bestTacitPlayerInfo,
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
          {playerInfo?.player_name}与周围的球员默契度都不错，尤其是与
          {bestTacitPlayerInfo?.player_name}的默契度达到
          {bestTacitPlayerInfo?.playerValue}
        </div>
      </div>
    </Mask>
  );
};

export default PersonalTacit;
