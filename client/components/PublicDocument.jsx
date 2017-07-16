import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Button, Modal } from 'react-materialize';
import * as DocumentAction from '../actions/DocumentAction';
import Pagination from '../components/Pagination';
import Search from './Search';

/**
 *
 * @desc represents Public Document Page.
 * @class PublicDocument
 * @extends {Component}
 */
export class PublicDocument extends Component {
  /**
   * Creates an instance of PublicDocument.
   * @param {object} props
   * @memberof PublicDocument
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      publicDocuments: this.props.publicDocuments,
      isSearching: false,
      limit: 9,
    };
    this.searchDocuments = this.searchDocuments.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @desc Invoked before component mounts
   * @param {void} null
   * @return {void} returns nothing
   * @memberof PublicDocument
   */
  componentWillMount() {
    this.props.DocumentAction.getAllPublicDocuments();
  }

  /**
   * @desc Invoked immediately after new props is recieved
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   * @memberof PublicDocument
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.publicDocuments) {
      this.setState({
        publicDocuments: nextProps.publicDocuments,
      });
    }
  }
  /**
 * @desc handles pagination
 * @param {integer} page
 * @return {void} returns nothing
 * @memberof AllUsers
 */
  handlePageChange(page) {
    this.props.DocumentAction.getAllPublicDocuments(this.state.limit, (page - 1) * this.state.limit);
  }

  /**
   * @desc search for public documents
   * @param {object} event
   * @returns {void} returns nothing
   * @memberof PublicDocument
   */
  searchDocuments(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 });
    this.props.DocumentAction.searchPublicDocuments(searchQuery);
  }

  /**
   * @desc Displays all public documents
   * @returns {array} public documents
   * @memberof PublicDocument
   */
  render() {
    const { isSearching } = this.state;
    let documents;
    let metaData = {};
    if (isSearching) {
      documents = this.props.searchedPublicDocuments;
    } else {
      ({ documents = [], metaData = {} } = this.state.publicDocuments);
    }
    return (
      <div className="container">
        <div>
          <h4>General public documents</h4>
          <Search onChange={this.searchDocuments} />
          <div className="row">
            {
              documents.map(document =>
                (<div key={document.id + 1}>
                  <div id="doc-wrapper" className="col s4 m4 doc-wrapper">
                    <div className="card small blue-grey darken-1">
                      <div className="card-content white-text">
                        <span className="card-title">{document.title}</span>
                        <p dangerouslySetInnerHTML={{ __html: document.content }} />
                      </div>
                      <div className="card-action">
                        <Modal
                          header={document.title}
                          fixedFooter
                          actions={
                            <section>
                              <Button waves='light' flat className="modal-action modal-close close-doc">close</Button>
                            </section>
                          }
                          trigger={<a className="view-doc">view</a>}
                        >
                          <p dangerouslySetInnerHTML={{ __html: document.content }} />
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>)
              )}
          </div>
          <Pagination
            pageCount={metaData.pages}
            handleChange={this.handlePageChange}
            currentPage={metaData.currentPage}
          />
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for PublicDocument
 */
PublicDocument.propTypes = {
  DocumentAction: propTypes.shape({
    getAllPublicDocuments: propTypes.func,
    getOneDocument: propTypes.func,
    getUserDocuments: propTypes.func,
    searchPublicDocuments: propTypes.func,
  }),
  publicDocuments: propTypes.shape({
    documents: propTypes.arrayOf(propTypes.object),
    metaData: propTypes.object,
  }),
  searchedPublicDocuments: propTypes.arrayOf(propTypes.object),
};

/**
 * Sets default values for PublicDocument Prototype
 */
PublicDocument.defaultProps = {
  DocumentAction: {
    getAllPublicDocuments: () => { },
    getOneDocument: () => { },
    getUserDocuments: () => { },
    searchPublicDocument: () => { },
  },
  publicDocuments: {},
  searchedPublicDocuments: [],
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps({ DocumentReducer: {
  publicDocuments = {}, searchedPublicDocuments = [],
} }) {
  return {
    publicDocuments,
    searchedPublicDocuments,
  };
}

/**
 * @desc maps dispatch to DocumentAction
 * @param {object} dispatch - the action to dispatch
 * @return {object} DocumentAction
 */
function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDocument);
