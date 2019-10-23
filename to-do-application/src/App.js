
import React, { Component } from "react";
import Header from "./Header"
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <AddItem />
        <ItemCount count={3}/>
        <Item text="task" Add={true}/>
        <Item text="task" Delete={false}/>
        <Item text="task" Delete={false}/>
      </div>
    );
  }
}

export default App;