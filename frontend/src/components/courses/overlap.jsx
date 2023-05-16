import React from "react";
import { WrapSmallTextBox } from "../home/boxes";


class Overlap extends React.Component {
    constructor(props) {
        super(props);
    }

    // the input is an array of courses which need to be displayed
    generateConcepts(conceptArray) {
        if (conceptArray.length > 0) {
            return conceptArray.map( (elem) => {return ( <WrapSmallTextBox key={elem} content={elem} />) })
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
