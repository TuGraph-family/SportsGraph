import { GameInfo } from "@/interfaces";
import {
  calculateAngleBetweenPoints,
  calculateNeighborPoints,
  uniqueArrayById,
} from "@/utils";

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
  const totalVote = teamAVote + teamBVote;
  return {
    ...res,
    data: {
      ...res?.data,
      voteInfo: {
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

  const competeCenterPlayer = {
    ...(resultSet[0] || {}),
    id: resultSet[0]?.a_id,
    player_shirtnumber: resultSet[0]?.a_shirtnumber,
    player_name: resultSet[0]?.a_personName,
    player_id: resultSet[0]?.a_id,
    player_enName: resultSet[0].a_personEnName,
    x: 180,
    y: 180,
    nodeSize: 300,
  };
  const uniqueResultSet = uniqueArrayById(resultSet, "b_id");
  const nodeXY = calculateNeighborPoints(
    180,
    180,
    170,
    uniqueResultSet?.length
  );
  const competePlayerNode = uniqueResultSet?.map((item, index) => {
    return {
      ...item,
      id: item?.b_id,
      player_name: item.b_personName,
      player_id: item?.b_id,
      player_enName: item.b_personEnName,
      ...nodeXY?.[index],
      nodeSize: 300,
    };
  });

  const competePlayerEdge = competePlayerNode?.map((item) => {
    const percentage = (item.playerValue / 30) * 100;
    const targetNode = competePlayerNode?.find((node) => node.id === item.b_id);
    const deg = calculateAngleBetweenPoints(
      { x: competeCenterPlayer?.x, y: competeCenterPlayer?.y },
      { x: targetNode?.x, y: targetNode?.y }
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
