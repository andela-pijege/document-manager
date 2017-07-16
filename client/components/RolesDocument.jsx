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
 * @desc represents Roles Document Page.
 * @class RolesDocument
 * @extends {Component}
 */
export class RolesDocument extends Component {
  /**
   * Creates an instance of RolesDocument.
   * @param {object} props
   * @memberof RolesDocument
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      rolesDocument: this.props.rolesDocument,
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
   * @memberof RolesDocument
   */
  componentWillMount() {
    this.props.DocumentAction.getAllRolesDocuments();
  }

  /**
   * @desc Invoked immediately after new props is recieved
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   * @memberof RolesDocument
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.rolesDocument) {
      this.setState({
        rolesDocument: nextProps.rolesDocument,
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
    this.props.DocumentAction.getAllRolesDocuments(this.state.limit, (page - 1) * this.state.limit);
  }

  /**
 * @desc search for roles documents
 * @param {object} event
 * @returns {void} returns nothing
 * @memberof RolesDocument
 */
  searchDocuments(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 });
    this.props.DocumentAction.searchRoleDocuments(searchQuery);
  }

  /**
   * @desc Displays all roles documents
   * @returns {array} roles documents
   * @memberof RolesDocument
   */
  render() {
    const { isSearching } = this.state;
    let documents;
    let metaData = {};
    if (isSearching) {
      documents = this.props.searchedRoleDocuments;
    } else {
      ({ documents = [], metaData = {} } = this.state.rolesDocument);
    }
    return (
      <div className="container">
        <div>
          <h4>Roles documents</h4>
          <Search onChange={this.searchDocuments} />
          <div className="row">
            {
              documents.map(document =>
                <div key={document.id + 1}>
                  <div className="col s4 m4 doc-wrapper">
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
                </div>
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
 * Set the PropTypes for RolesDocument
 */
RolesDocument.propTypes = {
  DocumentAction: propTypes.shape({
    getAllRolesDocuments: propTypes.func,
    searchRoleDocuments: propTypes.func,
    getOneDocument: propTypes.func,
  }),
  rolesDocument: propTypes.shape({
    documents: propTypes.arrayOf(propTypes.object),
    metaData: propTypes.object,
  }),
  searchedRoleDocuments: propTypes.arrayOf(propTypes.object),
};

RolesDocument.defaultProps = {
  DocumentAction: {
    getAllRolesDocuments: () => { },
    searchRoleDocuments: () => { },
    getOneDocument: () => { },
  },
  rolesDocument: {},
  searchedRoleDocuments: [],
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps({ DocumentReducer: {
  rolesDocument = {}, searchedRoleDocuments = [],
} }) {
  return {
    rolesDocument,
    searchedRoleDocuments,
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

export default connect(mapStateToProps, mapDispatchToProps)(RolesDocument);
