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

const PersonalTacitGraph: React.FC<PersonalTacitGraphProps> = ({
  graphData,
  containerId,
  style,
}) => {
  useEffect(() => {
    const container = document.getElementById(containerId);
    const zoomY = container?.clientHeight! * 0.002;
    const zoomX = container?.clientWidth! * 0.0028;
    const graph = new Graph({
      background: "transparent",
      container: containerId,
      animation: false,
      data: graphData,
      autoFit: "center",
      node: {
        type: "react",
        style: {
          x: (d: any) => d.x * zoomX,
          y: (d: any) => d.y * zoomY,
          fill: "transparent",
          component: (data: PlayersInfoResult) => (
            <PlayerNode playerInfo={data} />
          ),
          size: [20, 60],
        },
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
          haloShadowBlur: 20,
        },
        animation: {
          // disable default enter and exit animation
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