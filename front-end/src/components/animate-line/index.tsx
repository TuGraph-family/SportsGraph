import { ExtensionCategory, Line, register } from "@antv/g6";

class DelayPathInLine extends Line {
  onCreate() {
    const shape: any = this.shapeMap.key;
    const length = shape.getTotalLength();
    shape.animate([{ lineDash: [0, length] }, { lineDash: [length, 0] }], {
      duration: 600,
      fill: "both",
      delay: 1600
    });
  }
}

class PathInLine extends Line {
  onCreate() {
    // const edgeInfo = this.attributes.context?.graph.getEdgeData(this.id);
    // const { percentage} = edgeInfo || {}
    const shape: any = this.shapeMap.key;
    const length = shape.getTotalLength();
    shape.animate([{ lineDash: [0, length] }, { lineDash: [length, 0] }], {
      duration: 600,
      fill: "both"
    });
  }
}

export const registerAnimateLine = () => {
  register(ExtensionCategory.EDGE, "path-in-line", PathInLine);
};
export const registerDelayAnimateLine = () => {
  register(ExtensionCategory.EDGE, "delay-path-in-line", DelayPathInLine);
};
