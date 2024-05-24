import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData } from "@antv/g6";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { registerAnimateLine } from "../animate-line";
import PlayerNode from "../player-node";

registerAnimateLine();

interface TacitGraphProps {
  graphData: GraphData;
  containerId: string;
  style?: React.CSSProperties;
  onNodeClick?: (
    playerid: string,
    playersInfo: Array<PlayersInfoResult>
  ) => void;
}

const nodeSizeRatio = 0.3;
const minNodeSize = 60;
const maxNodeSize = 70;

const TacitGraph: React.FC<TacitGraphProps> = ({
  graphData,
  containerId,
  style,
  onNodeClick
}) => {
  const [state, setState] = useImmer<{ graph?: Graph }>({});
  const { graph } = state;

  useEffect(() => {
    const container = document.getElementById(containerId);
    const zoomY = container?.clientHeight! * 0.0022;
    const zoomX = container?.clientWidth! * 0.0028;
    const graph = new Graph({
      background: "transparent",
      container: containerId,
      animation: true,
      data: graphData,
      zoom: 0.9,
      node: {
        type: "react",
        style: {
          x: (d: any) => d.x * zoomX,
          y: (d: any) => d.y * zoomY,
          fill: "transparent",
          component: (data: PlayersInfoResult) => (
            <PlayerNode playerInfo={data} />
          ),
          size: (d: any) => {
            let nodeSize = d.nodeSize * nodeSizeRatio;
            if (nodeSize < minNodeSize) {
              nodeSize = minNodeSize;
            } else if (nodeSize > maxNodeSize) {
              nodeSize = maxNodeSize;
            }
            return [nodeSize * 0.1, nodeSize * 1.2];
          }
        }
      },
      edge: {
        type: "path-in-line",
        style: {
          stroke: (d: any) => d.stroke,
          lineWidth: (d) => {
            return Number(d.playerValue);
          },
          halo: true,
          haloStroke: "#fff",
          haloStrokeWidth: (d) => Number(d.playerValue),
          haloLineWidth: (d) => Number(d.playerValue) + 1,
          haloShadowColor: "#fff",
          haloShadowBlur: 20
        },
        animation: {
          // disable default enter and exit animation
          enter: false,
          exit: false
        }
      }
    });
    setState((draft) => {
      draft.graph = graph;
    });
  }, []);
  useEffect(() => {
    if (graphData.nodes?.length && graph) {
      graph?.setData(graphData);
      graph?.on("node:click", (e) => {
        const playersInfo = graph.getNodeData();
        onNodeClick?.(
          e.target.id,
          playersInfo as unknown as PlayersInfoResult[]
        );
      });
      graph.render();
      // graph?.on("afterrender", () => {
      //   graph.fitView({ direction: "both", when: "overflow" });
      // });
    }
    return () => {
      graph?.off("node:click");
    };
  }, [graphData]);

  return (
    <div className="tacit-graph">
      <div
        id={containerId}
        style={{ width: "100%", height: "100%", ...style }}
      />
    </div>
  );
};

export default TacitGraph;
