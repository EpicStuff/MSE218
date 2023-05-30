
import React from "react";
import restartAnimation from "../utilities/restartAnimation";
import init from "../utilities/split.js";
import { thedata } from "./initial-tree-data";
import TreeContent from "./content";
import Description from "./descriptions";
import Lineage from "./lineage";

import "../../css/style.css";
import { SizeMe } from 'react-sizeme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRightToLine, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { WrapSmallTextBox } from "./boxes";


export default class Home extends React.Component { 
  constructor() {
    super();
    this.state = {
      black: true,       // changes the colour of the little screen shift button
      hideRight: false,  // hide the right sidebar starts off as false, and gets switched to true when it is hidden
      hidden: null,      // IF (hidden == NULL) => { nodes are displayed block } ELSE => { hidden is set to key of node which remains on visible }
      select: 0,         // the KEY associated with the currently selected node. Defaults to the top one (0)
      currentSelected: thedata.uniqueID,
      ancestors: [],
      previousData: [],
      data: thedata,     // this holds the nested tree structure with the current root node on top
      nodeInfo: {        // uniqueID holds the information for the sidebar of a the selected uniqueID
        description: "",
        courses: [],
        related: [],
        laTex: false
      }
    };
  }


  componentDidMount() {
    init();
  }

  // this function is called when the black-white screen shift button is called
  // if the right side is currently NOT hidden, then it calls the toFullScreen function
  // otherwise, it calls the toSplitScreen function
  screenShift() {
    if (!this.state.hideRight) { 
        this.toFullScreen();
    }
    else { 
        this.toSplitScreen();
    }
  }

  // this function changes the width so that the tree takes up the whole screen
  // the states are first shifted, so that the button turns black and the hideRight flag state is changed
  // it picks out the left-class id element and sets the width to 100% so it takes up the whole screen
  // the animation is restarted for viewing effect
  // the setStates force an auto-rerender
  toFullScreen(){
    this.setState({black: !this.state.black})
    this.setState({hideRight: !this.state.hideRight})
    let leftClass = document.getElementById("leftClass");
    leftClass.style.width = '100%'
    restartAnimation();
  }

  // this function changes the width so that the sidebar is visible again
  // the states are first shifted, so that the button turns white and the hideRight flag state is changed
  // it picks out the left-class id element and sets the width to 75% so the sidebar comes back into view
  // the animation is restarted for viewing effect
  // the setStates force an auto-rerender
  toSplitScreen(){
    this.setState({black: !this.state.black})
    this.setState({hideRight: !this.state.hideRight})
    let leftClass = document.getElementById("leftClass");
    leftClass.style.width = '75%'
    restartAnimation();
  }

  // this gets called by the handle single click which gets called within the content.jsx file
  // The parameter ITEM object came from the database query, and it holds the courses, concepts, and definition as items
  // Since the state uniqueID is defined in this class, it affects the content within the Description class since its passed into that
  changeUniqueID(item) {
    this.setState({nodeInfo: item});
  }

  // hidden gets set to the key of the node in which we want to keep unhidden
  // when it's set to null, every node is displayed as a block element
  // when it's set to a number, that number represents the key of the node in which should NOT be hidden, and all the other nodes go hidden
  // this function changes everything from hidden back to being block
  changeFromHidden() {
    this.setState({hidden: null})
  }

  // the selected state always points to the current node which is selected, defaulted to the top one
  // this indicates what colour it should display
  setSelected(key) {
    this.setState({select: key})
  }

  // function is called after the 2 second delay, all the hidden nodes reappear again
  // the root node (with key 0) is now the selected node
  setBack = () => {
    this.changeFromHidden();
    this.setState({select: 0})
  }

  // when the user double clicks a node on the tree
  // they pass through th uniqueID and the key of the node 
  // uniqueID is used to query the database and find a selected node
  // the key is the unique number which is assigned to the node by the tree construction
  handleDoubleClick(key, uniqueID) {
    let currentRoot = this.state.data.uniqueID;
    this.setState({previousData: this.state.previousData.concat(currentRoot)});
    this.fetchByID(uniqueID);
    this.setState({hidden: key})
    this.setState({currentSelected: uniqueID})
    this.fetchLineage(uniqueID)
    setTimeout(function(){ restartAnimation(); }, 1000);  // 2 second delay
    setTimeout(this.setBack, 1000);
  }

  // function will get run after the render method
  // requests the backend to provide a tree in the intended data structure using the uniqueID given
  // the state data is updated with the new tree
  // this is called on the handle double click method
  fetchByID(id) { 
    const url = "http://localhost:3500/tree/";
    fetch(url.concat(id))
        .then((res) => {
            if (res.status !== 200) {
                throw Error(res.status);
            } 
            return res.json();
        })
        .then((res) => {
            this.setState({data: res});  // this triggers the rerender to happen 
        })
  }

  // this function gets called on a single click of a tree node
  // it takes in the uniqueID of the selected node as well as the key (integer number that represents its nodeID)
  // The function calls the setSelected, which just modifies the colour of that node
  // then it calls the fetchNodeByID function which finds the description, the related courses, and related concepts
  // that function then changes the state of the uniqueID which forces a re-render and passes that into the description class
  handleSingleClick(key, uniqueID) {
    this.setSelected(key)
    this.setState({currentSelected: uniqueID})
    this.fetchNodeByID(uniqueID)
    this.fetchLineage(uniqueID)
  }

  // this function is called when the back button is selected
  handleBackClick() {
    console.log('here')
    console.log(this.state.previousData)
    if (this.state.previousData.length > 0) {
      let uniqueID = this.state.previousData.at(-1)
      this.fetchByID(uniqueID);
      this.setState({hidden: 0});
      this.fetchLineage(uniqueID);
      setTimeout(function(){ restartAnimation(); }, 1000);  // 2 second delay
      setTimeout(this.setBack, 1000);
      this.state.previousData.pop();
    }
  }


  // This function will get run after the render method.
  // requests the backend to provide the description for the uniqueID given in the form of an object;
  // the object includes the (1) definition string, (2) related courses, (2) related concepts. 
  // The changeUniqueID function comes through as a props with the < TreeContent > constructor.
  // When this function is called here, it calls the function in the home.jsx file, which is the < Home > class
  // which allows it to update the description in the < Description > class. 
  fetchNodeByID(id) { 
    const url = "http://localhost:3500/node/";
    console.log("the uniqueID Passvdded in", id);
    fetch(url.concat(id))
        .then((res) => {
            if (res.status !== 200) {
                throw Error(res.status);
            } 
            return res.json();
        })
        .then((res) => {
            this.changeUniqueID(res);
        })
  }

  fetchLineage(id) {
    const url = "http://localhost:3500/grandparent/";
    console.log("the uniqueID Passvdded in", id);
    fetch(url.concat(id))
        .then((res) => {
            if (res.status !== 200) {
                throw Error(res.status);
            } 
            return res.json();  
        })
        .then((res) => {
            this.setState({ancestors: res.ancestors})
        })
  }


  render () {  
    let btn_class = this.state.black ? "blackButton" : "whiteButton";  
    let right_div_class = this.state.hideRight ? "dont-show" : "initial-right-width";  
    let resizer = this.state.hideRight ? "dont-show" : "resizer"; 



    return (   
      <div className="main-container">
      

        <div className="container" id="body">  
        <div className="black-box-main"></div>
          <div className="left-width" id="leftClass"> 
            <div className="left-side-content-main">
              <div>
                <div className="back-arrow-holder">
                  <button className="back-arrow" onClick={this.handleBackClick.bind(this)}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{color: "#ffffff"}} />  Step Back
                  </button>
                </div>
              
                <div className="side-holder">
                  <div className="head-legend"> Legend </div>
                    <div className="legend-holder">
                      <div className="legend top" style={{backgroundColor: "#f79d65"}}>Subset</div>
                      <div className="legend" style={{backgroundColor: "#c77dff"}}>Characterize</div>
                      <div className="legend" style={{backgroundColor: "#99d98c"}}>Subtopic</div>
                      <div className="legend" style={{backgroundColor: "#ff7096"}}>Derive</div>
                      <div className="legend" style={{backgroundColor: "#00bbf9"}}>Theorem</div>
                      <div className="legend" style={{backgroundColor: "#ef233c"}}>Constitution</div>                          
                    </div>
                </div>  
                <div className="side-holder">
                <div className="head-legend"> Lineage </div>
                  <div>
                    <Lineage 
                      ancestors={this.state.ancestors} 
                      handleDoubleClick={this.handleDoubleClick.bind(this)}
                      handleSingleClick={this.handleSingleClick.bind(this)}
                     />
                  </div>
              </div>
              </div>
            </div> 
            <div className="margins">
              <div className="right-side-content-main">
                <SizeMe>{({ size }) => 
                  <div style={{width:"100%"}}>
                    <button className={btn_class} id="shiftButton" onClick={this.screenShift.bind(this)}>
                      <FontAwesomeIcon icon={faArrowsLeftRightToLine} size='lg'/>
                    </button>

                    <div id="treeContent">
                      <TreeContent 
                          select={this.state.select}
                          data={this.state.data} 
                          width={size.width} 
                          hidden={this.state.hidden}
                          height={"700"} 
                          uniqueID={this.state.uniqueID} 
                          setSelected={this.setSelected.bind(this)}
                          handleDoubleClick={this.handleDoubleClick.bind(this)}
                          handleSingleClick={this.handleSingleClick.bind(this)}
                          changeUniqueID={this.changeUniqueID.bind(this)}/>
                    </div>

                  </div>}
                </SizeMe>
                
              </div>
            </div>
          </div>
                   
          <div className={resizer} id="dragMe"></div>
          
          <div className={right_div_class}>
            <div style={{width:"100%"}}>
              <Description 
                  nodeInfo={this.state.nodeInfo} 
                  changeUniqueID={this.changeUniqueID.bind(this)}
                  handleDoubleClick={this.handleDoubleClick.bind(this)}
                  handleSingleClick={this.handleSingleClick.bind(this)}/>
            </div>
          </div>

        </div>
        <div className="footer">
        </div>

      </div>
    );
  }
}

/*
     
<div className="holder">
                            <div className="legend"><span style={{color: "#f79d65"}}><span className="shrink-line-spacing">---------------</span> Subset <span className="shrink-line-spacing">---------------------</span></span></div>
                            <div className="legend"><span style={{color: "#ef233c"}}><span className="shrink-line-spacing">---------</span> Constitution <span className="shrink-line-spacing">----------------</span></span></div>
                            <div className="legend"><span style={{color: "#99d98c"}}><span className="shrink-line-spacing">--------------</span> Subtopic <span className="shrink-line-spacing">-----------------</span></span></div>
                            <div className="legend"><span style={{color: "#c77dff"}}><span className="shrink-line-spacing">----------</span> Characterize <span className="shrink-line-spacing">-----------</span></span></div>
                            <div className="legend"><span style={{color: "#00bbf9"}}><span className="shrink-line-spacing">--------------</span> Theorem <span className="shrink-line-spacing">----------------</span></span></div>
                            <div className="legend"><span style={{color: "#ff7096"}}><span className="shrink-line-spacing">-----------------</span> Derive <span className="shrink-line-spacing">-------------------</span></span></div>
                        </div>
*/