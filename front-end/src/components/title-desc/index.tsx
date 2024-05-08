import React from "react";
import "./index.less";

interface TitleDescProps {
  title?: string;
  desc?: string;
}

const TitleDesc: React.FC<TitleDescProps> = ({ title, desc }) => {
  return (
    <div className="title-desc">
      {title && <div className="title">{title}</div>}
      {desc && <div className="desc">{desc}</div>}
    </div>
  );
};

export default TitleDesc;
