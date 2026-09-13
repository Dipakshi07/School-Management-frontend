import "./Footer.css";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn
} from "react-icons/fa"; 

import { Link } from "react-router-dom";

const Footer = () => {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">


        {/* About */}

        <div className="footer-column footer-about">

          <Link
            to="/"
            className="footer-logo"
          >

            <div className="footer-logo-icon">
              🎓
            </div>

            <div>

              <h2>
                Bright Future
              </h2>

              <span>
                International School
              </span>

            </div>

          </Link>


          <p>
            Empowering students with knowledge,
            skills and values to build a better
            tomorrow.
          </p>


          <div className="social-links">

             <a href="#" aria-label="Facebook">
                <FaFacebookF />
             </a>

             <a href="#" aria-label="Instagram">
                <FaInstagram />
             </a>

             <a href="#" aria-label="Twitter">
               <FaTwitter />
             </a>

             <a href="#" aria-label="YouTube">
              <FaYoutube />
             </a>

             <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
             </a>
          </div>

        </div>


        {/* Quick Links */}

        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <Link to="/about">
            About School
          </Link>

          <Link to="/academics">
            Academics
          </Link>

          <Link to="/admissions">
            Admissions
          </Link>

          <Link to="/faculty">
            Our Faculty
          </Link>

          <Link to="/gallery">
            Gallery
          </Link>

        </div>


        {/* School */}

        <div className="footer-column">

          <h3>
            School
          </h3>

          <Link to="/campus">
            Campus & Facilities
          </Link>

          <Link to="/activities">
            Activities
          </Link>

          <Link to="/achievements">
            Achievements
          </Link>

          <Link to="/news">
            News & Events
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

        </div>


        {/* Contact */}

        <div className="footer-column">

          <h3>
            Contact Us
          </h3>

          <div className="footer-contact">

            <MapPin size={18} />

            <span>
              123 Education Avenue,
              <br />
              Lucknow, Uttar Pradesh
            </span>

          </div>


          <div className="footer-contact">

            <Phone size={18} />

            <span>
              +91 98765 43210
            </span>

          </div>


          <div className="footer-contact">

            <Mail size={18} />

            <span>
              info@brightfuture.edu
            </span>

          </div>

        </div>

      </div>


      {/* Bottom */}

      <div className="footer-bottom">

        <div>

          <p>
            © 2026 Bright Future International
            School. All Rights Reserved.
          </p>

        </div>


        <div className="footer-bottom-links">

          <Link to="#">
            Privacy Policy
          </Link>

          <Link to="#">
            Terms & Conditions
          </Link>

          <button
            onClick={scrollTop}
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;