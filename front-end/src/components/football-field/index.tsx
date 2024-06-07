import React from "react";
import "./index.less";

interface FootballFieldProps {
  lightNumber?: 1 | 2;
  startLighting?: boolean;
  perspective?: string;
  worldWidth?: number;
  hasAnimation?: boolean;
  isHomeWin?: boolean;
  hasShadow?: boolean;
}

const FootballField: React.FC<FootballFieldProps> = ({
  lightNumber = 1,
  startLighting = false,
  perspective = "120vh",
  worldWidth = 130,
  hasAnimation = true,
  hasShadow,
  isHomeWin,
}) => {
  return (
    <div className={`football-field ${hasAnimation ? "" : "hide-animation"}`}>
      <div className="js-stage stage texture" style={{ perspective }}>
        <div
          className="js-world world"
          style={{
            width: `${worldWidth}vw`,
            marginLeft: `-${worldWidth / 2}vw`,
          }}
        >
          <div className="field field--alt"></div>
          <div className="field ground">
            <div className="field__texture field__texture--gradient">
              {startLighting && (
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
            {hasShadow && (
              <div className="field__texture field__texture--shadow">
                <div
                  style={{
                    backgroundImage: `linear-gradient(to top, ${isHomeWin ? "#143CDB80, #143CDB00" : "#D84A5080, #D84A5000"})`,
                  }}
                  className={`field__texture--shadow-a`}
                ></div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${isHomeWin ? "#D84A5080, #D84A5000" : "#143CDB80, #143CDB00"})`,
                  }}
                  className={`field__texture--shadow-b`}
                ></div>
              </div>
            )}

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
