
import React from "react";
import SearchForm from "./searchForm";
import "../../css/header.css";


import logo from '../../images/mselogo.png'; // Tell webpack this JS file uses this image

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      search: false
    };
  }

  searchShift() {
    this.setState({search: !this.state.search})
    console.log("shifingt")
  }

 
  
  render() {

    let search_class_name = this.state.search ? "search-nav" : "dont-show"; 

    return (
      <div>
        <div className="nav-bar">
          
          <div className="logo-and-words">
            <img src={logo} className="logo" width="30px" alt="Logo" />
            <div className="logo-words">Knowledge<br></br><span className="pink">Engine</span></div>
          </div>

          <div className="nav-links">
            <a className="nav-label" href="/index">Home</a>
            <a className="nav-label" href="/about">About</a>
            <a className="nav-label" href="/ontology">Ontology</a>
          </div>

          <div className="search">
            <SearchForm />
          </div>
          
        </div>
      </div>
     
    
 
    );
  }     
}