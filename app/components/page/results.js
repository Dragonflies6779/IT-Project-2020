var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;


/* this component is to render the result from search funtionality*/
var Results = React.createClass({
	getInitialState: function(){
		return {users: [], prop_name: ""}
	},

	componentWillMount: function(){
		this.state.users.splice(0, this.state.users.length);
		this.setState({prop_name: this.props.params.name});

		this.userRef = firebase.database().ref().child('users').orderByChild('last');
        this.userRef.on('child_added', snap =>{
            var user = snap.val();
       	    if((user.first + " " + user.last).toLowerCase().indexOf(this.props.params.name.toLowerCase()) >= 0){
       	    	user.id = snap.ref.key;
	       	    this.state.users.push(user);
	            this.setState({users: this.state.users});
       	    }
        });
	},

	componentWillReceiveProps: function(nextProps){
		if(this.state.prop_name != nextProps.params.name){
			this.setState({prop_name: nextProps.params.name});

			this.state.users.splice(0, this.state.users.length);
			this.userRef = firebase.database().ref().child('users').orderByChild('last');
	        this.userRef.on('child_added', snap =>{
	            var user = snap.val();
	       	    if((user.first + " " + user.last).toLowerCase().indexOf(nextProps.params.name.toLowerCase()) >= 0){
	       	    	user.id = snap.ref.key;
		       	    this.state.users.push(user);
		            this.setState({users: this.state.users});
	       	    }
	        });
		}
	},

	componentWillUnmount: function(){
		this.userRef.off();
	},
	//This class will  handle the results of the search component
	//It will display the searched term, the number of results and the Results
	//Clicking on the users will redirect to the profile page of the user
	render: function(){
		return(
			<div>
				<center>
					<h1 className="grid-title">Search results for "{this.state.prop_name}"</h1>
					<div>Returned {this.state.users.length} results...</div>
				</center>
				{this.state.users.map((user,index) => (
        			<div className="grid-item col-md-3" clkey={index}>
       					<Link to={"users/" + user.id}><h4><img src={user.imageURL} className="img-circle grid-img" alt="" width="100" height="100" style={{objectFit: 'cover'}}/><br/>
       					{user.first + " " + user.last}</h4></Link>
        				<br /><br />
        			</div>
				))}
			</div>
		)
	}
});

module.exports = Results;
