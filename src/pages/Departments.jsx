import {
  Calculator,
  FlaskConical,
  Monitor,
  Languages,
  Globe2,
  Palette,
  Dumbbell,
  Library,
} from "lucide-react";

import "./AcademicPages.css";

const departments = [
  {
    icon: <Languages size={30} />,
    title: "Languages Department",
    description:
      "Focused on language proficiency, communication, literature, reading and writing skills.",
    subjects:
      "English • Hindi • Communication",
  },
  {
    icon: <Calculator size={30} />,
    title: "Mathematics Department",
    description:
      "Developing logical reasoning, analytical thinking and strong mathematical foundations.",
    subjects:
      "Mathematics • Logical Reasoning",
  },
  {
    icon: <FlaskConical size={30} />,
    title: "Science Department",
    description:
      "Encouraging scientific curiosity through experiments, observation and practical learning.",
    subjects:
      "Physics • Chemistry • Biology",
  },
  {
    icon: <Globe2 size={30} />,
    title: "Social Studies Department",
    description:
      "Helping students understand history, geography, society, government and global awareness.",
    subjects:
      "History • Geography • Civics",
  },
  {
    icon: <Monitor size={30} />,
    title: "Computer Science Department",
    description:
      "Preparing students for the digital world through computer education and technology.",
    subjects:
      "Computer Fundamentals • Programming • Digital Skills",
  },
  {
    icon: <Palette size={30} />,
    title: "Arts & Creative Department",
    description:
      "Providing opportunities for artistic expression, creativity and cultural exploration.",
    subjects:
      "Art • Craft • Drawing • Cultural Activities",
  },
  {
    icon: <Dumbbell size={30} />,
    title: "Physical Education Department",
    description:
      "Promoting fitness, sportsmanship, teamwork and healthy lifestyle habits.",
    subjects:
      "Sports • Fitness • Athletics • Games",
  },
  {
    icon: <Library size={30} />,
    title: "Library & Learning Resources",
    description:
      "Supporting independent learning through books, reference materials and educational resources.",
    subjects:
      "Library • Reference Books • Digital Resources",
  },
];

const Departments = () => {
  return (
    <div className="academic-page">

      {/* Hero */}

      <section className="academic-hero departments-hero">

        <div className="academic-hero-content">

          <span>ACADEMICS</span>

          <h1>
            Academic Departments
          </h1>

          <p>
            Dedicated departments working together
            to provide a complete and engaging
            educational experience.
          </p>

        </div>

      </section>

      {/* Intro */}

      <section className="academic-intro">

        <div className="academic-container">

          <span className="section-label">
            OUR DEPARTMENTS
          </span>

          <h2>
            Expert Learning Across Every Subject
          </h2>

          <p>
            Our academic departments work together
            to create a supportive learning environment
            where students can explore subjects,
            develop skills and discover their interests.
          </p>

        </div>

      </section>

      {/* Departments */}

      <section className="programs-section">

        <div className="academic-container">

          <div className="programs-grid">

            {departments.map((department) => (
              <div
                className="department-card"
                key={department.title}
              >

                <div className="program-icon">
                  {department.icon}
                </div>

                <h3>
                  {department.title}
                </h3>

                <p>
                  {department.description}
                </p>

                <div className="department-subjects">
                  {department.subjects}
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default Departments;