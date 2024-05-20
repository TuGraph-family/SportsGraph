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
import { parseSearch } from "@/utils";
import { useRequest } from "@umijs/max";
import React, { useEffect } from "react";
import { history } from "umi";
import { useImmer } from "use-immer";
import "./index.less";

const resultPage: React.FC = () => {
  const [state, setState] = useImmer<{
    gameInfo?: GameInfoResult;
    voteInfo?: VoteInfoResult;
  }>({});
  const { gameInfo, voteInfo } = state;
  const { teamAVote = 0, teamBVote = 0 } = voteInfo || {};
  const voteCount = teamAVote + teamAVote;
  const votePercent = teamAVote / voteCount;
  const { id } = parseSearch(location.search) as any;
  const {
    homeWinProbability = "0",
    awayWinProbability = "0",
    team_a_national_flag,
    team_b_national_flag,
    team_a_country,
    team_b_country
  } = gameInfo || {};
  const isHomeWin = homeWinProbability > awayWinProbability;

  const { loading: loadingGetGameInfo, run: runGetGameInfo } = useRequest(
    getGameInfo,
    {
      manual: true
    }
  );
  const { run: runGetGameVoteInfoById, loading: loadingGetGameVoteInfoById } =
    useRequest(getGameVoteInfoById, { manual: true });
  const jumpToHome = () => {
    history.push("/");
  };
  const onSavePic = () => {
    // takeScreenshot("result");
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
    <div className="result" id="result">
      <Loading loading={loadingGetGameInfo || loadingGetGameVoteInfoById} />
      <div className="result-title">
        <TitleDesc
          title="这场比赛 AI 更看好"
          desc="综合历史比赛、AI、大数据得出"
        />
      </div>
      <div className="result-team">
        <div className="team-bg">
          <TopBg />
        </div>
        <div className="win-flag">
          <img src={isHomeWin ? team_a_national_flag : team_b_national_flag} />
        </div>
        <div className="center-predict">
          <div className="predict-left">
            <AnimateNumber
              count={parseInt(homeWinProbability)}
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
              count={parseInt(awayWinProbability)}
              id="right"
              className="predict-number"
            />
            <div className="percent">%</div>
          </div>
        </div>
        <div className="center-vote">
          <Vote
            team1={{ name: team_a_country || "", id: "" }}
            team2={{ name: team_b_country || "", id: "" }}
            percent={votePercent}
            count={teamAVote}
          />
        </div>
      </div>
      <div className="result-playground">
        <FootballField />
      </div>

      <div className="footer">
        <Button onClick={onSavePic}>
          上一页 <IconFont type="euro-icon-xiayiye1" />
        </Button>
        <Button onClick={jumpToHome} color="primary">
          更多赛程 <IconFont type="euro-icon-xiayiye1" />
        </Button>
      </div>
    </div>
  );
};

export default resultPage;
