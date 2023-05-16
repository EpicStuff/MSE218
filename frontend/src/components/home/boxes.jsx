import React from "react";
import "../../css/boxes";
import "../../css/main";

class DefinitionBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grey-box">
        <h1>{this.props.title}</h1>
        <p>{this.props.content}</p>
      </div>
    );
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
