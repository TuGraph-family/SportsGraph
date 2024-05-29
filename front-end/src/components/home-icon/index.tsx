import { NavBar } from "antd-mobile";
import React from "react";
import { FileOutline } from "antd-mobile-icons";
import { history } from "umi";
import "./index.less";
import IconFont from "../icon-font";

const HomeIcon = () => {
  const back = () => {
    history.push("/");
  };

  return (
    <NavBar
      onBack={back}
      className="home-icon"
      backArrow={
        <IconFont style={{ color: "#fdfefe" }} type="euro-icon-fanhuishouye" />
      }
    />
  );
};

export default HomeIcon;
