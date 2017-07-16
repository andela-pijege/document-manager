/* global $ */
import React, { Component } from 'react';

/**
 * @desc represents Home Page.
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * Creates an instance of Home.
   * @param {object} props
   * @memberof Home
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * @desc Invoked after component mounts
   * @param {void} null
   * @return {void} returns nothing
   * @memberof Home
   */
  componentDidMount() {
     $('.slider').slider();
  }

  /**
   * @desc renders Home component
   * @returns {void} null
   * @memberof Home
   */
  render() {
    return (
      <div className="slider fullscreen">
        <ul className="slides">
          <li>
            <img src="../images/bg1.jpg" />
            <div className="caption left-align">
              <h3>Sign up!! its free!</h3>
              <h5 className="light grey-text text-lighten-3">create and manage your documents</h5>
            </div>
          </li>
          <li>
            <img src="../images/bg2.jpg" />
            <div className="caption right-align">
              <h3>Share it..</h3>
              <h5 className="light grey-text text-lighten-3">share your ideas</h5>
            </div>
          </li>
          <li>
            <img src="../images/bg3.jpg" />
            <div className="caption center-align">
              <h3 className="blue-grey-text">Save it..</h3>
              <h5 className="light black-text text-lighten-3">your private documents are safe..</h5>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default Home;
