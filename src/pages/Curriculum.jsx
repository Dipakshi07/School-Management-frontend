import {
  BookOpen,
  Calculator,
  FlaskConical,
  Languages,
  Monitor,
  Palette,
  Dumbbell,
  Globe2,
} from "lucide-react";

import "./AcademicPages.css";

const subjects = [
  {
    icon: <Languages size={28} />,
    title: "Languages",
    description:
      "English and Hindi with focus on reading, writing, grammar, vocabulary and communication.",
  },
  {
    icon: <Calculator size={28} />,
    title: "Mathematics",
    description:
      "Logical thinking, numerical concepts, problem solving and practical mathematical applications.",
  },
  {
    icon: <FlaskConical size={28} />,
    title: "Science",
    description:
      "Concept-based learning through experiments, observation, exploration and scientific thinking.",
  },
  {
    icon: <Globe2 size={28} />,
    title: "Social Studies",
    description:
      "History, geography, civics and social awareness to help students understand the world around them.",
  },
  {
    icon: <Monitor size={28} />,
    title: "Computer Science",
    description:
      "Digital literacy, computer fundamentals, technology awareness and age-appropriate programming concepts.",
  },
  {
    icon: <Palette size={28} />,
    title: "Art & Creative Education",
    description:
      "Drawing, painting, crafts and creative activities that encourage imagination and self-expression.",
  },
  {
    icon: <Dumbbell size={28} />,
    title: "Physical Education",
    description:
      "Sports, fitness, teamwork and healthy lifestyle habits through regular physical activities.",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Value Education",
    description:
      "Character building, discipline, responsibility, empathy and positive social values.",
  },
];

const Curriculum = () => {
  return (
    <div className="academic-page">

      {/* Hero */}

      <section className="academic-hero curriculum-hero">

        <div className="academic-hero-content">

          <span>ACADEMICS</span>

          <h1>
            Our Curriculum
          </h1>

          <p>
            A balanced curriculum that combines
            academic excellence with creativity,
            technology, values and physical development.
          </p>

        </div>

      </section>

      {/* Curriculum Overview */}

      <section className="academic-intro">

        <div className="academic-container">

          <span className="section-label">
            CURRICULUM
          </span>

          <h2>
            A Holistic Approach to Learning
          </h2>

          <p>
            Our curriculum is designed to encourage
            curiosity, critical thinking, creativity
            and independent learning. Students are
            provided opportunities to connect classroom
            concepts with real-world experiences.
          </p>

        </div>

      </section>

      {/* Subjects */}

      <section className="programs-section">

        <div className="academic-container">

          <h2 className="page-section-title">
            Core Learning Areas
          </h2>

          <div className="programs-grid">

            {subjects.map((subject) => (
              <div
                className="program-card"
                key={subject.title}
              >

                <div className="program-icon">
                  {subject.icon}
                </div>

                <h3>
                  {subject.title}
                </h3>

                <p>
                  {subject.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Learning Approach */}

      <section className="learning-approach">

        <div className="academic-container">

          <span className="section-label">
            OUR APPROACH
          </span>

          <h2>
            Learning Beyond Textbooks
          </h2>

          <div className="approach-grid">

            <div>
              <h3>Activity-Based Learning</h3>
              <p>
                Students learn concepts through
                activities, projects and practical
                experiences.
              </p>
            </div>

            <div>
              <h3>Technology-Enabled Learning</h3>
              <p>
                Digital resources and technology are
                used to make learning interactive
                and engaging.
              </p>
            </div>

            <div>
              <h3>Continuous Development</h3>
              <p>
                Regular assessments and feedback help
                students identify strengths and areas
                for improvement.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Curriculum;