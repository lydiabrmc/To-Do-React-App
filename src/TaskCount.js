import React from "react"

class TaskCount extends React.Component {
    render() {
        return (
            <h3>You have <strong>{this.props.count}</strong> tasks left to complete</h3>
        )
    }
}

export default TaskCount;