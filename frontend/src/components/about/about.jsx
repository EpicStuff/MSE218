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
                <p>{tree.name}</p>
            </div>
        );
    }
}