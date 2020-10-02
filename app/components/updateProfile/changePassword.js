const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;


class changePassword extends React.Component{
    constructor(props){
        super();
            
        this.state = {
            currentPassword : "",
            newPassword : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.reauthenticate(this.state.currentPassword).then(() =>{
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() =>{
                console.log("Password was changed")
            }).catch((error) => {
                console.log("Error")
            });

        }).catch((error) => {
            console.log("error")
        });


        event.preventDefault();

    };

    render() {
        return (
          <form onSubmit={this.handleSubmit} className="form">
              <h1>Change Password</h1>
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
          </form>
        );
      }
}

module.exports = changePassword;