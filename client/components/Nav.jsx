import React, { Component } from 'react';


class Nav extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="blue-grey darken-4">
          <div className="nav-wrapper container">
            <a href="/" className="brand-logo">Documento</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a>Logout</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
