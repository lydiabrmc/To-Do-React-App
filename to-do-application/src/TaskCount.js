import React from "react"

class TaskCount extends React.Component {
    render(){
        return (
            <p>You have {this.props.count} tasks left to complete</p>
        )
    }
}

export default TaskCount;