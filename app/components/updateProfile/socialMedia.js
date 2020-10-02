const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;

// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faInstagram as faIG,
//         faFacebook as faFB,
//         faLinkedin as faLI
//         } from '@fortawesome/free-brands-svg-icons';
class socialMedia extends React.Component{
    constructor(props) {
        super();
        
        this.state = {
            instagram : "",
            linkedin : "",
            facebook : "",
            mail : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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


    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        }); 
    }
  
  
    handleSubmit(event) {
        var user = firebase.auth().currentUser;
  
        let socialRef = firebase.database().ref('user-social');
        firebase.database().ref('user-social/' + firebase.auth().currentUser.uid).set({
            instagram: this.state.instagram,
            linkedin: this.state.linkedin,
            facebook: this.state.facebook,
            mail: this.state.mail
        })
        this.setState({instagram: this.state.instagram});
        this.setState({linkedin: this.state.linkedin});
        this.setState({facebook: this.state.facebook});
        this.setState({mail: this.state.mail});

        event.preventDefault();
    };
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="form">
            <h1>Social Media</h1>
          <div className="form-place">
              <label> Instagram </label>
            <input
              name="instagram"
              value={this.state.instagram}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-place">
              <label> LinkedIn </label>
            <input
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-place">
              <label> Facebook </label>
            <input
              name="facebook"
              value={this.state.facebook}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-place">
              <label> Mail </label>
            <input
              name="mail"
              value={this.state.mail}
              onChange={this.handleChange}
            />
          </div>
          <div className="save">
          <button type="submit">Save</button>
          </div>

        {/* show if the link is filled */}
          {/* <div>
          <a href={this.state.instagram}> 
          <b> <FontAwesomeIcon icon={this.state.instagram ? faIG : ""} size="2x"/>
          </b>
          </a>
          </div>

          <div>
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
          </div>  */}
        </form>
      );
    }
  }

module.exports = socialMedia;