import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData, NodeEvent } from "@antv/g6";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import PlayerNode from "../player-node";
import CompeteEdge from "../compete-edge";

interface CompetePersonalGraphProps {
  graphData: GraphData;
  containerId: string;
  onClickNode?: (nodeData: any) => void;
  style?: React.CSSProperties;
}

const CompetePersonalGraph: React.FC<CompetePersonalGraphProps> = ({
  graphData,
  containerId,
  onClickNode,
  style,
}) => {
  const [state, setState] = useImmer<{ graph?: Graph }>({});
  const { graph } = state;

  useEffect(() => {
    const graph = new Graph({
      background: "transparent",
      container: containerId,
      data: graphData,
      node: {
        type: "react",
        style: {
          x: (d: any) => d.x,
          y: (d: any) => d.y,
          fill: "transparent",
          component: (data: PlayersInfoResult) => (
            <PlayerNode playerInfo={data} />
          ),
          size: [50, 90],
        },
      },
      edge: {
        style: {
          stroke: (d: any) => {
            const { isTeamA, deg, percentage } = d;
            return isTeamA === "1"
              ? `linear-gradient(${deg}deg,rgba(82, 9, 29, 1) 0%,rgba(159, 4, 13, 0.9) ${percentage}%,rgba(22, 119, 255, 1) ${percentage}%, rgba(21, 52, 90, 0.9) 100% )`
              : `linear-gradient(${deg}deg,rgba(21, 52, 90, 0.9) 0%,rgba(22, 119, 255, 1) ${percentage}%,rgba(159, 4, 13, 0.9) ${percentage}%, rgba(82, 9, 29, 1) 100% )`;
          },
          lineWidth: 7,
          halo: true,
          haloStroke: "#fff",
          haloStrokeWidth: (d) => Number(d.playerValue),
          haloLineWidth: (d) => Number(d.playerValue) + 2,
          haloShadowBlur: 20,
        },
      },
    });
    setState((draft) => {
      draft.graph = graph;
    });
  }, []);

  useEffect(() => {
    if (graphData.nodes?.length && graph) {
      graph.setData(graphData);
      graph.on(`node:${NodeEvent.CLICK}`, (event: any) => {
        onClickNode?.(graph.getNodeData(event?.target?.id));
      });
      graph.render();
      graph?.on("afterrender", () => {
        graph.fitView();
      });
    }
    return () => graph?.destroy();
  }, [graphData]);

  // useEffect(() => {
  //   const c = document.getElementById(containerId);
  //   c?.addEventListener("reset", () => {
  //     console.log("323");
  //     graph?.fitView({ direction: "both", when: "overflow" });
  //     graph?.render();
  //   });
  // }, [graph, containerId]);

  return (
    <div className="compete-personal-graph">
      <div
        id={containerId}
        style={{ width: "100%", height: "100%", ...style }}
      />
    </div>
  );
};

export default CompetePersonalGraph;
