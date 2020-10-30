var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var profilepict = React.createClass({
    getInitialState: function(){
        return{
            imgURL: "",
            userData: {},
            };
    },

    componentWillMount: function(){
        var that = this;


        this.userRef = firebase.database().ref().child('users/'+this.props.pageID);
        this.userRef.on("value", snap=>{
            var user = snap.val();
            this.setState({userData: user});
        });
    },

    componentWillReceiveProps: function(nextProps){
        var that = this;


        this.userRef = firebase.database().ref().child('users/'+ nextProps.pageID);
        this.userRef.on("value", snap=>{
            var user = snap.val();
            this.setState({userData: user});
        });
    },

    componentWillUnmount: function(){
        this.userRef.off();
    },


    handleUpload: function(e){
        var that = this;


        var imageFile = e.target.files[0];

        var pictRef = firebase.storage().ref().child('images/users/' + this.props.pageID + '/profilepic.jpg');

        pictRef.put(imageFile).then(function(snapshot){

            var userData = {};
            for(var i in that.state.userData){
                userData[i] = that.state.userData[i];
            }

            userData.linkImg = snapshot.downloadURL;

            var updates = {};
            updates['users/' + that.props.pageID] = userData;
            firebase.database().ref().update(updates);
        });
    },



    render: function(){
        var showUpload;

        if(this.props.isCurrentUser){
            showUpload = <label className="btn btn-file btn-link">
                            <img src={this.state.userData.linkImg} className="img-circle" alt="" width="200" height="200" style={{objectFit: 'cover'}}/><br />
                            <input type="file" accept="image/*" onChange={this.handleUpload} style={{display: 'none'}} />
                        </label>
        }else{
            showUpload = <div><img src={this.state.userData.linkImg} className="img-circle" alt="" width="200" height="200" style={{objectFit: 'cover'}}/><br /></div>
        }

        return (
            <div>
                <br />
                {showUpload}
                <br />
            </div>
        );
    }
});

module.exports = profilepict;
