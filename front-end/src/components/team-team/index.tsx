import { DEFAULT_FLAG } from "@/constant";
import React from "react";
import "./index.less";

interface TeamteamProps {
  leftTeam: { name: string; flagUrl: string };
  rightTeam: { name: string; flagUrl: string };
}

const Teamteam: React.FC<TeamteamProps> = ({ leftTeam, rightTeam }) => {
  return (
    <div className="team-team">
      <div className="team-left">
        <img className="team-flag" src={leftTeam.flagUrl || DEFAULT_FLAG} />
        <div className="team-country">{leftTeam.name}</div>
      </div>

      <div className="team-center" />
      <div className="team-right">
        <div className="team-country">{rightTeam.name}</div>
        <img className="team-flag" src={rightTeam.flagUrl || DEFAULT_FLAG} />
      </div>
    </div>
  );
};

export default Teamteam;
