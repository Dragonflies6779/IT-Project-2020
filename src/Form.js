import React from "react";

//to validate the format of the inputs are correct
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const fNameRegex = RegExp(
  /^[a-z ,.'-]+$/i
);

const lNameRegex = RegExp(
  /^[a-z,.'-]+$/i
);

const passRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/
)

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  firstnameError: "",
  lastnameError:"",
  emailError: "",
  passwordError: ""
};

export default class Form extends React.Component {
  state = initialState;

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    let firstnameError = "";
    let lastnameError = "";
    let emailError = "";
    let passwordError = "";

    if(!emailRegex.test(this.state.email)){
      emailError = "Invalid Email Address.";
    }

    if(!passRegex.test(this.state.password)){
      passwordError = "Password should contain at least one: uppercase letter, one lowercase letter, and one number"
    }

    if(!fNameRegex.test(this.state.firstname)){
      firstnameError = "First Name should only contain letters.";
    }

    if(!lNameRegex.test(this.state.lastname)){
      lastnameError = "Last Name should only contain letters.";
    }

    if(this.state.lastname.includes(" ")){
      lastnameError ="Last Name should not contain spaces."
    }

    if (!this.state.firstname) {
      firstnameError = "This field is required";
    }

    if (!this.state.lastname) {
        lastnameError = "This field is required";
      }

    if (emailError || firstnameError || lastnameError || passwordError) {
      this.setState({ emailError, firstnameError, lastnameError, passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      console.log(this.state);
      // clear form
      this.setState(initialState);
    }
    else{
        console.error('INVALID');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="firstname">
          <input
            name="firstname"
            placeholder="First Name*"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
          <div className="errorMessage">
            {this.state.firstnameError}
          </div>
        </div>

        <div className="lastname">
          <input
            name="lastname"
            placeholder="Last Name*"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
          <div className="errorMessage">
            {this.state.lastnameError}
          </div>
        </div>

        <div>
          <input
            name="email"
            placeholder="Email*"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div className="errorMessage">
            {this.state.emailError}
          </div>
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password* (8-16 characters)"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="errorMessage">
            {this.state.passwordError}
          </div>
        </div>

        <div className="createAccount">
        <button type="submit">Create Account</button>
        <small>Have an account?</small>
        </div>
      </form>
    );
  }
}