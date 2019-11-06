
import React, { Component } from "react";
import uuid from "uuid/v4";
import moment from "moment";
import Header from "./Header1"
import AddTask from "./AddTask"
import TaskCount from "./TaskCount";
import TaskList from "./TaskList"
import CompleteTask from "./CompleteTask";
import SubHeader from "./SubHeader"
import "./App.css";

class App extends Component {
  state = {
    tasks: [
      { text: "do the dishes", completed: true, date: "2019-10-20", id: uuid(), dueBy: "2019-11-10" },
      { text: "walk the cat", completed: false, date: "2019-10-23", id: uuid(), dueBy: "2019-11-13" },
      { text: "buy oat milk", completed: false, date: "2019-10-25", id: uuid(), dueBy: "2019-10-10" },
      { text: "print pictures", completed: true, date: "2019-10-26", id: uuid(), dueBy: "2019-10-13" },
      { text: "hoover the cat's bed", completed: false, date: "2019-10-28", id: uuid(), dueBy: "2019-08-13" },
    ]
  };

  addNewTask = (taskText, dueByDate) => {
    console.log(taskText, dueByDate, 'add task');
    const tasksCopy = this.state.tasks.slice();
    const newTask = {
      text: taskText,
      completed: false,
      date: moment().format("YYYY-MM-DD"),
      id: uuid(),
      dueBy: dueByDate,
    };
    tasksCopy.push(newTask)
    this.setState({
      tasks: tasksCopy
    })
  };

  completeTask = id => {
    const updatedTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.completed = true;
      }
      return task;
    });
    this.setState({
      tasks: updatedTasks
    });
  };

  deleteTask = id => {
    const filteredTasks = this.state.tasks.filter(task => {
      return task.id !== id
    });
    this.setState({
      tasks: filteredTasks
    });
  }

  render() {
    const completedTasks = this.state.tasks.filter(tasks => {
      return tasks.completed;
    });
    const incompleteTasks = this.state.tasks.filter(tasks => {
      return tasks.completed ? false : true;
    });
    return (
      <div className="container">
        <Header />
        <AddTask addNewTaskFunc={this.addNewTask} />
        <TaskCount count={incompleteTasks.length} />
        <table className="table">
          <tr>
            <th>Task</th>
            <th>Created</th>
            <th>Due by</th>
            <th></th>
            <th></th>
          </tr>
          {incompleteTasks.map(task => {
            return <TaskList
              text={task.text}
              completed={task.completed}
              key={task.id}
              deleteTaskFunc={this.deleteTask}
              id={task.id}
              completeTaskFunc={this.completeTask}
              date={task.date}
              dueBy={task.dueBy} />
          })}
        </table>
        <SubHeader title="Completed Tasks" />
        {completedTasks.map(task => {
          return <CompleteTask
            text={task.text}
            completed={task.completed}
            key={task.id}
            deleteTaskFunc={this.deleteTask}
            id={task.id}
            date={task.date}
            dueBy={task.dueBy} />
        })}
      </div>
    );
  }
}

export default App;