import React from "react";
import "./index.less";

interface FootballFieldProps {
  lightNumber?: 1 | 2;
  startAnimate?: boolean;
}

const FootballField: React.FC<FootballFieldProps> = ({
  lightNumber = 1,
  startAnimate = false
}) => {
  return (
    <div className="football-field">
      <div className="js-stage stage texture">
        <div className="js-world world">
          <div className="field field--alt"></div>
          <div className="field ground">
            <div className="field__texture field__texture--gradient">
              {startAnimate && (
                <>
                  {Array.from({ length: lightNumber }).map((_, index) => (
                    <div
                      key={index}
                      className={`field__texture--gradient-b ${
                        lightNumber === 1 ? "big" : "small"
                      }`}
                    ></div>
                  ))}
                </>
              )}
            </div>
            <div className="field__texture field__texture--grass"></div>
            <div className="field__line field__line--goal"></div>
            <div className="field__line field__line--goal field__line--goal--far"></div>
            <div className="field__line field__line--outline"></div>
            <div className="field__line field__line--penalty"></div>
            <div className="field__line field__line--penalty-arc"></div>
            <div className="field__line field__line--penalty-arc field__line--penalty-arc--far"></div>
            <div className="field__line field__line--mid"></div>
            <div className="field__line field__line--circle"></div>
            <div className="field__line field__line--penalty field__line--penalty--far"></div>
          </div>
          <div className="field__side field__side--left"></div>
          <div className="field__side field__side--right"></div>
          <div className="field__side field__side--back"></div>
          <div className="field__side field__side--front"></div>
        </div>
      </div>
    </div>
  );
};

export default FootballField;
