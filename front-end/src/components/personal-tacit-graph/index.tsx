import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData } from "@antv/g6";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { registerAnimateLine } from "../animate-line";
import PlayerNode from "../player-node";

registerAnimateLine();

interface PersonalTacitGraphProps {
  graphData: GraphData;
  containerId: string;
  style?: React.CSSProperties;
  onNodeClick?: (playerid: string, playerInfo: PlayersInfoResult) => void;
}

const nodeSizeRatio = 0.3;
const minNodeSize = 60;
const maxNodeSize = 70;

const PersonalTacitGraph: React.FC<PersonalTacitGraphProps> = ({
  graphData,
  containerId,
  style,
  onNodeClick
}) => {
  const [state, setState] = useImmer<{ graph?: Graph }>({});
  const { graph } = state;
  useEffect(() => {
    const graph = new Graph({
      background: "transparent",
      container: containerId,
      data: graphData,
      zoom: 0.9,
      node: {
        type: "react",
        style: {
          x: (d: any) => d.x,
          y: (d: any) => d.y,
          fill: "transparent",
          component: (data: PlayersInfoResult) => (
            <PlayerNode
              playerInfo={data}
              onClick={() => onNodeClick?.(data.player_id, data)}
            />
          ),
          size: (d: any) => {
            let nodeSize = d.nodeSize * nodeSizeRatio;
            if (nodeSize < minNodeSize) {
              nodeSize = minNodeSize;
            } else if (nodeSize > maxNodeSize) {
              nodeSize = maxNodeSize;
            }
            return [nodeSize, nodeSize];
          },
          ports: (d) => {
            return [{ key: "center", placement: [0.5, 0.5] }];
          }
        }
      },
      edge: {
        type: "path-in-line",
        style: {
          stroke: (d: any) => d.stroke,
          lineWidth: (d) => {
            return Number(d.playerValue);
          }
        },
        animation: {
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
    if (graph) {
      graph.setData(graphData);
      graph.render();
    }
  }, [graphData]);

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
