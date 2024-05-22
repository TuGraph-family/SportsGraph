import { ProgressCircle } from "antd-mobile";
import React from "react";
import { useImmer } from "use-immer";
import ColorfulButton from "../colorful-button";
import IconFont from "../icon-font";
import "./index.less";

interface ColorfulTeamteamProps {
  leftTeam: { name: string; flagUrl: string; score: number };
  rightTeam: { name: string; flagUrl: string; score: number };
  onTeamClick?: (itemInfo: { side: "left" | "right" }) => void;
  title: string;
  showActive?: boolean;
}

const ColorfulTeamTeam: React.FC<ColorfulTeamteamProps> = ({
  leftTeam,
  rightTeam,
  title,
  onTeamClick,
  showActive
}) => {
  const [state, setState] = useImmer<{ activeTeam: "left" | "right" }>({
    activeTeam: "left"
  });
  const { activeTeam } = state;
  const isLeftWin = leftTeam.score > rightTeam.score;
  const onLeftClick = () => {
    onTeamClick?.({ side: "left", ...leftTeam });
    setState((draft) => {
      draft.activeTeam = "left";
    });
  };
  const onRightClick = () => {
    onTeamClick?.({ side: "right", ...rightTeam });
    setState((draft) => {
      draft.activeTeam = "right";
    });
  };
  return (
    <div className={`colorful-team-team ${showActive ? "active" : "inactive"}`}>
      <div
        className={`left ${activeTeam === "left" ? "active" : "inactive"}`}
        onClick={onLeftClick}
      >
        <div className="info">
          <div className="circle">
            <ProgressCircle
              percent={leftTeam.score}
              style={{
                "--size": "36px",
                "--fill-color": "rgba(255,255,255, 0.8)",
                "--track-color": "rgba(255,255,255, 0.3)"
              }}
            >
              {isLeftWin ? "强" : "中"}
            </ProgressCircle>
          </div>

          <div className="flag">
            <img src={leftTeam.flagUrl} />
            <div className="name">{leftTeam.name}</div>
            {showActive && (
              <div className="arrow">
                <IconFont type="euro-icon-a-jiantouhong" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="title">
        <ColorfulButton>{title}</ColorfulButton>
      </div>
      <div
        className={`right ${activeTeam === "right" ? "active" : "inactive"}`}
        onClick={onRightClick}
      >
        <div className="info">
          <div className="flag">
            <img src={rightTeam.flagUrl} />
            <div className="name">{rightTeam.name}</div>
            {showActive && (
              <div className="arrow">
                <IconFont type="euro-icon-a-jiantoulan" />
              </div>
            )}
          </div>
          <div className="circle">
            <ProgressCircle
              percent={rightTeam.score}
              style={{
                "--size": "36px",
                "--fill-color": "rgba(255,255,255, 0.8)",
                "--track-color": "rgba(255,255,255, 0.3)"
              }}
            >
              {isLeftWin ? "中" : "强"}
            </ProgressCircle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorfulTeamTeam;
