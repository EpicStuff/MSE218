import React from "react";

import { DefinitionBox, WrapSmallTextBox } from "./boxes.jsx";





export default class Description extends React.Component { 
    constructor(props) {
        super(props);
    }

    // courses is a list of course code
    // each course code gets mapped to a WrapSmallTextBox element 
    // the content displays the course code
    // there is no clicking option for these
    createCourses(courses) {
      if(courses.length > 0){
        return courses.map( (elem) => {return ( <WrapSmallTextBox key={elem} content={elem} />) })
      } else {
        return []
      }
    }

    // related is an array of objects of related concepts
    // Each object contains two fields: uniqueID and name
    // this function takes in the related array and maps each object element to a WrapSmallTextBox Element
    // the content displays the name of the concept
    // the uniqueID is used on the clicks. When the user clicks a node, this element is selected to display as the root node in the tree 
    createRelated(related) {
      if (related.length > 0) {
        return related.map( (elem) => {return ( <WrapSmallTextBox 
          onClick ={() => {
            this.props.handleDoubleClick(0, elem.uniqueID);
            this.props.handleSingleClick(0, elem.uniqueID);
          }} 
          key={elem.uniqueID} 
          content={elem.name} />) })
      } else {
        return []
      }
    }

    render () {  
        const description = this.props.nodeInfo.description;
        const courses = this.props.nodeInfo.courses;
        const related = this.props.nodeInfo.related;
        const laTex = this.props.nodeInfo.laTex;
        const x = `k_{n+1} = n^2 + k_n^2 - k_{n-1}`
        const y = `adding in a &#120591;`
        const z = 'hey testing this $_t_2$ and another one $_x_2$ etc. Adding a longer one in $_k_{n+1} = n^2 + k_n^2 - k_{n-1}$'
       
    
        return (
            <div>
              <DefinitionBox title={"Definition"} content={description} laTex={laTex} />
              <div className="grey-box">
                <p>I will display &#9824;</p>
                {this.createRelated(related)}
              </div>
              <div className="grey-box">
                  {this.createCourses(courses)}
              </div>
            </div>
        );
    }
}
