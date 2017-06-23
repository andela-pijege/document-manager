import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default function (ComposedComponent) {
  class Authenticate extends React.Component {

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this
          .context
          .router
          .push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this
          .context
          .router
          .push('/login');
      }
    }
    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };
/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */
  function mapStateToProps(state) {
    let isAuthenticated;
    if (state.LoginReducer.loginUser) {
      isAuthenticated = state.LoginReducer.loginUser;
    } else {
      isAuthenticated = false;
    }
    return { isAuthenticated };
  }

  return connect(mapStateToProps)(Authenticate);
}
