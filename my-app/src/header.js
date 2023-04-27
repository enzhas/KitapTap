import React from "react";
import GithubLogo from "./img/Github.svg";
import "../src/sass/style.css";

const Header = () => {
  return (
    <>
      <div class="header">
        <strong>
          <h2
            className="heading-name"
            style={{
              background: "none",
              marginBottom: 50,
              // color: "#444",
              textAlign: "center",
              // fontWeight: "bold", //No need of bold because headings are itself bold
              fontFamily: "Scheherazade New",
              textShadow: "3px 3px 3px #444",
            }}
          >
            📚 Кіапхана
          </h2>
        </strong>
      </div>
    </>
  );
};

export default Header;
