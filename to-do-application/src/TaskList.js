import React from "react"
import "./App.css"

class Item extends React.Component {
    render() {
      return (
        <div className="row">
          <div className="col-2">
            <p className={this.props.complete && "complete"}>{this.props.text}</p>
          </div>
          <div className="col-1">
            <p>
              {this.props.quantity}
            </p>
          </div>
          <div className="col-1">
            <button className="btn btn-info" disabled={this.props.complete}>
              Add
            </button>
          </div>
          <div className="col-1">
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      );
    }
  }

export default Item;