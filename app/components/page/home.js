var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
const Upload = require('../uploadFile/pdfUpload.js');
const Account = require('../updateProfile/accountDetail.js');
const Social = require('../updateProfile/socialMedia.js');
const Password = require('../updateProfile/changePassword.js');
const SocialLink = require('../updateProfile/SocialLink.js');

var Home = React.createClass({

    getInitialState: function() {
        return {
            isLoggedIn: (null != firebase.auth().currentUser),
            imgURL: "",
            requests: []
        }
    },

    componentWillMount: function() {
        var that = this;

        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isLoggedIn: (null != user)});
            this.setState({name: this.state.isLoggedIn ? user.displayName : null});
            this.setState({user_id: this.state.isLoggedIn ? user.uid : null});

            if(this.state.isLoggedIn){
                this.userRef = firebase.database().ref().child('users/' + firebase.auth().currentUser.uid);
                this.userRef.on("value", snap => {
                    var user = snap.val();
                    this.setState({imgURL: user.imageURL});
                });
            }
        });
    },

    render: function(){

        return (
            <div>
                <div className ="jumbotron jumbotron-fluid">
                    <div className="container">
                        {/* <input type="text" className="searchBar"></input>
                        <button>Search</button> */}

                        <div className="card">
                            {/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} /> */}
                            <div className="card-body">
                                <h3 className="card-title">Welcome!</h3>
                                <hr/>
                                <h5 className="card-text">Hi there, It's good to see you. Click the button below to help you get started on your portfolio.</h5>
                                    <Link to={"/users/" + this.state.user_id}> 
                                    {/* need to link this to portfolio editor */}
                                        <a href="#" className="btn btn-primary">Get Started</a>
                                    </Link>
                                    <p className="card-text">or</p>
                                    <Link to="/settings"> 
                                    {/* need to link this to portfolio editor */}
                                        <a href="#" className="btn btn-primary">Settings</a>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
});



module.exports = Home;
