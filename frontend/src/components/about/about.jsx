import React from 'react';
import "../../css/about.css";
import "../../css/style.css";
// make a change

export default class About extends React.Component { 
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    componentDidMount() { // function will get run after the render method
        //console.log("component did mount")
        fetch("http://localhost:3500/tree")
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


    render () {  
        //console.log("render called")
        let tree = this.state.data;
        console.log(tree.uniqueID);
        
       
        return (
            <div className='background'>
                <div className='black-box'></div>
                <div className='vertical-bar'></div>

                <div className='intro'>
                <h1>About the MSEKE</h1>
                <br></br>
                <p>Like many fields in Engineering, undergraduate students in MSE are faced with an immense amount of curriculum content, covering a wide range of different domains of knowledge. A general engineering foundation taught in first year is followed by second year MSE specific courses, covering each subject area of MSE separately. See the MSE course map in the appendix. Students take 6 courses per term, with roughly 35 hours of contact time each week. Students are evaluated with a blend of assignments, labs, term tests, and exams. Each course is taught by a separate instructor, and has an individual curriculum of content. This course structure model does not promote an emphasis of a bigger picture overview of MSE concepts, and how concepts connect between courses. 
                </p>
                </div>

                <div className='content'>
                <p>Like many fields in Engineering, undergraduate students in MSE are faced with an immense amount of curriculum content, covering a wide range of different domains of knowledge. A general engineering foundation taught in first year is followed by second year MSE specific courses, covering each subject area of MSE separately. See the MSE course map in the appendix. Students take 6 courses per term, with roughly 35 hours of contact time each week. Students are evaluated with a blend of assignments, labs, term tests, and exams. Each course is taught by a separate instructor, and has an individual curriculum of content. This course structure model does not promote an emphasis of a bigger picture overview of MSE concepts, and how concepts connect between courses. 
                </p>
                </div>
            
                
            </div>
        );
    }
}