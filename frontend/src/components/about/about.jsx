import React from 'react';
import "../../css/about.css";
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
                <div className='text-box'>
                <h1>The Knowledge Engine Project</h1>
                <p>Like many fields in Engineering, undergraduate students in MSE are faced with an immense amount of curriculum content, covering a wide range of different domains of knowledge. A general engineering foundation taught in first year is followed by second year MSE specific courses, covering each subject area of MSE separately. See the MSE course map in the appendix. Students take 6 courses per term, with roughly 35 hours of contact time each week. Students are evaluated with a blend of assignments, labs, term tests, and exams. Each course is taught by a separate instructor, and has an individual curriculum of content. This course structure model does not promote an emphasis of a bigger picture overview of MSE concepts, and how concepts connect between courses. 

                Due to the current undergraduate learning model, and this large volume of curriculum content, there is reason to investigate whether students are successfully encoding this information long term, and gaining valuable knowledge and skills from their undergraduate degree. Research in memory retention suggests that knowledge can be successfully encoded in the short term for tests and exams, and it rapidly declines after the course is finished. There is evidence supporting the use of knowledge maps and ontologies in education to act as an organizational roadmap to synthesize the content curriculum in a way that improves the conceptual organization of the material presented in their courses. The purpose of this thesis is to investigate strategies of ontological curriculum concept mapping as a way to promote a conceptual organization to ultimately enhance the long term retention of MSE curriculum concepts. The term conceptual organization will be used throughout the paper; in this context, a conceptual organization refers to an understanding of how curriculum concepts fit together in a bigger picture landscape of the content. 
                
                </p>
                <h3>Meet the Team</h3>
                </div>
                
            </div>
        );
    }
}