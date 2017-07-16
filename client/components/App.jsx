import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

/**
 *
 * @desc App entry component
 * @class App
 * @extends {Component}
 */
class App extends React.Component {

  /**
   * @desc Displays other components
   * @returns {components} application components
   * @memberof App
   */
  render() {
    return (
      <div>
        <Nav />
        { this.props.children }
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
