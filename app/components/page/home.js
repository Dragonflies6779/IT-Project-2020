var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
const Upload = require('../uploadFile/pdfUpload.js');
const Account = require('../updateProfile/accountDetail.js');
const Social = require('../updateProfile/socialMedia.js');
const Password = require('../updateProfile/changePassword.js');
var Home = React.createClass({

    render: function(){

        return (
           <div className="Background">
               <div>
                   <center><h1>Home</h1></center><br />
                   <Upload user={firebase.auth().currentUser}/>
                   <Account user={firebase.auth().currentUser}/>
                   <Social user={firebase.auth().currentUser}/>
                   <Password user={firebase.auth().currentUser}/>
               </div>
            </div>

        );
    }
});

module.exports = Home;
