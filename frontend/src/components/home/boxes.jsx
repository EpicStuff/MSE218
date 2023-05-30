import React from "react";
import "../../css/boxes";
import "../../css/main";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

class DefinitionBox extends React.Component {
  constructor(props) {
    super(props);
  }

  parser(input) {
    let list = input.split("$")
    console.log(list)
    if (list.length > 0) {
      return list.map( (elem) => {
        if (elem[0] == "_") {
          return <InlineMath math={elem.slice(1)}/>
        } else {
          return <p>{elem}</p>
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
      <div className="wrap-small-text-box change-on-hover" style={{backgroundColor: this.props.colour}} onClick={this.props.onClick}>
        <p>{this.props.content}</p>       
      </div>
    );
  }
}



class FixedSmallTextBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fixed-small-text-box change-on-hover" style={{backgroundColor: this.props.colour, width: this.props.width}} onClick={this.props.onClick}>
        <p>{this.props.content}</p>       
      </div>
    );
  }
}

export {DefinitionBox, FixedSmallTextBox, WrapSmallTextBox};
