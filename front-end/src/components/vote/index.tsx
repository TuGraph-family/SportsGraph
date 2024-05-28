import { voteTeam } from "@/services";
import { parseSearch } from "@/utils";
import { useRequest } from "@umijs/max";
import React, { useMemo } from "react";
import { useImmer } from "use-immer";
import Slider from "../slider";
import TriangleButton from "../triangle-button";
import "./index.less";
import { Toast } from "antd-mobile";

interface VoteProps {
  team1: {
    name: string;
    isHome: boolean;
    teamAVote: number;
    teamBVote: number;
  };
  team2: {
    name: string;
    isHome: boolean;
    teamAVote: number;
    teamBVote: number;
  };
  percent: number;
  count: number;
  matchId?: string;
  isEnd?: boolean;
}

const Vote: React.FC<VoteProps> = ({
  count,
  team1,
  team2,
  percent,
  matchId,
  isEnd,
}) => {
  const [state, setState] = useImmer<{
    hasVoted: boolean;
    growingSide: "left" | "right";
    voteCount: number;
    votePercent: number;
  }>({
    hasVoted: false,
    growingSide: "left",
    voteCount: 0,
    votePercent: 0,
  });
  const { hasVoted, growingSide, voteCount, votePercent } = state;
  const { id = matchId } = parseSearch(location.search) as any;

  const { run: runVoteTeam, loading: loadingVoteTeam } = useRequest(voteTeam, {
    manual: true,
  });
  const onVote = (params: {
    isHome: boolean;
    growingSide: "left" | "right";
    teamAVote: number;
    teamBVote: number;
  }) => {
    const {
      isHome,
      growingSide,
      teamAVote: sourceTeamAVote,
      teamBVote: sourceTeamBVote,
    } = params;
    runVoteTeam({
      matchId: id,
      isHome,
      sourceTeamAVote,
      sourceTeamBVote,
    }).then((res) => {
      if (res.voteResult === "1") {
        const teamAVote = Number(res.teamAVote);
        const teamBVote = Number(res.teamBVote);
        const newCount = teamAVote + teamBVote;
        const newPercent = (teamAVote / newCount) * 100;
        setState((draft) => {
          draft.hasVoted = true;
          draft.growingSide = growingSide;
          draft.voteCount = newCount;
          draft.votePercent = newPercent;
        });
      }
    });
  };

  const newCount = voteCount || count;
  const newPercent = votePercent || percent;
  return (
    <div className="vote">
      <div className="vote-text">你认为谁会获胜，为TA投票吧~</div>
      {hasVoted || isEnd ? (
        <Slider
          value={hasVoted ? newPercent : 50}
          id="slider"
          growingSide={growingSide}
        />
      ) : (
        <div className="button">
          <TriangleButton
            onClick={() => onVote({ ...team1, growingSide: "left" })}
          >
            {team1.name}
          </TriangleButton>
          <TriangleButton
            buttonType="right"
            onClick={() => onVote({ ...team2, growingSide: "left" })}
          >
            {team2.name}
          </TriangleButton>
        </div>
      )}
      <div
        style={{ opacity: hasVoted || isEnd ? 1 : 0 }}
        className="vote-count"
      >{`${newCount}人已参与投票`}</div>
    </div>
  );
};

export default Vote;
