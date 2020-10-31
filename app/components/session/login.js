var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var LogInForm = React.createClass({

	getInitialState: function(){
		return{hasError: false};
	},

	//logs the user in with firebase
	handleLogIn: function(){

		var that = this;
		var email = this.refs.email.value;
		var password = this.refs.password.value;

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  			var errorCode = error.code;
  			var errorMessage = error.message;

  			if(error){
  				that.setState({hasError: true});
  				that.setState({errorMsg: "Invalid email or password combination."});
  			}
		});

		//if success, go to page
		this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  			if (user) {
				hashHistory.push("/");
  			} else {
		    	hashHistory.push("/login");
  			}
		});
	},

	componentWillUnmount: function(){
		if (typeof this.unsubscribe == 'function')
		{
			this.unsubscribe();
		}
	},

	//submit with enter key
	handleKeyPress: function(e){
		if(e.key == 'Enter'){
			this.handleLogIn();
		}
	},

	errorMessage: function(){
		return <div className="alert alert-danger"><strong>Error! </strong>{this.state.errorMsg}</div>;
	},

	noErrorMessage: function(){
		return <div></div>;
	},

	render: function(){
		//display errors
		var errorAlert;
		if(this.state.hasError){
			errorAlert = this.errorMessage();
		}else{
			errorAlert = this.noErrorMessage();
		}

		return (
			<div className="jumbotron jumbotron-fluid">
					<div className="WebHeader">
						{errorAlert}
						<div className="col-md-4">
						</div>

							<div className="col-md-4 margin-top-30">
							<center>
								
					<h3>Login</h3><br />
					<div className="enter-form">
								<input
										type="email"
										ref="email"
										placeholder="Email Address"
										className="form-control"
										onKeyPress={this.handleKeyPress}
									/>
									
								<input
										type="password"
										ref="password"
										placeholder="Password"
										className="form-control"
										onKeyPress={this.handleKeyPress}
									/>
								
								
								<button
										className="btn btn-default"
										onClick={this.handleLogIn}>
										Login
									</button>
									<br />

					<div className="linking">
										No account?
										<Link to="/signup">
										Sign Up!
										</Link>
									</div>
					</div>
							</center>
						</div>
						<div className="col-md-4">
						</div>
					</div>
			</div>
		);
	}
});

module.exports = LogInForm;