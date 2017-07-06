import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as DocumentAction from '../actions/DocumentAction';

/**
 *
 *
 * @desc represents Create Document Page.
 * @class CreateDocument
 * @extends {Component}
 */
class CreateDocument extends Component {
  /**
   * Creates an instance of CreateDocument.
   * @param {object} props
   * @memberof CreateDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      userID: this.props.user.id,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    CKEDITOR.replace('content');
  }

  /**
   * @desc handles change of events
   * for the form fields
   * @param {any} event
   * @memberof CreateDocument
   * @returns {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value });
  }

  /**
   *
   * @desc handles the submit action on the form.
   *  Calls the createDocument action.
   * @param {object} event
   * @memberof CreateDocument
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const content = CKEDITOR.instances.content.getData();
    this.state.content = content;
    this.props.DocumentAction.createUserDocument(this.state)
      .then(() => {
        toastr.success('Document Saved');
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
              <input placeholder="Placeholder" id="title" type="text" name="title" value={this.state.title} onChange={this.onChange} className="validate" />
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s6">
              <select onChange={this.onChange} style={{ display: 'block' }} name="access">
                <option disabled selected>Document Access Level</option>
                <option value="public" name="public">public</option>
                <option value="private" name="private">private</option>
                <optgroup label="Role">
                  <option value="regular" name="regular">regular</option>
                  {this.props.user.roleID === 1 ? <option value="admin" name="admin">admin</option> : <div></div>}
                </optgroup>
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
            <button className="btn waves-effect waves-light" type="submit" name="action">Save
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
