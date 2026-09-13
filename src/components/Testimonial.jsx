import { Star, Quote } from "lucide-react";
import "./Testimonial.css";
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Parent",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    message:
      "The school has created an amazing learning environment for my child. The teachers are supportive and genuinely care about every student's development."
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Parent",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    message:
      "I am extremely happy with the balance between academics, sports and extracurricular activities. My child has become much more confident."
  },
  {
    id: 3,
    name: "Ananya Singh",
    role: "Student",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    message:
      "I love studying here because we get opportunities to explore our interests and participate in many activities beyond the classroom."
  }
];

const Testimonial = () => {

  return (
    <section className="testimonial-section">

      <div className="testimonial-container">

        <div className="testimonial-heading">

          <span className="section-eyebrow">
            TESTIMONIALS
          </span>

          <h2>
            What Our Community Says
          </h2>

          <p>
            Hear from students and parents who
            are part of our school community.
          </p>

        </div>


        <div className="testimonial-grid">

          {testimonials.map((item) => (

            <article
              className="testimonial-card"
              key={item.id}
            >

              <Quote
                className="quote-icon"
                size={35}
              />


              <div className="stars">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={16}
                    fill="currentColor"
                  />

                ))}

              </div>


              <p className="testimonial-message">
                "{item.message}"
              </p>


              <div className="testimonial-user">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>

                  <h4>
                    {item.name}
                  </h4>

                  <span>
                    {item.role}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonial;