import england from "@/assets/home/england.png";
import germany from "@/assets/home/germany.png";
import Teamteam from "@/components/team-team";
import TitleDesc from "@/components/title-desc";
import { Button } from "antd-mobile";
import React from "react";
import { history } from "umi";
import "./index.less";

const resultPage: React.FC = () => {
  const jumpToHome = () => {
    history.push("/");
  };
  return (
    <div className="result">
      <div className="result-title">
        <TitleDesc
          title="这场比赛 AI 更看好"
          desc="综合历史比赛、AI、大数据得出"
        />
      </div>
      <div className="result-team">
        <Teamteam
          leftTeam={{ name: "英格兰", flagUrl: england }}
          rightTeam={{ name: "德国", flagUrl: germany }}
          centerText="默契值"
        />
      </div>
      <div className="result-predict">预测区</div>
      <div className="footer">
        <Button shape="rounded">分享给好友</Button>
        <Button shape="rounded" onClick={jumpToHome} color="primary">
          查看更过比赛
        </Button>
      </div>
    </div>
  );
};

export default resultPage;
