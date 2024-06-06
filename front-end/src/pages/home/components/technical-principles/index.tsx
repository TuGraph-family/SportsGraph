import React from "react";
import { Mask } from "antd-mobile";
import { QuestionCircleOutline } from "antd-mobile-icons";
import { useImmer } from "use-immer";
import "./index.less";

const TechnicalPrinciples = () => {
  const [state, setState] = useImmer<{ visible: boolean }>({
    visible: false,
  });
  const { visible } = state;

  const onShow = () => {
    setState((draft) => {
      draft.visible = true;
    });
  };

  const onClose = () => {
    setState((draft) => {
      draft.visible = false;
    });
  };

  return (
    <>
      <div
        data-aspm-click="c364602.d452405"
        onClick={onShow}
        className="technical-principles-icon"
      >
        ?
      </div>
      <Mask
        visible={visible}
        onMaskClick={onClose}
        className="technical-principles"
      >
        <div className="text-content ">
          <div className="technical-title">技术原理</div>
          <p>
            想象你经常和别人踢足球，可每次组的队都不太一样。玩的久了大家发现，某几个人如果在同一个队，这个队经常能赢；有些人面对特定的对手，总能占上风。这就是我们“图计算”技术分析比赛的原理。
          </p>
          <p>
            球员共同出场参加比赛，是一种特定的“联系”。如果一些球员经常共同出场并取胜，他们之间的“默契度”就高；类似地，球员作为对手对决时，一方总能战胜另一方，球员对手间的“对抗度”就高。基于历史数据，我们训练了智能算法模型，结合个人实力和队伍配合，分析球员之间的默契度和对抗度，从而得到整支球队的比赛实力。这就是图计算技术带来的全新的足球观赏体验。
          </p>
          <p>更多信息请见：https://www.tugraph.tech</p>
        </div>
      </Mask>
    </>
  );
};

export default TechnicalPrinciples;
