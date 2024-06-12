import { PlayersInfoResult } from "@/interfaces";
import { Graph, GraphData } from "@antv/g6";
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

const zoomRatio = 0.004;

const CompeteGraph: React.FC<CompeteGraphProps> = ({
  containerId,
  graphData,
  onClickNode,
}) => {
  const [state, setState] = useImmer<{ graph?: Graph }>({});
  const { graph } = state;

  useEffect(() => {
    const container = document.getElementById(containerId);

    const graph = new Graph({
      // renderer: () => new Renderer(),
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
            <PlayerNode
              dataAspm="c364607.d452412"
              playerInfo={data.data}
              onClick={() => onClickNode(data.data)}
              animation={{
                animationDelay: [
                  `${data.data.animationDelay! + 1}s`,
                  `${data.data.animationDelay! + 1}s`,
                ],
                animationType: ["fade", "translate"],
                animationDuration: ["1s", "0.4s"],
              }}
              isActive={data.data.isInTop}
              isCompete={true}
            />
          ),
          size: [60, 60],
        },
      },
    });
    setState((draft) => {
      draft.graph = graph;
    });
  }, []);

  useEffect(() => {
    if (graphData.nodes?.length && graph) {
      graph?.setData(graphData);
      graph?.render();
      graph?.on("afterrender", () => {
        graph.fitView({ direction: "both", when: "overflow" }, false);
      });
    }
  }, [graphData]);
  return (
    <div className="compete-graph">
      <div id={containerId} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default CompeteGraph;
