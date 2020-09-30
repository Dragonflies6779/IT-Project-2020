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

// import '/style.css';

var Profile = React.createClass({
	getInitialState: function(){
		return {user_name: "", isCurrentUser: false, pageID: "", currentUserID: ""};
	},

    componentWillMount: function(){
        var that = this;

		//sets the current pageID of the page
		this.setState({pageID: this.props.params.id});

		//checks to see if the user page belongs to the current user
		this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isCurrentUser: user.uid == this.props.params.id});
            this.setState({currentUserID: user.uid});
        });

		//gets the name of the user and whether or not he/she is a recruiter--not yet used
		this.userRef = firebase.database().ref().child('users/'+this.props.params.id);
		this.userRef.on("value", snap=>{
			var user = snap.val();
			this.setState({user_name: user.first + " " + user.last});
		});
	},

	componentWillReceiveProps: function(nextProps){
		//same as componentwillmount, but happens only if the params changed to another user
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

		show = 	<div>
					<Summary pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
					<Projects pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
					<Experience pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
					<Education pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
					<Skills pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
					<Interests pageID={this.state.pageID} isCurrentUser={this.state.isCurrentUser}/>
				</div>
		return <div className="profile">
				<h1>{this.state.user_name}</h1>
				<br />
				<hr/>
				{show}
			</div>

	},
});

module.exports = Profile;
