import "./CTA.css";


import {
  ArrowRight,
  Phone
} from "lucide-react";

import { Link } from "react-router-dom";

const CTA = () => {

  return (
    <section className="cta-section">

      <div className="cta-container">

        <div className="cta-content">

          <span className="cta-label">
            ADMISSIONS 2026-27
          </span>

          <h2>
            Give Your Child
            <span>
              The Best Start
            </span>
          </h2>

          <p>
            Join a community where every child
            is encouraged to learn, explore,
            create and achieve.
          </p>


          <div className="cta-buttons">

            <Link
              to="/admissions"
              className="cta-primary"
            >
              Start Admission
              <ArrowRight size={18} />
            </Link>


            <Link
              to="/contact"
              className="cta-secondary"
            >
              <Phone size={18} />
              Contact School
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;