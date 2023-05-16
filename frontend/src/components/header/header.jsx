import { Outlet, Link } from "react-router-dom";
import React from 'react';
import SearchForm from "./searchForm";
import "./../../css/header";
import logo from './../../images/mselogo.png'; // Tell webpack this JS file uses this image

const Header = () => {
  return (
    <div>
      <nav>
        <div className="nav-bar">
          <div className="logo-and-words">
            <img src={logo} className="logo" width="30px" alt="Logo" />
            <div className="logo-words">Knowledge<br></br><span className="pink">Engine</span></div>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-label">Home</Link>
            <Link to="/about" className="nav-label">About</Link>
            <Link to="/ontology" className="nav-label">Ontology</Link>
            <Link to="/courses" className="nav-label">MSE Courses</Link>
          </div>
          
        </div>
      </nav>
      <Outlet />
    </div>
  )
};

/**<div className="search">
            <SearchForm />
          </div> */

export default Header;