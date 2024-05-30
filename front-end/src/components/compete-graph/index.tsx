import { PlayersInfoResult } from "@/interfaces";
import { Renderer } from "@antv/g-svg";
import { Graph, GraphData, IEvent, NodeEvent } from "@antv/g6";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import PlayerNode from "../player-node";
import "./index.less";

interface CompeteGraphProps {
  containerId: string;
  graphData: GraphData;
  onClickNode: (nodeData: any) => void;
  teamType?: "home" | "away";
}

const nodeSizeRatio = 0.3;
const minNodeSize = 60;
const maxNodeSize = 70;
const zoomRatio = 0.004;

const CompeteGraph: React.FC<CompeteGraphProps> = ({
  containerId,
  graphData,
  onClickNode
}) => {
  const [state, setState] = useImmer<{ graph?: Graph }>({});
  const { graph } = state;

  useEffect(() => {
    const container = document.getElementById(containerId);

    const graph = new Graph({
      renderer: () => new Renderer(),
      background: "transparent",
      container: containerId,
      animation: true,
      zoom: container?.clientHeight! * zoomRatio,
      node: {
        type: "react",
        style: {
          x: (d: any) => d.data.x,
          y: (d: any) => d.data.y,
          component: (data: { data: PlayersInfoResult }) => (
            <PlayerNode playerInfo={data.data} />
          ),
          size: (d: any) => {
            let nodeSize = d.data.nodeSize * nodeSizeRatio;
            if (nodeSize < minNodeSize) {
              nodeSize = minNodeSize;
            } else if (nodeSize > maxNodeSize) {
              nodeSize = maxNodeSize;
            }
            return [nodeSize, nodeSize];
          },
          zIndex: (d: any) => {
            return d.data.zIndex;
          }
        }
      }
    });
    setState((draft) => {
      draft.graph = graph;
    });
  }, []);

  useEffect(() => {
    const handleNodeClick = (event: IEvent) => {
      onClickNode(graph?.getNodeData(event?.target?.id));
    };
    if (graphData.nodes?.length && graph) {
      graph?.setData(graphData);
      graph?.render();
      graph?.on("afterrender", () => {
        graph.fitView({ direction: "both", when: "overflow" });
      });
      graph?.on(`node:${NodeEvent.CLICK}`, handleNodeClick);
      return () => {
        graph.off("node:click", handleNodeClick);
      };
    }
  }, [graphData]);
  return (
    <div className="compete-graph">
      <div id={containerId} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default CompeteGraph;
