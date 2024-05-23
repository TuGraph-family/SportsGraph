import queryString from "query-string";
export const parseSearch = (search: string) =>
  queryString.parse(search?.trim().replace(/^[?]+/g, ""));
export const searchFy = <P extends object>(params: P) =>
  `?${queryString.stringify(params)}`;

export const calculateNeighborPoints = (
  cx: number,
  cy: number,
  r: number,
  n: number
) => {
  // cx、cy是中心点坐标，r是圆的半径，n是围绕中心点的点个数
  const angleInc = (2 * Math.PI) / n;
  const points = [];

  for (let i = 0; i < n; i++) {
    const theta = angleInc * i;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    points.push({ x, y });
  }

  return points;
};
