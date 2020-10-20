var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;

var SignUp = require('../components/user/signup.js');
var Login = require('../components/session/login.js');
var Home = require('../components/page/home.js');
var SignOut = require('../components/session/signout.js');
var Layout = require('../components/page/layout.js');
var Profile = require('../components/profileInformation/profile.js');
var Upload = require('../components/uploadFile/pdfUpload.js');
var Account = require('../components/page/Account');
var UploadImage = require('../components/upload/imagesUpload.js');
var SearchResults = require('../components/page/results.js');
var SearchFunc = require('../components/page/searchfunc.js');

var requireAuth = require('./require_auth.js')

var routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home} onEnter={requireAuth}/>
			<Route path="login" component={Login}/>
			<Route path="signup" component={SignUp}/>
			<Route path="logout" component={SignOut}/>
			<Route path="users/:id" component={Profile} onEnter={requireAuth}/>
			<Route path="/upload" component={Upload}/>
			<Route path="/settings" component={Account}/>
			<Route path="/uploadImage" component={UploadImage}/>
			<Route path="results/:name" component={SearchResults} onEnter={requireAuth}/>
			<Route path="search" component={SearchFunc} onEnter={requireAuth}/>
		</Route>
	</Router>
);

module.exports= routes;
