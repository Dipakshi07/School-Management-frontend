import SectionTitle from "../components/SectionTitle";
import {
  BookOpen,
  FlaskConical,
  Monitor,
  Dumbbell,
  Music,
  Bus,
  Wifi,
  ShieldCheck
} from "lucide-react";
import "./Campus.css";

const facilities = [
  {
    icon: BookOpen,
    title: "Modern Library",
    description:
      "A well-stocked library with thousands of books and digital resources."
  },
  {
    icon: FlaskConical,
    title: "Science Labs",
    description:
      "Fully equipped laboratories for practical and experimental learning."
  },
  {
    icon: Monitor,
    title: "Smart Classrooms",
    description:
      "Technology-enabled classrooms designed for interactive learning."
  },
  {
    icon: Dumbbell,
    title: "Sports Facilities",
    description:
      "Dedicated spaces for indoor and outdoor sports activities."
  },
  {
    icon: Music,
    title: "Arts & Music",
    description:
      "Creative spaces for music, dance, drama and visual arts."
  },
  {
    icon: Bus,
    title: "Transport",
    description:
      "Safe and reliable school transportation facilities."
  },
  {
    icon: Wifi,
    title: "High-Speed Internet",
    description:
      "Connected campus supporting digital learning and collaboration."
  },
  {
    icon: ShieldCheck,
    title: "Campus Security",
    description:
      "Secure campus with trained staff and modern safety systems."
  }
];

const Campus = () => {

  return (
    <div className="inner-page">


      <section className="page-hero">

        <div>

          <span>
            CAMPUS & FACILITIES
          </span>

          <h1>
            A Campus Built
            <br />
            For Young Minds
          </h1>

          <p>
            Explore our modern infrastructure
            designed to support learning,
            creativity and wellbeing.
          </p>

        </div>

      </section>


      {/* Facilities */}

      <section className="facilities-section">

        <SectionTitle
          eyebrow="OUR FACILITIES"
          title="Everything Students Need To Thrive"
          description="From modern classrooms to sports facilities, our campus provides a complete environment for learning and growth."
        />


        <div className="facilities-grid">

          {facilities.map((facility) => {

            const Icon = facility.icon;

            return (
              <article
                className="facility-card"
                key={facility.title}
              >

                <div className="facility-icon">
                  <Icon />
                </div>

                <h3>
                  {facility.title}
                </h3>

                <p>
                  {facility.description}
                </p>

              </article>
            );

          })}

        </div>

      </section>


      {/* Campus Image */}

      <section className="campus-showcase">

        <div className="campus-showcase-image">

          <img
            src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80"
            alt="School campus"
          />

        </div>


        <div className="campus-showcase-content">

          <span className="section-eyebrow">
            OUR CAMPUS
          </span>

          <h2>
            Designed For
            <span>
              Discovery
            </span>
          </h2>

          <p>
            Every corner of our campus is
            designed to encourage students
            to explore, collaborate and learn.
          </p>

        </div>

      </section>

    </div>
  );
};

export default Campus;