import React from "react";

import { DefinitionBox, WrapSmallTextBox, RelatedConceptsTextBox } from "./boxes.jsx";


const courses_dict = {
  MAT294: 'MAT294: Calculus and Differential Equations',
  MSE202: 'MSE202: Thermodynamics',
  MSE219: 'MSE219: Structure and Characterization of Materials',	
  MSE244: 'MSE244: Inorganic Materials Chemistry and Processing',

  MSE217: 'MSE217: Diffusion and Kinetics',
  MSE218: 'MSE218: Phase Transformations',
  MSE222: 'MSE222: Mechanics of Solid Materials',
  MSE238: 'MSE238: Engineering Statistics and Numerical Methods',
  MSE245: 'MSE245: Organic Materials Chemistry and Properties',
  }


export default class Description extends React.Component { 
    constructor(props) {
        super(props);
    }

    findCourseByID(ID) {
      let course; 
      if      (5 <= ID & ID <= 201)     { course = "MSE238" } 
      else if (202 <= ID & ID <= 499)   { course = "MAT249" }
      else if (500 <= ID & ID <= 799)   { course = "MSE222" }
      else if (800 <= ID & ID <= 999)   { course = "MSE219" }
      else if (1050 <= ID & ID <= 1199) { course = "MSE244" }
      else if (1200 <= ID & ID <= 1399) { course = "MSE202" }
      else if (1400 <= ID & ID <= 1599) { course = "MSE218" }
      else if (1600 <= ID & ID <= 1899) { course = "MSE217" }
      else if (1900 <= ID & ID <= 2199) { course = "MSE245" }
      else { course = "" }
      return course;
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
      //this.props.resetCoursesAndRelated()
      if (related.length > 0) {
        return related.map( (elem) => {return ( <RelatedConceptsTextBox
          onClick ={() => {
            this.props.handleDoubleClick(0, elem.uniqueID);
            this.props.handleSingleClick(0, elem.uniqueID);
          }} 
          key={elem.uniqueID} 
          content={elem.name}
          course={this.findCourseByID(elem.uniqueID)} />) })
      } else {
        return []
      }
    }

    createTitle(content, header) {
      if (content.length > 0) {
        return <h1>{header}</h1>
      }
    }

    render () {  

    
        const description = this.props.nodeInfo.description;
        const courses = this.props.nodeInfo.courses;
        const related = this.props.nodeInfo.related;
        const laTex = this.props.nodeInfo.LaTeX;
       
    
        return (
            <div>
              <div className="grey-box">
                {this.createTitle(description, "Definition:")}
                <DefinitionBox title={"Definition"} content={description} laTex={laTex} />
              </div>
              
              <div className="grey-box">
                {this.createTitle(related, "Related Concepts:")}
                {this.createRelated(related)}
              </div>
              <div className="grey-box">
                  {this.createTitle(courses, "Related Courses:")}
                  {this.createCourses(courses)}
              </div>
            </div>
        );
    }
}
