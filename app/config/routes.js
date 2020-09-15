var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var HomePage = require('../components/page/home.js');
var NewUser = require('../components/user/new.js');
var LoginUser = require('../components/user/login.js');

var requireAuth = require('./require_auth.js')

var routes = (
	<Router history={hashHistory}>
		<Route path="/">
			<IndexRoute component={HomePage} onEnter={requireAuth}/>
			<Route path="/login" component={LoginUser}/>
			<Route path="/signup" component={NewUser}/>
		</Route>
	</Router>
);

module.exports= routes;
