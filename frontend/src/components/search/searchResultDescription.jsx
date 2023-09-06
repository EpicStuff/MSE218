import React from "react";

import { DefinitionBox, WrapSmallTextBox, SearchResultDescriptionConceptBox } from "../home/boxes";


export default class SearchResultDescription extends React.Component { 
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
        return related.map( (elem) => {return ( <SearchResultDescriptionConceptBox
          uniqueID={elem.uniqueID} 
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
        const name = this.props.nodeInfo.name;
        const uniqueID = this.props.nodeInfo.uniqueID;
        const description = this.props.nodeInfo.description;
        const courses = this.props.nodeInfo.courses;
        const related = this.props.nodeInfo.related;
        const laTex = this.props.nodeInfo.LaTeX;
        const x = `k_{n+1} = n^2 + k_n^2 - k_{n-1}`
        const y = `adding in a &#120591;`
        const z = 'hey testing this $_t_2$ and another one $_x_2$ etc. Adding a longer one in $_k_{n+1} = n^2 + k_n^2 - k_{n-1}$'
       
    
        return (
            <div>
              <div className="grey-box">
              {this.createTitle(description, "Open in Tree:")}
              <SearchResultDescriptionConceptBox
                  uniqueID={uniqueID} 
                  content={name}
                  course={this.findCourseByID(uniqueID)} />
            </div>
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
