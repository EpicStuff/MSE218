import React from "react";
import "../../css/main.css";

const colour_dict = {
    "b": "#00bbf9", // theorem (blue)
    "g": "#99d98c", // subtopic (green)
    "v": "#c77dff", // characterize (purple)
    "r": "#ef233c", // constitution (red)
    "o": "#f79d65", // subset (orange)
    "p": "#ff7096"  // derived (pink)
}

export default class Lineage extends React.Component { 
    constructor(props) {
        super(props);
    }

    // courses is a list of course code
    // each course code gets mapped to a WrapSmallTextBox element 
    // the content displays the course code
    // there is no clicking option for these
    createLineage(ancestors_list) {
       ancestors_list.reverse();
        if (ancestors_list.length > 0) {
            return ancestors_list.map( (elem) => {return (
                <div className="fade-in-one" key={elem.name}>
                    <div className="connection" style={{backgroundColor: colour_dict[elem.colour]}}></div>
                    <div className="lineage-concept slide" onClick={this.props.handleDoubleClick(elem.uniqueID)}>{elem.name}</div>
                </div> 
                 ) })
        } else {
            return []
        }
    }



    render () {  
        const ancestors_list = this.props.ancestors;
       
    
        return (
            <div>
              {this.createLineage(ancestors_list)}
            </div>
        );
    }
}
