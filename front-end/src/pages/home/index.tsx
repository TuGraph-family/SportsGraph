import AnimateNumber from "@/components/animate-number";
import Button from "@/components/button";
import ColorfulButton from "@/components/colorful-button";
import Loading from "@/components/loading";
import Tabs from "@/components/tabs";
import Teamteam from "@/components/team-team";
import TitleDesc from "@/components/title-desc";
import TopBg from "@/components/top-bg";
import Vote from "@/components/vote";
import { getFutureGameList, getHistoryGameList } from "@/services";
import { useRequest } from "@umijs/max";
import { Swiper } from "antd-mobile";
import { useEffect } from "react";
import { history } from "umi";
import { useImmer } from "use-immer";
import ScheduleList from "./components/schedule-list";
import "./index.less";
import TechnicalPrinciples from "@/pages/home/components/technical-principles";
import InstructionsForUse from "./components/instructions-for-use";

const HomePage: React.FC = () => {
  const [state, setState] = useImmer<{ futureList: any[] }>({
    futureList: [{}],
  });
  const { futureList } = state;
  const { run: runGetFutureGameList, loading: loadingGetFutureGameList } =
    useRequest(getFutureGameList, { manual: true });
  useEffect(() => {
    runGetFutureGameList({
      skip: "0",
      limit: "4",
    }).then((data) => {
      if (data) {
        setState((draft) => {
          draft.futureList = data.resultSet || [];
        });
      }
    });
  }, []);
  return (
    <div className="home-page">
      <Loading loading={loadingGetFutureGameList} />
      <div className="home-page-top">
        <TitleDesc
          title="智猜足球"
          desc={
            <>
              智能图计算技术找出比赛中的关键组
              <TechnicalPrinciples
                iconStyle={{
                  fontSize: 10,
                  color: "#ffffff",
                  fontWeight: 600,
                  marginLeft: 4,
                }}
              />
            </>
          }
        />
        <Swiper
          loop
          onIndexChange={(i) => {
            console.log(i, "onIndexChange1");
          }}
          indicatorProps={{
            color: "white",
          }}
        >
          {futureList.map((item, index) => {
            const {
              matchId,
              team_a_country,
              team_a_national_flag,
              team_b_country,
              team_b_national_flag,
              teamAVote,
              teamBVote,
              awayWinProbability,
              homeWinProbability,
            } = item;
            const voteCount = Number(teamAVote) + Number(teamBVote);
            const votePercent = (teamAVote / voteCount) * 100;
            return (
              <Swiper.Item key={index}>
                <div className="home-page-top-game">
                  <div className="center-bg">
                    <TopBg />
                  </div>
                  <div className="center-team">
                    <Teamteam
                      leftTeam={{
                        name: team_a_country,
                        flagUrl: team_a_national_flag,
                      }}
                      rightTeam={{
                        name: team_b_country,
                        flagUrl: team_b_national_flag,
                      }}
                    />
                  </div>
                  <div
                    className="center-predict"
                    onClick={() => history.push(`/tacit?id=${matchId}`)}
                  >
                    <div className="predict-left">
                      <AnimateNumber
                        count={homeWinProbability}
                        id="left"
                        className="predict-number"
                      />
                      <div className="percent">%</div>
                    </div>
                    <div className="predict-vs">
                      <ColorfulButton>实力分析</ColorfulButton>
                    </div>
                    <div className="predict-right">
                      <AnimateNumber
                        count={awayWinProbability}
                        id="right"
                        className="predict-number"
                      />
                      <div className="percent">%</div>
                    </div>
                  </div>
                  <div className="center-to-analysis">
                    <Button
                      color="primary"
                      onClick={() => history.push(`/tacit?id=${matchId}`)}
                    >
                      查看分析过程
                    </Button>
                  </div>
                  <div className="center-vote">
                    <Vote
                      team1={{ name: team_a_country, isHome: true }}
                      team2={{ name: team_b_country, isHome: false }}
                      count={voteCount}
                      percent={votePercent}
                    />
                  </div>
                </div>
              </Swiper.Item>
            );
          })}
        </Swiper>
      </div>
      <div className="home-page-list">
        <Tabs>
          <Tabs.Tab title="历史预测" key="history">
            <ScheduleList
              service={({ pageNum, pageSize }) =>
                getHistoryGameList({
                  skip: `${(pageNum - 1) * pageSize}`,
                  limit: `${pageSize}`,
                })
              }
            />
          </Tabs.Tab>
          <Tabs.Tab title="更多赛程" key="future">
            <ScheduleList
              service={({ pageNum, pageSize }) =>
                getFutureGameList({
                  skip: `${(pageNum - 1) * pageSize}`,
                  limit: `${pageSize}`,
                })
              }
            />
          </Tabs.Tab>
        </Tabs>
      </div>
      <InstructionsForUse />
    </div>
  );
};

export default HomePage;
