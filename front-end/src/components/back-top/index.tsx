import { useEffect, useState } from "react";
import "./index.less";

export const BackTop = () => {
  const [visible, setVisible] = useState(false);
  const handleScroll = () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 550) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onBackTopClick = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    visible && (
      <div onClick={onBackTopClick} className="back-top">
        <img
          src="https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*2EVvSK3wqoUAAAAAAAAAAAAADsvfAQ/original"
          alt=""
        />
      </div>
    )
  );
};
