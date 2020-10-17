var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var SearchFunc = React.createClass({
	getInitialState: function(){
		return ({results: []})
	},

	componentWillUnmount: function(){
		if (typeof this.userRef == 'function') {
		  	this.userRef.off();
		}
		if (typeof this.experienceRef == 'function') {
		  	this.experienceRef.off();
		}
		if (typeof this.eduationRef == 'function') {
		  	this.educationRef.off();
		}
	},

	render: function(){
		return(
			<div>
				<div className="col-md-2"></div>
				<div className="col-md-5">
					<center><h1>Search Results</h1>
					Your search returned {this.state.results.length} results:
					</center><br/>

					{this.state.results.map((user,index) => (
	        			<div key={index}>
	       					<Link to={"users/" + user.id}><h4><img src={user.imageURL} className="img-circle" alt="" width="100" height="100" style={{objectFit: 'cover', border: "1px solid #B5A4A4"}}/>
	       					{user.first + " " + user.last}</h4></Link>
	        				<br /><br />
	        			</div>
					))}
				</div>
			</div>
		)
	}
});

module.exports = SearchFunc;
