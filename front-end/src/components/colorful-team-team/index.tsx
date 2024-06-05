import { STRENGTH_TEXT_SRC } from "@/constant";
import { ProgressCircle } from "antd-mobile";
import React from "react";
import { useImmer } from "use-immer";
import ColorfulButton from "../colorful-button";
import IconFont from "../icon-font";
import "./index.less";

interface ColorfulTeamteamProps {
  homeTeam: { name: string; flagUrl: string; score: number };
  awayTeam: { name: string; flagUrl: string; score: number };
  onTeamClick?: (itemInfo: { side: "home" | "away" }) => void;
  title: string;
  dataAspm?: string;
  showActive?: boolean;
}

const ColorfulTeamTeam: React.FC<ColorfulTeamteamProps> = ({
  homeTeam,
  awayTeam,
  title,
  onTeamClick,
  dataAspm,
  showActive,
}) => {
  const [state, setState] = useImmer<{ activeTeam: "home" | "away" }>({
    activeTeam: "home",
  });
  const { activeTeam } = state;
  const isLeftWin = homeTeam.score > awayTeam.score;
  const onLeftClick = () => {
    onTeamClick?.({ side: "home", ...homeTeam });
    setState((draft) => {
      draft.activeTeam = "home";
    });
  };
  const onRightClick = () => {
    onTeamClick?.({ side: "away", ...awayTeam });
    setState((draft) => {
      draft.activeTeam = "away";
    });
  };
  return (
    <div className={`colorful-team-team ${showActive ? "active" : "inactive"}`}>
      <div
        className={`home ${activeTeam === "home" ? "active" : "inactive"}`}
        onClick={onLeftClick}
        data-aspm-click={dataAspm}
        data-aspm-param='teamSide=home'
      >
        <div className="info">
          <div className="circle">
            <ProgressCircle
              percent={homeTeam.score}
              style={{
                "--size": "36px",
                "--fill-color": "rgba(255,255,255, 0.8)",
                "--track-color": "rgba(255,255,255, 0.3)",
              }}
            >
              <img
                src={
                  STRENGTH_TEXT_SRC[
                    `${isLeftWin ? "WIN" : "LOSE"}_${showActive ? (activeTeam === "home" ? "ACTIVE" : "INACTIVE") : "ACTIVE"}`
                  ]
                }
                alt=""
              />
            </ProgressCircle>
          </div>

          <div className="flag">
            <img src={homeTeam.flagUrl} />
            <div className="name">{homeTeam.name}</div>
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
        className={`away ${activeTeam === "away" ? "active" : "inactive"}`}
        onClick={onRightClick}
        data-aspm-click={dataAspm}
        data-aspm-param='teamSide=away'
      >
        <div className="info">
          <div className="flag">
            <img src={awayTeam.flagUrl} />
            <div className="name">{awayTeam.name}</div>
            {showActive && (
              <div className="arrow">
                <IconFont type="euro-icon-a-jiantoulan" />
              </div>
            )}
          </div>
          <div className="circle">
            <ProgressCircle
              percent={awayTeam.score}
              style={{
                "--size": "36px",
                "--fill-color": "rgba(255,255,255, 0.8)",
                "--track-color": "rgba(255,255,255, 0.3)",
              }}
            >
              <img
                width="45%"
                src={
                  STRENGTH_TEXT_SRC[
                    `${isLeftWin ? "LOSE" : "WIN"}_${showActive ? (activeTeam === "away" ? "ACTIVE" : "INACTIVE") : "ACTIVE"}`
                  ]
                }
                alt=""
              />
            </ProgressCircle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorfulTeamTeam;
