const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;
const mailto = require('react-mailto');

class socialMedia extends React.Component{
    constructor(props) {
        super();
        
        this.state = {
            instagram : "",
            linkedin : "",
            facebook : "",
            mail : "",
            alert : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    componentWillMount(){
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
      } 

  }

  componentWillReceiveProps(nextProps){
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
        this.setState({alert : "Change has been successfully saved"})

        event.preventDefault();
    };
  

    render() {
      var user = firebase.auth().currentUser;

      if (user){
      return ( 
        <div className="card-profile">
        <form onSubmit={this.handleSubmit} className="form">
          <h4>Contact</h4>

        <div className="form-control">
          <label>Instagram</label>
          <input
            name="instagram"
            placeholder = "https://instagram.com"
            value={this.state.instagram == null ? "" : this.state.instagram}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-control">
        <label> LinkedIn </label>
          <input
            name="linkedin"
            placeholder = "https://linkedin.com"
            value={this.state.linkedin == null ? "" : this.state.linkedin}
            onChange={this.handleChange}
          />
        </div>
        
        <div className="form-control">
        <label> facebook </label>
          <input
            name="facebook"
            placeholder = "https://facebook.com"
            value={this.state.facebook == null ? "" : this.state.facebook}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-control">
            <label> Mail </label>
          <input
            name="mail"
            placeholder = "test123@gmail.com"
            value={this.state.mail == null ? "" : this.state.mail}
            onChange={this.handleChange}
          />
        </div>
        <div className="btn btn-toolbar">
        <button className="btn btn-primary">Save</button>
        </div>
      </form>

        <div className="errorMessage">
            {this.state.alert}
        </div>
        <div>
            <a href={this.state.instagram} target="_blank"> 
            {this.state.instagram ? <img src="igIcon.png" alt="logo" height="30px"/> : ""}
            </a>

            <a href={this.state.linkedin} target="_blank"> 
            {this.state.linkedin ? <img src="liIcon.png" alt="logo" height="30px"/> : ""}
            </a>
            
            <a href={this.state.facebook} target="_blank">
            {this.state.facebook ? <img src="fbIcon.png" alt="logo" height="30px"/> : ""}
            </a>

            <a href={"mailto:" + this.state.mail}>
            {this.state.mail ? <img src="mailIcon.png" alt="logo" height="30px"/> : ""}
            </a>
            
        </div>

      </div>
      )
      }

      else{
        return(
          <div>
          <div>
            <a href={this.state.instagram} target="_blank"> 
              <b> {this.state.instagram ? <img src="igIcon.png" alt="logo" height={35}/>: ""}
              </b>
              </a>

            <a href={this.state.linkedin} target="_blank"> 
            <b> {this.state.linkedin ? "LinkedIn" : ""}
            </b>
            </a>

            <a href={this.state.facebook} target="_blank"> 
            <b> {this.state.facebook ? "Facebook" : ""}
            </b>
            </a>
          </div>

          <div>
            <a href={"mailto:" + this.state.mail}> Mail </a>
          </div>
          </div>
        )
      }
    }
  }

module.exports = socialMedia;
