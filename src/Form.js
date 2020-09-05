import React from 'react';

// to validate the format of the email is correct
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Form extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      firstName:null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email:"",
        password: ""
      }
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    //copy the state to work with
    let formErrors= this.state.formErrors;

    console.log("Name: ", name)
    console.log("Value: ", value)
    
    //giving the requirement for the form to be filled in
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length <= 0 ? "This field is required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length <= 0 ? "This field is required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) && value.length > 0
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleSubmit = e =>{
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTED--
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };



  // onSubmit = e => {
  //   e.preventDefault();
  //   this.props.onSubmit(this.state);
  //   this.setState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: ""
  //   });
  // };

  render() {
    const { formErrors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="firstname">
          <input
            name="firstName"
            placeholder="First name"
            noValidate
            onChange={this.handleChange}
          /> 
          {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
        </div>
        <div className="lastname">
          <input
            name="lastName"
            placeholder="Last name"
            noValidate
            onChange={this.handleChange}
          />
          {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
        </div>
        <div className="email">
          <input
            name="email"
            placeholder="Email"
            noValidate
            onChange={this.handleChange}
          /> 
          {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
        </div>
        <div className="password">
          <input
            name="password"
            type="password"
            placeholder="Password"
            noValidate
            onChange={this.handleChange}
          />
          {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
        </div>
        <div className="createAccount">
        <button onClick={e => this.handleSubmit(e)}>Create Account</button>
        <small>Already have an account?</small>
        </div>
      </form>
    );
  }
}
