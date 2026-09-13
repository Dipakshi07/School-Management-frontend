import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Monitor,
  Globe,
  Trophy,
} from "lucide-react";

import "./AcademicPages.css";

const programs = [
  {
    icon: <BookOpen size={30} />,
    title: "Primary Education",
    classes: "Classes I – V",
    description:
      "A strong foundation program focused on basic concepts, creativity, communication, values and overall personality development.",
  },
  {
    icon: <GraduationCap size={30} />,
    title: "Middle School",
    classes: "Classes VI – VIII",
    description:
      "Students develop deeper subject knowledge, analytical thinking, problem-solving skills and independent learning habits.",
  },
  {
    icon: <FlaskConical size={30} />,
    title: "Secondary Education",
    classes: "Classes IX – X",
    description:
      "A structured academic program that prepares students for board examinations and future academic opportunities.",
  },
  {
    icon: <Monitor size={30} />,
    title: "Computer Education",
    classes: "Classes I – X",
    description:
      "Students learn computer fundamentals, digital literacy, programming concepts and responsible use of technology.",
  },
  {
    icon: <Globe size={30} />,
    title: "Language Development",
    classes: "All Classes",
    description:
      "Special emphasis on English and Hindi communication, reading, writing, vocabulary and presentation skills.",
  },
  {
    icon: <Trophy size={30} />,
    title: "Co-Curricular Learning",
    classes: "All Classes",
    description:
      "Students participate in sports, arts, cultural activities, competitions and other experiences beyond classroom learning.",
  },
];

const AcademicsPrograms = () => {
  return (
    <div className="academic-page">

      {/* Hero */}

      <section className="academic-hero">

        <div className="academic-hero-content">

          <span>ACADEMICS</span>

          <h1>
            Academic Programs
          </h1>

          <p>
            Building strong foundations, developing
            confident learners and preparing students
            for a successful future.
          </p>

        </div>

      </section>

      {/* Introduction */}

      <section className="academic-intro">

        <div className="academic-container">

          <span className="section-label">
            OUR PROGRAMS
          </span>

          <h2>
            Learning Designed for Every Stage
          </h2>

          <p>
            At Bright Future International School,
            our academic programs are designed to
            support students at every stage of their
            educational journey. We combine academic
            knowledge with practical learning,
            creativity, technology and life skills.
          </p>

        </div>

      </section>

      {/* Programs */}

      <section className="programs-section">

        <div className="academic-container">

          <div className="programs-grid">

            {programs.map((program) => (
              <div
                className="program-card"
                key={program.title}
              >

                <div className="program-icon">
                  {program.icon}
                </div>

                <span className="program-class">
                  {program.classes}
                </span>

                <h3>
                  {program.title}
                </h3>

                <p>
                  {program.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default AcademicsPrograms;