import SectionTitle from "../components/SectionTitle";
import {
  BookOpen,
  Calculator,
  Microscope,
  Globe,
  Palette,
  Laptop,
  ArrowRight
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Academics.css";

const subjects = [
  {
    icon: BookOpen,
    title: "Languages",
    description:
      "English, Hindi and additional language programs."
  },
  {
    icon: Calculator,
    title: "Mathematics",
    description:
      "Developing logical thinking and problem-solving abilities."
  },
  {
    icon: Microscope,
    title: "Science",
    description:
      "Hands-on experiments and inquiry-based learning."
  },
  {
    icon: Globe,
    title: "Social Studies",
    description:
      "Understanding society, culture, geography and history."
  },
  {
    icon: Palette,
    title: "Arts & Design",
    description:
      "Creative expression through visual and performing arts."
  },
  {
    icon: Laptop,
    title: "Technology",
    description:
      "Digital literacy, coding and technology education."
  }
];

const Academics = () => {

  return (
    <div className="inner-page">


      <section className="page-hero">

        <div>

          <span>
            ACADEMICS
          </span>

          <h1>
            Learning That
            <br />
            Inspires Curiosity
          </h1>

          <p>
            Explore our academic programs,
            curriculum and learning philosophy.
          </p>

        </div>

      </section>


      {/* Programs */}

      <section className="academic-programs">

        <SectionTitle
          eyebrow="ACADEMIC PROGRAMS"
          title="Programs Designed For Every Age"
          description="Our curriculum evolves with students as they grow, learn and discover their interests."
        />


        <div className="academic-program-grid">

          <article>

            <span>01</span>

            <h3>
              Primary School
            </h3>

            <p>
              Classes I-V
            </p>

            <div>
              Foundational literacy,
              numeracy, creativity and
              social development.
            </div>

            <Link to="/contact">
              Learn More
              <ArrowRight size={17} />
            </Link>

          </article>


          <article>

            <span>02</span>

            <h3>
              Middle School
            </h3>

            <p>
              Classes VI-VIII
            </p>

            <div>
              Deeper subject knowledge,
              critical thinking and
              collaborative learning.
            </div>

            <Link to="/contact">
              Learn More
              <ArrowRight size={17} />
            </Link>

          </article>


          <article>

            <span>03</span>

            <h3>
              Senior School
            </h3>

            <p>
              Classes IX-XII
            </p>

            <div>
              Advanced academics,
              career preparation and
              leadership development.
            </div>

            <Link to="/contact">
              Learn More
              <ArrowRight size={17} />
            </Link>

          </article>

        </div>

      </section>


      {/* Curriculum */}

      <section
        className="curriculum-section"
        id="curriculum"
      >

        <SectionTitle
          eyebrow="CURRICULUM"
          title="A Balanced Approach To Learning"
          description="We believe students learn best when academic knowledge is connected with real-world experiences."
        />


        <div className="subject-grid">

          {subjects.map((subject) => {

            const Icon = subject.icon;

            return (
              <div
                className="subject-card"
                key={subject.title}
              >

                <div className="subject-icon">
                  <Icon />
                </div>

                <h3>
                  {subject.title}
                </h3>

                <p>
                  {subject.description}
                </p>

              </div>
            );

          })}

        </div>

      </section>


      {/* Learning Philosophy */}

      <section className="learning-section">

        <div>

          <span className="section-eyebrow">
            OUR APPROACH
          </span>

          <h2>
            Learning Beyond
            <span>
              The Classroom
            </span>
          </h2>

          <p>
            Our teaching methodology combines
            classroom learning with projects,
            experiments, discussions,
            presentations and real-world
            experiences.
          </p>

        </div>


        <div className="learning-image">

          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
            alt="Students learning"
          />

        </div>

      </section>

    </div>
  );
};

export default Academics;