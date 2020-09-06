import React from 'react';
import { observer } from 'mobx-react';
import LoginForm from './LoginForm';
import InputField from './InputField';
import SubmitButton form './SubmitButton';
import './App.css';

class App extends React.Compontent {

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
