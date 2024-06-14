import React, { Component } from "react";
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="styled-footer">
        <div className="footer-content">
          <div className="company-name">
            Cineplex+
          </div>
          <div className="contact-us">
            <p>Contact Us:</p>
            <p>Email: <a href="mailto:contact@cineplexplus.com">contact@cineplexplus.com</a></p>
            <p>WhatsApp: <a href="https://wa.me/1234567890">+123 456 7890</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Cineplex+</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
