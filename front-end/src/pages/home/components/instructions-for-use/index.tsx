import React, { useEffect } from "react";
import { Checkbox, Mask } from "antd-mobile";
import { useImmer } from "use-immer";
import "./index.less";
import Button from "@/components/button";

interface InstructionsForUseProps {}

const InstructionsForUse: React.FC<InstructionsForUseProps> = ({}) => {
  const [state, setState] = useImmer<{ agree: boolean; visible: boolean }>({
    agree: false,
    visible: false,
  });
  const { agree, visible } = state;

  const onChange = (check: boolean) => {
    setState((draft) => {
      draft.agree = check;
    });
  };

  const onContinue = () => {
    localStorage.setItem("userAgreed", JSON.stringify(true));
    setState((draft) => {
      draft.visible = false;
    });
  };

  const getLocalStorageItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  useEffect(() => {
    const hasAgreed = getLocalStorageItem("userAgreed");
    if (!hasAgreed) {
      setState((draft) => {
        draft.visible = true;
      });
    }
  }, []);

  return (
    <Mask visible={visible} className="instructions-for-use">
      <div className="text-content ">
        <div className="title">使用声明</div>
        <li>
          应用展示的所有数据均来源于公开渠道，我们不对这些数据的准确性、可靠性、完整性或时效性作出任何保证。
        </li>
        <li>
          本应用提供的所有分析、计算结果仅限于非商业性、信息提供的目的使用，使用本应用意味着用户同意不将其用于违反任何适用法律、法规的活动。
        </li>
        <li>
          任何用户交互功能仅为增加互动性和娱乐性，与实际比赛无关。我们不承担任何因使用或无法使用本应用所引起的直接或间接损害。
        </li>
        <Checkbox block onChange={onChange} className="checkbox">
          我已阅读、理解并接受本使用声明的条款。
        </Checkbox>
        <div className="agree-button">
          <Button
            onClick={onContinue}
            style={{ padding: "11px 19px 11px 18px" }}
            disabled={!agree}
          >
            好的，继续去看
          </Button>
        </div>
      </div>
    </Mask>
  );
};

export default InstructionsForUse;
