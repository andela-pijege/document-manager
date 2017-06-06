import React from 'react';

const Footer = () => (
  <div>
    <footer className="page-footer  blue-grey darken-4">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">header</h5>
            <p className="grey-text text-lighten-4">header</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h6 className="white-text">follow us</h6>
            <ul>
              <li><a className="grey-text text-lighten-3" href="https://www.facebook.com/news24/7" rel="noopener noreferrer" target="_blank">facebook</a></li>
              <li><a className="grey-text text-lighten-3" href="https://www.twitter.com/news24/7" rel="noopener noreferrer" target="_blank">twitter</a></li>
              <li><a className="grey-text text-lighten-3" href="https://www.instagram.com/news24/7" rel="noopener noreferrer" target="_blank">instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2017 Copyright Documento
            <a className="grey-text text-lighten-4 right" href="/">Link1</a>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
