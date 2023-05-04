import React from 'react';
import "../../css/courses.css";

// make a change

export default class Courses extends React.Component { 
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    
    render () {  
        //console.log("render called")
        let tree = this.state.data;
        console.log(tree.uniqueID);
        
       
        return (
            <div className='background'>
                <div className='text-box'>
                <h1>Coursessss</h1>
                </div>
                
            </div>
        );
    }
}