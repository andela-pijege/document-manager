import React from 'react';

const Home = () => (
  <div>
    <p>This is Documento home page!!!!!!</p>
    <a className="waves-effect waves-teal btn-flat">Sign up</a>
    <a className="waves-effect waves-teal btn-flat">Sign in</a>
    <div className="fixed-action-btn horizontal click-to-toggle">
      <a className="btn-floating btn-large red">
        <i className="material-icons">menu</i>
      </a>
      <ul>
        <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
        <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
        <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
        <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
      </ul>
    </div>
  </div>
);

module.exports = Home;
