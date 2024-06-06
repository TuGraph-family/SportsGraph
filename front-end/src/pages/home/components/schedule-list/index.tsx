import AsyncList, { AsyncListProps } from "@/components/async-list";
import Button from "@/components/button";
import { history } from "@umijs/max";
import { Popover, ProgressBar } from "antd-mobile";
import React from "react";
import IconFont from "@/components/icon-font";
import dayjs from "dayjs";
import "./index.less";
import { getDayOfWeek } from "@/utils";

interface Props extends AsyncListProps {
  scheduleType: string;
}

const ScheduleList: React.FC<Props> = (props) => {
  return (
    <div className="schedule-list">
      <AsyncList
        {...props}
        renderItem={(item, index) => {
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
            freshnessOfLineup,
          } = item;
          return (
            <div
              data-aspm="c364553"
              data-aspm-expo
              className="game-card"
              data-aspm-param={`index=${index + 1}^scheduleType=${props?.scheduleType}`}
              key={matchId}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="title">
                  <div className="title-class">{match_title}</div>
                  <div className="title-time">
                    {getDayOfWeek(startDate) || "- - "}
                    {dayjs(startDate).format("MM.DD HH:mm")}
                  </div>
                </div>
                {freshnessOfLineup === "1" && (
                  <div className="lineup-desc">
                    <div>阵容说明</div>
                    <div style={{ marginTop: 2 }}>
                      <Popover
                        getContainer={() =>
                          document.getElementsByClassName("game-card")[
                            index
                          ] as HTMLElement
                        }
                        mode="dark"
                        content="阵容尚未确定，图示为历史阵容，仅供参考"
                        trigger="click"
                        placement="bottom-start"
                      >
                        <IconFont
                          style={{
                            fontSize: 14,
                            marginLeft: 3,
                          }}
                          type="euro-icon-wenhao-shuomingzhushi"
                        />
                      </Popover>
                    </div>
                  </div>
                )}
              </div>
              <div className="game">
                <div className="game-left">
                  <img className="game-flag" src={team_a_national_flag} />
                  <div className="game-country">{team_a_country}</div>
                </div>
                <div className="game-time">
                  {actualHomeScore === undefined ? (
                    <div style={{ fontSize: 14 }}>未开始</div>
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
              <div data-aspm-click="c364553.d452320" className="to-progress">
                <Button
                  onClick={() => {
                    history.push(`/tacit?id=${matchId}`);
                  }}
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
