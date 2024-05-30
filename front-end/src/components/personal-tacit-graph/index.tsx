import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData } from "@antv/g6";
import React, { useEffect } from "react";
import { registerAnimateLine } from "../animate-line";
import PlayerNode from "../player-node";

registerAnimateLine();

interface PersonalTacitGraphProps {
  graphData: GraphData;
  containerId: string;
  style?: React.CSSProperties;
}

const nodeSizeRatio = 0.3;
const minNodeSize = 60;
const maxNodeSize = 70;

const PersonalTacitGraph: React.FC<PersonalTacitGraphProps> = ({
  graphData,
  containerId,
  style,
}) => {
  useEffect(() => {
    const graph = new Graph({
      background: "transparent",
      container: containerId,
      animation: false,
      data: graphData,
      autoFit: "center",
      node: {
        type: "react",
        style: {
          x: (d: any) => d.x,
          y: (d: any) => d.y,
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
          },
        },
      },
      edge: {
        type: "path-in-line",
        style: {
          stroke: (d: any) => d.stroke,
          lineWidth: (d) => {
            return Number(d.playerValue);
          },
        },
        animation: {
          enter: false,
          exit: false,
        },
      },
    });
    graph.render();
    graph.fitView();
  }, []);

  return (
    <div className="personal-tacit-graph">
      <div
        id={containerId}
        style={{ width: "100%", height: "100%", ...style }}
      />
    </div>
  );
};

export default PersonalTacitGraph;
