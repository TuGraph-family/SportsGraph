import CompetePersonalGraph from "@/components/compete-personal-graph";
import IconFont from "@/components/icon-font";
import Loading from "@/components/loading";
import PlayerNode from "@/components/player-node";
import { PlayersInfoResult } from "@/interfaces";
import { getPlayerCompeteInfo } from "@/services";
import { calculateNeighborPoints } from "@/utils";
import { GraphData } from "@antv/g6";
import { useRequest } from "@umijs/max";
import { Mask } from "antd-mobile";
import React, { useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import "./index.less";

interface CompetePersonalModalProps {
  visible: boolean;
  onClose: () => void;
  params: { id: string; isteama: string; playerId: string } | undefined;
  allPlayer: Array<PlayersInfoResult>;
}

const centerOffsetX = 40;
const centerOffsetY = 70;
const graphMinSize = 200;
const graphMaxSize = 480;
const mappedValue = 150;
const radioOffset = 25;
const CompetePersonalModal: React.FC<CompetePersonalModalProps> = ({
  visible,
  onClose,
  params,
  allPlayer
}) => {
  const [state, setState] = useImmer<{
    competeCenterPlayer: PlayersInfoResult | undefined;
    competeGraphData: GraphData;
  }>({
    competeCenterPlayer: undefined,
    competeGraphData: { nodes: [], edges: [] }
  });

  const { competeCenterPlayer, competeGraphData } = state;
  const { run: runGetPlayerTacitInfo, loading: loadingGetPlayerTacitInfo } =
    useRequest(getPlayerCompeteInfo, { manual: true });

  const graphData = useMemo(() => {
    const container = document.getElementById("personal-graph");
    const radio = Math.min(container?.clientWidth!, container?.offsetHeight!);
    const nodeSize =
      ((radio - graphMinSize) / (graphMaxSize - graphMinSize)) * mappedValue;
    const centerXY = {
      x: (container?.clientWidth! - centerOffsetX) / 2 - 10,
      y: (container?.offsetHeight! - centerOffsetY) / 2
    };
    const nodeXY = calculateNeighborPoints(
      centerXY?.x,
      centerXY.y,
      radio / 2 - radioOffset,
      competeGraphData?.nodes?.length ? competeGraphData?.nodes?.length - 1 : 1
    );
    let nodeIndex = 0;
    const newNodes = competeGraphData?.nodes?.map((node) => {
      // 中心球员
      if (node?.id === node?.a_id) {
        const playerInfo = allPlayer?.find((item) => {
          return item.player_id === node.a_id;
        });
        return {
          ...params,
          ...node,
          ...centerXY,
          player_shirtnumber: playerInfo?.player_shirtnumber,
          isTeamA: playerInfo?.isTeamA,
          nodeSize
        };
      } else {
        const playerInfo = allPlayer?.find((item) => {
          return item.player_id === node.b_id;
        });
        nodeIndex += 1;
        return {
          ...node,
          ...nodeXY[nodeIndex - 1],
          player_shirtnumber: playerInfo?.player_shirtnumber,
          isTeamA: playerInfo?.isTeamA,
          nodeSize
        };
      }
    });
    const newEdges = competeGraphData?.edges?.map((edge) => {
      const isTeamA = allPlayer?.find((item) => {
        return item.player_id === edge.source;
      })?.isTeamA;
      return {
        ...edge,
        isTeamA: isTeamA,
        stroke:
          isTeamA === "1"
            ? `linear-gradient(${edge?.deg}deg,rgba(82, 9, 29, 1) 0%,rgba(159, 4, 13, 0.9) ${edge?.percentage}%,rgba(22, 119, 255, 1) ${edge?.percentage}%, rgba(21, 52, 90, 0.9) 100% )`
            : `linear-gradient(${edge?.deg}deg,rgba(22, 75, 145, 1) 0%,rgba(22, 119, 255, 1) ${edge?.percentage}%,rgba(159, 4, 13, 0.9) ${edge?.percentage}%, rgba(82, 9, 29, 1) 100% )`
      };
    });
    setState((draft) => {
      draft.competeCenterPlayer = newNodes?.[0] as unknown as PlayersInfoResult;
    });
    return { nodes: newNodes, edges: newEdges };
  }, [competeGraphData, allPlayer, params]);

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
    <Mask
      visible={visible}
      destroyOnClose
      color="#060c34b8"
      className="personal-mask"
    >
      <div className={"compete-personal"} onClick={onClose}>
        <Loading loading={loadingGetPlayerTacitInfo} />

        <div className="compete-personal-graph">
          <CompetePersonalGraph
            graphData={graphData}
            containerId="personal-graph"
          />
          <div onClick={onClose} className="compete-personal-icon">
            <IconFont
              type="euro-icon-danchuang-guanbi"
              style={{ color: "#fff" }}
            />
          </div>
        </div>
        {competeCenterPlayer ? (
          <div className="compete-personal-card">
            <div className="compete-personal-card-player">
              <div className="compete-personal-card-player-left">
                <PlayerNode
                  playerInfo={{ ...competeCenterPlayer, nodeSize: 20 }}
                  showName={false}
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
              次。他与对手的对抗程度通过历史上共同比赛的战绩计算得出。
            </div>
          </div>
        ) : null}
      </div>
    </Mask>
  );
};

export default CompetePersonalModal;
