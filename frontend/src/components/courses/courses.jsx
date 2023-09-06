import React from 'react';

import "../../css/courses.css";
import { CourseSmallTextBox } from "../home/boxes.jsx";
import { Overlap } from './overlap';

// make a change
const cdic = {
'id1': 'APS110H1: Engineering Chemistry and Materials Science',
'id2': 'APS111H1: Engineering Strategies & Practice',
'id3': 'CIV100H1: Mechanics',
'id4': 'MAT186H1: Calculus',
'id5': 'MAT188H1: Linear Algebra',

id6: 'APS106H1: Fundamentals of Computer Programming',
id7: 'APS112H1: Engineering Strategies & Practice II',
id8: 'ECE110H1: Electrical Fundamentals',
id9: 'MAT187H1: Calculus II',
id10: 'MSE120H1: Materials Engineering, Processing and Application',
id11: 'MSE191H1: Introduction to Materials Science and Engineering',

id12: 'MAT294H1: Calculus and Differential Equations',
id13: 'MSE202H1: Thermodynamics',
id14: 'MSE219H1: Structure and Characterization of Materials',	
id15: 'MSE244H1: Inorganic Materials Chemistry and Processing',
id16: 'MSE294H1: Communication I',
id17: 'MSE296H1: Materials Paradigm at a Glance I',

id18: 'MSE217H1: Diffusion and Kinetics',
id19: 'MSE218H1: Phase Transformations',
id20: 'MSE222H1: Mechanics of Solid Materials',
id21: 'MSE238H1: Engineering Statistics and Numerical Methods',
id22: 'MSE245H1: Organic Materials Chemistry and Properties',
id23: 'MSE295H1: Communications II',
id24: 'MSE297H1: Materials Paradigm at a Glance II',

id25: 'MIE258H1: Engineering Economics and Accounting',
id26: 'MSE302H1: Thermodynamics II',
id27: 'MSE316H1: Mechanical Behaviour of Materials',
id28: 'MSE351H1: Design and Sim of Materials Processes',
id29: 'MSE396H1: Materials Manufacturing and Design I',
id30: 'MSE332H1: Heat and Mass Transfer for Materials Processing',
id31: 'MSE335H1: Materials Physics',
id32: 'MSE355H1: Materials Production',
id33: 'MSE397H1: Materials Manufacturing and Design II'
}


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


export default class Courses extends React.Component { 
    constructor() {
        super();
        this.state = {
            data: {}, // honestly no idea what this is......
            selected: [],  // this is a list of all the courses that the user currently has selected
            concepts: []
        }
    }

    onClearArray() {
        this.setState({ selected: [] });
    }

    // select function gets called when a course is selected from the list of courses
    // the parameter is the ID of the course
    // if the course isn't yet selected, then it adds it into the states, otherwise, it removes it from the list
    selectCourse(id) {
        if (!this.state.selected.includes(id)) {
            this.addItem(id)
        } else {
            this.removeItem(id)
        }
    }

    // Removes a course from the selected list with the given ID
    removeItem(id) {
        const index = this.state.selected.indexOf(id);
        console.log(index)
        if (index > -1) {                                    // only splice array when item is found
            this.state.selected.splice(index, 1)             // 2nd parameter means remove one item only
            this.setState({selected: this.state.selected})   // force the re-render
        }
    }

    
    // Adds a course from the selected list with the given ID
    addItem(id) {
        this.setState({ selected: this.state.selected.concat(id)});
    };

    // This function is called with the initial render within the sidebar holder class.
    // The purpose is the load up each of the courses in the database
    // The parameter is the courses dictionary ..... need too build that
    createCourses(courses) {
        console.log(courses)
        if(Object.keys(courses).length > 0){
          return Object.entries(courses).map(([key,value]) => {
            var colour = (this.state.selected.includes(key)) ? '#D36135': '#141414';
            return ( <CourseSmallTextBox onClick={() => {this.selectCourse(key)}} key={key} colour={colour} content={value} />) 
        })
        } else {
          return []
        }
    }

    // not sure what I was thinking here???
    con() {
        this.setState({ concepts: [] });
        return this.fetchOverlap(this.state.selected)
    }


    // takes in the current selected state which is the list of selected course IDs
    // first converts that to a string so it can pass it through as a request to the database
    // then, it requests to pull a list of the overlapping content between the sected courses
    // it calls the generate concepts function to display that list of courses
    fetchOverlap(courseIDsArray) { 
        let courseIDsString = courseIDsArray.toString();
        const url = "http://localhost:3500/concept/";
        fetch(url.concat(courseIDsString))
            .then((res) => {
                if (res.status !== 200) {
                    throw Error(res.status);
                } 
                return res.json();
            })
            .then((res) => {
                console.log(res.concepts);
                this.setState({concepts: res.concepts})
                //return this.generateConcepts(res.concepts);
            })
      }
      
    // render function
    render () {  
        let tree = this.state.data;
        console.log(tree.uniqueID);
        
        return (
            <div className="main-holder">
                <div className="column left">
                <div className='black-box'></div>
                    <div className="content-left">
                        {this.createCourses(courses_dict)}
                    </div>
                </div>
    
                <div className="column right">
                    <div className="content-right">
                        <div className='intro'>
                            <h1>Course Overlap</h1>
                            <p>Select one or more course codes on the left sidebar, and click <i>generate intersection</i> to show the overlap in content between selected items. Click concepts to open them in the tree. </p>
                        </div>
                        
                        <button className="select-button" onClick={() => {this.con()}}>Generate Intersection</button>
                        <div className='holder-for-concepts'>
                        <Overlap conceptArray={this.state.concepts}/>
                        </div>
                    </div>
                </div>           
            </div>
        );
    }
}

