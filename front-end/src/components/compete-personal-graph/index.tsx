import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData } from "@antv/g6";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { registerAnimateLine } from "../animate-line";
import PlayerNode from "../player-node";

registerAnimateLine();

interface CompetePersonalGraphProps {
  graphData: GraphData;
  containerId: string;
  onClickNode?: (nodeData: any) => void;
  style?: React.CSSProperties;
}

const nodeSizeRatio = 0.3;

const CompetePersonalGraph: React.FC<CompetePersonalGraphProps> = ({
  graphData,
  containerId,
  onClickNode,
  style
}) => {
  const [state, setState] = useImmer<{ graph?: Graph }>({});
  const { graph } = state;

  useEffect(() => {
    const graph = new Graph({
      background: "transparent",
      container: containerId,
      zoom: 0.9,
      node: {
        type: "react",
        style: {
          x: (d: any) => d.x,
          y: (d: any) => d.y,
          fill: "transparent",
          component: (data: PlayersInfoResult) => (
            <PlayerNode
              dataAspm="c364607.d452412"
              playerInfo={data}
              onClick={() => onClickNode?.(data)}
            />
          ),
          size: [60, 60],
          ports: () => {
            return [{ key: "center", placement: [0.5, 0.5] }];
          }
        }
      },
      edge: {
        type: "path-in-line",
        style: {
          stroke: (d: any) => d.stroke,
          lineWidth: 7,
          halo: true,
          haloStroke: "#fff",
          haloStrokeWidth: 5,
          haloLineWidth: 6,
          haloShadowColor: "#fff",
          haloShadowBlur: 10,
          labelPlacement: (d) => {
            return Number(d.percentage) / 100;
          },
          labelOffsetX: 0,
          label: true,
          labelFontFamily: "euro-iconfont",
          labelText: "❯❯❯❮❮❮",
          labelAutoRotate: true,
          labelFill: "#fff",
          labelFontSize: 8,
          labelFontWeight: 500,
          labelOpacity: 0.6,
          labelLineHeight: 11
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
      graph.setData(graphData);
      graph.render();
    }
  }, [graphData]);

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
