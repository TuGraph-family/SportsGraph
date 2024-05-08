import React from "react";
import "./index.less";

const FootballField: React.FC = () => {
  return (
    <div className="football-field">
      <div className="js-stage stage texture">
        <div className="js-world world">
          <div className="field field--alt"></div>
          <div className="field ground">
            <div className="field__texture field__texture--gradient"></div>
            <div className="field__texture field__texture--gradient-b"></div>
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
        </div>
      </div>
    </div>
  );
};

export default FootballField;
