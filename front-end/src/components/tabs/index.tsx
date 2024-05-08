import { Tabs as AntdTabs, TabsProps } from "antd-mobile";
import "./index.less";

const { Tab } = AntdTabs;

const Tabs = (props: TabsProps) => {
  return (
    <div className="sg-tabs">
      <AntdTabs activeLineMode="fixed" {...props} />
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;
