import { PlayersInfoResult } from "@/interfaces";
import { GraphData } from "@antv/g6";
import React from "react";
import { Mask, Space } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import PlayerNode from "@/components/player-node";
import "./index.less";
import PersonalTacitGraph from "@/components/personal-tacit-graph";
import Loading from "@/components/loading";

interface TacitGraphProps {
  personalTacitData: GraphData;
  playerInfo?: PlayersInfoResult;
  loadingGetPlayerTacitInfo: boolean;
  visible: boolean;
  setVisible: (val: boolean) => void;
}

const PersonalTacit: React.FC<TacitGraphProps> = ({
  personalTacitData,
  playerInfo,
  loadingGetPlayerTacitInfo,
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
        <Loading loading={loadingGetPlayerTacitInfo} />
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
              <PlayerNode playerInfo={{ ...playerInfo!, nodeSize: 40 }} />
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="player-name">{playerInfo?.player_name}</div>
              <div className="player-en-name">{playerInfo?.player_enName}</div>
            </div>
          </Space>
          <div className="description">
            {playerInfo?.player_name}
            为国家队出战{playerInfo?.caps}
            次，他与队友的默契程度通过历史上共同比赛的战绩计算得出
          </div>
        </div>
      </div>
    </Mask>
  );
};

export default PersonalTacit;
