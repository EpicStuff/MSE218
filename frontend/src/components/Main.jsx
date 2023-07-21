
import React from "react";
import ReactDOM from 'react-dom';

import Ontology from "./ontology/ontology";
import Home from "./home/home";
import About from "./about/about";
import Header from "./header/header";
import Courses from "./courses/courses";
import Search from "./search/search";

//import "../css/main";

import { thedata } from "./home/initial-tree-data";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { RouteTree } from "./RouteTree";

export default class Main extends React.Component { 
  constructor() {
    super();
  }

  render () {  
    return (  
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home uniqueID={1} />} />
            <Route path="index/:id" element={<RouteTree />} />
            <Route path="about" element={<About />} />
            <Route path="ontology" element={<Ontology />} />
            <Route path="courses" element={<Courses />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

