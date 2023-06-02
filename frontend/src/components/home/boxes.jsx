import React from "react";


import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

class DefinitionBox extends React.Component {
  constructor(props) {
    super(props);
  }

  parser(content) {                   
    let content_list = content.split("$")
    if (content_list.length > 0) {
      return content_list.map( (elem) => {
        if (elem[0] == "*") {
          return <InlineMath key={elem} math={elem.slice(1)}/>
        } else {
          return <p  key={elem}>{elem}</p>
        }
      })
    } else {
      return []
    }
  }

  render() {
    const laTex = this.props.laTex;
    const content = this.props.content;
    console.log(laTex)

    if (laTex == true) {
      return (
        <div className="grey-box">
          <h1>{this.props.title}</h1>
          <div className="no-break">{this.parser(content)}</div>
        </div>
      );
    } else {
      return (
        <div className="grey-box">
          <h1>{this.props.title}</h1>
          <p>{this.props.content}</p>
        </div>
      );
    }
  }
}

class WrapSmallTextBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrap-small-text-box" style={{backgroundColor: this.props.colour}} onClick={this.props.onClick}>
        <p>{this.props.content}</p>       
      </div>
    );
  }
}

class CourseSmallTextBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="course-small-text-box" style={{backgroundColor: this.props.colour}} onClick={this.props.onClick}>
        <p>{this.props.content}</p>       
      </div>
    );
  }
}

export {DefinitionBox, CourseSmallTextBox, WrapSmallTextBox};
