
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://school-management-backend-jcoe.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      // Success message
      setSuccessMessage(
        data.message ||
          "Thank you! Your message has been submitted successfully."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error.message ||
          "Unable to submit your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inner-page">

      {/* ================= HERO SECTION ================= */}
      <section className="page-hero">
        <div>
          <span>CONTACT US</span>

          <h1>
            We'd Love To
            <br />
            Hear From You
          </h1>

          <p>
            Have a question? Our team is here
            to help you.
          </p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="contact-section">

        {/* ================= CONTACT INFORMATION ================= */}
        <div className="contact-info">

          <span className="section-eyebrow">
            GET IN TOUCH
          </span>

          <h2>
            Let's Start A Conversation
          </h2>

          <p>
            Whether you're a prospective parent,
            current student or community member,
            feel free to reach out.
          </p>

          <div className="contact-items">

            {/* Address */}
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin />
              </div>

              <div>
                <h3>Visit Us</h3>

                <p>
                  123 Education Avenue,
                  <br />
                  Lucknow, Uttar Pradesh
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-item">
              <div className="contact-icon">
                <Phone />
              </div>

              <div>
                <h3>Call Us</h3>

                <p>
                  +91 98765 43210
                  <br />
                  +91 98765 43211
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-item">
              <div className="contact-icon">
                <Mail />
              </div>

              <div>
                <h3>Email Us</h3>

                <p>
                  <a href="mailto:info@brightfuture.edu">
                    info@brightfuture.edu
                  </a>

                  <br />

                  <a href="mailto:admissions@brightfuture.edu">
                    admissions@brightfuture.edu
                  </a>
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="contact-item">
              <div className="contact-icon">
                <Clock />
              </div>

              <div>
                <h3>Office Hours</h3>

                <p>
                  Monday - Saturday
                  <br />
                  8:00 AM - 4:00 PM
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= CONTACT FORM ================= */}
        <div className="contact-form-wrapper">

          <form
            onSubmit={handleSubmit}
            className="contact-form"
          >

            <h2>
              Send Us A Message
            </h2>

            <p>
              Fill in the form and our team
              will get back to you.
            </p>

            {/* Success Message */}
            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            {/* Name + Email */}
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

            </div>

            {/* Phone + Subject */}
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                />
              </div>

            </div>

            {/* Message */}
            <div className="form-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="6"
                required
              />

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>

          </form>
        </div>

      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="map-section">

        <iframe
          title="School Location"
          src="https://www.google.com/maps?q=Lucknow,Uttar%20Pradesh&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>

      </section>

    </div>
  );
};

export default Contact;
