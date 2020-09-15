import React from 'react';
import LoginForm from './login_page/LoginForm';
import InputField from './login_page/InputField';
import SubmitButton from './login_page/SubmitButton';
import './App.css';

class App extends React.Component {

  render(){
    return (
      <div className = "app">
        <div className = 'container'>

            <LoginForm/>
        </div>
      </div>
      );
    }
}

export default App;
