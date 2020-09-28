const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;


class PdfUpload extends React.Component{
    constructor() {
        super();
        this.state = {
            file: null,
            fileStat: ""
        }
        this.handlechange = this.handlechange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handlechange(event){
        if (event.target.files[0]!=null){
            console.log(event.target.files[0]);
            this.setState({
                file: event.target.files[0]
            });
        }
    }
    handleUpload() {
        let storage = firebase.storage();
        console.log(this.state.file);
        var user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
            const uploadTask = storage.ref(`resume_pdf/${user.uid}/resume`).put(this.state.file);
            uploadTask.on('state_changed', 
                (snapshot)=>{
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.setState({
                        fileStat: progress
                    });
                    console.log(progress);
                }, (error)=>{
                    console.log(error);
                    this.setState({
                        fileStat: "Upload fail!"
                    });
                }, ()=>{
                    this.setState({
                        fileStat: "Uploaded!"
                    });
                });
        } else {
            // No user is signed in.
            hashHistory.push("/login");
        }
        
    }
    render() {
        return (
        <div>
            <input type="file" onChange={this.handlechange}></input>
            <button onClick={this.handleUpload}>Upload</button>
            <p>{this.state.fileStat}</p>
        </div>
        );
    }
}

module.exports = PdfUpload;