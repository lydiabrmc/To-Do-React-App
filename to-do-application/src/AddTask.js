import React from "react"

class AddTask extends React.Component {
    render() {
        //JSX
        return(
        <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
                <input type="text" className="form-control" id="newItem" placeholder="Type an item here"></input>
            </div>
{/* this is a comment in JSX */}
            <button type="submit" className="btn btn-primary mb-2">Add to list</button>
        </form>
        )
    }
}

export default AddTask;