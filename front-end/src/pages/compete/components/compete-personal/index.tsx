import React, { useEffect, useMemo } from "react";
import "./index.less";
import { Mask } from "antd-mobile";
import { useImmer } from "use-immer";
import Loading from "@/components/loading";
import { getPlayerTacitInfo } from "@/services";
import { useRequest } from "@umijs/max";
import CompetePersonalGraph from "@/components/compete-personal-graph";
import PlayerNode from "@/components/player-node";
import { PlayersInfoResult } from "@/interfaces";
import { GraphData } from "@antv/g6";
import { CloseOutline } from "antd-mobile-icons";
interface CompetePersonalModalProps {
  visible: boolean;
  onClose: () => void;
  params: { id: string; isteama: string; playerId: string } | undefined;
  allPlayer: Array<PlayersInfoResult>;
}

const CompetePersonalModal: React.FC<CompetePersonalModalProps> = ({
  visible,
  onClose,
  params,
  allPlayer,
}) => {
  const [state, setState] = useImmer<{
    competeCenterPlayer: PlayersInfoResult | undefined;
    competeGraphData: GraphData;
  }>({
    competeCenterPlayer: undefined,
    competeGraphData: { nodes: [], edges: [] },
  });

  const { competeCenterPlayer, competeGraphData } = state;
  const { run: runGetPlayerTacitInfo, loading: loadingGetPlayerTacitInfo } =
    useRequest(getPlayerTacitInfo, { manual: true });

  const onClickNode = (node: PlayersInfoResult) => {
    setState((draft) => {
      draft.competeCenterPlayer = node;
    });
  };

  const graphData = useMemo(() => {
    const newNodes = competeGraphData?.nodes?.map((node) => {
      if (node?.id === node?.a_id) {
        const playerInfo = allPlayer?.find((item) => {
          return item.player_id === node.a_id;
        });
        return {
          ...node,
          player_shirtnumber: playerInfo?.player_shirtnumber,
          isTeamA: playerInfo?.isTeamA,
        };
      } else {
        const playerInfo = allPlayer?.find((item) => {
          return item.player_id === node.b_id;
        });
        return {
          ...node,
          player_shirtnumber: playerInfo?.player_shirtnumber,
          isTeamA: playerInfo?.isTeamA,
        };
      }
    });
    const newEdges = competeGraphData?.edges?.map((edge) => {
      const isTeamA = allPlayer?.find((item) => {
        return item.player_id === edge.source;
      })?.isTeamA;
      return { ...edge, isTeamA: isTeamA };
    });
    setState((draft) => {
      draft.competeCenterPlayer = newNodes?.[0] as unknown as PlayersInfoResult;
    });
    return { nodes: newNodes, edges: newEdges };
  }, [competeGraphData, allPlayer]);

  useEffect(() => {
    if (visible && params) {
      runGetPlayerTacitInfo(params).then((data) => {
        setState((draft) => {
          draft.competeGraphData = data?.competeInfo;
        });
      });
    }
  }, [visible]);

  return (
    <Mask visible={visible} onMaskClick={onClose} destroyOnClose>
      <div className={"compete-personal"}>
        <Loading loading={loadingGetPlayerTacitInfo} />
        <div className="compete-personal-icon">
          <CloseOutline onClick={onClose} />
        </div>
        <div className="compete-personal-graph">
          <CompetePersonalGraph
            graphData={graphData}
            containerId="personal"
            // onClickNode={onClickNode}
          />
        </div>
        {competeCenterPlayer ? (
          <div className="compete-personal-card">
            <div className="compete-personal-card-player">
              <div className="compete-personal-card-player-left">
                <PlayerNode
                  playerInfo={{ ...competeCenterPlayer, nodeSize: 20 }}
                />
              </div>
              <div className="compete-personal-card-player-right">
                <div className="name">{competeCenterPlayer?.player_name}</div>
                <div className="en-name">
                  {competeCenterPlayer?.player_enName}
                </div>
              </div>
            </div>
            <div className="compete-personal-card-desc">
              {competeCenterPlayer?.player_name}为国家队出战
              {competeCenterPlayer?.a_caps}
              次。通过历史上与其他球员共同比赛的战绩，计算出与对手球员间的对抗程度。
            </div>
          </div>
        ) : null}
      </div>
    </Mask>
  );
};

export default CompetePersonalModal;
