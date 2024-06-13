import { NavBar } from "antd-mobile";
import React from "react";
import { history } from "umi";
import "./index.less";
import IconFont from "../icon-font";

const HomeIcon: React.FC<{ hasRight?: boolean }> = ({ hasRight = true }) => {
  const back = () => {
    history.push("/");
  };

  return (
    <NavBar
      onBack={back}
      className="home-icon"
      backArrow={
        <>
          <IconFont
            style={{ color: "#fdfefe" }}
            type="euro-icon-fanhuishouye"
            className="icon"
          />
          <div className="home-text">首页</div>
        </>
      }
      right={
        hasRight ? (
          <a className="tu-graph" href="https://www.tugraph.tech/">
            <img
              src="https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*Jn6RRITUcW0AAAAAAAAAAAAADsvfAQ/original"
              alt=""
            />
            <IconFont type="euro-icon-xiayiye1" />
          </a>
        ) : null
      }
    />
  );
};

export default HomeIcon;
