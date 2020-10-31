const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;

class profilepict extends React.Component{

    constructor(props){
        super();
        this.state = {
            pictUrl: "profile.png"
        }
    }

    // get profile picture from the database if any
    componentDidMount(){
        var storageRef = firebase.storage().ref();
        var pictRef = storageRef.child(`images/${this.props.pageID}/image`);
        if (pictRef){
            console.log(pictRef);
            pictRef.getDownloadURL().then((url) => {
                console.log(url);
                this.setState({
                    pictUrl: url
                });
                console.log(this.pictUrl);
            }).then(()=>{console.log(this.pictUrl)});
        }
        
    }
    // to handle uploading profie picture
    editHandle() {
        hashHistory.push("/uploadImage");
    }
    render(){
        // className="btn btn-default"
        var user = firebase.auth().currentUser;

        if(user && user.uid == this.props.pageID){
            return(
                <div>
                    <div>
                        <br/>
                        <br/>
                        <img src={this.state.pictUrl} alt="Pict Not Found!" className="img-circle" width="200" height="200" style={{objectFit: 'cover'}}></img>
                    </div>
                    
                    <a onClick={this.editHandle}>Edit Photo</a>
                    
                </div>
            );
        }else{
            return(
                <div>
                    <div>
                        <img src={this.state.pictUrl} alt="Pict Not Found!" className="img-circle" width="200" height="200" style={{objectFit: 'cover'}}></img>
                    </div>
                    
                </div>
            );
        }
        
    }
}

module.exports = profilepict;