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
      return content_list.map( (elem, i) => {
        if (elem[0] == "*") {
          return <InlineMath key={i} math={elem.slice(1)}/>
        } if (elem[0] == "#") {
          return <BlockMath key={i} math={elem.slice(1)}/>
        } else {
          return <p  key={i}>{elem}</p>
        }
      })
    } else {
      return []
    }
  }

  render() {
    const laTex = this.props.laTex;
    const content = this.props.content;
    console.log("here: ", laTex)

    if (laTex == true) {
      return (
        <div className="line-height">
          <div className="no-break">{this.parser(content)}</div>
        </div>
      );
    } else {
      return (
        <div className="">
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
