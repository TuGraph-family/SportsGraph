import {
  GameInfo,
  PlayersInfo,
  TeamCompeteInfo,
  TeamTacitInfo,
  VoteInfo,
} from "@/interfaces";
import {
  gameInfoTranslator,
  getVoteInfoTranslator,
  playerTacitInfoTranslator,
} from "@/translator";
import { request } from "@umijs/max";

const COMMOM_BODY = {
  deployEnv: "ONLINE_PRODUCTION",
  graphId: 2405,
  schemaEngineTypeEnum: "geamaker_geabase",
  limit: 1000,
  replicaId: 1,
};

export const getHistoryGameList = (params: { skip: string; limit: string }) => {
  const { skip, limit } = params;
  return request("/tugraph/api/graph/uefa/19/executeQueryTemplate", {
    method: "POST",
    data: {
      templateParameterList: [
        {
          parameterName: "skip",
          valueType: "LONG",
          parameterValue: skip,
        },
        {
          parameterName: "limit",
          valueType: "LONG",
          parameterValue: limit,
        },
      ],
      ...COMMOM_BODY,
    },
  });
};

export const getFutureGameList = (params: { skip: string; limit: string }) => {
  const { skip, limit } = params;
  return request("/tugraph/api/graph/uefa/20/executeQueryTemplate", {
    method: "POST",
    data: {
      templateParameterList: [
        {
          parameterName: "skip",
          valueType: "LONG",
          parameterValue: skip,
        },
        {
          parameterName: "limit",
          valueType: "LONG",
          parameterValue: limit,
        },
      ],
      ...COMMOM_BODY,
    },
  });
};

export const getGameVoteInfoById = (params: { id: string }) => {
  const { id } = params;
  return request<VoteInfo>("/tugraph/api/graph/uefa/21/executeQueryTemplate", {
    method: "POST",
    data: {
      templateParameterList: [
        {
          parameterName: "id",
          valueType: "LONG",
          parameterValue: id,
        },
      ],
      ...COMMOM_BODY,
    },
  }).then((res) => getVoteInfoTranslator(res));
};

export const voteTeam = (params: { matchId: string; isHome: boolean }) => {
  return request<VoteInfo>("tugraph/api/graph/uefa/vote", {
    method: "PUT",
    params: params,
  });
};

export const getTeamTacitInfo = (params: {
  id: string;
  isteama: "0" | "1";
}) => {
  const { id, isteama } = params;
  return request<TeamTacitInfo>(
    "/tugraph/api/graph/uefa/22/executeQueryTemplate",
    {
      method: "POST",
      data: {
        templateParameterList: [
          {
            parameterName: "id",
            parameterValue: id,
            valueType: "LONG",
          },
          {
            parameterName: "isteama",
            parameterValue: isteama,
            valueType: "LONG",
          },
        ],
        ...COMMOM_BODY,
      },
    }
  );
};

export const getTeamCompeteInfo = (params: {
  id: string;
  teamType: "home" | "away";
}) => {
  const { id, teamType } = params;
  const isHome = teamType === "home";
  return request<TeamCompeteInfo>(
    "/tugraph/api/graph/uefa/32/executeQueryTemplate",
    {
      method: "POST",
      data: {
        templateParameterList: [
          {
            parameterName: "id",
            parameterValue: id,
            valueType: "LONG",
          },
          {
            parameterName: "teama",
            parameterValue: isHome ? "1" : "0",
            valueType: "LONG",
          },
          {
            parameterName: "teamb",
            parameterValue: isHome ? "0" : "1",
            valueType: "LONG",
          },
        ],
        ...COMMOM_BODY,
      },
    }
  );
};
export const getPlayerTacitInfo = (params: {
  id: string;
  isteama: string;
  playerId: string;
}) => {
  const { id, isteama, playerId } = params;
  return request("/tugraph/api/template/23/executeQueryTemplate", {
    method: "POST",
    data: {
      templateParameterList: [
        {
          parameterName: "matchid",
          parameterValue: id,
          valueType: "LONG",
        },
        {
          parameterName: "isteama",
          parameterValue: isteama,
          valueType: "LONG",
        },
        {
          parameterName: "playerid",
          parameterValue: playerId,
          valueType: "LONG",
        },
      ],
      ...COMMOM_BODY,
    },
  }).then((data) => {
    return playerTacitInfoTranslator(data);
  });
};

export const getPlayerCompeteInfo = (params: {
  id: string;
  isteama: string;
  playerId: string;
}) => {
  const { id, isteama, playerId } = params;
  return request("/tugraph/api/template/39/executeQueryTemplate", {
    method: "POST",
    data: {
      templateParameterList: [
        {
          parameterName: "matchid",
          parameterValue: id,
          valueType: "LONG",
        },
        {
          parameterName: "isteama",
          parameterValue: isteama,
          valueType: "LONG",
        },
        {
          parameterName: "playerid",
          parameterValue: playerId,
          valueType: "LONG",
        },
      ],
      ...COMMOM_BODY,
    },
  }).then((data) => {
    return playerTacitInfoTranslator(data);
  });
};

export const login = () => {
  return request("/tugraph/api/login/auth_free").then((res) => {
    const date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    if (res.success) {
      if (res.data) {
        const { domain, gmToken } = res.data;
        document.cookie = `gmToken=${gmToken}${expires}; path=/; domain=${domain}`;
      }
    }
  });
};

export const getGameInfo = (params: { id: string }) => {
  const { id } = params;
  return request<GameInfo>("/tugraph/api/graph/uefa/26/executeQueryTemplate", {
    method: "POST",
    data: {
      templateParameterList: [
        {
          parameterName: "id",
          parameterValue: id,
          valueType: "LONG",
        },
      ],
      ...COMMOM_BODY,
    },
  }).then((data) => gameInfoTranslator(data));
};

export const getPlayersInfo = (params: { id: string }) => {
  const { id } = params;
  return request<PlayersInfo>(
    "/tugraph/api/graph/uefa/28/executeQueryTemplate",
    {
      method: "POST",
      data: {
        templateParameterList: [
          {
            parameterName: "id",
            parameterValue: id,
            valueType: "LONG",
          },
        ],
        ...COMMOM_BODY,
      },
    }
  );
};
