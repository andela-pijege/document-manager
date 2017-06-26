import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';

class PublicDocument extends Component {

  constructor(props) {
    super(props);
    this.state = {
      publicDocuments: this.props.publicDocuments || [],
      isSearching: false,
    };
    this.openDocument = this.openDocument.bind(this);
    this.searchDocuments = this.searchDocuments.bind(this);
  }

  componentWillMount() {
    this.props.DocumentAction.getAllPublicDocuments();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.publicDocuments) {
      this.setState({
        publicDocuments: nextProps.publicDocuments,
      });
    }
  }

  openDocument(documentID) {
    this.props.DocumentAction.getOneDocument(documentID)
      .then(() => {
        browserHistory.push('/openDocument');
      });
  }

  searchDocuments(event) {
    const searchQuery = event.target.value;
    console.log('this s the search query', searchQuery);
    this.setState({ isSearching: searchQuery.length > 0 })
    this.props.DocumentAction.searchPublicDocuments(searchQuery);
  }

  render() {
    const { isSearching } = this.state;
    const view = (isSearching ? this.props.searchedPublicDocuments : this.state.publicDocuments) || []
    return (
      <div className="container">
        <div>
          <h4>General public documents</h4>
          <form>
            <div className="input-field">
              <input type="search" id="search" name="search" placeholder="search for document" onChange={this.searchDocuments} />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
          <div className="row">
          {
            (view || []).map(document =>
              <div>
                <div className="col s4 m4 doc-wrapper">
                  <div className="card small blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">{document.title}</span>
                      <p>{document.content}</p>
                    </div>
                    <div className="card-action">
                      <a onClick={() => { this.openDocument(document.id); }}>view</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
        </div>
      </div>
    );
  }
}

// PublicDocument.propTypes = {
//   DocumentAction: propTypes.shape({
//     getAllPublicDocuments: propTypes.func,
//     getOneDocument: propTypes.func,
//     getUserDocuments: propTypes.func,
//   }),
// };

function mapStateToProps(state) {
  return {
    publicDocuments: state.DocumentReducer.publicDocuments,
    searchedPublicDocuments: state.DocumentReducer.searchedPublicDocuments,
  };
}

function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDocument);
