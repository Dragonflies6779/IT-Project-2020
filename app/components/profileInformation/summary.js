var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var Summary = React.createClass({
	getInitialState: function(){
		return{isCurrentUser: false, editing: false};
	},

	componentWillMount: function(){
        this.userRef = firebase.database().ref().child('users/'+this.props.pageID);
        this.userRef.on("value", snap => {
        	var user = snap.val();
			if(user.summary){
				this.setState({summary: user.summary});
			}else{
				this.setState({summary: ""});
			}
        });
	},

	componentWillReceiveProps: function(nextProps){
        this.userRef = firebase.database().ref().child('users/'+ nextProps.pageID);
        this.userRef.on("value", snap => {
        	var user = snap.val();
			if(user.summary){
				this.setState({summary: user.summary});
			}else{
				this.setState({summary: ""});
			}
        });
	},

	componentWillUnmount: function(){
		this.userRef.off();
	},

	handleClickEdit: function(){
		this.setState({editing: true});
	},

	handleClickSave: function(){
		this.setState({editing: false});
		var newSummary = this.refs.newSummary.value;

        this.userRef.once("value", snap => {
        	var user = snap.val();
			var userInfo = {};
            for(var i in user){
                userInfo[i] = user[i];
            }
			userInfo.summary = newSummary;
			var updates = {};
			updates['users/' + this.props.pageID] = userInfo;
			firebase.database().ref().update(updates);
        });

        this.setState({summary: newSummary});
	},

	handleClickCancel: function(){
		this.setState({editing: false});
	},

	defaultSummary: function(){
		var editButton;
		if(this.props.isCurrentUser){
			editButton = <button className="btn btn-default" onClick={this.handleClickEdit}>Edit</button>;
		}else{
			editButton = <div></div>;
		}

		return(
			<div>
				<hr></hr>
				<h4 className="profile-heading">About</h4>
				<h4></h4>
				<h4>{editButton}</h4>
				<h4 className="card-body">{this.state.summary}</h4>
				<hr></hr>
			</div>
		);
	},

	editingSummary: function(){
		return(
			<div>
				<h4>About</h4>
				<textarea className="form-control" rows="6" style={{width: '100%'}} ref="newSummary" defaultValue={this.state.summary} />
				<center>
					<h4>
						<button className="btn" onClick={this.handleClickSave}>Save</button>
						<button  onClick={this.handleClickCancel}>Cancel</button>
					</h4>
				</center>
			</div>
		);
	},

	render: function(){
		var partToShow;
		if(this.state.editing){
			partToShow = this.editingSummary();
		}else{
			partToShow = this.defaultSummary();
		}

		return (
			<div className = "card-profile-summary">
				<h2>
					{partToShow}
				</h2>
			</div>

		);
	}
});

module.exports = Summary;
