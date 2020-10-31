//This is the navbar component of the page.
//The calls the classes that will be used
//eg. The Logo homepage link, the users search bar, the profile page link and the signin/signout
var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
var Search = require('./search.js');

var Layout = React.createClass({

    getInitialState: function() {
        return {
            isLoggedIn: (null != firebase.auth().currentUser),
            imgURL: "",
            requests: []
        }
    },
    //these components check is the session user is currently logged in or not.
    //if logged in, change the navbar to display the profile link and the logout button
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
        var search;

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
            //profile = <li><Link to={"/users/" + this.state.user_id} title="Profile" className="navbar-brand"><img src="profile.png" className="img-circle" width="20" height="20" style={{objectFit: 'cover'}}/></Link></li>;
            profile = <li><Link to={"/users/" + this.state.user_id} title="Profile" className="navbar-brand"><img src={this.state.imgURL} className="img-circle" width="20" height="20" style={{objectFit: 'cover'}}/></Link></li>;
            signUp = null;
            search = <Search isRecruiter={this.state.recruiter}/>
            settings = <li><Link to={"/settings"} title="Settings" className="navbar-brand"><img src="settings.png" className="img-circle" width="20" height="20" style={{objectFit: 'cover'}}/></Link></li>;

        } else {
            loginOrOut = <li><Link to="/login" className="navbar-brand">Login</Link></li>;
            profile = null;
            signUp = <li><Link to="/signup" className="navbar-brand">Sign Up</Link></li>;
            search = null;
            settings = null;
        }


        if(this.state.recruiter == true){
            navClassName = "navbar";
        }else{
            navClassName = "navbar";
        }

        return (
            <span>
                <nav className="navbar" >
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">
                                <img src="logo.png" alt="logo" height={35}/>
                            </Link>
                        </div>
                        {search}
                        <ul className="nav navbar-nav pull-right">
                            {signUp}
                            {profile}
                            {settings}
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
