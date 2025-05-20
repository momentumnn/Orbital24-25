import React from "react";

const Header: React.FC = () => {
  return (
    <header className="landing-header">
      <div className="landing-logo">Coffee, Tea or Me</div>
      <nav className="landing-nav">
        <a href="/home">
          <div className="landing-nav-item">Home</div>
        </a>
        <a href="/profile">
          <div className="landing-nav-item">Profile</div>
        </a>
        <a href="/Restaurants">
          <div className="landing-nav-item">Restaurants</div>
        </a>
        <a href="/Search">
          <div className="landing-nav-item">Search</div>
        </a>
      </nav>
    </header>
  );
};

export default Header;
