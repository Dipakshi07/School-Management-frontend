import SectionTitle from "../components/SectionTitle";
import {
  Trophy,
  Medal,
  Award,
  Star,
  GraduationCap
} from "lucide-react";
import "./Achievements.css";

const achievements = [
  {
    icon: Trophy,
    year: "2026",
    title: "National Sports Championship",
    description:
      "Our students secured multiple medals at the national-level school sports championship."
  },
  {
    icon: GraduationCap,
    year: "2026",
    title: "Outstanding Board Results",
    description:
      "Our students achieved excellent results in the board examinations."
  },
  {
    icon: Award,
    year: "2025",
    title: "Best School Award",
    description:
      "Recognized for excellence in holistic education and student development."
  },
  {
    icon: Medal,
    year: "2025",
    title: "Inter School Debate",
    description:
      "Students won first and second positions in the regional debate competition."
  },
  {
    icon: Star,
    year: "2024",
    title: "Innovation Challenge",
    description:
      "Our student team received recognition for an innovative technology project."
  }
];

const Achievements = () => {

  return (
    <div className="inner-page">


      <section className="page-hero">

        <div>

          <span>
            ACHIEVEMENTS
          </span>

          <h1>
            Celebrating
            <br />
            Excellence
          </h1>

          <p>
            Every achievement represents
            dedication, teamwork and perseverance.
          </p>

        </div>

      </section>


      <section className="achievements-page">

        <SectionTitle
          eyebrow="OUR JOURNEY"
          title="Milestones We Are Proud Of"
          description="Celebrating the achievements of our students, teachers and school community."
        />


        <div className="achievement-timeline">

          {achievements.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                className="timeline-item"
                key={index}
              >

                <div className="timeline-icon">
                  <Icon />
                </div>


                <div className="timeline-content">

                  <span>
                    {item.year}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>

              </div>
            );

          })}

        </div>

      </section>

    </div>
  );
};

export default Achievements;