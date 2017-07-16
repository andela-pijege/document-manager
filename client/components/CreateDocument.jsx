import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as DocumentAction from '../actions/DocumentAction';

/**
 * @desc represents Create Document Page.
 * @class CreateDocument
 * @extends {Component}
 */
export class CreateDocument extends Component {
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
      access: 'private',
      userID: this.props.user.id,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @desc Invoked after component mounts
   * @param {void} null
   * @return {void} returns nothing
   * @memberof CreateDocument
   */
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
      [event.target.name]: event.target.value
    });
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

  /**
   * @desc renders form to create document
   * @returns {void} null
   * @memberof CreateDocument
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
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s6">
                <select id="access" onChange={this.onChange} style={{ display: 'block' }} name="access">
                  <option value="private" name="private">private</option>
                  <option value="public" name="public">public</option>
                  <optgroup label="Role">
                    <option value="regular" name="regular">regular</option>
                    {this.props.user.roleID === 1 ?
                      <option value="admin" name="admin">admin</option>
                    : <div />}
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
              <button id="submit" className="btn waves-effect waves-light save-btn" type="submit" name="action">Save
              <i className="fa fa-floppy-o" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for CreateDocument
 */
CreateDocument.propTypes = {
  DocumentAction: propTypes.shape({
    createUserDocument: propTypes.func,
  }),
  user: propTypes.shape({
    roleID: propTypes.number,
    id: propTypes.number,
  }),
};

/**
 * Sets default values for CreateDocument Prototype
 */
CreateDocument.defaultProps = {
  DocumentAction: {
    createUserDocument: () => { },
  },
  user: {
    roleID: 0,
    id: 0,
  },
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 * @memberof CreateDocument
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
 * @memberof CreateDocument
 */
function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
