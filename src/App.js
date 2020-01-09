
import React, { Component } from "react";
import uuid from "uuid/v4";
import moment from "moment";
import axios from "axios";
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
      {
        taskId: uuid(),
        taskText: "",
        completed: true,
        dateDue: "",
        id: uuid(),
        dateCreated: moment().format("YYYY-MM-DD")
      },
    ]
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    axios.get("https://y65zlhzmkj.execute-api.eu-west-1.amazonaws.com/dev/tasks")
      .then((response) => {
        const tasks = response.data;
        this.setState({
          tasks: tasks
        });
      })
      .catch((err) => {
        console.log("Error getting task data", err);
      });
  }

  addNewTask = (taskText, dueByDate) => {
    console.log(taskText, dueByDate, 'add task');
    const tasksCopy = this.state.tasks.slice();
    const newTask = {
      taskText: taskText,
      taskId: uuid(),
      id: uuid(),
      completed: false,
      dateCreated: moment().format("YYYY-MM-DD"),
      dateDue: dueByDate
    };

    axios.post("https://y65zlhzmkj.execute-api.eu-west-1.amazonaws.com/dev/tasks", newTask)
      .then((response) => {
        const taskFromDB = response.data;
        tasksCopy.push(taskFromDB)
        console.log(response)
        this.setState({
          tasks: tasksCopy
        })
      })
      .catch((err) => {
        console.log("Error creating task", err);
      })
  };

  completeTask(id) {
    axios.put("https://y65zlhzmkj.execute-api.eu-west-1.amazonaws.com/dev/tasks/" + id)
      .then((response) => {
        this.fetchTasks();
      })
      .catch((err) => {
        console.log("Error completing task", err);
      })
  };

  deleteTask = id => {
    axios.delete("https://y65zlhzmkj.execute-api.eu-west-1.amazonaws.com/dev/tasks/" + id)
      .then((response) => {
        const filteredTasks = this.state.tasks.filter(task => {
          return task.taskId !== id
        });
        this.setState({
          tasks: filteredTasks
        });
      })
      .catch((err) => {
        console.log("Error deleting task", err);
      })
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
          <tbody>
            <tr>
              <th>Task</th>
              <th>Created</th>
              <th>Due by</th>
              <th></th>
              <th></th>
            </tr>
            {incompleteTasks.map(task => {
              return <TaskList
                text={task.taskText}
                completed={task.completed}
                key={task.taskId}
                deleteTaskFunc={this.deleteTask}
                id={task.taskId}
                completeTaskFunc={this.completeTask.bind(this)}
                date={task.dateCreated}
                dueBy={task.dateDue} />
            })}
          </tbody>
        </table>
        <SubHeader title="Completed Tasks" />
        {completedTasks.map(task => {
          return <CompleteTask
            text={task.taskText}
            completed={task.completed}
            key={task.taskId}
            deleteTaskFunc={this.deleteTask}
            id={task.taskId}
            date={task.dateCreated}
            dueDue={task.dateDue} />
        })}
      </div>
    );
  }
}

export default App;