
import React from "react";
import ReactDOM from 'react-dom';

import Header from "./header/header";
import Ontology from "./ontology/ontology";
import Home from "./home/home";
import About from "./about/about";
import Layout from "./Layout";
import Courses from "./courses/courses";

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
      
      <Router>


        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Ontology />} /> 
          <Route path="about" element={<About />} />
          <Route path="ontology" element={<Ontology />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Routes>
        
   
      </Router>

 
    );
  }
}

