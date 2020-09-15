var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
//barebones home page for navigation for sprint 1
var Home = React.createClass({

   //sign up form placeholders
    render: function(){

        return (
           <div className="Background">
           <div className="WebHeader">

             <div className="col-md-4">
             </div>
             <div className="col-md-4 margin-top-30">
                 <center>
                    <h1>Welcome!</h1><br />
                    <div className="enter-form">
                       <div className="linking">Have an account? <Link to="/login">Login!</Link></div>
                       <div className="linking">No account? <Link to="/signup">Sign Up!</Link></div>
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

module.exports = Home;
