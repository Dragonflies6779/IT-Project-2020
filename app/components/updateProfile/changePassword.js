const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;
const passRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/
);


class changePassword extends React.Component{
    constructor(props){
        super();
            
        this.state = {
            currentPassword : "",
            newPassword : "",
            passwordError : "",
            errorMessage: "",
            successMessage : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    validate(newPassword){
      let passwordError = "";
      
      if(!passRegex.test(this.state.newPassword)){
        passwordError = "Password should contain at least one: uppercase letter, one lowercase letter, and one number"
      }

      if (passwordError) {
        this.setState({passwordError });
        return false;
      }
  
      return true;

    }

    //authenticate the password of the user
    reauthenticate(currentPassword) {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }
    
    handleSubmit(event) {
      let successMessage = "";
      let errorMessage = "";
      const isValid = this.validate();

      
        this.reauthenticate(this.state.currentPassword).then(() =>{
          var user = firebase.auth().currentUser;

          // changing password successful
          if (isValid) {
            user.updatePassword(this.state.newPassword).then(() =>{
            //changing password UNsuccessful
            }).catch((error) => {
                console.log("Error")
            });
          }
          }).catch((error) => {
              this.setState({errorMessage : "Error! Current password incorect"});

          });


  

      event.preventDefault();
    };

    render() {
        return (
          <div className="card-profile">
          <form onSubmit={this.handleSubmit} className="form">
              <h4>Change Password</h4>
            <div className="form-place">
              <label>Old Password</label>
              <input
                type="password"
                name="currentPassword"
                value={this.state.currentPassword}
                onChange={this.handleChange}
              />
            </div>
    
            <div className="form-place">
                <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
            </div>
    
            {/* <div className="form-place">
                <label> Confirm Password </label>
              <input
                name="confirmation"
                value={this.state.confirmation}
                onChange={this.handleChange}
              />
            </div> */}
            <div className="pass-button">
            <button type="submit" onClick={this.handleSubmit}>Change Password</button>
            </div>
            <div className="errorMessage">
            {this.state.passwordError}
            </div>
            <div className="errorMessage">
            {this.state.errorMessage}
            </div>
          </form>
          </div>
        );
      }
}

module.exports = changePassword;