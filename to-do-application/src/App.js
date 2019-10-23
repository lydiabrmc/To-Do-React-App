
import React, { Component } from "react";
import Header from "./Header"
import "./App.css";
import AddTask from "./AddTask"
import TaskCount from "./TaskCount";
import TaskList from "./TaskList"
import SubHeader from "./SubHeader"
import CompleteTask from "./CompleteTask"


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <AddTask />
        <TaskCount count={3}/>
        <TaskList text="Task 1"/>
        <TaskList text="Task 2"/>
        <TaskList text="Task 3"/>
        <SubHeader title="Completed"/>
        <CompleteTask text="Complete 1"/> 
        <CompleteTask text="Complete 2"/>
      </div>
    );
  }
}

export default App;