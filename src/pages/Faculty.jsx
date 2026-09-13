import SectionTitle from "../components/SectionTitle";
import "./Faculty.css";

const faculty = [
  {
    id: 1,
    name: "Dr. Arjun Mehta",
    role: "Principal",
    subject: "School Leadership",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    role: "Vice Principal",
    subject: "Academic Administration",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Senior Teacher",
    subject: "Mathematics",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Ananya Kapoor",
    role: "Senior Teacher",
    subject: "Science",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Teacher",
    subject: "Computer Science",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Neha Gupta",
    role: "Teacher",
    subject: "English",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80"
  }
];

const Faculty = () => {

  return (
    <div className="inner-page">


      <section className="page-hero">

        <div>

          <span>
            OUR FACULTY
          </span>

          <h1>
            Meet The People
            <br />
            Behind The Learning
          </h1>

          <p>
            Experienced, passionate educators
            dedicated to helping every student
            succeed.
          </p>

        </div>

      </section>


      <section className="faculty-section">

        <SectionTitle
          eyebrow="OUR TEAM"
          title="Experienced Educators"
          description="Our teachers bring expertise, passion and a genuine commitment to student success."
        />


        <div className="faculty-grid">

          {faculty.map((teacher) => (

            <article
              className="faculty-card"
              key={teacher.id}
            >

              <div className="faculty-image">

                <img
                  src={teacher.image}
                  alt={teacher.name}
                />

              </div>


              <div className="faculty-info">

                <h3>
                  {teacher.name}
                </h3>

                <span>
                  {teacher.role}
                </span>

                <p>
                  {teacher.subject}
                </p>

              </div>

            </article>

          ))}

        </div>

      </section>

    </div>
  );
};

export default Faculty;