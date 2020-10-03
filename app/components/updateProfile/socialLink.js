const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;

class socialLink extends React.Component{
    constructor(props) {
        super();
        
        this.state = {
            instagram : "",
            linkedin : "",
            facebook : "",
            mail : ""
        }
    }

    componentDidMount(){
        var user = firebase.auth().currentUser;

        if (user){
            firebase
        .database()
        .ref('user-social/' + firebase.auth().currentUser.uid)
        .child('instagram')
        .once('value')
        .then(snapshot => {
          this.setState({
              instagram: snapshot.val()
          });
        });
      
        firebase
        .database()
        .ref('user-social/' + firebase.auth().currentUser.uid)
        .child('linkedin')
        .once('value')
        .then(snapshot => {
          this.setState({
              linkedin: snapshot.val()
          });
        });

        firebase
        .database()
        .ref('user-social/' + firebase.auth().currentUser.uid)
        .child('facebook')
        .once('value')
        .then(snapshot => {
          this.setState({
              facebook: snapshot.val()
          });
        });

        firebase
        .database()
        .ref('user-social/' + firebase.auth().currentUser.uid)
        .child('mail')
        .once('value')
        .then(snapshot => {
          this.setState({
              mail: snapshot.val()
          });
        });
        } else{
            console.log("no user exist")
        }

    }

    render(){
        return(
            <form>
            <div>
            <a href={this.state.instagram} target="_blank"> 
            <b> {this.state.instagram ? "Instagram" : ""}
            </b>
            </a>
            </div>
            <div>
            <a href={this.state.linkedin} target="_blank"> 
            <b> {this.state.linkedin ? "LinkedIn" : ""}
            </b>
            </a>
            </div>
            <div>
            <a href={this.state.facebook} target="_blank"> 
            <b> {this.state.facebook ? "Facebook" : ""}
            </b>
            </a>
            </div>
  
            {/* <div>
            <a href={this.state.linkedin}> 
            <b> <FontAwesomeIcon icon={this.state.linkedin ? faLI : ""} size="2x"/>
            </b>
            </a>
            </div>
  
            <div>
            <a href={this.state.facebook}> 
            <b> <FontAwesomeIcon icon={this.state.facebook ? faFB : ""} size="2x"/>
            </b>
            </a>
            </div>    */}
          </form>
        )
    }
}

module.exports = socialLink;