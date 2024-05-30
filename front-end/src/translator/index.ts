import { CompetePersonalInfo, GameInfo, PlayersInfoResult } from "@/interfaces";
import { calculateAngleBetweenPoints, calculateNeighborPoints } from "@/utils";
import { GraphData } from "@antv/g6";

export const gameInfoTranslator = (res: any) => {
  if (!res) {
    return {} as GameInfo;
  }

  const ratio = 3.5;
  const { resultSet = [] } = res.data;
  const {
    players_A = "",
    players_B = "",
    position_A_xy = "",
    position_B_xy = "",
  } = resultSet[0] || {};
  const playerAList = players_A.split(",");
  const playerBList = players_B.split(",");
  const playerAPositionList = position_A_xy.split("|");
  const playerBPositionList = position_B_xy.split("|");
  return {
    ...res,
    data: {
      ...res.data,
      playerAList: playerAList.map((id: string, index: number) => {
        const [x, y] = playerAPositionList[index].split(":");
        return {
          id,
          x: Number(x) * ratio,
          y: Number(y) * ratio,
        };
      }),
      playerBList: playerBList.map((id: string, index: number) => {
        const [x, y] = playerBPositionList[index].split(":");
        return {
          id,
          x: Number(x) * ratio,
          y: Number(y) * ratio,
        };
      }),
    },
  } as GameInfo;
};

export const getVoteInfoTranslator = (res: any) => {
  if (!res) {
    return {};
  }
  const teamAVote = Number(res?.data?.resultSet?.[0]["n.teamAVote"]);
  const teamBVote = Number(res?.data?.resultSet?.[0]["n.teamBVote"]);
  const isEnd = res?.data?.resultSet?.[0]["n.isEnd"] === "1";
  const totalVote = teamAVote + teamBVote;
  return {
    ...res,
    data: {
      ...res?.data,
      voteInfo: {
        isEnd,
        teamAVote,
        teamBVote,
        totalVote,
      },
    },
  };
};

export const playerTacitInfoTranslator = (res: any) => {
  if (!res) {
    return {};
  }

  const { resultSet = [] } = res.data;
  // 根据b_id，获取两个对抗值playerValue为中心对抗外围，reverse_direction_value为外围对抗中心
  let tempMap: any = {};
  resultSet.forEach((item: CompetePersonalInfo) => {
    const key = item.b_id;
    if (!tempMap[key]) {
      tempMap[key] = item;
      if (item.a_id !== item.src_id) {
        tempMap[key].reverse_direction_value = item.playerValue;
      }
    } else {
      if (item.a_id !== item.src_id) {
        tempMap[key].reverse_direction_value = item.playerValue;
      } else {
        tempMap[key].playerValue = item.playerValue;
      }
    }
  });
  const uniqueResultSet = Object.values(tempMap) as Array<CompetePersonalInfo>;
  // 中心点
  const competeCenterPlayer = {
    ...(resultSet[0] || {}),
    id: resultSet[0]?.a_id,
    player_shirtnumber: resultSet[0]?.a_shirtnumber,
    player_name: resultSet[0]?.a_personName,
    player_id: resultSet[0]?.a_id,
    player_enName: resultSet[0].a_personEnName,
    x: 180,
    y: 180,
    nodeSize: 100,
    isCenter: true,
  };
  // 计算周边点坐标
  const nodeXY = calculateNeighborPoints(
    180,
    180,
    170,
    uniqueResultSet?.length
  );
  // 向周边点内加坐标
  const competePlayerNode = uniqueResultSet?.map((item, index) => {
    return {
      ...item,
      id: item?.b_id,
      player_name: item.b_personName,
      player_id: item?.b_id,
      player_enName: item.b_personEnName,
      ...nodeXY?.[index],
      nodeSize: 100,
    };
  });

  const competePlayerEdge = competePlayerNode?.map((item) => {
    const { playerValue, reverse_direction_value } = item;
    const percentage =
      (Number(playerValue) /
        (Number(playerValue) + Number(reverse_direction_value))) *
      100;
    const targetNode = competePlayerNode?.find((node) => node.id === item.b_id);
    const deg = calculateAngleBetweenPoints(
      { x: competeCenterPlayer?.x, y: competeCenterPlayer?.y },
      { x: targetNode?.x as number, y: targetNode?.y as number }
    );
    return {
      source: item.a_id,
      target: item.b_id,
      playerValue: item.playerValue,
      deg: deg,
      percentage: percentage,
    };
  });
  return {
    ...res,
    data: {
      ...res?.data,
      competeInfo: {
        nodes: [competeCenterPlayer, ...competePlayerNode],
        edges: competePlayerEdge,
      },
      competeCenterPlayer,
    },
  };
};

export const personalTacitTranslator = (
  list: Record<string, any>[],
  selectedPlayerInfo: PlayersInfoResult,
  playersInfo: Array<PlayersInfoResult>,
  isHome: boolean
) => {
  const data: GraphData = {
    nodes: [],
    edges: [],
  };

  const vw = innerWidth / 100;
  const r = 35 * vw;
  const neighborPoints = calculateNeighborPoints(150, 150, r, 10);
  data.nodes = [
    {
      id: selectedPlayerInfo.player_id,
      ...selectedPlayerInfo,
      nodeSize: 80,
      x: 150,
      y: 150,
    },
    ...list.map((item, index: number) => {
      const { b_id } = item;
      const playerInfo = playersInfo.find((item) => item.player_id === b_id);
      const neighborPoint = neighborPoints[index];
      return {
        ...playerInfo,
        id: item.b_id,
        player_id: item.b_id,
        player_enName: item.b_personEnName,
        player_name: item.b_personName,
        isTeamA: isHome ? "1" : "0",
        x: neighborPoint.x,
        y: neighborPoint.y,
        nodeSize: 80,
      };
    }),
  ];

  data.edges = list.map((item) => {
    const { a_id, b_id, playerValue } = item;
    return {
      source: a_id,
      target: b_id,
      playerValue,
      stroke: isHome
        ? "linear-gradient(#55091C 10%, #910510 25%, #910510B8 50%,#910510 75%, #55091C 90%)"
        : "linear-gradient(#0F2EAB, rgba(20,60,219,0.9),#0F2EAB)",
    };
  });
  return data;
};
