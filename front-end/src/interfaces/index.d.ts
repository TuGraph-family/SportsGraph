interface CommonResponseResult {
  code: string;
  ecChineseMsg: string;
  ecEnglishMsg: string;
  errorCode: string;
  errorMsg: string;
  id: string;
  ip: string;
  message: string;
  responseCode: string;
  solution: string;
  success: boolean;
}

export interface PlayersInfoResult {
  isTeamA: string;
  player_id: string;
  player_name: string;
  player_shirtnumber: string;
  nodeSize?: number;
  player_enName?: string;
  a_caps?: string;
}

export interface PlayersInfo extends CommonResponseResult {
  data: {
    resultSet: Array<PlayersInfoResult>;
  };
}

export interface TeamTacitInfoResult {
  a_id: string;
  b_id: string;
  playerValue: string;
  value_rank: string;
}

export interface TeamTacitInfo extends CommonResponseResult {
  data: {
    resultSet: Array<TeamTacitInfoResult>;
  };
}

export interface TeamCompeteInfoResult {
  value_rank: string;
  a_id: string;
}

export interface TeamCompeteInfo extends CommonResponseResult {
  data: {
    resultSet: Array<TeamCompeteInfoResult>;
  };
}

export interface GameInfoPlayerResult {
  id: string;
  x: number;
  y: number;
}

export interface GameInfoResult {
  awayWinProbability: string;
  homeWinProbability: string;
  team_a_country: string;
  team_a_national_flag: string;
  team_b_country: string;
  team_b_national_flag: string;
}

export interface GameInfo extends CommonResponseResult {
  data: {
    playerAList: Array<GameInfoPlayerResult>;
    playerBList: Array<GameInfoPlayerResult>;
    resultSet: Array<GameInfoResult>;
  };
}

export interface VoteInfoResult {
  "n.isEnd": string;
  teamAVote: number;
  teamBVote: number;
  totalVote: number;
}

export interface VoteInfo extends CommonResponseResult {
  data: {
    resultSet: Array<VoteInfoResult>;
  };
}

export interface CompetePersonalInfo extends PlayersInfoResult {
  a_personName: string;
  src_id: string;
  a_personEnName: string;
  b_personEnName: string;
  timee: string;
  b_personName: string;
  a_caps: string;
  a_id: string;
  b_id: string;
  dst_id: string;
  b_caps: string;
  playerValue: string;
  matchId: string;
  reverse_direction_value: string;
  x?: number;
  y?: number;
  nodeSize?: number;
}
export interface PersonalTacitInfoResult {
  value_rank: string;
  a_id: string;
}

export interface TeamPersonalTacitInfo extends CommonResponseResult {
  data: {
    resultSet: Array<PersonalTacitInfoResult>;
  };
}
