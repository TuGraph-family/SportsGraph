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

export const calculateAngleBetweenPoints = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) => {
  // 计算向量的dx和dy
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;

  // 使用Math.atan2()计算角度，结果是(-π, π]范围内的弧度值
  const angleInRadians = Math.atan2(dy, dx);

  // 将弧度转换为度数，并根据需要调整正负
  const angleInDegrees = angleInRadians * (180 / Math.PI);

  return angleInDegrees;
};

export const getDayOfWeek = (
  dateString: string | number | Date | undefined
) => {
  if (dateString) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const days = [
      "周日 ",
      "周一 ",
      "周二 ",
      "周三 ",
      "周四 ",
      "周五 ",
      "周六 "
    ];

    return days[dayOfWeek];
  } else return undefined;
};
export const getTaticLineWidth = (taticValue: number) => {
  let lineWidth = (taticValue / 30) * 12;
  if (lineWidth < 2) lineWidth = 2;
  if (lineWidth > 12) lineWidth = 12;
  return lineWidth;
};
