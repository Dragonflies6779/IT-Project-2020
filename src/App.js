import React from 'react';
import LoginForm from './LoginForm';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import fire from './config/Fire';
import './App.css';

// this is for homepage after succesfully loggin in
import Home from './Home';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState( { user: null });
      }
    });
  }
  render(){
    return (
      <div className = "app">
        <div className = 'container'>
            {this.state.user ? (<Home/>) : (<LoginForm/>)}
        </div>
      </div>
      );
    }
}

export default App;
