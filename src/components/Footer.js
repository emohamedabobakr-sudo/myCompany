import React from "react";
import "../App.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import myImage from "./EROYS.png";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* اسم المتجر */}
        <div className="footer-logo">
          <img className="dunl" src={myImage} alt="contact" />
          <p>Architecture & Design</p>
        </div>

        {/* روابط سريعة */}


        {/* تواصل معنا */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: e.mohamedabobakr@gmail.com</p>
          <p>Phone: +201 110 924 231</p>
          <p>Address: Alexandria, Egypt</p>
        </div>

        {/* السوشيال ميديا */}
        <div className="footer-social">
          <h4></h4>
<div className="footer-social">
  <h4>Follow Us</h4>
  <div className="social-icons">
   {/* <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <FaFacebookF />
    </a>*/}
    {/*<a href="https://twitter.com" target="_blank" rel="noreferrer">
      <FaTwitter />
    </a>*/} 
   <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <FaInstagram />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
      <FaLinkedinIn />
    </a>
  </div>
</div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 MyWebsite. All rights reserved.</p>
      </div>
    </footer>
  );
}
