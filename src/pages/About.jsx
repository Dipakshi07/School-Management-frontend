import SectionTitle from "../components/SectionTitle";
import {
  Target,
  Eye,
  Heart,
  Award,
  CheckCircle2
} from "lucide-react";
import "./About.css";

const About = () => {

  return (
    <div className="inner-page">


      {/* Page Hero */}

      <section className="page-hero">

        <div>

          <span>
            ABOUT OUR SCHOOL
          </span>

          <h1>
            Shaping Futures,
            <br />
            Inspiring Excellence
          </h1>

          <p>
            Discover our story, values and
            commitment to transforming education.
          </p>

        </div>

      </section>


      {/* Introduction */}

      <section className="about-introduction">

        <div className="about-intro-image">

          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80"
            alt="Students"
          />

        </div>


        <div className="about-intro-content">

          <span className="section-eyebrow">
            WHO WE ARE
          </span>

          <h2>
            Education That Goes
            <span>
              Beyond Textbooks
            </span>
          </h2>

          <p>
            Bright Future International School
            is a forward-thinking educational
            institution dedicated to nurturing
            curious minds and responsible citizens.
          </p>

          <p>
            We combine academic excellence with
            creativity, technology, sports, arts
            and character development to provide
            students with a truly holistic education.
          </p>


          <div className="about-check-list">

            <div>
              <CheckCircle2 size={18} />
              <span>Student-centered education</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Modern teaching methodology</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Focus on character development</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Technology-enabled learning</span>
            </div>

          </div>

        </div>

      </section>


      {/* Mission Vision */}

      <section className="mission-section">

        <SectionTitle
          eyebrow="OUR FOUNDATION"
          title="Mission, Vision & Values"
          description="Everything we do is guided by our commitment to helping students become confident and compassionate individuals."
        />


        <div className="mission-grid">

          <div className="mission-card">

            <div className="mission-icon">
              <Target />
            </div>

            <h3>
              Our Mission
            </h3>

            <p>
              To provide an inclusive and
              inspiring learning environment
              where every student is empowered
              to discover their potential.
            </p>

          </div>


          <div className="mission-card">

            <div className="mission-icon">
              <Eye />
            </div>

            <h3>
              Our Vision
            </h3>

            <p>
              To become a leading institution
              that prepares young people to
              confidently shape a better future.
            </p>

          </div>


          <div className="mission-card">

            <div className="mission-icon">
              <Heart />
            </div>

            <h3>
              Our Values
            </h3>

            <p>
              Integrity, respect, empathy,
              curiosity, responsibility and
              lifelong learning.
            </p>

          </div>

        </div>

      </section>


      {/* Principal Message */}

      <section className="principal-section">

        <div className="principal-image">

          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80"
            alt="Principal"
          />

        </div>


        <div className="principal-content">

          <span className="section-eyebrow">
            PRINCIPAL'S MESSAGE
          </span>

          <h2>
            "Every Child Has
            <span>
              Something Extraordinary
            </span>
            Within."
          </h2>

          <p>
            Education is not simply about
            acquiring information. It is about
            developing the confidence to ask
            questions, the courage to explore
            and the values to make responsible
            choices.
          </p>

          <p>
            At Bright Future, our teachers,
            parents and students work together
            to create an environment where
            every child can thrive.
          </p>

          <div className="principal-signature">
            <strong>
              Dr. Arjun Mehta
            </strong>

            <span>
              Principal
            </span>
          </div>

        </div>

      </section>

    </div>
  );
};

export default About;