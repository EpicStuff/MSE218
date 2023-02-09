import React from "react";
import { LinkVertical } from "@visx/shape";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";

import { useState } from "react";


import "../../css/content.css";
import restartAnimation from "../restartAnimation";


const thedata = {
  "uniqueID": "function0",
  "name": "function",
  "shape": "set",
  "colour": "red",
  "children": [
      {
          "name": "polynomial",
          "colour": "blue",
          "shape": "set",
          "uniqueID": "polynomial0",
          "children": [
              {
                  "name": "linear function",
                  "colour": "green",
                  "shape": "set",
                  "uniqueID": "linfunction0",
                  "children": []
              }
          ]
      },
      {
          "name": "rational",
          "colour": "blue",
          "shape": "set",
          "uniqueID": "rational0",
          "children": [
              {
                  "name": "concept A1",
                  "colour": "blue",
                  "shape": "set",
                  "uniqueID": "concepta1",
                  "children": [
                      {
                          "name": "concept B1",
                          "colour": "blue",
                          "shape": "set",
                          "uniqueID": "conceptb1",
                          "children": [
                              {
                                  "name": "concept C1",
                                  "colour": "blue",
                                  "shape": "set",
                                  "uniqueID": "conceptc1",
                                  "children": []
                              },
                              {
                                  "name": "concept C2",
                                  "colour": "blue",
                                  "shape": "set",
                                  "uniqueID": "conceptc2",
                                  "children": []
                              }
                          ]
                      },
                      {
                          "name": "concept B2",
                          "colour": "blue",
                          "shape": "set",
                          "uniqueID": "conceptb2",
                          "children": []
                      },
                      {
                          "name": "concept B3",
                          "colour": "blue",
                          "shape": "set",
                          "uniqueID": "conceptb3",
                          "children": []
                      }
                  ]
              },
              {
                  "name": "concept A2",
                  "colour": "blue",
                  "shape": "set",
                  "uniqueID": "concepta2",
                  "children": []
              },
              {
                  "name": "concept A3",
                  "colour": "blue",
                  "shape": "set",
                  "uniqueID": "concepta3",
                  "children": []
              }
          ]
      }
  ]
};
  


class TreeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        select: 0,
        hidden: null,
        data: thedata,
    }
  }

  setSelected(key) {
    this.setState({select: key})
    console.log({root})
  }

  setBack = () => {
    console.log("here")
    this.setState({hidden: null})
    this.setState({select: 0})
  }

  handleSingleClick(key, uniqueID) {
    this.setSelected(key)
    this.fetchNodeByID(uniqueID)
    console.log(uniqueID);
  }

  fetchNodeByID(id) { // function will get run after the render method
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
            console.log("after the fetch", res);
            this.props.changeUniqueID(res);
        })
  }

  handleDoubleClick(key, uniqueID) {
    console.log("Double Button Click Activated");
    this.fetchByID(uniqueID);
    this.setState({hidden: key})
    console.log(this.state.hidden)
    setTimeout(function(){ restartAnimation(); }, 1000);  // 2 second delay
    setTimeout(this.setBack, 1000);
    
  }

  fetchByID(id) { // function will get run after the render method
    const url = "http://localhost:3500/tree/";
    fetch(url.concat(id))
        .then((res) => {
            if (res.status !== 200) {
                throw Error(res.status);
            } 
            return res.json();
        })
        .then((res) => {
            console.log("after the fetch", res);
            this.setState({data: res});  // this triggers the rerender to happen 
        })
  }
  /*
  componentDidMount() { // function will get run after the render method
    const id = "function0"
    const url = "http://localhost:3500/tree/";
    fetch(url.concat(id))
        .then((res) => {
            if (res.status !== 200) {
                throw Error(res.status);
            } 
            return res.json();
        })
        .then((res) => {
            console.log("after the fetch", res);
            this.setState({data: res});  // this triggers the rerender to happen 
        })
  }
*/
  render () {
    console.log("render called")
    console.log("rerenderchanfe something")
    const width = Number(this.props.width);
    const height = Number(this.props.height);
    const innerWidth = width - 60;
    const innerHeight = height - 150;
    const max_node_width = Math.floor(width / 120);
    const newtree = this.state.data;
    console.log(newtree);
    //console.log(thedata);
         // console.log("this one:", this.state.tree);
    //console.log("test size:", max_node_width) 
    // create new constant called data which comes from the backend function
    // inputs: max_node_width, max_depth, root_node - need a defaut for this one
    // on click, it will update the root node

    return (
      
      <div id="contentDiv">

        <svg width={width} height={height}>
            
            <rect width={width} height={height} rx={0} fill="#FFFAFA" fillOpacity={0} />
            <Group top={20} left={20}>
            <Tree
                root={hierarchy(newtree, (d) =>  d.children)}
                size={[innerWidth, innerHeight]}
                separation={(a, b) =>  1 }
            >
                {(tree) => (
                <Group top={0} left={0}>
                    
                    
                    {tree.links().map((link, i) => (
                    <LinkVertical
                        className="fade-in-four"
                        data={link}
                        key={i}
                        stroke={link.target.data.colour}
                        strokeWidth="1"
                        fill="none"
                        display={this.state.hidden == null ? "block" : "none"}
                    />
                    ))}
                   
                    
                   

                    {tree.descendants().map((node, key) => {

                    

                    const width = 110;
                    const height = 40;
                    //const [t, setT] = useState("");

                    let top = node.y;
                    let left = node.x;
                    let colour = node.data.colour;


                    let shape = node.data.shape;
                    let borderRad;
                    let borderDash;
                    if (shape == "set") {
                        borderRad = "50px";
                        borderDash = "none";
                    } else if (shape == "aset") {
                        borderRad = "50px";
                        borderDash = "2px dashed pink";
                    } else {
                        borderRad = "3px";
                        borderDash = "none";
                    } 

                    let depth = Number(node.depth)
                    let fadeClass = null;
                    if (depth == 1 || depth == 0) {
                        fadeClass = "fade-in-one";
                    } else if (depth == 2) {
                        fadeClass = "fade-in-two";
                    } else if (depth == 3) {
                        fadeClass = "fade-in-three";
                    } 

                    var selected = (key == this.state.select) ? "pink": "#292929";
                    var isHidden = (key == this.state.hidden || this.state.hidden == null) ? "block": "none";
                    
                  
                    return (
                        <foreignObject key={key} x={left-width/2} y={top-height/2} width="110" height="100">
                        <div className={fadeClass} >
                            <div className="nodes"
                                style={{
                                    backgroundColor: selected,
                                    display: isHidden,
                                    borderRadius: borderRad,
                                    border: borderDash,
                                    }}
                                onClick = {() => {this.handleSingleClick(key, node.data.uniqueID)}}
                                onDoubleClick = {() => {this.handleDoubleClick(key, node.data.uniqueID)}}
                                > 
                                {node.data.name}
                          
                                
                            </div>
                        </div>
                        </foreignObject>       
                        
                        
                        
                    ); 
                    })}
                </Group>
                )}
            </Tree>
            </Group>
        </svg>
        </div>
    )   
  }
}

export default TreeContent;


//separation={(a, b) => (a.parent === b.parent ? 1 : 1) / a.depth}
//<foreignObject x={left-width/2} y={top-height/2} width="110" height="100">
     //<Group top={top} left={left} key={key}> 
                       
                         
                        //<foreignObject x={-width/2} y={-height/2} width="110" height="100">