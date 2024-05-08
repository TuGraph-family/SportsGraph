import React from "react";
import "./index.less";

interface TeamteamProps {
  leftTeam: { name: string; flagUrl: string };
  rightTeam: { name: string; flagUrl: string };
  centerText: string;
}

const Teamteam: React.FC<TeamteamProps> = ({
  centerText,
  leftTeam,
  rightTeam
}) => {
  return (
    <div className="team-team">
      <div className="team-left">
        <img className="team-flag" src={leftTeam.flagUrl} />
        <div className="team-country">{leftTeam.name}</div>
      </div>

      <div className="team-center">{centerText}</div>
      <div className="team-right">
        <div className="team-country">{rightTeam.name}</div>
        <img className="team-flag" src={rightTeam.flagUrl} />
      </div>
    </div>
  );
};

export default Teamteam;
