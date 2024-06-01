import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData } from "@antv/g6";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { registerDelayAnimateLine } from "../animate-line";
import PlayerNode from "../player-node";

registerDelayAnimateLine();

interface TacitGraphProps {
  graphData: GraphData;
  containerId: string;
  style?: React.CSSProperties;
  onNodeClick?: (playerid: string, playersInfo: PlayersInfoResult) => void;
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
  const [state, setState] = useImmer<{ graph?: Graph; isInitialized: boolean }>(
    { isInitialized: false }
  );
  const { graph } = state;

  useEffect(() => {
    const container = document.getElementById(containerId);
    const zoomY = container?.offsetHeight! * 0.0024;
    const zoomX = container?.clientWidth! * 0.0024;
    const scale = container?.offsetHeight! * 0.002;

    const getNodeSize = (d: any) => {
      let nodeSize = d.nodeSize * nodeSizeRatio;
      if (nodeSize < minNodeSize) {
        nodeSize = minNodeSize;
      } else if (nodeSize > maxNodeSize) {
        nodeSize = maxNodeSize;
      }
      return nodeSize;
    };
    const graph = new Graph({
      background: "transparent",
      container: containerId,
      animation: true,
      data: graphData,
      zoom: 1,
      node: {
        type: "react",
        style: {
          x: (d: any) => d.x * zoomX,
          y: (d: any) => d.y * zoomY,
          fill: "transparent",
          component: (data: PlayersInfoResult) => (
            <div
              style={{
                transform: `scale(${scale})`,
                width: "100%",
                height: "100%"
              }}
            >
              <PlayerNode
                playerInfo={data}
                onClick={() => onNodeClick?.(data.player_id, data)}
                animation={{
                  animationDelay: [`${data.animationDelay!}s`],
                  animationType: ["fade", "translate"],
                  animationDuration: ["1.2s", "1s"]
                }}
              />
            </div>
          ),
          size: (d: any) => {
            const nodeSize = getNodeSize(d);
            return [nodeSize, nodeSize];
          },
          ports: () => {
            return [{ key: "center", placement: [0.5, 0.5] }];
          }
        }
      },
      edge: {
        type: "delay-path-in-line",
        style: {
          stroke: (d: any) => d.stroke,
          lineWidth: (d: any) => {
            return d.playerValue;
          },
          halo: true,
          haloStroke: "#fff",
          haloStrokeWidth: (d: any) => d.playerValue,
          haloLineWidth: (d: any) => d.playerValue + 1,
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
    const onResize = () => {
      graph.resize();
    };
    window.addEventListener("resize", onResize);
    graph.on("aftersizechange", () => {
      graph.fitView();
    });
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  useEffect(() => {
    if (graphData.nodes?.length) {
      graph?.setData(graphData);
      graph?.render();
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
