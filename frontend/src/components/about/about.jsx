import React from 'react';
import "../../css/about.css";
//import "../../css/style.css";
// make a change
import andrea from './../../images/andrea.png'; // Tell webpack this JS file uses this image
import nick from './../../images/nick.png';
import nadia from './../../images/nadia.png';
import hibbard from './../../images/hibbard.png';

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
                         
                            <div className='about-text'>
                            <h1>How to use the platform</h1>
                                    <p>
                                    The home page displays a hierarchical knowledge graph which holds curriculum concepts from second year MSE courses at U of T. 
                                    There is a single root node for each course in second year, which are organized in a hierarchy 
                                    under the overarching header of Material Science and Engineering.
                                    <br></br>
                                    <br></br>
                                    A single click on a tree node will present a short definition, related concepts, and a list of second year MSE courses
                                    where that concept is relavent. The related concepts may be clicked to open that concept in the tree. 
                                    A double click on a tree node will set that node as the root of the tree, uncovering further branches
                                    downward. The step back button will set the root node back to what it had been before. The lineage on the left side of the
                                    home screen displays the parent of the selected node two levels above. These may also be selected as a way to traverse 
                                    the tree upwards. Nodes that have a grey border are considered "leaf nodes" which means they have no children. All other nodes
                                    may be expanded downward. 
                                    <br></br>
                                    <br></br>
                                    Concepts are linked by coloured lines. The colour of the line indicates the type of relation that the concepts have.
                                    The legend on the left side indicates the type of relation for each colour. To further understand these relations, and to
                                    see more examples, the "Ontology" page provides a detailed explanation for each. 
                                    <br></br>
                                    <br></br>
                                    The MSE Courses page provides a way to see the overlapping concepts between different courses. By selecting courses
                                    on the left sidebar, and selecting "Show Overlap", this will show a list of all concepts which are relavent to all 
                                    courses that have been selected. Note that this may be none depending on the courses selected. If only one course is 
                                    selected, all concepts in that course are listed.
                                    <br></br>
                                    <br></br>
                                    Finally, the search function works by search for substrings. For instance searching "fun" would display "function" as well as 
                                    "fundamental theorem of calculus". Multiple words inputted are searched separately, thus "Quantum Mechanics" would display 
                                    "mechanics" as well as "quantum number". Searching is not case sensitive, but it will not work on mis-spelled words. To open 
                                    the concept in the tree in the home page, you may select the concept under "Open in Tree". A single click of a "related concept" 
                                    will also open that concept in the tree. 
                                    </p>
                                

                                <h1>Meet the Team</h1>
                                    <p>
                                    This website was created as a MSE master's thesis project in 2023. The project was lead by Andrea Mitchell 
                                    who designed and implemented the site, under the supervision of Dr. Glenn Hibbard, Chair of the MSE 
                                    Department. The database was created by Andrea and a group of second year MSE students. Curriculum content was
                                    first outlined into hierarchical knowledge maps, then the types of relations were established. The definitions
                                    and related courses were later added by the team.
                                    </p>
                                 
                                    </div>
                                  
                                  
                                    <div className="">
                                        <div className="side-by-side">
                                            <div className="headshot">
                                                <img src={andrea} alt="headshot" />
                                            </div>
                                            <div className="people-description">
                                                <div className="about-text">
                                                <h2>Andrea Mitchell</h2>
                                                <h3>Position: Project Design, Web Developer</h3>
                                                <p>
                                                Andrea is a graduate student at University of Toronto. She completed her Master's of Applied Science
                                                in MSE in August 2023. Her research interests are in education, knowledge representation, and ontologies. 
                                                </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="side-by-side">
                                            <div className="headshot">
                                                <img src={hibbard} alt="headshot" />
                                            </div>
                                            <div className="people-description">
                                                <div className="about-text">
                                                <h2>Glenn Hibbard</h2>
                                                <h3>Position: Project Supervision</h3>
                                                <p>
                                                Professor Glenn Hibbard is the Chair of the Department of Materials Science & Engineering at U of T. Professor Hibbard initiated 
                                                an effort to restructure the MSE curriculum, and identify overlaps in knowledge between courses, to create a more unified 
                                                program for undergraduate students.
                                                </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="side-by-side">
                                            <div className="headshot">
                                            <img src={nick} alt="Logo" />
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
                                                <img src={nadia} alt="headshot" />
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
                                        <div>
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