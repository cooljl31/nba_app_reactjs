import React, { Component } from 'react';
import style from './index.css';
import FormFields from '../widgets/FormFields/formFields'
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {firebaseTeams, firebaseArticles} from '../../firebase'
import Uploader from '../widgets/FileUploader/fileUploader'
import firebase from 'firebase'

class Dashboard extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    postError: '',
    loading:false,
    formData: {
      author: {
        element: 'input',
        value: '',
        config:{
          name:'author_input',
          type:'text',
          placeholder:'Enter your name'
        },
        validation:{
          required: true
        },
        valid:false,
        touched:false,
        validationMessage:'',
      },
      title: {
        element: 'input',
        value: '',
        config:{
          name:'title_input',
          type:'text',
          placeholder:'Enter the title'
        },
        validation:{
          required: true
        },
        valid:false,
        touched:false,
        validationMessage:''
      },
      body: {
        element:'texteditor',
        value:'',
        valid:true
      },
      image: {
        element:'image',
        value:'',
        valid:true
      },
      team: {
        element: 'select',
        value: '',
        config:{
          name:'team_input',
          options:[]
        },
        validation:{
          required: true
        },
        valid:false,
        touched:false,
        validationMessage:''
      }
    }
  }

  validate = (element) => {
    let error = [true, ''];

    if (element.validation.required) {
      const valid = element.value.trim() !== '';

      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  }

  componentDidMount() {
    this.loadTeams()
  }

  loadTeams = () => {
    firebaseTeams.once('value')
    .then((snap) => {
      let team =[]
      snap.forEach((childSnap)=>{
        team.push({
          id: childSnap.val().teamId,
          name: childSnap.val().city
        })
      })
      const newFormData = {
        ...this.state.formData
      }
      const NewElement = {
        ...newFormData['team']
      }

      NewElement.config.options = team
      newFormData['team'] = NewElement

      this.setState({ formData: newFormData });
    })


  }


  updateForm = (element, content='') => {
    const newFormData = {
      ...this.state.formData
    }
    const NewElement = {
      ...newFormData[element.id]
    }

    if (content === '') {
      NewElement.value = element.event.target.value;
    } else {
      NewElement.value = content;
    }


    if (element.blur) {
      let validData = this.validate(NewElement);
      NewElement.valid = validData[0];
      NewElement.validationMessage = validData[1];
    }
    NewElement.touched = element.blur;
    newFormData[element.id] = NewElement;

    this.setState({ formData: newFormData });
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true

    for (const key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }
    for (const key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      this.setState({
        loading:true,
        postError:''
      })

      firebaseArticles.orderByChild("id")
      .limitToLast(1).once('value')
      .then((snap) => {
        let articleID = null

        snap.forEach((snapChild)=> {
          articleID = snapChild.val().id
        })

        dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
        dataToSubmit['id'] = articleID + 1;
        dataToSubmit['team'] = parseInt(dataToSubmit['team'],10);

        firebaseArticles.push(dataToSubmit)
        .then((article) => {
          this.props.history.push(`/articles/${article.key}`)
        }).catch((err) => {
          this.setState({ postError: err.message });
        });
        console.log(dataToSubmit);

      })
    } else {
      this.setState({ postError: 'Something went wrong' });
    }
  }

  submitButton = () =>{
    return this.state.loading ?
    'loging...'
    :
    <div>
      <button type="submit">Add Post</button>
    </div>
  }

  showErro = () => {
    return this.state.postError !== '' ?
    <div className={style.error}>{this.state.postError}</div>
    : ''
  }

  onEditorStateChange = (editorState) => {
    let contentState = editorState.getCurrentContent();
    // let rawState = convetToRaw(contentState);
    let html = stateToHTML(contentState)

    this.updateForm({id:'body'},html)
    this.setState({
      editorState
    })
  }

  storeFilename = (filename) => {
    this.updateForm({id:'image'},filename )
  }

  render() {
    return (
      <div className={style.postContainer}>
        <form action="" onSubmit={this.submitForm}>
          <h2>Add Post</h2>
          <Uploader
            filename={(filename)=> this.storeFilename(filename)}
          />

          <FormFields
            id={'author'}
            formData={this.state.formData.author}
            change={(newState)=> this.updateForm(newState)}
            // onblur={(newState)=> this.updateForm(newState)}
          />
          <FormFields
            id={'title'}
            formData={this.state.formData.title}
            change={(newState)=> this.updateForm(newState)}
          />

          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />

           <FormFields
            id={'team'}
            formData={this.state.formData.team}
            change={(newState)=> this.updateForm(newState)}
            // onblur={(newState)=> this.updateForm(newState)}
          />

          {this.submitButton()}
          {this.showErro()}
        </form>
      </div>
    );
  }
}

export default Dashboard;