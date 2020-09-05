var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var routes = require('./config/routes.js');

var config = {
   apiKey: "AIzaSyDZMeOm6-mtXsM4XLrtEbeTKNXUaUWoIEI",
   authDomain: "signuptest-751e1.firebaseapp.com",
   databaseURL: "https://signuptest-751e1.firebaseio.com",
   projectId: "signuptest-751e1",
   storageBucket: "signuptest-751e1.appspot.com",
   messagingSenderId: "253807790699",
   appId: "1:253807790699:web:dcded8f4ca3bf7f0b6bf2e",
   measurementId: "G-SYTS05JEZ0"
};

firebase.initializeApp(config);

ReactDOM.render(routes, document.getElementById('app'));
