import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 50){
      return;
    }
    this.setState({
      [property] : val
    })
  }

  resetForm() {
    this.setState = ({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin() {

    if(!this.state.username){
      return;
    }
    if(!this.state.username){
      return;
    }
    this.setState({
      buttonDisabled : true
    })

    //DO the API thing here
  }

  render(){
    return (
      <div className="loginForm">
        Login

        <InputField
          id = 'username'
          type = 'text'
          placeholder = 'Username'
          value = {this.state.username ? this.state.username : ''}
          onChange = { (val) => this.setInputValue('username', val)}
        />

        <InputField
          id = 'password'
          type = 'password'
          placeholder = 'Password'
          value = {this.state.password ? this.state.password : ''}
          onChange = { (val) => this.setInputValue('password', val)}
        />

        <SubmitButton
          id = 'submitButton'
          text = 'Login'
          disabled = {this.state.buttonDisabled}
          onClick = { () => this.doLogin() }
        />

      </div>
    );
  }
}

export default LoginForm;
