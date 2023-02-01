
import React from "react";
import ReactDOM from 'react-dom';

import Header from "./header/header";
import Ontology from "./ontology/ontology";
import Home from "./home/home";
import About from "./about/about";

import init from "./split.js";

import "../css/main";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Description from "./home/descriptions";

export default class Main extends React.Component { 
  constructor() {
    super();
  }



  render () {  
    return (  
      <div>
      <About />
      <Home />
  
      </div>
      /*{<Router>

        <nav>
          <Link to="/">Home hey</Link>
          <Link to="/ontology">About</Link>
        </nav>

        <Routes>
          <Route exact path="/ontology" element={<Ontology />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
        
   
      </Router>}*/

 
    );
  }
}

