import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as DocumentAction from '../actions/DocumentAction';

class EditDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.document.id,
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access,
      userID: this.props.document.userID,
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
    this.props.DocumentAction.updateUserDocument(this.state)
      .then(() => {
        toastr.success('Document updated successfully');
        browserHistory.push('dashboard');
      })
      .catch((error) => {
        toastr.error('Document not saved');
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input id="title" type="text" name="title" value={this.state.title} onChange={this.onChange} className="validate" />
                <label htmlFor="title" className="active">Title</label>
              </div>
              <div className="input-field col s6">
                <select onChange={this.onChange} style={{ display: 'block' }} name="access" value={this.state.access} >
                  <option value="private" name="private">private</option>
                  <option value="public" name="public">public</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea id="content" className="materialize-textarea" name="content" value={this.state.content} ></textarea>
              </div>
            </div>
            <div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Save
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    document: state.DocumentReducer.document,
  };
}

function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);
