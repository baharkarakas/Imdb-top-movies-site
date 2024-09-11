import React from "react";
import Image from "../images/imdb-logo.png";

const Header = ({ className, onSearch }) => {
  return (
    <nav className={`header-nav ${className}`} style={{ marginBottom: 24 }}>
      <img className="nav--logo" src={Image} alt="IMDb Logo" />
      <h2>Top Movies on IMDb this week</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Header;
