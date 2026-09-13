import SectionTitle from "../components/SectionTitle";
import {
  Trophy,
  Music,
  Palette,
  Code,
  Users,
  Leaf
} from "lucide-react";
import "./Activities.css";

const activities = [
  {
    icon: Trophy,
    title: "Sports",
    description:
      "Football, basketball, cricket, athletics and more."
  },
  {
    icon: Music,
    title: "Music & Performing Arts",
    description:
      "Choir, instruments, dance, theatre and stage performances."
  },
  {
    icon: Palette,
    title: "Art & Creativity",
    description:
      "Painting, drawing, crafts and creative design."
  },
  {
    icon: Code,
    title: "Technology Club",
    description:
      "Coding, robotics, AI and technology projects."
  },
  {
    icon: Users,
    title: "Leadership Club",
    description:
      "Debates, public speaking, student leadership and MUN."
  },
  {
    icon: Leaf,
    title: "Eco Club",
    description:
      "Environmental awareness, sustainability and green initiatives."
  }
];

const Activities = () => {

  return (
    <div className="inner-page">


      <section className="page-hero">

        <div>

          <span>
            ACTIVITIES & CLUBS
          </span>

          <h1>
            Discover. Explore.
            <br />
            Create.
          </h1>

          <p>
            Opportunities beyond academics
            that help students discover their
            passions.
          </p>

        </div>

      </section>


      <section className="activities-section">

        <SectionTitle
          eyebrow="STUDENT LIFE"
          title="Something For Everyone"
          description="Students can participate in activities that match their interests and develop skills beyond the classroom."
        />


        <div className="activities-grid">

          {activities.map((activity) => {

            const Icon = activity.icon;

            return (
              <article
                className="activity-card"
                key={activity.title}
              >

                <div className="activity-icon">
                  <Icon />
                </div>

                <h3>
                  {activity.title}
                </h3>

                <p>
                  {activity.description}
                </p>

                <button>
                  Explore Activity →
                </button>

              </article>
            );

          })}

        </div>

      </section>


      {/* Activity Image */}

      <section className="activity-banner">

        <img
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=80"
          alt="Students participating in activities"
        />

        <div className="activity-banner-content">

          <h2>
            Learning Doesn't Stop
            <br />
            When The Bell Rings.
          </h2>

          <p>
            Because some of the most important
            lessons happen outside the classroom.
          </p>

        </div>

      </section>

    </div>
  );
};

export default Activities;