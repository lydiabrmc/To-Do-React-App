
import React, { Component } from "react";
import Header from "./Header"
import "./App.css";
import AddTask from "./AddTask"
import TaskCount from "./TaskCount";


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <AddTask />
        <TaskCount count={3}/>
      </div>
    );
  }
}

export default App;