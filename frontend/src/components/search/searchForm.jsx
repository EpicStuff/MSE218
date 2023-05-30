import { useState } from 'react';
import React from "react";



export default class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
        input: null
    }
}

  handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${this.state.input}`)
    this.props.handleSearch(this.state.input)
  }

  render () { return (
    <form  onSubmit={this.handleSubmit}>
      <div className="search-bar">
        <input type="Search" className="no-outline" id="search" placeholder="Search" onChange={(e) => this.setState({input: e.target.value})}/>
      </div>
    </form>
  )
  }
}

