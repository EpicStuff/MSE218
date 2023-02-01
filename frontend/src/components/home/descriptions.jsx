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
        const data = this.props.data;
        const description = data[0];
        const courses = data[1];
        const related = data[2];
    
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
