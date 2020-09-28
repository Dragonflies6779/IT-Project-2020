var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
const Upload = require('../uploadFile/pdfUpload.js');
var Home = React.createClass({

    render: function(){


        return (
           <div className="Background">
               <div>
                   <center><h1>Home</h1></center><br />
                   <Upload />
               </div>
            </div>
        );
    }
});

module.exports = Home;
