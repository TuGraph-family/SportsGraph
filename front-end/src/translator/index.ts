import { GameInfo } from "@/interfaces";

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
    position_B_xy = ""
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
          y: Number(y) * ratio
        };
      }),
      playerBList: playerBList.map((id: string, index: number) => {
        const [x, y] = playerBPositionList[index].split(":");
        return {
          id,
          x: Number(x) * ratio,
          y: Number(y) * ratio
        };
      })
    }
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
        totalVote
      }
    }
  };
};
