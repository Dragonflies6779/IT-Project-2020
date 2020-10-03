var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
const Account = require('../updateProfile/accountDetail.js');
const Password = require('../updateProfile/changePassword.js');

var settings = React.createClass({

    render: function(){
        var show;

        show =
            <div>
                <Account user={firebase.auth().currentUser}/>
                <Password user={firebase.auth().currentUser}/>
            </div>

        return (
            <div>
                <div className ="jumbotron jumbotron-fluid">
                    <div className="container">
                            {show}
                    </div>
                </div>
            </div>
        );

    }
});



module.exports = settings;
