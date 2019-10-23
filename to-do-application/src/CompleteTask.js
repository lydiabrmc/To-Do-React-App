import React from "react"
import "./App.css"

class CompleteTask extends React.Component {
    render() {
      return (
        <div className="row">
          <div className="col-2">
            <p className={this.props.complete && "complete"}>{this.props.text}</p>
          </div>
        </div>
      );
    }
  }

export default CompleteTask;