const React = require('react');
const firebase = require('firebase');
const hashHistory = require('react-router').hashHistory;

class imagesUpload extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange(event){
    if (event.target.files[0]!=null){
      console.log(event.target.files[0]);
      this.setState({
        image: event.target.files[0]
      });
    }
  }
  handleUpload(){
    let storage = firebase.storage();
    const {image} = this.state;
    const uploadTask = storage.ref('images/${image.name').put(this.state.image);
    uploadTask.on('state_changed',
    (snapshot) => {
      //progess function
      const progess = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progess});
    },
    (error) => {
      console.log(error);
    },
    () => {
    });

  }

  render() {
    return (
      <div>
      <progress value = {this.state.progess} max = "100"/>
      <br/>

      <input
        type = "file"
        onChange = {this.handleChange}
      />
      <button
        classname = "imagesUploadButton"
        onClick = {this.handleUpload}>
        Upload</button>
      </div>
    )
  }
}

module.exports = imagesUpload;