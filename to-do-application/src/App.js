
import React, { Component } from "react";
import uuid from "uuid/v4";
import Header from "./Header1"
import "./App.css";
import AddTask from "./AddTask"
import TaskCount from "./TaskCount";
import Item from "./TaskList"
import SubHeader from "./SubHeader"


class App extends Component {
  state = {
    tasks: [
      {text: "do the dishes", completed: true, date: "2019-10-21", id: uuid()},
      {text: "walk the cat", completed: false, date: "2019-10-23", id: uuid()},
      {text: "buy oat milk", completed: false, date: "2019-10-25", id: uuid()},
      {text: "print pictures", completed: true, date: "2019-10-26", id: uuid()},
      {text: "hoover the cat's bed", completed: false, date: "2019-10-28", id: uuid()},
    ]
  };

  addNewTask = (taskText) => {
    const tasksCopy = this.state.tasks.slice();
    const newTask ={
      text: taskText, 
      completed: false,
      date: "2019-10-23",
      id: uuid(),
    };
    tasksCopy.push(newTask)
    this.setState({
      tasks: tasksCopy
    })
  };


  render() {
    const completedTasks = this.state.tasks.filter(tasks =>{
      return tasks.completed;
    });
    const incompleteTasks = this.state.tasks.filter(tasks =>{
      return tasks.completed ? false : true;
    });
    return (
      <div className="container">
        <Header />
        <AddTask addNewTaskFunc={this.addNewTask}/>
        <TaskCount count={this.state.tasks.length}/>
        {incompleteTasks.map(task => {
          return <Item text={task.text} completed={task.completed} key={task.id}/>
        })}
        <SubHeader title="Completed Tasks"/>
        {completedTasks.map(task => {
          return <Item text={task.text} completed={task.completed} key={task.id}/>
        })}
      </div>
    );
  }
}

export default App;