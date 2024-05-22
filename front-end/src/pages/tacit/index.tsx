import Button from "@/components/button";
import ColorfulTeamTeam from "@/components/colorful-team-team";
import FootballField from "@/components/football-field";
import IconFont from "@/components/icon-font";
import LightTop from "@/components/light-top";
import Loading from "@/components/loading";
import SplitText from "@/components/split-text";
import TacitGraph from "@/components/tacit-graph";
import TitleDesc from "@/components/title-desc";
import Tooltip from "@/components/tooltip";
import { DEFAULT_FLAG } from "@/constant";
import {
  GameInfoPlayerResult,
  PlayersInfoResult,
  TeamTacitInfoResult
} from "@/interfaces";
import { getGameInfo, getPlayersInfo, getTeamTacitInfo } from "@/services";
import { parseSearch } from "@/utils";
import { Edge, GraphData } from "@antv/g6";
import { useRequest } from "@umijs/max";
import React, { useEffect, useMemo } from "react";
import { history } from "umi";
import { useImmer } from "use-immer";
import "./index.less";

const TacitPage: React.FC = () => {
  const [state, setState] = useImmer<{
    leftTeam?: { name: string; flagUrl: string; score: number };
    rightTeam?: { name: string; flagUrl: string; score: number };
    leftGraphData: { nodes: GameInfoPlayerResult[]; edges?: Edge[] };
    rightGraphData: { nodes: GameInfoPlayerResult[]; edges?: Edge[] };
    teamSide: "left" | "right";
    leftTacitValueList: Array<TeamTacitInfoResult>;
    rightTacitValueList: Array<TeamTacitInfoResult>;
    playersInfo: Array<PlayersInfoResult>;
  }>({
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
    teamSide: "left",
    leftTacitValueList: [],
    rightTacitValueList: [],
    playersInfo: []
  });
  const {
    leftTeam,
    rightTeam,
    teamSide,
    leftTacitValueList,
    rightTacitValueList,
    leftGraphData,
    rightGraphData,
    playersInfo
  } = state;
  const isHome = teamSide === "left";

  const { id } = parseSearch(location.search) as any;
  const { loading: loadingGetGameInfo, run: runGetGameInfo } = useRequest(
    getGameInfo,
    {
      manual: true
    }
  );
  const { run: runGetTeamTacitInfo, loading: loadingGetTeamTacitInfo } =
    useRequest(getTeamTacitInfo, { manual: true });

  const { run: runGetPlayersInfo, loading: loadingGetPlayersInfo } = useRequest(
    getPlayersInfo,
    { manual: true }
  );
  const onNext = () => {
    history.push(`/compete?id=${id}`);
  };
  const onPrev = () => {
    history.push("/");
  };
  const onTeamClick = (params: { side: "left" | "right" }) => {
    setState((draft) => {
      draft.teamSide = params.side;
    });
  };
  const graphData = useMemo(() => {
    const data: GraphData = {
      nodes: [],
      edges: []
    };
    const currentData = isHome ? leftGraphData : rightGraphData;
    const tacitValueList = isHome ? leftTacitValueList : rightTacitValueList;
    if (tacitValueList && currentData.nodes.length && playersInfo.length) {
      data.nodes = currentData.nodes?.map((item) => {
        const { id } = item;
        const playerInfo = playersInfo.find((item) => item.player_id === id);
        return {
          ...item,
          ...playerInfo
        };
      });
      data.edges = tacitValueList
        .filter((item) =>
          isHome ? item.value_rank === "1" : item.value_rank === "2"
        )
        .map((item) => {
          const { a_id, b_id, playerValue } = item;
          return {
            source: a_id,
            target: b_id,
            playerValue,
            stroke: isHome
              ? "linear-gradient(90deg, #80111D, #A0040D, #80111D)"
              : "linear-gradient(#0F2EAB, rgba(20,60,219,0.9),#0F2EAB)"
          };
        });
    }

    return data.edges?.length && data.nodes?.length ? data : {};
  }, [
    teamSide,
    leftGraphData,
    rightGraphData,
    leftTacitValueList,
    rightTacitValueList,
    playersInfo
  ]);
  const hasGraphData = useMemo(() => !!graphData.nodes?.length, [graphData]);
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
        });
      }
    });

    runGetPlayersInfo({ id }).then((data) => {
      if (data) {
        setState((draft) => {
          draft.playersInfo = data.resultSet;
        });
      }
    });
    runGetTeamTacitInfo({ id, isteama: "1" }).then((data) => {
      setState((draft) => {
        draft.leftTacitValueList = data.resultSet;
      });
    });
    runGetTeamTacitInfo({ id, isteama: "0" }).then((data) => {
      setState((draft) => {
        draft.rightTacitValueList = data.resultSet;
      });
    });
  }, [id]);

  return (
    <div className="tacit">
      {hasGraphData && (
        <div className="light">
          <LightTop />
        </div>
      )}

      <Loading
        loading={
          loadingGetGameInfo || loadingGetPlayersInfo || loadingGetTeamTacitInfo
        }
      />
      <div className="tacit-title">
        <TitleDesc title="看队员默契程度" desc="综合历史比赛、AI、大数据得出" />
      </div>

      <div className="tacit-team">
        <ColorfulTeamTeam
          leftTeam={leftTeam!}
          rightTeam={rightTeam!}
          title="默契值"
          showActive
          onTeamClick={onTeamClick}
        />
      </div>

      <div className="tacit-playground">
        {hasGraphData && (
          <div className="light-left">
            <LightTop />
          </div>
        )}
        <FootballField startAnimate={hasGraphData} />
        <TacitGraph graphData={graphData} containerId="home" />
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
              <SplitText id="tacit-text">
                球衣越大，表明球员综合默契度越高。连线越粗，表明球员间默契越强。
              </SplitText>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacitPage;
