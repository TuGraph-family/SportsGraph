import { GameInfo, PlayersInfoResult } from "@/interfaces";
import { calculateNeighborPoints } from "@/utils";
import { GraphData } from "@antv/g6";
import { uniqBy } from "lodash";

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
  const neighborPoints = calculateNeighborPoints(150, 150, 35 * vw, 10);
  data.nodes = [
    {
      id: selectedPlayerInfo.player_id,
      ...selectedPlayerInfo,
      nodeSize: 100,
      x: 150,
      y: 150,
    },
    ...list.map((item, index: number) => {
      const { b_id } = item;
      const playerInfo = playersInfo.find((item) => item.player_id === b_id);
      const neighborPoint = neighborPoints[index];
      return {
        id: item.b_id,
        player_id: item.b_id,
        player_enName: item.b_personEnName,
        player_name: item.b_personName,
        isTeamA: "1",
        x: neighborPoint.x,
        y: neighborPoint.y,
        nodeSize: 100,
        ...playerInfo,
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
        ? "linear-gradient(rgba(82, 9, 29, 1), rgba(159, 4, 13, 0.9), rgba(82, 9, 29, 1))"
        : "linear-gradient(#0F2EAB, rgba(20,60,219,0.9),#0F2EAB)",
    };
  });
  return data;
};
