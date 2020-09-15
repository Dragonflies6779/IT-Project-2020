var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
var routes = require('./config/routes.js');
//config to final hosting site
var config = {
   apiKey: "AIzaSyBLlvZgg2_Y9RC9mKZv2_c1mXMZvgQK5Cw",
   authDomain: "my-portfolio-system.firebaseapp.com",
   databaseURL: "https://my-portfolio-system.firebaseio.com",
   projectId: "my-portfolio-system",
   storageBucket: "my-portfolio-system.appspot.com",
   messagingSenderId: "586112178261",
   appId: "1:586112178261:web:afb7cf74be000c74475cdc",
   measurementId: "G-QWS5FB22EG
};

firebase.initializeApp(config);

ReactDOM.render(routes, document.getElementById('app'));
