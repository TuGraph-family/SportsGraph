import AsyncList, { AsyncListProps } from "@/components/async-list";
import Button from "@/components/button";
import { history } from "@umijs/max";
import { ProgressBar } from "antd-mobile";
import React from "react";
import "./index.less";

const ScheduleList: React.FC<AsyncListProps> = (props) => {
  return (
    <div className="schedule-list">
      <AsyncList
        {...props}
        renderItem={(item) => {
          const {
            matchId,
            team_a_country,
            team_a_national_flag,
            team_b_country,
            team_b_national_flag,
            actualHomeScore,
            actualAwayScore,
            awayWinProbability,
            homeWinProbability,
            match_title,
            startDate,
          } = item;
          return (
            <div className="game-card" key={matchId}>
              <div className="title">
                <div className="title-class">{match_title}</div>
                <div className="title-time">{startDate}</div>
              </div>
              <div className="game">
                <div className="game-left">
                  <img className="game-flag" src={team_a_national_flag} />
                  <div className="game-country">{team_a_country}</div>
                </div>
                <div className="game-time">
                  {actualHomeScore === undefined ? (
                    "结果未出"
                  ) : (
                    <>
                      {actualHomeScore}
                      <span className="game-time-colon">:</span>
                      {actualAwayScore}
                    </>
                  )}
                </div>
                <div className="game-right">
                  <div className="game-country">{team_b_country}</div>
                  <img className="game-flag" src={team_b_national_flag} />
                </div>
              </div>
              <div className="predict">
                <div className="predict-text">
                  <div className="predict-text-left">
                    <div className="predict-percent">
                      {parseInt(homeWinProbability)}%
                    </div>
                    <div className="predict-bar">
                      <ProgressBar
                        percent={homeWinProbability}
                        style={{
                          "--fill-color": "#fc4951",
                          "--track-color": "#532A55",
                          "--track-width": "4px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="predict-text-result">分析结果</div>
                  <div className="predict-text-right">
                    <div className="predict-bar">
                      <ProgressBar
                        percent={awayWinProbability}
                        style={{
                          "--fill-color": "#1677ff",
                          "--track-color": "#09398B",
                          "--track-width": "4px",
                          transform: "rotateZ(180deg)",
                        }}
                      />
                    </div>
                    <div className="predict-percent">
                      {parseInt(awayWinProbability)}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="to-progress">
                <Button
                  color="primary"
                  onClick={() => history.push(`/tacit?id=${matchId}`)}
                >
                  查看分析过程
                </Button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default ScheduleList;
