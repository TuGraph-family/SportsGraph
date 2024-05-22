import Button from "@/components/button";
import ColorfulTeamTeam from "@/components/colorful-team-team";
import CompeteGraph from "@/components/compete-graph";
import FootballField from "@/components/football-field";
import IconFont from "@/components/icon-font";
import LightTop from "@/components/light-top";
import Loading from "@/components/loading";
import SplitText from "@/components/split-text";
import TitleDesc from "@/components/title-desc";
import Tooltip from "@/components/tooltip";
import { DEFAULT_FLAG } from "@/constant";
import {
  GameInfoPlayerResult,
  PlayersInfoResult,
  TeamCompeteInfoResult
} from "@/interfaces";
import { getGameInfo, getPlayersInfo, getTeamCompeteInfo } from "@/services";
import { parseSearch } from "@/utils";
import { Edge, GraphData } from "@antv/g6";
import { history, useRequest } from "@umijs/max";
import React, { useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import "./index.less";

const winYRatio = 0.7;
const loseYRatio = 0.5;

const winXRatio = 1;
const loseXRatio = 0.7;
interface CompetePageState {
  leftTeam?: { name: string; flagUrl: string; score: number };
  rightTeam?: { name: string; flagUrl: string; score: number };
  leftGraphData: { nodes: GameInfoPlayerResult[]; edges?: Edge[] };
  rightGraphData: { nodes: GameInfoPlayerResult[]; edges?: Edge[] };
  leftCompeteData: Array<TeamCompeteInfoResult>;
  rightCompeteData: Array<TeamCompeteInfoResult>;
  playersInfo: Array<PlayersInfoResult>;
  isHomeWin: boolean;
}
const CompetePage: React.FC = () => {
  const [state, setState] = useImmer<CompetePageState>({
    leftTeam: {
      name: "加载中...",
      flagUrl: DEFAULT_FLAG,
      score: 0
    },
    rightTeam: {
      name: "加载中...",
      flagUrl: DEFAULT_FLAG,
      score: 0
    },
    leftGraphData: { nodes: [], edges: [] },
    rightGraphData: { nodes: [], edges: [] },
    leftCompeteData: [],
    rightCompeteData: [],
    playersInfo: [],
    isHomeWin: true
  });
  const {
    leftTeam,
    rightTeam,
    leftGraphData,
    rightGraphData,
    playersInfo,
    leftCompeteData,
    rightCompeteData,
    isHomeWin
  } = state;
  const { id } = parseSearch(location.search) as any;
  const { loading: loadingGetGameInfo, run: runGetGameInfo } = useRequest(
    getGameInfo,
    {
      manual: true
    }
  );
  const { run: runGetTeamcompeteInfo, loading: loadingGetTeamcompeteInfo } =
    useRequest(getTeamCompeteInfo, { manual: true });
  const onNext = () => {
    history.push(`/result?id=${id}`);
  };
  const onPrev = () => {
    history.push(`/tacit?id=${id}`);
  };
  const { run: runGetPlayersInfo, loading: loadingGetPlayersInfo } = useRequest(
    getPlayersInfo,
    { manual: true }
  );

  const getNodes = (
    graphData: CompetePageState["leftGraphData"],
    competeData: Array<TeamCompeteInfoResult>,
    isWin: boolean
  ) => {
    const container = document.getElementById("away-graph");
    const yRatio = isWin ? winYRatio : loseYRatio;
    const xRatio = isWin ? winXRatio : loseXRatio;
    const nodes = graphData.nodes?.map((node) => {
      const { id } = node;
      const playerInfo = playersInfo.find((player) => player.player_id === id);
      const playerCompeteInfo = competeData.find((item) => item.a_id === id);
      const { y, x } = node;
      const mapY = y * yRatio;
      const mapX = x * xRatio;
      const nodeSize = Number(playerCompeteInfo?.value_rank);
      return {
        id,
        data: {
          ...node,
          ...playerInfo,
          ...playerCompeteInfo,
          nodeSize,
          y: !isWin
            ? mapY - container?.clientHeight! * 1.5
            : container?.clientHeight! - mapY + container?.clientHeight!,
          x: isWin ? mapX : mapX + 50
        }
      };
    });
    return nodes;
  };
  const homeGraphData = useMemo(() => {
    const homeGraphData: GraphData = {
      nodes: [],
      edges: []
    };

    if (
      !leftGraphData.nodes?.length ||
      !playersInfo.length ||
      !leftCompeteData.length
    ) {
      return homeGraphData;
    }
    homeGraphData.nodes = getNodes(leftGraphData, leftCompeteData, isHomeWin);
    return homeGraphData;
  }, [leftGraphData, playersInfo, leftCompeteData, isHomeWin]);
  const awayGraphData = useMemo(() => {
    const awayGraphData: GraphData = {
      nodes: [],
      edges: []
    };

    if (
      !rightGraphData.nodes?.length ||
      !playersInfo.length ||
      !rightCompeteData.length
    ) {
      return awayGraphData;
    }
    awayGraphData.nodes = getNodes(
      rightGraphData,
      rightCompeteData,
      !isHomeWin
    );
    return awayGraphData;
  }, [rightGraphData, playersInfo, rightCompeteData, isHomeWin]);

  const loading = useMemo(
    () =>
      loadingGetGameInfo || loadingGetPlayersInfo || loadingGetTeamcompeteInfo,
    [loadingGetGameInfo, loadingGetPlayersInfo, loadingGetTeamcompeteInfo]
  );
  const hasGraphData = useMemo(
    () => !!awayGraphData.nodes?.length,
    [awayGraphData]
  );

  useEffect(() => {
    runGetGameInfo({ id }).then((data) => {
      if (data) {
        const {
          awayWinProbability,
          homeWinProbability,
          team_a_country,
          team_a_national_flag,
          team_b_country,
          team_b_national_flag
        } = data.resultSet?.[0] || {};
        setState((draft) => {
          draft.leftTeam = {
            name: team_a_country,
            flagUrl: team_a_national_flag,
            score: parseInt(homeWinProbability)
          };
          draft.rightTeam = {
            name: team_b_country,
            flagUrl: team_b_national_flag,
            score: parseInt(awayWinProbability)
          };
          draft.leftGraphData = {
            nodes: data.playerAList
          };
          draft.rightGraphData = {
            nodes: data.playerBList
          };
          draft.isHomeWin = homeWinProbability > awayWinProbability;
        });
      }
    });
    runGetTeamcompeteInfo({ id, teamType: "home" }).then((data) => {
      setState((draft) => {
        draft.leftCompeteData = data.resultSet;
      });
    });
    runGetTeamcompeteInfo({ id, teamType: "away" }).then((data) => {
      setState((draft) => {
        draft.rightCompeteData = data.resultSet;
      });
    });

    runGetPlayersInfo({ id }).then((data) => {
      if (data) {
        setState((draft) => {
          draft.playersInfo = data.resultSet;
        });
      }
    });
  }, [id]);

  return (
    <div className="compete">
      {hasGraphData && (
        <div className="light">
          <LightTop />
        </div>
      )}
      <Loading loading={loading} />
      <div className="compete-title">
        <TitleDesc title="看双方对抗程度" desc="综合历史比赛、AI、大数据得出" />
      </div>
      <div className="compete-team">
        <ColorfulTeamTeam
          leftTeam={leftTeam!}
          rightTeam={rightTeam!}
          title="对抗值"
        />
      </div>
      <div className="compete-playground">
        {hasGraphData && (
          <>
            <div className="light-side light-left">
              <LightTop />
            </div>
            <div className="light-side light-right">
              <LightTop />
            </div>
          </>
        )}

        <FootballField lightNumber={2} startAnimate={hasGraphData} />
        <div className="compete-graph-container">
          <CompeteGraph
            containerId="away-graph"
            graphData={isHomeWin ? awayGraphData : homeGraphData}
          />
          <CompeteGraph
            containerId="home-graph"
            graphData={isHomeWin ? homeGraphData : awayGraphData}
          />
        </div>
      </div>

      <div className="footer">
        <div className="button">
          <Button onClick={onPrev} color="default">
            上一页 <IconFont type="euro-icon-xiayiye1" />
          </Button>
          <Button onClick={onNext} color="primary">
            下一页 <IconFont type="euro-icon-xiayiye1" />
          </Button>
        </div>
        {hasGraphData && (
          <div className="tooltip">
            <Tooltip>
              <SplitText id="text">
                球衣越大，表明球员抵抗对手的能力越强。整体阵型越大，表明整体对抗度越强。
              </SplitText>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetePage;