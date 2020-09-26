import React from 'react';
import { storage } from '../../firebase';

const storage = 
class pdfUpload extends React.Component{
    constructor() {
        this.state = {
            file = null
        }
    }

    handlechange(event) {
        if (event.target.files[0]){
            this.setState({
                file = event.target.files[0]
            });
        }
    }
    handleUpload() {
        const uploadTask = storage.ref(`resume_pdf/${this.file.name}`).put(file);
    }
    render() {
        <>
            <input type="file" onChange={this.handlechange}></input>
            <button onClick={}>Upload</button>
        </>
    }
}