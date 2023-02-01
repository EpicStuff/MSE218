import React from "react";
import { LinkVertical } from "@visx/shape";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";

import { useState } from "react";


import "../../css/content.css";
import restartAnimation from "../restartAnimation";


const thedata = {
    name: 'T',
    uniqueID: 'root',
    colour: 'red',
    shape: 'set',
    children: [
      {
        name: 'testing here okay does this work',
        uniqueID: 'child1',
        colour: 'blue',
        shape: 'box',
        children: [
          { name: 'A1' , uniqueID: 'a1', shape: 'aset', colour: 'black' },
          { name: 'A2' , uniqueID: 'a2', shape: 'aset', colour: 'black' },
          { name: 'A3' , uniqueID: 'a3', shape: 'box', colour: 'black', children: 
            [ { name: 'D1', uniqueID: 'd1', colour: 'black'},
              { name: 'D2', uniqueID: 'd2', colour: 'black'}] },
          {
            name: 'C',
            uniqueID: 'c', 
            colour: 'blue',
            shape: 'aset',
            children: [
              {
                name: 'C1',
                uniqueID: 'c1', 
                colour: 'blue'
              },
              {
                name: 'D',
                uniqueID: 'D', 
                colour: 'blue',
                children: [
                  { name: 'E1',  uniqueID: 'e1', colour: 'black'},
                  { name: 'E2',  uniqueID: 'e2', colour: 'black'},
                  { name: 'E3',  uniqueID: 'e3', colour: 'black'}
                
                ],
              },
            ],
          },
        ],
      },
      { name: 'Z' ,  uniqueID: 'z', colour: 'pink'},
      {
        name: 'B',
        uniqueID: 'b',
        colour: 'red',
        children: [{ name: 'B1' ,  uniqueID: 'b1', colour: 'red'}, 
                   { name: 'B2' ,  uniqueID: 'b2', colour: 'red'}, 
                   { name: 'B3' ,  uniqueID: 'b3', colour: 'red'}],
      },
    ],
  };
  


class TreeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        select: 0,
        hidden: null,
        tree: {},
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
    console.log(uniqueID);
    // some function to handle getting the description data
  }

  handleDoubleClick(key, uniqueID) {
    console.log("Double Button Click Activated");
    this.setState({hidden: key})
    console.log(this.state.hidden)
    setTimeout(function(){ restartAnimation(); }, 1000);  // 2 second delay
    setTimeout(this.setBack, 1000);
    // some function to handle changing the tree data
  }

  getTree(key, uniqueID) {
    fetch("http://localhost:3500/tree")
        .then((res) => {
        if (res.status !== 200) {
            throw Error(res.status);
        }
        return res.json();

        }).then((res) => {
          //if (this.state.tree != res) {
            console.log("Reached setting tree=")
            console.log(res);
            this.setState({tree: res});
          //}
          })
  }

  render () {
    const width = Number(this.props.width);
    const height = Number(this.props.height);
    const innerWidth = width - 60;
    const innerHeight = height - 150;
    const max_node_width = Math.floor(width / 120);
    let data = {};
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
                root={hierarchy(this.state.tree, (d) =>  d.children)}
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
                    const [t, setT] = useState("");

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
                                onDoubleClick = {() => {this.getTree(key, node.data.uniqueID)}}
                                > 
                               
                                {node.data.name}
                                {'hey'}
                                {node.data.colour}
                                {node.depth} 
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