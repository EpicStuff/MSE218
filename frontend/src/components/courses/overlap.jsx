import React from "react";
import { OverlapConceptBox } from "../home/boxes";


class Overlap extends React.Component {
    constructor(props) {
        super(props);
    }

    // the input is an array of courses which need to be displayed
    generateConcepts(conceptArray) {
        if (conceptArray.length > 0) {
            return conceptArray.map( (elem) => {
                return ( <OverlapConceptBox 
                            key={elem.uniqueID} 
                            name={elem.name} 
                            uniqueID={elem.uniqueID} 
                            colour={'#292929'} 
                />) 
            })
        } else {
            return []
        }
    }

    render() {
        return (
        <div>
            {this.generateConcepts(this.props.conceptArray)}
        </div>
        );
    }
}

export {Overlap};
