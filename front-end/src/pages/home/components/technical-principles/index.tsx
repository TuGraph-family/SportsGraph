import { Mask } from "antd-mobile";
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
          <div className="technical-title">换个视角看比赛</div>
          <p>
            想象你和别人踢足球，每次组的队不太一样。大家发现，某几个人如果在同一个队，这个队经常能赢；有些人面对特定的对手，总能占上风。这就是我们“图计算”技术分析比赛的原理。
          </p>
          <p>
            “图计算”技术能够捕捉事物间的“联系”：如果一些球员经常共同出场并取胜，他们之间的“默契度”就高；如果一方总能战胜另一方，对手间的“对抗度”就高。
          </p>
          <p>
            基于历史数据，我们训练了智能算法模型：结合个人实力和队伍配合，分析球员间的默契度和对抗度，从而得到整支球队的比赛实力。这就是图计算技术带来的全新的足球观赏体验。
          </p>
          <p>
            更多信息请见：
            <a href="https://www.tugraph.tech">https://www.tugraph.tech</a>
          </p>
        </div>
      </Mask>
    </>
  );
};

export default TechnicalPrinciples;
