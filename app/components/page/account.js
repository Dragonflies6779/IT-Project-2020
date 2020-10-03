var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
const Upload = require('../uploadFile/pdfUpload.js');
const Account = require('../updateProfile/accountDetail.js');
const Social = require('../updateProfile/socialMedia.js');
const Password = require('../updateProfile/changePassword.js');

var account = React.createClass({

    render: function(){

        return (
            <div>
                <div className ="jumbotron jumbotron-fluid">
                    <div className="container">
                        {/* <input type="text" className="searchBar"></input>
                        <button>Search</button> */}

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Welcome!</h5>
                                <p className="card-text">Hi there, It's good to see you. Click the button below to help you get started on your portfolio.</p>
                                    <Link to="/"> 
                                    {/* need to link this to portfolio editor */}
                                        <a href="#" className="btn btn-primary">Get Started</a>
                                    </Link>
                            </div> 
                           
                        </div>
                    </div>
                </div>
            </div>
        );

    }
});



module.exports = account;
