import React from "react";
import { useImmer } from "use-immer";
import Slider from "../slider";
import TriangleButton from "../triangle-button";
import "./index.less";

interface VoteProps {
  team1: {
    name: string;
    id: string;
  };
  team2: {
    name: string;
    id: string;
  };
  percent: number;
  count: number;
}

const Vote: React.FC<VoteProps> = ({ count, team1, team2, percent }) => {
  const [state, setState] = useImmer<{
    hasVoted: boolean;
    growingSide: "left" | "right";
  }>({
    hasVoted: false,
    growingSide: "left"
  });
  const { hasVoted, growingSide } = state;
  const onVote = (id: string, growingSide: "left" | "right") => {
    setState((draft) => {
      draft.hasVoted = true;
      draft.growingSide = growingSide;
    });
  };

  return (
    <div className="vote">
      <div className="vote-text">你认为谁会获胜，为TA投票吧~</div>
      {hasVoted ? (
        <div className="slider">
          <Slider
            value={hasVoted ? percent || 0 : 50}
            id="slider"
            growingSide={growingSide}
          />
        </div>
      ) : (
        <div className="button">
          <TriangleButton onClick={() => onVote(team1.id, "left")}>
            {team1.name}
          </TriangleButton>
          <TriangleButton
            buttonType="right"
            onClick={() => onVote(team1.id, "right")}
          >
            {team2.name}
          </TriangleButton>
        </div>
      )}
      <div className="vote-count">{`${count}已参与投票`}</div>
    </div>
  );
};

export default Vote;
