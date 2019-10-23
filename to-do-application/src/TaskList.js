import React from "react"
import "./App.css"

class Item extends React.Component {
    render() {
      return (
        <div className="row">
          <div className="col-6 col-md-8">
            <p className={this.props.complete && "complete"}>{this.props.text}</p>
          </div>
          <div className="col-6 col-md-4">
            <button className="btn btn-info" disabled={this.props.complete}>
              Add
            </button>
            <button className="float-right btn btn-danger">Delete</button>
          </div>
        </div>
      );
    }
  }

export default Item;