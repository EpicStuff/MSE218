
import React from "react";
import SearchForm from "./searchForm";
import "../../css/header.css";

// IDK I THINK THIS FILE IS IRRELEVENET

import logo from '../../images/mselogo.png'; // Tell webpack this JS file uses this image

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <div className="nav-bar">
          
          <div className="logo-and-words">
            <img src={logo} className="logo" width="30px" alt="Logo" />
            <div className="logo-words">Knowlvseedge<br></br>Engine</div>
          </div>

          <div className="nav-links">
            <a className="nav-label" href="/index">Home</a>
            <a className="nav-label" href="/about">About</a>
            <a className="nav-label" href="/ontology">Ontology</a>
            <a className="nav-label" href="/ontology">MSE Courses</a>
          </div>

          <div className="search">
            <SearchForm />
          </div>
          
        </div>
      </div>
     
    
 
    );
  }     
}