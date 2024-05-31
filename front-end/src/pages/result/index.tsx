import AnimateNumber from "@/components/animate-number";
import Button from "@/components/button";
import ColorfulButton from "@/components/colorful-button";
import FootballField from "@/components/football-field";
import IconFont from "@/components/icon-font";
import Loading from "@/components/loading";
import TitleDesc from "@/components/title-desc";
import TopBg from "@/components/top-bg";
import Vote from "@/components/vote";
import { GameInfoResult, VoteInfoResult } from "@/interfaces";
import { getGameInfo, getGameVoteInfoById } from "@/services";
import { getDayOfWeek, parseSearch } from "@/utils";
import { useRequest } from "@umijs/max";
import React, { useEffect } from "react";
import { history } from "umi";
import { useImmer } from "use-immer";
import "./index.less";
import HomeIcon from "@/components/home-icon";

const ResultPage: React.FC = () => {
  const [state, setState] = useImmer<{
    gameInfo?: GameInfoResult;
    voteInfo?: VoteInfoResult;
    isDownloading: boolean;
  }>({
    isDownloading: false,
  });
  const { gameInfo, voteInfo, isDownloading } = state;
  const { teamAVote = 0, teamBVote = 0, totalVote = 0, isEnd } = voteInfo || {};
  const voteCount = teamAVote + teamBVote;
  const votePercent = (teamAVote / voteCount) * 100;

  const { id } = parseSearch(location.search) as any;
  const {
    homeWinProbability = "0",
    awayWinProbability = "0",
    team_a_national_flag,
    team_b_national_flag,
    team_a_country,
    team_b_country,
    startDate,
  } = gameInfo || {};
  const isHomeWin = homeWinProbability > awayWinProbability;

  const { loading: loadingGetGameInfo, run: runGetGameInfo } = useRequest(
    getGameInfo,
    {
      manual: true,
    }
  );
  const { run: runGetGameVoteInfoById, loading: loadingGetGameVoteInfoById } =
    useRequest(getGameVoteInfoById, { manual: true });
  const jumpToHome = () => {
    history.push("/");
  };
  const onSavePic = () => {
    // setState((draft) => {
    //   draft.isDownloading = true;
    // });
    // takeScreenshot("result").then(() => {
    //   setState((draft) => {
    //     draft.isDownloading = false;
    //   });
    // });
    history.push(`/compete?id=${id}`);
  };
  useEffect(() => {
    runGetGameInfo({ id }).then((data) => {
      if (data) {
        setState((draft) => {
          draft.gameInfo = data.resultSet?.[0];
        });
      }
    });
    runGetGameVoteInfoById({ id }).then((data) => {
      setState((draft) => {
        draft.voteInfo = data?.voteInfo;
      });
    });
  }, [id]);
  return (
    <div className="result-page">
      <Loading
        loading={
          loadingGetGameInfo || loadingGetGameVoteInfoById || isDownloading
        }
      />
      <div className="result" id="result">
        <HomeIcon />
        <div className="result-title">
          <TitleDesc
            title="这场比赛更有实力的是"
            desc="基于历史比赛采用图计算技术分析得出"
          />
        </div>
        <div className="result-team">
          <div className="team-bg">
            <TopBg />
          </div>
          <div className="win-flag">
            <img
              src={isHomeWin ? team_a_national_flag : team_b_national_flag}
            />
          </div>
          <div className="win-name">
            {isHomeWin ? team_a_country : team_b_country}
          </div>
          <div className="center-time">
            {getDayOfWeek(startDate) || "- -"}{" "}
            {startDate?.slice(5, -3)?.replace("-", ".") || "00.00 00:00"}
          </div>
          <div className="center-predict">
            <div className="predict-left">
              <AnimateNumber
                count={parseInt(homeWinProbability)}
                id="result-left"
                className="predict-number"
              />
              <div className="percent">%</div>
            </div>
            <div className="predict-vs">
              <ColorfulButton>实力分析</ColorfulButton>
            </div>
            <div className="predict-right">
              <AnimateNumber
                count={parseInt(awayWinProbability)}
                id="result-right"
                className="predict-number"
              />
              <div className="percent">%</div>
            </div>
          </div>
          <div className="center-vote">
            <Vote
              team1={{
                name: team_a_country || "",
                isHome: true,
                teamAVote,
                teamBVote,
              }}
              team2={{
                name: team_b_country || "",
                isHome: false,
                teamAVote,
                teamBVote,
              }}
              percent={votePercent}
              count={totalVote}
              isEnd={isEnd}
            />
          </div>
          <div className="qrcode">
            <img src="https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*90-3SpclRKcAAAAAAAAAAAAADsvfAQ/original" />
          </div>
          <div className="qrcode-text">截图分享给好友，一起猜猜猜~</div>
        </div>
        <div className="result-playground">
          <FootballField />
        </div>
      </div>
      <div className="footer">
        <Button onClick={onSavePic}>
          <IconFont type="euro-icon-xiayiye1" rotate={180} /> 上一页
        </Button>
        <Button className="highlight" onClick={jumpToHome} color="primary">
          更多赛程 <IconFont type="euro-icon-xiayiye1" />
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
