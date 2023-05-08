
import React from "react";
import restartAnimation from "../restartAnimation";
import TreeContent from "./content";
import Description from "./descriptions";
import init from "../split.js";
import { thedata } from "./initial-tree-data";

import "../../css/main.css";
import { SizeMe } from 'react-sizeme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'


export default class Home extends React.Component { 
  constructor() {
    super();
    this.state = {
      black: true,
      hideRight: false,
      width: null,
      uniqueID: {
        description: "",
        courses: [],
        related: []
      }
    };
  }


  componentDidMount() {
    init();
  }

  screenShift() {
    if (this.state.black) { 
        this.toFullScreen();
    }
    else { 
        this.toSplitScreen();
    }
  }

  toFullScreen(){
    this.setState({black: !this.state.black})
    this.setState({hideRight: !this.state.hideRight})
    let leftClass = document.getElementById("leftClass");
    leftClass.style.width = '100%'
    // to refresh the tree
    //const placeholder = document.getElementById("treeContent");
    //placeholder.render(<TreeContent width={"1400"} height={"700"}/>);
    //placeholder.
    restartAnimation();

  }

  toSplitScreen(){
    this.setState({black: !this.state.black})
    this.setState({hideRight: !this.state.hideRight})
    let leftClass = document.getElementById("leftClass");
    leftClass.style.width = '75%'
    restartAnimation();
    //const root = ReactDOM.createRoot(document.getElementById("root"));
    //root.render(<Main />);
  }

  changeUniqueID(item) {
    this.setState({uniqueID: item});
  }

  
  render () {  
    let btn_class = this.state.black ? "blackButton" : "whiteButton";  
    let right_div_class = this.state.hideRight ? "dont-show" : "initial-right-width";  
    let resizer = this.state.hideRight ? "dont-show" : "resizer"; 

   
    
    return (   
      <div className="main-container">

        <div className="container" id="body">  
          
          <div className="left-width" id="leftClass">  
            <SizeMe>{({ size }) => 
  
              <div style={{width:"100%"}}>
              
                <button className={btn_class} id="shiftButton" onClick={this.screenShift.bind(this)}>
                  <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                </button>
                <div id="treeContent">
                  <TreeContent 
                      data={thedata} 
                      width={size.width} 
                      height={"700"} 
                      uniqueID={this.state.uniqueID} 
                      changeUniqueID={this.changeUniqueID.bind(this)}/>
                </div>
              </div>}
            </SizeMe>
          </div>
                   
          <div className={resizer} id="dragMe"></div>
          
          <div className={right_div_class} id="leftClass">
            <div style={{width:"100%"}}>
              <Description 
                  uniqueID={this.state.uniqueID} 
                  changeUniqueID={this.changeUniqueID.bind(this)}/>
            </div>
          </div>

        </div>
        <div className="footer">
        </div>

      </div>
    );
  }
}