import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData } from "@antv/g6";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import PlayerNode from "../player-node";

interface TacitGraphProps {
  graphData: GraphData;
  containerId: string;
  style?: React.CSSProperties;
}

const TacitGraph: React.FC<TacitGraphProps> = ({
  graphData,
  containerId,
  style
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
          size: [30, 60]
        }
      },
      edge: {
        style: {
          stroke: (d: any) => d.stroke,
          lineWidth: (d) => {
            return Number(d.playerValue);
          },
          halo: true,
          haloStroke: "#fff",
          haloStrokeWidth: (d) => Number(d.playerValue),
          haloLineWidth: (d) => Number(d.playerValue) + 2,
          haloShadowBlur: 20
        }
      }
    });
    setState((draft) => {
      draft.graph = graph;
    });
  }, []);
  useEffect(() => {
    if (graphData.nodes?.length && graph) {
      graph.setData(graphData);
      graph.render();
    }
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
