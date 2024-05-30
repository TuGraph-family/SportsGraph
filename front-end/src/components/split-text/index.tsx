import React, { useEffect } from "react";
import "./index.less";

interface SplitTextProps {
  children: string;
  id: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  children,
  id,
  delay = 2000
}) => {
  let char = 0;
  useEffect(() => {
    setTimeout(() => {
      const text = document.getElementById(id);
      if (text) {
        const strText = children;
        const splitText = strText?.split("");
        text.textContent = "";
        for (let i = 0; i < splitText.length; i++) {
          text.innerHTML += "<span>" + splitText[i] + "</span>";
        }
        let timer: null | NodeJS.Timeout = null;
        const onTick = () => {
          const span = text.querySelectorAll("span")[char];
          span.classList.add("fade");
          char++;
          if (char === splitText.length) {
            if (timer) {
              clearInterval(timer);
              timer = null;
            }

            return;
          }
        };
        timer = setInterval(onTick, 50);
      }
    }, delay);
  }, []);
  return (
    <div id={id} className="sg-split-text">
      {children}
    </div>
  );
};

export default SplitText;
