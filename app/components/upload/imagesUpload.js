import React from 'react';

class imagesUpload extends React.Component{

  customPath:string = '';

  state = {
    selectedFile: null
  };

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0]});
  };

  onFileUpload = ()) => {

    //What needs to be here is the path where to sore it
    var storageRef = firebase.storage().ref();
    var mountainsRef = storageRef.child('mountains.jpg');
    var mountainImagesRef = storageRef.child('images/mountains.jpg');

  }

  fileData = () => {

      if (this.state.selectedFile) {

        return (
          <div>
            <h2>File Details:</h2>
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };

    render() {

      return (
        <div>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }

  imagesUpload.defaultProps = {
    customPath: ''
  };
