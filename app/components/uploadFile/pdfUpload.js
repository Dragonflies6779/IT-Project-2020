const React = require("react");
const firebase = require("firebase");
const hashHistory = require("react-router").hashHistory;

/* this class is to add upload resume feature */
class PdfUpload extends React.Component {
  constructor(props) {
    super();
    this.state = {
      file: null,
      // for upload file status
      fileStat: "",
      // for download file status
      downloadStat: "",
      downloadUrl: "",
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }
  // to handle the download button
  // download the resume from storage file named resume_pdf/<user id>/resume
  handleDownload(event) {
    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref();
    var resumeRef = storageRef.child(`resume_pdf/${this.props.pageID}/resume`);
    console.log(this.props.pageID);

    // Get the download URL
    const that = this;
    resumeRef
      .getDownloadURL()
      .then(function (url) {
        // Or inserted into an <img> element:
        that.setState({
          downloadUrl: url,
          downloadStat: "Download success, please click the following links",
        });
      })
      .catch(function (error) {
        that.setState({
          downloadStat: "Resume not found / Download error",
        });
      });
  }
  // to handle the change on input file
  handlechange(event) {
    if (event.target.files[0] != null) {
      console.log(event.target.files[0]);
      this.setState({
        file: event.target.files[0],
      });
    }
  }

  // to handle the upload button
  // save the resume from storage file named resume_pdf/<user id>/resume
  handleUpload() {
    let storage = firebase.storage();
    console.log(this.state.file);
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      const uploadTask = storage
        .ref(`resume_pdf/${user.uid}/resume`)
        .put(this.state.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ).toString() + "%";
          this.setState({
            fileStat: progress,
          });
          console.log(progress);
        },
        (error) => {
          console.log(error);
          this.setState({
            fileStat: "Upload fail!",
          });
        },
        () => {
          this.setState({
            fileStat: "Uploaded!",
          });
        }
      );
    } else {
      // No user is signed in.
      hashHistory.push("/login");
    }
  }
  render() {
    let downloadLink = <p></p>;
    if (this.state.downloadUrl)
      downloadLink = (
        <a href={this.state.downloadUrl} target="_blank">
          download link
        </a>
      );
    var user = firebase.auth().currentUser;

    if (user && user.uid == this.props.pageID) {
      return (
        <div className="card-profile-summary">
          <input type="file" onChange={this.handlechange}></input>
          <button onClick={this.handleUpload}>Upload Resume</button>
          <button onClick={this.handleDownload}>Download Resume</button>
          <p>{this.state.fileStat}</p>
          <p>{this.state.downloadStat}</p>
          {downloadLink}
        </div>
      );
    } else {
      return (
        <div className="card-profile-summary">
          <button onClick={this.handleDownload}>Download Resume</button>
          <p>{this.state.fileStat}</p>
          <p>{this.state.downloadStat}</p>
          {downloadLink}
        </div>
      );
    }
  }
}

module.exports = PdfUpload;
