var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var Layout = React.createClass({

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

    componentWillReceiveProps: function(nextProps){
        var that = this;
        this.unsubscribe();

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

    componentWillUnmount: function(){
        console.log("unmounted");
        this.unsubscribe();
    },

    render: function() {
        var loginOrOut;
        var profile;
        var signUp;

        var navClassName;

        var div;

        var divStyle={
            fontSize: '10px',
            textAlign: 'center',
            color: 'white',
            width: '15px',
            height: '15px',
            position: 'relative',
            backgroundColor: 'red',
            borderRadius: '5px',
            top: '-30px',
            right: '-10px',
            zIndex: '1'
        }

        if(this.state.requests.length > 0){
            div = <div style={divStyle}>{this.state.requests.length}</div>
        }else{
            div= null;
        }



        if(this.state.isLoggedIn) {
            loginOrOut = <li><Link to="/logout" className="navbar-brand">Logout</Link></li>;
            profile = <li><Link to={"/users/" + this.state.user_id} title="Profile" className="navbar-brand"><img src={this.state.imgURL} className="img-circle" width="20" height="20" style={{objectFit: 'cover'}}/></Link></li>;
            signUp = null;


        } else {
            loginOrOut = <li><Link to="/login" className="navbar-brand">Login</Link></li>;
            profile = null;
            signUp = <li><Link to="/signup" className="navbar-brand">Sign Up</Link></li>;
        }


        if(this.state.recruiter == true){
            navClassName = "navbar navbar-inverse navbar-static-top";
        }else{
            navClassName = "navbar navbar-default navbar-static-top";
        }

        return (
            <span>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">
                                <img src="logo.png" alt="logo" height={35}/>
                            </Link>
                        </div>
                        <ul className="nav navbar-nav pull-right">
                            {signUp}
                            {profile}
                            {loginOrOut}
                        </ul>
                    </div>
                </nav>

                <div className="container">
                    {this.props.children}
                </div>
            </span>
        )
    }
});

module.exports = Layout;
