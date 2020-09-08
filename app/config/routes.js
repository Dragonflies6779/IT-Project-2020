var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var NewUser = require('../components/user/new.js');

var requireAuth = require('./require_auth.js')

var routes = (
	<Router history={hashHistory}>
			<Route path="/" component={NewUser}/>
	</Router>
);

module.exports= routes;
