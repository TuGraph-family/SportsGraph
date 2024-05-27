import { voteTeam } from "@/services";
import { parseSearch } from "@/utils";
import { useRequest } from "@umijs/max";
import React from "react";
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
}

const Vote: React.FC<VoteProps> = ({
  count,
  team1,
  team2,
  percent,
  matchId,
}) => {
  const [state, setState] = useImmer<{
    hasVoted: boolean;
    growingSide: "left" | "right";
  }>({
    hasVoted: false,
    growingSide: "left",
  });
  const { hasVoted, growingSide } = state;
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
    const { isHome, growingSide, teamAVote, teamBVote } = params;
    runVoteTeam({
      matchId: id,
      isHome,
      sourceTeamAVote: teamAVote,
      sourceTeamBVote: teamBVote,
    }).then((res) => {
      console.log({ res });
      if (res.voteResult === "1") {
        setState((draft) => {
          draft.hasVoted = true;
          draft.growingSide = growingSide;
        });
      } else {
        Toast.show({
          content: "数据异常，请稍后再试。",
          position: "top",
        });
      }
    });
  };
  return (
    <div className="vote">
      <div className="vote-text">你认为谁会获胜，为TA投票吧~</div>
      {hasVoted ? (
        <Slider
          value={hasVoted ? percent : 50}
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
        style={{ opacity: hasVoted ? 1 : 0 }}
        className="vote-count"
      >{`${count}人已参与投票`}</div>
    </div>
  );
};

export default Vote;
