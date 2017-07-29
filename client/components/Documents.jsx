import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal } from 'react-materialize';
import * as DocumentAction from '../actions/DocumentAction';
import Pagination from '../components/Pagination';
import Search from './Search';

/**
 *
 * @desc represents Documents Page.
 * @class Documents
 * @extends {Component}
 */
export class Documents extends Component {
  /**
   * Creates an instance of PublicDocument.
   * @param {object} props
   * @memberof Documents
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: this.props.publicDocuments || this.props.rolesDocument,
      isSearching: false,
      limit: 9,
      access: this.props.location.pathname,
      searchQuery: '',
    };
    this.searchDocuments = this.searchDocuments.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @desc Invoked after component mounts
   * @param {void} null
   * @return {void} returns nothing
   * @memberof Documents
   */
  componentDidMount() {
    if (this.state.access === '/publicDocuments') {
      this.props.DocumentAction.getAllPublicDocuments();
    } else if (this.state.access === '/rolesDocument') {
      this.props.DocumentAction.getAllRolesDocuments();
    }
  }

  /**
   * @desc Invoked immediately after new props is recieved
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   * @memberof Documents
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === '/publicDocuments' && !this.state.isSearching) {
      this.setState({ documents: nextProps.publicDocuments });
    } else if (nextProps.location.pathname === '/rolesDocument' && !this.state.isSearching) {
      this.setState({ documents: nextProps.rolesDocument });
    }
    this.setState({ access: nextProps.location.pathname });
  }
  /**
 * @desc handles pagination
 * @param {integer} page
 * @return {void} returns nothing
 * @memberof Documents
 */
  handlePageChange(page) {
    if (this.props.location.pathname === '/publicDocuments') {
      if (this.state.isSearching) {
        this.props.DocumentAction.searchPublicDocuments(this.state.searchQuery, this.state.limit, (page - 1) * this.state.limit);
      } else {
        this.props.DocumentAction.getAllPublicDocuments(this.state.limit, (page - 1) * this.state.limit);
      }
    } else if (this.props.location.pathname === '/rolesDocument') {
      if (this.state.isSearching) {
        this.props.DocumentAction.searchRoleDocuments(this.state.searchQuery, this.state.limit, (page - 1) * this.state.limit);
      } else {
        this.props.DocumentAction.getAllRolesDocuments(this.state.limit, (page - 1) * this.state.limit);
      }
    }
  }

  /**
   * @desc search for Documents
   * @param {object} event
   * @returns {void} returns nothing
   * @memberof Documents
   */
  searchDocuments(event) {
    this.setState({ searchQuery: event.target.value });
    this.setState({ isSearching: event.target.value.length > 0 });
    if (event.target.value.length > 0) {
      if (this.props.location.pathname === '/publicDocuments') {
        this.props.DocumentAction.searchPublicDocuments(event.target.value);
      } else if (this.props.location.pathname === '/rolesDocument') {
        this.props.DocumentAction.searchRoleDocuments(event.target.value);
      }
    }
  }

  /**
   * @desc Displays all Documents
   * @returns {array} public documents
   * @memberof Documents
   */
  render() {
    const { isSearching } = this.state;
    let documents = this.state.documents.documents || [];
    let metaData = this.state.documents.metaData || {};

    if (isSearching) {
      ({ documents = [], metaData = {} } = this.props.searchDocuments);
    }
    return (
      <div className="container">
        <div>
          {this.state.access === '/rolesDocument' &&
            <h4>Roles documents</h4>
          }
          {this.state.access === '/publicDocuments' &&
            <h4>Public documents</h4>
          }
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
 * Set the PropTypes for Documents
 */
Documents.propTypes = {
  DocumentAction: propTypes.shape({
    getAllPublicDocuments: propTypes.func,
    searchRoleDocuments: propTypes.func,
    getOneDocument: propTypes.func,
    getUserDocuments: propTypes.func,
    getAllRolesDocuments: propTypes.func,
    searchPublicDocuments: propTypes.func,
  }),
  publicDocuments: propTypes.shape({
    documents: propTypes.arrayOf(propTypes.object),
    metaData: propTypes.object,
  }),
  rolesDocument: propTypes.shape({
    documents: propTypes.arrayOf(propTypes.object),
    metaData: propTypes.object,
  }),
  searchDocuments: propTypes.shape({
    documents: propTypes.arrayOf(propTypes.object),
    metaData: propTypes.object,
  }),
  location: propTypes.shape({
    pathname: propTypes.string,
  }),
};

/**
 * Sets default values for PublicDocument Prototype
 */
Documents.defaultProps = {
  DocumentAction: {
    getAllPublicDocuments: () => { },
    getOneDocument: () => { },
    searchRoleDocuments: () => { },
    getUserDocuments: () => { },
    searchPublicDocument: () => { },
  },
  publicDocuments: {},
  rolesDocument: {},
  searchDocuments: {},
  location: {},
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps({ DocumentReducer: {
  publicDocuments = {}, rolesDocument = {}, loaded = '', searchDocuments = {}
} }) {
  return {
    publicDocuments,
    rolesDocument,
    searchDocuments,
    loaded,
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

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
