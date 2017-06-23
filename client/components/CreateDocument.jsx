import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      userID: this.props.user.userID || this.props.newUser.userID,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    CKEDITOR.replace('content');
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value });
  }


  onSubmit(event) {
    event.preventDefault();
    const content = CKEDITOR.instances.content.getData();
    this.state.content = content;
    console.log(this.state);
    this.props.DocumentAction.createUserDocument(this.state)
      .then(() => { browserHistory.push('dashboard'); })
      .catch((error) => { message: error });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Placeholder" id="title" type="text" name="title" value={this.state.title} onChange={this.onChange} className="validate" />
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s6">
              <select onChange={this.onChange} style={{ display: 'block' }} name="access">
                <option value="" disabled selected>Document Access Level</option>
                <option value="public" name="public">public</option>
                <option value="private" name="private">private</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="content" className="materialize-textarea" name="content" value={this.state.content} ></textarea>
              <label htmlFor="content">Content</label>
            </div>
          </div>
          <div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newUser: state.SignupReducer.newUser,
    user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    document: state.DocumentReducer.document,
  };
}

function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
