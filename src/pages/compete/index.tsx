import england from "@/assets/home/england.png";
import germany from "@/assets/home/germany.png";
import FootballField from "@/components/football-field";
import Teamteam from "@/components/team-team";
import TitleDesc from "@/components/title-desc";
import { Button } from "antd-mobile";
import React from "react";
import { history } from "umi";
import "./index.less";

const competePage: React.FC = () => {
  const onNext = () => {
    history.push("/tacit");
  };
  const onPrev = () => {
    history.push("/");
  };
  return (
    <div className="compete">
      <div className="compete-title">
        <TitleDesc title="看队员对抗程度" desc="综合历史比赛、AI、大数据得出" />
      </div>
      <div className="compete-team">
        <Teamteam
          leftTeam={{ name: "英格兰", flagUrl: england }}
          rightTeam={{ name: "德国", flagUrl: germany }}
          centerText="对抗值"
        />
      </div>
      <div className="compete-predict">预测区</div>
      <div className="compete-field">
        <FootballField />
      </div>
      <div className="footer">
        <Button shape="rounded" onClick={onPrev} size="large">
          上一步
        </Button>
        <Button shape="rounded" onClick={onNext} color="primary" size="large">
          下一步
        </Button>
      </div>
    </div>
  );
};

export default competePage;
