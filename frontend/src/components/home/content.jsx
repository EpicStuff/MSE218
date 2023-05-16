import React from "react";
import { LinkVertical } from "@visx/shape";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";

//import "../../css/content.css";
const colour_dict = {
    "b": "#00bbf9", // theorem (blue)
    "g": "#99d98c", // subtopic (green)
    "v": "#c77dff", // characterize (purple)
    "r": "#ef233c", // constitution (red)
    "o": "#f79d65", // subset (orange)
    "p": "#ff7096"  // derived (pink)
}


class TreeContent extends React.Component {
  constructor(props) {
    super(props);
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
    console.log("render called");
    const width = Number(this.props.width);
    const height = Number(this.props.height);
    const innerWidth = width - 60;
    const innerHeight = height - 150;
    const max_node_width = Math.floor(width / 120);
    const newtree = this.props.data;
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
                        stroke={colour_dict[link.target.data.colour]}
                        strokeWidth="1.5"
                        fill="none"
                        display={this.props.hidden == null ? "block" : "none"}
                    />
                    ))}
                   
                    {tree.descendants().map((node, key) => {


                    const width = 110;
                    const height = 40;

                    let top = node.y;
                    let left = node.x;
                    let colour = node.data.colour;


                    let shape = node.data.shape;
                    let borderRad;
                    let borderDash;
                    if (shape == "set") {
                        borderRad = "25px";
                        borderDash = "none";
                    } else if (shape == "aset") {
                        borderRad = "25px";
                        borderDash = "2px dashed #e0aaff";
                    } else {
                        borderRad = "25px";
                        borderDash = "2px dashed #333333";
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

                    var background_colour = (key != this.props.select) ? "#292929": "#fefae0";
                    var font_colour = (key != this.props.select) ? "white": "black";
                    var isHidden = (key == this.props.hidden || this.props.hidden == null) ? "block": "none";
                    
                  
                    return (
                        <foreignObject key={key} x={left-width/2} y={top-height/2} width="110" height="100">
                        <div className={fadeClass} >
                            <div className="nodes slide"
                                style={{
                                    backgroundColor: background_colour,
                                    boxShadow: "rgba(0, 0, 0, 0.23) 0px 6px 6px",
                                    color: font_colour,
                                    fontFamily: 'Mukta',
                                    lineHeight: "15px",
                                    fontSize: "15px",
                                    display: isHidden,
                                    borderRadius: borderRad,
                                    border: borderDash,
                                    }}
                                onClick = {() => {this.props.handleSingleClick(key, node.data.uniqueID)}}
                                onDoubleClick = {() => {this.props.handleDoubleClick(key, node.data.uniqueID)}}
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

