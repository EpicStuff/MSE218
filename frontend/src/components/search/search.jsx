import React from 'react';
import "../../css/search.css";
import SearchForm from './searchForm'; 
import { WrapSmallTextBox } from '../home/boxes';
import Description from '../home/descriptions';
//import "../../css/style.css";
// make a change

export default class Seach extends SearchForm { 
    constructor() {
        super();
        this.state = {
            keyword: null,
            results: [],
            nodeInfo: {        // uniqueID holds the information for the sidebar of a the selected uniqueID
                description: "",
                courses: [],
                related: [],
                laTex: false,
            }
        }
    }

    showDescription(uniqueID) {
        const url = "http://localhost:3500/node/";
        fetch(url.concat(uniqueID))
            .then((res) => {
                if (res.status !== 200) {
                    throw Error(res.status);
                } 
                return res.json();
            })
            .then((res) => {
                this.setState({nodeInfo: res});
            })

    }


    createResults() {
        let results = this.state.results;
        if(results.length > 0){
            return results.map( (elem) => { return ( <WrapSmallTextBox 
                    key={elem.uniqueID} 
                    content={elem.name} 
                    onClick={() => {this.showDescription(elem.uniqueID)}}
                />) })
          } else {
            return []
          }
    }

    
    handleSearch(input) {
        console.log("eehere")
        this.setState({keyword: input})
        this.fetchNodesBySearch(input)
    }

    updateResults(res) {
        this.setState({results: res.results})
    }

    fetchNodesBySearch(input) { 
        const url = "http://localhost:3500/search/";
        fetch(url.concat(input))
            .then((res) => {
                if (res.status !== 200) {
                    throw Error(res.status);
                } 
                return res.json();
            })
            .then((res) => {
                this.updateResults(res);
            })
    }


    render () {  
       
        return (
            <div className='background'>
              
                <SearchForm handleSearch={this.handleSearch.bind(this)}/>
              

                <div className="search-content">
                     <div className="search-column search-left">
                        <div className="inner-content">
                            {this.createResults()}
                        </div>
                    </div>

                    <div className="search-column search-right">
                        <div className="inner-content">
                        <Description 
                        nodeInfo={this.state.nodeInfo} 
                        />
                        </div>
                    </div> 
                   
                </div>


                
            </div>
        );
    }
}

/*
 <div className="column search-left">
                        <div className="inner-content">
                            {this.state.keyword}
                        </div>
                    </div>

                    <div className="column search-right">
                        <div className="inner-content">
                            Right
                        </div>
                    </div>           

*/