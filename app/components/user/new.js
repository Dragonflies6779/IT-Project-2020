var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var SignUpForm = React.createClass({

	getInitialState: function(){
		return{hasError: false};
	},

	handleSignUp: function(){
		var that = this;

		var firstName = this.refs.firstName.value;
		var lastName = this.refs.lastName.value;
		var email = this.refs.email.value;
		var password = this.refs.password.value;
		var password_confirmation = this.refs.password_confirmation.value;

		if(firstName && lastName){
			//creates user
			firebase.auth().createUserWithEmailAndPassword(email, password == password_confirmation ? password : "nil").catch(function(error) {
				if(error){
					that.setState({hasError: true});
					that.setState({errorMsg: "Please enter a valid email address with a password of at least 6 characters."});
				}
			});
		}else{
			that.setState({hasError: true});
			that.setState({errorMsg: "First or last name field cannot be empty."})
		}

		//add to database
		this.unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var userData = {
					email: email,
					first: firstName,
					last: lastName,
               interests: "",
					skills: ""
				};

				firebase.database().ref('users/' + firebase.auth().currentUser.uid).set(userData);

				//profile name
				user.updateProfile({
					displayName: firstName + " " + lastName,
				});

				hashHistory.push("/");
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
			try{
				this.handleSignUp();
			}
			catch(e){};
		}
	},

	accountChange: function(e){
		this.setState({recruiter: e.target.value});
	},

	//error message
	errorMessage: function(){
		return <div className="alert alert-danger"><strong>Error! </strong>{this.state.errorMsg}</div>;
	},

	noErrorMessage: function(){
		return <div></div>;
	},

	render: function(){
		//get error message
		var errorAlert;
		if(this.state.hasError){
			errorAlert = this.errorMessage();
		}else{
			errorAlert = this.noErrorMessage();
		}

		return (
			<div className="Background">
			<div className="WebHeader">
				{errorAlert}

				<div className="col-md-4">
				</div>
				<div className="col-md-4 margin-top-30">
					<center>
						<h1>Sign Up</h1>
						<br />
						<div className="enter-form">
							<input
								type="text"
								ref="firstName"
								placeholder="First Name"
								className="form-control"
								onKeyPress={this.handleKeyPress}
							/>
							<br />
							<input
								type="text"
								ref="lastName"
								placeholder="Last Name"
								className="form-control"
								onKeyPress={this.handleKeyPress}
							/>
							<br />
							<input
								type="email"
								ref="email"
								placeholder="Email Address"
								className="form-control"
								onKeyPress={this.handleKeyPress}
							/>
							<br />
							<input
								type="password"
								ref="password"
								placeholder="Password"
								className="form-control"
								onKeyPress={this.handleKeyPress}
							/>
							<br />
							<input
								type="password"
								ref="password_confirmation"
								placeholder="Password Confirmation"
								className="form-control"
								onKeyPress={this.handleKeyPress}
							/>
							<br />

							<button
								onClick={this.handleSignUp}
								className="btn">
								Create Account
							</button>
							<br />

							<div className="linking">Have an account? <Link to="/login">Login!</Link></div>
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

module.exports = SignUpForm;
