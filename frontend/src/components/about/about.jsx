import React from 'react';
import "../../css/about.css";
//import "../../css/style.css";
// make a change

export default class About extends React.Component { 
    constructor() {
        super();
    }


    render () {  
        return (
            <div className='background'>
                <div className='left-side-content'>
                    <div className='vvv'></div>
                </div>

                <div className='right-side-content'>
                    <div className='intro'>
                        <h1>About the MSEKE</h1>
                        <p>The MSE undergraduate curriculum covers a wide set of knowledge from different areas of engineering. The MSE Knowledge Engine 
                        project was designed to improve the retention and conceptual organization of curriculum content by using a visual knowledge map 
                        to store the information. The goal of this platform is to emphasize a bigger picture overview of MSE concepts, 
                        specifically how concepts are related, and how they connect connect between various courses. 
                        </p>
                    </div>
                    <div className='about-content'>
                        <div className='relation-section'>
                            <div className="top-holder">
                                <div className="photo">
                                    <p>photo</p>
                                    <picture></picture>
                                </div>
                                <div className="about-text">
                                    <h1>Origin of the Project</h1>
                                    <p>
                                    This website was created as a MSE master's thesis project in 2023. The project was lead by Andrea Mitchell who designed and implemented the site. The project was supervised by Dr. Glenn Hibbard, Chair of the MSE Department. 
                                    
                                    Dr. Hibbard initiated an effort to restructure the MSE curriculum, to create a more cohesive organization to course content, where concepts are linked over multiple courses, as a way to solidify the understadning of difficult concepts. 
                                    
                                    The Knowledge Engine was built to act as a platform for emphasizing those connections between courses. 
                                    
                                    </p>

                                    <h1>Meet the Team</h1>

                                </div>
                            </div>
                            <div className='bottom-holder'>
                                <p>Like many fields in Engineering, undergraduate students in MSE are faced with an immense amount of curriculum content, 
                                covering a wide range of different domains of knowledge. A general engineering foundation taught in first year is followed 
                                
                                by second year MSE specific courses, covering each subject area of MSE separately. See the MSE course map in the appendix. 
                                Students take 6 courses per term, with roughly 35 hours of contact time each week. Students are evaluated with a blend of 
                                assignments, labs, term tests, and exams. Each course is taught by a separate instructor, and has an individual curriculum
                                of content. This course structure model does not promote an emphasis of a bigger picture overview of MSE concepts, and ho
                                w concepts connect between courses. </p>
                            </div>
                        </div>
                    </div>

                </div>
            
                
            </div>
        );
    }
}