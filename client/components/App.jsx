import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

class App extends React.Component {
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
