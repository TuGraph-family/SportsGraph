import { ExtensionCategory, Line, register } from "@antv/g6";

class PathInLine extends Line {
  onCreate() {
    const shape: any = this.shapeMap.key;
    const length = shape.getTotalLength();
    shape.animate(
      [{ lineDash: [0, length + 10] }, { lineDash: [10 + length, 0] }],
      {
        duration: 500,
        fill: "both"
      }
    );
  }
}
export const registerAnimateLine = () => {
  register(ExtensionCategory.EDGE, "path-in-line", PathInLine);
};
