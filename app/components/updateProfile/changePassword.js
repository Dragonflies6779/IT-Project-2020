const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;
const passRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/
);
/* this component handle change password logic */
class changePassword extends React.Component{
    constructor(props){
        super();
            
        this.state = {
            currentPassword : "",
            newPassword : "",
            confirmation : "",
            alert: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.reauthenticate = this.reauthenticate.bind(this);
    }

    validate(newPassword){
      let alert = "";
      
      if(this.state.confirmation !== this.state.newPassword){
        alert = "Password Confirmation does not match with new password!"
      }

      if(!passRegex.test(this.state.newPassword)){
        alert = "Password should contain at least one: uppercase letter, one lowercase letter, and one number"
      }

      if (alert) {
        this.setState({alert});
        return false;
      }
  
      return true;

    }
  
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
      let alert = "";
      const isValid = this.validate();

      if(isValid){
        this.reauthenticate(this.state.currentPassword).then(() =>{
            var user = firebase.auth().currentUser;
            this.setState({alert : ""})
            //change password successful
            
            user.updatePassword(this.state.newPassword).then(() =>{
              this.setState({alert : "Password has been successfully changed!"})
              this.setState({newPassword : ""})
              this.setState({currentPassword : ""})
              this.setState({confirmation : ""})
            //change password UNsuccesful
            }).catch((error) => {
                this.setState({alert : "Error! Please try again!"})
            });
          
        }).catch((error) => {
            this.setState({alert : "Error! Current Password incorrect!"})
        });
      }

        event.preventDefault();

    };

    render() {
        return (
          <div className="card-profile">
          <form onSubmit={this.handleSubmit} className="block">
              <h4>Change Password</h4>
            <div className="block">
              <label>Old Password</label>
              <input
                type="password"
                name="currentPassword"
                value={this.state.currentPassword}
                onChange={this.handleChange}
              />
            </div>
    
            <div className="block">
                <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
            </div>
    
            <div className="form-place">
                <label> Confirm Password </label>
              <input
                type = "password"
                name="confirmation"
                value={this.state.confirmation}
                onChange={this.handleChange}
              />
            </div>

            <div className="pass-button">
            <button type="submit" onClick={this.handleSubmit}>Change Password</button>
            </div>

            <div className="errorMessage">
            {this.state.alert}
            </div>
          </form>
          </div>
        );
      }
}

module.exports = changePassword;