
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import "./EventRegistration.css";

const EventRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;

  const [formData, setFormData] = useState({
    studentName: "",
    className: "",
    rollNumber: "",
    email: "",
    phone: "",
    section: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // ==============================
  // HANDLE FORM SUBMIT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Event validation
      if (!event?.id || !event?.title) {
        throw new Error(
          "Event information is missing. Please select the event again."
        );
      }

      const response = await fetch(
        "https://school-management-backend-jcoe.onrender.com/api/event-registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: event.id,
            eventTitle: event.title,

            studentName: formData.studentName.trim(),
            className: formData.className,
            section: formData.section.trim(),
            rollNumber: formData.rollNumber.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      // Success
      setSuccessMessage(
        "Registration successful! Your details have been submitted."
      );

      // Reset form
      setFormData({
        studentName: "",
        className: "",
        rollNumber: "",
        email: "",
        phone: "",
        section: "",
        message: "",
      });
    } catch (error) {
      console.error("Event Registration Error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // EVENT NOT FOUND
  // ==============================
  if (!event) {
    return (
      <div className="event-registration-page">
        <div className="event-not-found">
          <h2>Event Not Found</h2>

          <p>
            Please go back to the news page and select an event again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/news")}
          >
            <ArrowLeft size={18} />
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-registration-page">

      {/* ==============================
          HERO
      ============================== */}
      <section className="event-registration-hero">
        <div>
          <span>EVENT REGISTRATION</span>

          <h1>{event.title}</h1>

          <p>
            Register yourself for this school event.
          </p>
        </div>
      </section>

      {/* ==============================
          REGISTRATION CONTENT
      ============================== */}
      <section className="registration-section">
        <div className="registration-container">

          {/* ==============================
              EVENT INFORMATION
          ============================== */}
          <div className="event-info">

            <span className="registration-label">
              SCHOOL EVENT
            </span>

            <h2>{event.title}</h2>

            <div className="event-info-date">
              <CalendarDays size={20} />

              <span>
                {event.date || "Event Date"}
              </span>
            </div>

            <p>
              {event.description ||
                "Register yourself for this upcoming school event."}
            </p>

            <button
              type="button"
              className="back-news-btn"
              onClick={() => navigate("/news")}
            >
              <ArrowLeft size={17} />
              Back to News
            </button>
          </div>

          {/* ==============================
              REGISTRATION FORM
          ============================== */}
          <div className="registration-form-card">

            <h2>Student Registration</h2>

            <p>
              Please fill in your details to register for this event.
            </p>

            {/* SUCCESS MESSAGE */}
            {successMessage && (
              <div className="registration-success">
                <CheckCircle2 size={20} />

                <span>{successMessage}</span>
              </div>
            )}

            {/* ERROR MESSAGE */}
            {errorMessage && (
              <div className="registration-error">
                <AlertCircle size={20} />

                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* STUDENT NAME */}
              <div className="registration-form-group">
                <label htmlFor="studentName">
                  Student Name
                </label>

                <input
                  id="studentName"
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </div>

              {/* CLASS + SECTION */}
              <div className="registration-row">

                <div className="registration-form-group">
                  <label htmlFor="className">
                    Class
                  </label>

                  <select
                    id="className"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Class
                    </option>

                    <option value="Play Group">
                      Play Group
                    </option>

                    <option value="Nursery">
                      Nursery
                    </option>

                    <option value="LKG">
                      LKG
                    </option>

                    <option value="UKG">
                      UKG
                    </option>

                    <option value="Class 1">
                      Class 1
                    </option>

                    <option value="Class 2">
                      Class 2
                    </option>

                    <option value="Class 3">
                      Class 3
                    </option>

                    <option value="Class 4">
                      Class 4
                    </option>

                    <option value="Class 5">
                      Class 5
                    </option>

                    <option value="Class 6">
                      Class 6
                    </option>

                    <option value="Class 7">
                      Class 7
                    </option>

                    <option value="Class 8">
                      Class 8
                    </option>
                  </select>
                </div>

                <div className="registration-form-group">
                  <label htmlFor="section">
                    Section
                  </label>

                  <input
                    id="section"
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="e.g. A"
                    required
                  />
                </div>

              </div>

              {/* ROLL NUMBER */}
              <div className="registration-form-group">
                <label htmlFor="rollNumber">
                  Roll Number
                </label>

                <input
                  id="rollNumber"
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter roll number"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="registration-form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  required
                />
              </div>

              {/* PHONE */}
              <div className="registration-form-group">
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
                  required
                />
              </div>

              {/* MESSAGE */}
              <div className="registration-form-group">
                <label htmlFor="message">
                  Additional Information
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional information..."
                  rows="4"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="registration-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    Register for Event
                    <Send size={18} />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventRegistration;
