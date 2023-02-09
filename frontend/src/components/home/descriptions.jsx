import React from "react";
import "../../css/boxes.css";
import { GreyBox, MiniGreyBox } from "./boxes.jsx";



export default class Description extends React.Component { 
    constructor(props) {
        super(props);
    }

    createCourses(courses) {
      if(courses.length > 0){
        return courses.map( (elem) => {return ( <MiniGreyBox key={elem} content={elem} />) })
      } else {
        return []
      }
    }

    createRelated(related) {
      if(related.length > 0){
        return related.map( (elem) => {return ( <MiniGreyBox key={elem} content={elem} />) })
      } else {
        return []
      }
    }

    render () {  
        const description = this.props.uniqueID.description;
        const courses = this.props.uniqueID.courses;
        const related = this.props.uniqueID.related;
       
    
        return (
            <div>
              <GreyBox title={"Definition"} content={description} />
              <div className="grey-box">
                <div className="holder">
                  {this.createRelated(related)}
                </div>
              </div>
              <div className="grey-box">
                <div className="holder">
                  {this.createCourses(courses)}
                </div>
              </div>
            </div>
        );
    }
}
