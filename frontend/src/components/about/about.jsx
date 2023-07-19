import React from 'react';
import "../../css/about.css";
//import "../../css/style.css";
// make a change
import andrea from './../../images/andrea-headshot-2.png'; // Tell webpack this JS file uses this image

export default class About extends React.Component { 
    constructor() {
        super();
    }


    render () {  
        return (
            <div className='background'>
                <div className='left-side-content'>
                    <div className='black-box'></div>
                    <div className='black-background'></div>
                </div>

                <div className='right-side-content'>
                    <div className='intro'>
                        <h1>MSE Knowledge Engine</h1>
                        <p>The MSE undergraduate curriculum covers a wide set of knowledge from different areas of engineering. The MSE Knowledge Engine 
                        project was designed to improve the retention and conceptual organization of curriculum content by using a visual knowledge map 
                        to store the information. The goal of this platform is to emphasize a bigger picture overview of MSE concepts, 
                        specifically how concepts are related, and how they connect connect between various courses. 
                        </p>
                    </div>
                    <div className='about-content-holder'>
                    <div className='about-content'>
                        <div className='relation-section'>
                            <div className='bottom-holder'>
                            <div className='about-text'>
                            <h1>How to Navigate</h1>
                                    <p>
                                    ...........
                                    </p>
                                

                                <h1>About the Project</h1>
                                    <p>
                                    This website was created as a MSE master's thesis project in 2023. The project was lead by Andrea Mitchell 
                                    who designed and implemented the site. The project was supervised by Dr. Glenn Hibbard, Chair of the MSE 
                                    Department. Dr. Hibbard initiated an effort to restructure the MSE curriculum, to create a more cohesive \
                                    organization to course content, where concepts are linked over multiple courses, as a way to solidify the 
                                    understadning of difficult concepts. The Knowledge Engine was built to act as a platform for emphasizing 
                                    those connections between courses. 
                                    </p>
                                    <h1>Meet the Team</h1>
                                    </div>
                                  
                                  
                                    <div className="">
                                        <div className="side-by-side">
                                            <div className="headshot">
                                                <img src={andrea} alt="Logo" />
                                            </div>
                                            <div className="people-description">
                                                <div className="about-text">
                                                <h2>Andrea Mitchell</h2>
                                                <h3>Position: Project Design, Web Developper</h3>
                                                <p>
                                                Andrea is a graduate student at University of Toronto. She completed her Master's of Applied Science
                                                in MSE in August 2023. Her research interests are in education, knowledge representation, and ontologies. 
                                                </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="side-by-side">
                                            <div className="headshot">
                                               
                                            </div>
                                            <div className="people-description">
                                                <div className="about-text">
                                                <h2>Glenn Hibbard</h2>
                                                <h3>Position: Project Supervision</h3>
                                                <p>
                                                Andrea is a graduate student at University of Toronto. She completed her Master's of Applied Science
                                                in MSE in August 2023. Her research interests are in education, knowledge representation, and ontologies. 
                                                </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="side-by-side">
                                            <div className="headshot">
                                               
                                            </div>
                                            <div className="people-description">
                                                <div className="about-text">
                                                <h2>Nicholas Saldanha</h2>
                                                <h3>Position: Content Creator</h3>
                                                <p>
                                                Nicholas is a third-year undergraduate student in Materials Science and Engineering. His research interests include biomaterials, 
                                        nanotechnology, and biomedical engineering. Nicholas was eager to join the MSEKE project to provide a learning platform for current and future 
                                        MSE students, faculty and staff.
                                                </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="side-by-side">
                                            <div className="headshot">
                                                
                                            </div>
                                            <div className="people-description">
                                                <div className="about-text">
                                                <h2>Nadia Megahed</h2>
                                                <h3>Position: Content Creator</h3>
                                                <p>
                                                Nadia, an undergraduate student, initially embarked on her educational journey in computer engineering. However, she later
                                                 discovered her true passion lies in materials science and engineering. Driven by her sense of purpose, Nadia aspires to 
                                                 create a significant impact by merging the worlds of manufacturing and sustainability. This project appealed to her as she
                                                  was interested in connecting curriculum content between different disciplines, as someone with an interdisciplinary background. 
                                        
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        
                                    </div>
                             
                        </div>

                         
                           
                        </div>
                    </div>

                </div>
                </div>
            
                
            </div>
        );
    }
}