import england from "@/assets/home/england.png";
import germany from "@/assets/home/germany.png";
import AsyncList from "@/components/async-list";
import { mockRequest } from "@/components/async-list/mock";
import Tabs from "@/components/tabs";
import Teamteam from "@/components/team-team";
import TitleDesc from "@/components/title-desc";
import { Button, ProgressBar, Swiper } from "antd-mobile";
import { history } from "umi";
import "./index.less";

const currentGameList: Array<{
  country1: string;
  country2: string;
  time: string;
}> = [
  {
    country1: "英国",
    country2: "德国",
    time: "3:00"
  },
  {
    country1: "英国",
    country2: "德国",
    time: "3:00"
  },
  {
    country1: "英国",
    country2: "德国",
    time: "3:00"
  },
  {
    country1: "英国",
    country2: "德国",
    time: "3:00"
  }
];
const jumpToCompete = () => {
  history.push("/compete");
};

const list = (
  <AsyncList
    service={mockRequest}
    renderItem={(key) => {
      return (
        <div className="game-card" key={key}>
          <div className="title">
            <div className="title-class">小组赛 A 组</div>
            <div className="title-time">周二 6.15 3:00</div>
          </div>
          <div className="game">
            <div className="game-left">
              <img className="game-flag" src={england} />
              <div className="game-country">英格兰</div>
            </div>
            <div className="game-time">3 : 2</div>
            <div className="game-right">
              <div className="game-country">德国</div>
              <img className="game-flag" src={germany} />
            </div>
          </div>
          <div className="predict">
            <div className="predict-text">
              <div className="predict-text-left">50%</div>
              <div className="predict-text-result">预测结果</div>
              <div className="predict-text-right">50%</div>
            </div>
            <div className="predict-bar">
              <ProgressBar
                percent={50}
                rounded={false}
                style={{
                  "--fill-color": "#fc4951",
                  "--track-color": "#34b4fc",
                  "--track-width": "4px"
                }}
              />
            </div>
          </div>
          <div className="to-progress">
            <Button shape="rounded" color="primary">
              查看分析过程
            </Button>
          </div>
        </div>
      );
    }}
  />
);
const HomePage: React.FC = () => {
  return (
    <div className="home">
      <div className="home-top">
        <TitleDesc title="智猜足球" desc="换种角度看足球，让AI服务每个人" />
        <Swiper
          loop
          autoplay
          onIndexChange={(i) => {
            console.log(i, "onIndexChange1");
          }}
          indicatorProps={{
            color: "white"
          }}
        >
          {currentGameList.map((item, index) => {
            return (
              <Swiper.Item key={index}>
                <div className="home-top-game">
                  <div className="center-team">
                    <Teamteam
                      leftTeam={{ name: "英格兰", flagUrl: england }}
                      rightTeam={{ name: "德国", flagUrl: germany }}
                      centerText="3:00"
                    />
                  </div>

                  <div className="center-predict" onClick={jumpToCompete}>
                    预测区
                  </div>
                  <div className="center-vote">投票区</div>
                </div>
              </Swiper.Item>
            );
          })}
        </Swiper>
      </div>
      <div className="home-list">
        <Tabs>
          <Tabs.Tab title="历史预测" key="fruits">
            {list}
          </Tabs.Tab>
          <Tabs.Tab title="更多赛程" key="vegetables">
            {list}
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
