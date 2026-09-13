import "./Stats.css";
import {
  Users,
  GraduationCap,
  Trophy,
  BookOpen
} from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Users,
    number: "2500+",
    title: "Students"
  },
  {
    id: 2,
    icon: GraduationCap,
    number: "150+",
    title: "Expert Faculty"
  },
  {
    id: 3,
    icon: BookOpen,
    number: "25+",
    title: "Years of Excellence"
  },
  {
    id: 4,
    icon: Trophy,
    number: "100+",
    title: "Achievements"
  }
];

const Stats = () => {

  return (
    <section className="stats-section">

      <div className="stats-container">

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              className="stat-card"
              key={stat.id}
            >

              <div className="stat-icon">
                <Icon size={27} />
              </div>

              <div className="stat-content">

                <h3>
                  {stat.number}
                </h3>

                <p>
                  {stat.title}
                </p>

              </div>

            </div>
          );

        })}

      </div>

    </section>
  );
};

export default Stats;