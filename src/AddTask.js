import React from "react"
import moment from "moment"

class AddTask extends React.Component {
    state = {
        newItemText: "",
        dateSelected: moment().format("YYYY-MM-DD")
    };

    updateNewItemText = (event) => {
        console.log(event.target.value)
        this.setState({
            newItemText: event.target.value
        });
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.addNewTaskFunc(this.state.newItemText, this.state.dateSelected);
        this.setState({
            newItemText: ""
        });
    }

    handleDateChange = e => {
        console.log(e.target.value)
        this.setState({
            dateSelected: e.target.value
        });
    }
    render() {
        return (
            <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <input
                        type="text"
                        className="form-control task-input"
                        id="newItem"
                        placeholder="Add your task here"
                        value={this.state.newItemText}
                        onChange={this.updateNewItemText}
                    ></input>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <input type='date'
                        onChange={this.handleDateChange}
                        value={this.state.dateSelected} /></div>
                <button
                    className="btn btn-primary mb-2"
                    onClick={this.handleClick}
                    disabled={this.state.newItemText.length <= 0 || this.state.newItemText.length >= 20}>
                    Add to list
            </button>
            </form>
        )
    }
}

export default AddTask;