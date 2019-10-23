
import React, { Component } from "react";
import Header from "./Header"
import "./App.css";
import AddTask from "./AddTask"
import TaskCount from "./TaskCount";
import TaskList from "./TaskList"
import SubHeader from "./SubHeader"


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <AddTask />
        <TaskCount count={3}/>
        <TaskList />
        <TaskList />
        <TaskList />
        <SubHeader />
      </div>
    );
  }
}

export default App;