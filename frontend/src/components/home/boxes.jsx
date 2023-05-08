import React from "react";
import "../../css/boxes";
import "../../css/main";

class GreyBox extends React.Component {
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

class MiniGreyBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mini-grey-box" style={{backgroundColor: this.props.colour}} onClick={this.props.onClick}>
        <p>{this.props.content}</p>       
      </div>
    );
  }

}

export {GreyBox, MiniGreyBox};
