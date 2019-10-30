import React from "react"

class AddTask extends React.Component {
    state ={
        newItemText: ""
    }

updateNewItemText = (event) => {
    console.log(event.target.value)
    this.setState({
        newItemText: event.target.value
    });
}

handleClick = (event) => {
    event.preventDefault();
    this.props.addNewTaskFunc(this.state.newItemText);
    this.setState({
        newItemText: ""
    });
}
    render() {
        //JSX
        return(
        <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
                <input 
                type="text" 
                className="form-control" 
                id="newItem" 
                placeholder="Add your task here"
                value={this.state.newItemText}
                onChange={this.updateNewItemText}
                ></input>
            </div>
{/* this is a comment in JSX */}
            <button className="btn btn-primary mb-2" onClick={this.handleClick} disabled={this.state.newItemText.length <= 0 || this.state.newItemText.length >= 20}>
                Add to list
            </button>
        </form>
        )
    }
}

export default AddTask;