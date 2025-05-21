import "./Header.css"
import React from "react";
import { Link } from "react-router-dom";


const Header: React.FC = () => {
  return (
    <div className="header">
        <div className= "ourname">
            Coffee, Tea or Me
        </div>
        <nav className= "NavBar">
            <Link to="/home" className="nav-items">Home</Link>
            <Link to="/restaurants" className="nav-items">Restaurants</Link>
            <Link to="/profile"className="nav-items">Profile</Link>
            <Link to="/search"className="nav-items">Search</Link>
        </nav>
    </div>
  );
};

export default Header;
