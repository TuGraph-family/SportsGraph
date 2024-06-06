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
import { DEFAULT_FLAG, SPAPOS } from "@/constant";
import {
  GameInfoPlayerResult,
  PersonalTacitInfoResult,
  PlayersInfoResult,
  TeamTacitInfoResult,
} from "@/interfaces";
import {
  getGameInfo,
  getPlayerTacitInfo,
  getPlayersInfo,
  getTeamPersonalTacitInfo,
  getTeamTacitInfo,
} from "@/services";
import { parseSearch } from "@/utils";
import { Edge, GraphData } from "@antv/g6";
import { useRequest } from "@umijs/max";
import React, { useEffect, useMemo } from "react";
import { history } from "umi";
import { useImmer } from "use-immer";
import "./index.less";

import HomeIcon from "@/components/home-icon";
import LightLeft from "@/components/light-left";
import LightRight from "@/components/light-right";
import { personalTacitTranslator } from "@/translator";
import InstructionsForUse from "../home/components/instructions-for-use";
import PersonalTacit from "./components/personal-tacit";

const TacitPage: React.FC = () => {
  const [state, setState] = useImmer<{
    homeTeam?: { name: string; flagUrl: string; score: number };
    awayTeam?: { name: string; flagUrl: string; score: number };
    homeGraphData: { nodes: GameInfoPlayerResult[]; edges?: Edge[] };
    awayGraphData: { nodes: GameInfoPlayerResult[]; edges?: Edge[] };
    teamSide: "home" | "away";
    homeTacitValueList: Array<TeamTacitInfoResult>;
    awayTacitValueList: Array<TeamTacitInfoResult>;
    playersInfo: Array<PlayersInfoResult>;
    playerInfo?: PlayersInfoResult;
    personalTacitData: GraphData;
    visible: boolean;
    homePersonalTacitList: Array<PersonalTacitInfoResult>;
    awayPersonalTacitList: Array<PersonalTacitInfoResult>;
    personalList: any;
  }>({
    homeTeam: {
      name: "加载中...",
      flagUrl: DEFAULT_FLAG,
      score: 0,
    },
    awayTeam: {
      name: "加载中...",
      flagUrl: DEFAULT_FLAG,
      score: 0,
    },
    homeGraphData: { nodes: [], edges: [] },
    awayGraphData: { nodes: [], edges: [] },
    teamSide: "home",
    homeTacitValueList: [],
    awayTacitValueList: [],
    playersInfo: [],
    homePersonalTacitList: [],
    awayPersonalTacitList: [],
    personalTacitData: {},
    visible: false,
    personalList: [],
  });
  const {
    homeTeam,
    awayTeam,
    teamSide,
    homeTacitValueList,
    awayTacitValueList,
    homeGraphData,
    awayGraphData,
    homePersonalTacitList,
    awayPersonalTacitList,
    playersInfo,
    playerInfo,
    visible,
    personalList,
  } = state;
  const isHome = teamSide === "home";

  const { id } = parseSearch(location.search) as any;
  const { loading: loadingGetGameInfo, run: runGetGameInfo } = useRequest(
    getGameInfo,
    {
      manual: true,
    }
  );
  const { run: runGetTeamTacitInfo, loading: loadingGetTeamTacitInfo } =
    useRequest(getTeamTacitInfo, { manual: true });

  const { run: runGetPlayersInfo, loading: loadingGetPlayersInfo } = useRequest(
    getPlayersInfo,
    { manual: true }
  );

  const { run: runGetPlayerTacitInfo, loading: loadingGetPlayerTacitInfo } =
    useRequest(getPlayerTacitInfo, {
      manual: true,
    });

  const {
    run: runGetTeamPersonalTacitInfo,
    loading: loadingGetTeamPersonalTacitInfo,
  } = useRequest(getTeamPersonalTacitInfo, { manual: true });

  const personalGraphData = useMemo(() => {
    if (playerInfo) {
      const data = personalTacitTranslator(
        personalList,
        playerInfo!,
        playersInfo
      );
      return data;
    }
    return {};
  }, [playersInfo, personalList]);

  const onNodeClick = (playerid: string, playerInfo: PlayersInfoResult) => {
    setState((draft) => {
      draft.visible = true;
    });
    runGetPlayerTacitInfo({ id, isteama: playerInfo?.isTeamA, playerid }).then(
      (res) => {
        const list = res?.resultSet?.sort(
          (a: Record<string, string>, b: Record<string, string>) =>
            Number(b.playerValue) - Number(a.playerValue)
        );

        if (!list.length) return;

        setState((draft) => {
          draft.personalList = list;
          draft.playerInfo = { ...playerInfo!, caps: list[0]?.a_caps };
        });
      }
    );
  };

  const onNext = () => {
    history.push(`/compete?id=${id}`);
  };
  const onPrev = () => {
    history.push("/");
  };
  const onTeamClick = (params: { side: "home" | "away" }) => {
    setState((draft) => {
      draft.teamSide = params.side;
    });
  };
  const setVisible = (val: boolean) => {
    setState((draft) => {
      draft.visible = val;
    });
  };

  const graphData = useMemo(() => {
    const data: GraphData = {
      nodes: [],
      edges: [],
    };
    const currentData = isHome ? homeGraphData : awayGraphData;
    const tacitValueList = isHome ? homeTacitValueList : awayTacitValueList;

    if (tacitValueList && currentData.nodes.length && playersInfo.length) {
      data.nodes = currentData.nodes
        ?.map((item) => {
          const { id } = item;
          const playerInfo = playersInfo.find((item) => item.player_id === id);
          const playerTacitInfo = isHome
            ? homePersonalTacitList.find((item) => item.a_id === id)
            : awayPersonalTacitList.find((item) => item.a_id === id);
          return {
            ...item,
            ...playerInfo,
            nodeSize: Number(playerTacitInfo?.value_rank || 200),
            animationDelay: Math.random() * 0.5,
          };
        })
        .sort((a, b) => b.nodeSize - a.nodeSize)
        .map((item, index) => ({ ...item, isInTop: index < 3 }));
      data.edges = tacitValueList.map((item) => {
        const { a_id, b_id, playerValue } = item;
        const value = Number(playerValue) * 0.5;

        return {
          source: a_id,
          target: b_id,
          playerValue: value,
          stroke: isHome
            ? "linear-gradient(90deg, #80111D, #A0040D, #80111D)"
            : "linear-gradient(#0F2EAB, rgba(20,60,219,0.9),#0F2EAB)",
        };
      });
    }

    return data.edges?.length && data.nodes?.length ? data : {};
  }, [
    teamSide,
    homeGraphData,
    awayGraphData,
    homeTacitValueList,
    awayTacitValueList,
    playersInfo,
    homePersonalTacitList,
    awayPersonalTacitList,
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
          team_b_national_flag,
        } = data.resultSet?.[0] || {};
        setState((draft) => {
          draft.homeTeam = {
            name: team_a_country,
            flagUrl: team_a_national_flag,
            score: parseInt(homeWinProbability),
          };
          draft.awayTeam = {
            name: team_b_country,
            flagUrl: team_b_national_flag,
            score: parseInt(awayWinProbability),
          };
          draft.homeGraphData = {
            nodes: data.playerAList,
          };
          draft.awayGraphData = {
            nodes: data.playerBList,
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
        draft.homeTacitValueList = data.resultSet;
      });
    });
    runGetTeamTacitInfo({ id, isteama: "0" }).then((data) => {
      setState((draft) => {
        draft.awayTacitValueList = data.resultSet;
      });
    });
    runGetTeamPersonalTacitInfo({ id, isteama: "1" }).then((data) => {
      setState((draft) => {
        draft.homePersonalTacitList = data.resultSet;
      });
    });
    runGetTeamPersonalTacitInfo({ id, isteama: "0" }).then((data) => {
      setState((draft) => {
        draft.awayPersonalTacitList = data.resultSet;
      });
    });
    window?.Tracert?.call?.("set", {
      spmAPos: SPAPOS,
      spmBPos: "b97706",
      pathName: "默契页",
    });
    window?.Tracert?.call?.("logPv");
  }, [id]);

  return (
    <div className="tacit">
      <InstructionsForUse />
      {hasGraphData && (
        <div className="light">
          <LightTop />
        </div>
      )}

      <Loading
        loading={
          loadingGetGameInfo ||
          loadingGetPlayersInfo ||
          loadingGetTeamTacitInfo ||
          loadingGetTeamPersonalTacitInfo ||
          loadingGetPlayerTacitInfo
        }
      />
      <HomeIcon />
      <div className="tacit-title">
        <TitleDesc
          title="看队员默契程度"
          desc="基于几名球员历史上共同比赛的胜负情况计算得出"
        />
      </div>

      <div className="tacit-team">
        <ColorfulTeamTeam
          homeTeam={homeTeam!}
          awayTeam={awayTeam!}
          title="默契值"
          showActive
          onTeamClick={onTeamClick}
          dataAspm="c364605.d452407"
        />
      </div>

      <div className="tacit-playground">
        {hasGraphData ? (
          isHome ? (
            <div className="light-left">
              <LightLeft />
            </div>
          ) : (
            <div className="light-right">
              <LightRight />
            </div>
          )
        ) : null}
        <FootballField startLighting={hasGraphData} />
        <PersonalTacit
          personalTacitData={personalGraphData}
          playerInfo={playerInfo}
          visible={visible}
          setVisible={setVisible}
          onNodeClick={onNodeClick}
        />
        <TacitGraph
          style={{ opacity: visible ? 0 : 1 }}
          graphData={graphData}
          onNodeClick={onNodeClick}
          containerId="home"
        />
      </div>

      <div className="footer">
        <div className="button">
          <Button isShowHighlightBorder onClick={onPrev} className="up-page">
            <IconFont type="euro-icon-xiayiye1" rotate={180} /> 上一页
          </Button>
          <Button
            dataAspm="c364605.d452439"
            isShowHighlightBorder
            className="next-page"
            onClick={onNext}
          >
            下一页 <IconFont type="euro-icon-xiayiye1" />
          </Button>
        </div>
        {hasGraphData && (
          <div className="tooltip">
            <Tooltip>
              <SplitText id="tacit-text1">
                {`球衣越大，个人与全体队友的默契度越高，`}
              </SplitText>
              <SplitText id="tacit-tex2" delay={3200}>
                {`连线越粗，两名球员间的默契度越高。 ${hasGraphData ? "" : "(示意阵型，待根据本场比赛阵容信息确定)"} `}
              </SplitText>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacitPage;
