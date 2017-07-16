import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as DocumentAction from '../actions/DocumentAction';

/**
 * @desc represents Edit Document Page.
 * @class EditDocument
 * @extends {Component}
 */
export class EditDocument extends Component {
  /**
   * Creates an instance of CreateDocument.
   * @param {object} props
   * @memberof EditDocument
   * @constructor
   */
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

  /**
   * @desc Invoked after component mounts
   * @param {void} null
   * @return {void} returns nothing
   * @memberof EditDocument
   */
  componentDidMount() {
    CKEDITOR.replace('content');
  }

  /**
   * @desc handles change of events
   * for the form fields
   * @param {any} event
   * @memberof EditDocument
   * @returns {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value });
  }

  /**
   *
   * @desc handles the submit action on the form.
   *  Calls the editDocument action.
   * @param {object} event
   * @memberof EditDocument
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const content = CKEDITOR.instances.content.getData();
    this.state.content = content;
    this.props.DocumentAction.updateUserDocument(this.state)
      .then(() => {
        toastr.success('Document updated successfully');
        browserHistory.push('dashboard');
      })
      .catch(() => {
        toastr.error('Document not saved');
      });
  }

  /**
   * @desc renders form to edit document
   * @returns {void} null
   * @memberof EditDocument
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  className="validate"
                />
                <label htmlFor="title" className="active">Title</label>
              </div>
              <div className="input-field col s6">
                <select onChange={this.onChange} style={{ display: 'block' }} name="access" value={this.state.access} >
                  <option value="private" name="private">private</option>
                  <option value="public" name="public">public</option>
                  <optgroup label="Role">
                    <option value="regular" name="regular">regular</option>
                    {this.props.user.roleID === 1 ?
                      <option value="admin" name="admin">admin</option>
                    : <option />}
                  </optgroup>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  name="content"
                  value={this.state.content}
                />
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

/**
 * Set the PropTypes for EditDocument
 */
EditDocument.propTypes = {
  DocumentAction: propTypes.shape({
    updateUserDocument: propTypes.func,
  }),
  document: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    content: propTypes.string,
    access: propTypes.string,
    userID: propTypes.number,
  }),
  user: propTypes.shape({
    roleID: propTypes.number,
  }),
};

/**
 * Sets default values for EditDocument Prototype
 */
EditDocument.defaultProps = {
  DocumentAction: {
    updateUserDocument: () => {},
  },
  document: {
    id: 0,
    title: '',
    content: '',
    access: '',
    userID: '',
  },
  user: {
    roleID: 0,
  },
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 * @memberof EditDocument
 */
function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    document: state.DocumentReducer.document,
  };
}

/**
 * @desc maps dispatch to DocumentAction
 * @param {object} dispatch - the action to dispatch
 * @return {object} DocumentAction
 * @memberof EditDocument
 */
function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);
