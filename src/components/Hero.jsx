import "./Hero.css";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Sparkles
} from "lucide-react";

const Hero = () => {
  return (
    <section className="hero">

      {/* Background Overlay */}

      <div className="hero-overlay"></div>


      {/* Decorative Elements */}

      <div className="hero-decoration hero-circle-one"></div>

      <div className="hero-decoration hero-circle-two"></div>


      <div className="hero-container">

        <div className="hero-content">

          {/* Badge */}

          <div className="hero-badge">

            <Sparkles size={16} />

            <span>
              Admissions Open 2026-27
            </span>

          </div>


          {/* Heading */}

          <h1>

            Empowering Minds,

            <span>
              Inspiring Futures.
            </span>

          </h1>


          {/* Description */}

          <p>
            At Bright Future International School,
            we create a nurturing environment where
            students discover their potential,
            develop confidence and prepare for a
            successful future.
          </p>


          {/* Buttons */}

          <div className="hero-buttons">

            <Link
              to="/admissions"
              className="primary-button"
            >

              Apply For Admission

              <ArrowRight size={19} />

            </Link>


            <Link
              to="/about"
              className="secondary-button"
            >

              <PlayCircle size={20} />

              Explore Our School

            </Link>

          </div>


          {/* Small Information */}

          <div className="hero-info">

            <div>
              <strong>25+</strong>
              <span>Years of Excellence</span>
            </div>

            <div>
              <strong>2500+</strong>
              <span>Happy Students</span>
            </div>

            <div>
              <strong>150+</strong>
              <span>Expert Faculty</span>
            </div>

          </div>

        </div>


        {/* Hero Visual */}

        <div className="hero-visual">

          <div className="hero-image-wrapper">

            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
              alt="Modern school building"
            />

          </div>


          {/* Floating Card */}

          <div className="hero-floating-card">

            <div className="floating-icon">
              🎓
            </div>

            <div>

              <strong>
                Excellence in Education
              </strong>

              <span>
                Building tomorrow's leaders
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;