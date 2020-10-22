const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;

class accountDetail extends React.Component{
    constructor(props) {
        super();
        
        this.state = {
            firstname : "",
            lastname : "",
            email : ""
        }
    }

      
    componentWillMount(){
        var user = firebase.auth().currentUser;

        if (user){
            firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .child('first')
        .once('value')
        .then(snapshot => {
          this.setState({
              firstname: snapshot.val()
          });
        });
      
        firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .child('last')
        .once('value')
        .then(snapshot => {
          this.setState({
              lastname: snapshot.val()
          });
        });

        firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .child('email')
        .once('value')
        .then(snapshot => {
          this.setState({
              email: snapshot.val()
          });
        });
        } else{
            
        }

    }

    componentWillReceiveProps(nextProps){
        var user = firebase.auth().currentUser;

        if (user){
            firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .child('first')
        .once('value')
        .then(snapshot => {
          this.setState({
              firstname: snapshot.val()
          });
        });
      
        firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .child('last')
        .once('value')
        .then(snapshot => {
          this.setState({
              lastname: snapshot.val()
          });
        });

        firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .child('email')
        .once('value')
        .then(snapshot => {
          this.setState({
              email: snapshot.val()
          });
        });
        } else{
            
        }
    }


    render() {
        return (
            <div className="card-profile">
            <form>
                <h4>Account Detail</h4>
                <div className="form-place">
                    <label>First Name</label>
                        <input
                        name="firstname"
                        value={this.state.firstname}
                        
                        />
                </div>

                <div className="form-place">
                    <label>Last Name</label>
                        <input
                        name="lastname"
                        value={this.state.lastname}
                         
                        />
                </div>
    
                <div className="form-place">
                    <label> Email Address </label>
                        <input
                        name="email"
                        value={this.state.email}
                        
                        />
                </div>
            </form>
            </div>
        );
    }
}

module.exports = accountDetail;
