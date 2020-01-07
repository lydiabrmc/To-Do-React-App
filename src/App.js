
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
    tasks: []
    // { text: "do the dishes", completed: true, date: "2019-10-20", id: uuid(), dueBy: "2019-11-10" },
  };

  componentDidMount() {
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
      text: taskText,
      completed: false,
      dateCreated: moment().format("YYYY-MM-DD"),
      dateDue: dueByDate
      //userId: 1 - can add this in if add the functionality of user logins. 
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



  completeTask = id => {
    const updatedTask = {
      text: '',
      date: ''
    };
    axios.put("https://y65zlhzmkj.execute-api.eu-west-1.amazonaws.com/dev/tasks/" + id, updatedTask)
      .then((response) => {
        const updatedTasks = this.state.tasks.map(task => {
          if (task.taskId === id) {
            task.completed = true;
          }
          return task;
        });
        this.setState({
          tasks: updatedTasks
        });
      })
      .catch((err) => {
        console.log("Error deleting task", err);
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
                text={task.text}
                completed={task.completed}
                key={task.taskId}
                deleteTaskFunc={this.deleteTask}
                id={task.taskId}
                completeTaskFunc={this.completeTask}
                date={task.dateCreated}
                dueBy={task.dateDue} />
            })}
          </tbody>
        </table>
        <SubHeader title="Completed Tasks" />
        {completedTasks.map(task => {
          return <CompleteTask
            text={task.text}
            completed={task.completed}
            key={task.taskId}
            deleteTaskFunc={this.deleteTask}
            id={task.taskId}
            date={task.dateCreated}
            dueBy={task.dateDue} />
        })}
      </div>
    );
  }
}

export default App;