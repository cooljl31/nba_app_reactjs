import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase'
import {firebaseImageUrl} from '../../../firebase'

class Uploader extends Component {

  state ={
    name:'',
    isUploading:false,
    progress:0,
    fileURL:''
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress:0 });
  }

  handleUploadError = () =>{
    this.setState({ isUploading: false });
  }

  handleUploadSuccess = (filename) => {
    this.setState({ name: filename, progress:100, isUploading:false });
    firebaseImageUrl(filename)
    .then((fileURL) => {
      this.setState({ fileURL });
    })

    this.props.filename(filename)
  }

  handleProgress = (progress) => {
    this.setState({ progress });
  }

  render() {
    return (
      <div>
      <FileUploader
        accept="image/*"
        name="image"
        randomizeFilename
        storageRef={firebase.storage().ref('images')}
        onUploadStart={this.handleUploadStart}
        onUploadError={this.handleUploadError}
        onUploadSuccess={this.handleUploadSuccess}
        onProgress={this.handleProgress}
      />
      {
        this.state.isUploading ?
        <p>Progress: {this.state.progress}</p>
        : null
      }

      { this.state.fileURL ?
        <img src={this.state.fileURL} style={{width:'200px'}} alt={this.state.name}/>
        : null
      }
      </div>
    );
  }
}

export default Uploader;