import React, { Component } from "react"; 
import "./App.css";
import Form from "./Form";

class App extends Component {

  onSubmit = fields => {
    console.log("The sign up are: ", fields);
  };

  render() {
    return (
      <div className="Background">
        <div className="WebHeader">
          <h2>Sign Up</h2>
          <Form onSubmit={fields => this.onSubmit(fields)} className="form"/>
        </div>
      </div>
    );
  }
}

export default App;