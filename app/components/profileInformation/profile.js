//This is the profile page class that compiles all the information editing functions into one
// each of the "components" are essentially the same functionality but it calls-
// different locations for the realtime database
var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
var Summary = require('./summary.js');
var Education = require('./education.js');
var Projects = require('./projects.js');
var Interests = require('./interests.js');
var Experience = require('./experience.js');
var Skills = require('./skills.js');
const Upload = require('../uploadFile/pdfUpload.js');
const Account = require('../updateProfile/accountDetail.js');
const Social = require('../updateProfile/socialMedia.js');
const Password = require('../updateProfile/changePassword.js');
const ProfilePict = require('./profilepict.js');


// import '/style.css';

var Profile = React.createClass({
	getInitialState: function(){
		return(

			{user_name: "", isCurrentUser: false, pageID: "", currentUserID: ""});
	},

    componentWillMount: function(){
        var that = this;

		this.setState({pageID: this.props.params.id});

		this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isCurrentUser: user.uid == this.props.params.id});
            this.setState({currentUserID: user.uid});
        });

		this.userRef = firebase.database().ref().child('users/'+this.props.params.id);
		this.userRef.on("value", snap=>{
			var user = snap.val();
			this.setState({user_name: user.first + " " + user.last});
		});
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({pageID: nextProps.params.id});

		this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isCurrentUser: user.uid == nextProps.params.id});
            this.setState({currentUserID: user.uid});
        });

		this.userRef = firebase.database().ref().child('users/'+ nextProps.params.id);
		this.userRef.on("value", snap=>{
			var user = snap.val();
			this.setState({user_name: user.first + " " + user.last});
		});
	},

	componentWillUnmount: function(){
		this.userRef.off();
		this.unsubscribe();
	},

	render: function(){
		var show;

		show =
			<div>
				<Summary pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				<Projects pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				<Experience pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				<Education pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				<Skills pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				<Interests pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				<Social pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				<Upload pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser} user={firebase.auth().currentUser}/>
			</div>

		return (
			<div className="jumbotron">
				<br />
				<ProfilePict pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>

				<h1>{this.state.user_name}</h1>
				<br />
				<br />
				{show}
			</div>
		);
	},
});

module.exports = Profile;