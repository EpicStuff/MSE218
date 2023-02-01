import React from 'react';
import "../../css/about.css";
// make a change

export default class About extends React.Component { 
    constructor() {
        super();
    }


    render () {  
        
        fetch("http://localhost:3500/tree")
        .then((res) => {
        if (res.status !== 200) {
            throw Error(res.status);
        }
        return res.json();

        }).then((res) => {
            console.log("here")
            console.log(res);
          })
        
        return (
            <div className='background'>
                <p>Work in progress</p>
            </div>
        );
    }
}