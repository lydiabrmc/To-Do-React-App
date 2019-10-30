import React from "react"

class SubHeader extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}

export default SubHeader;
