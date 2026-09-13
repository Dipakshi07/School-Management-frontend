import { useState } from "react";
import {
  FileText,
  CalendarDays,
  ArrowRight,
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Send,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Admissions.css";

const Admissions = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    classApplied: "",
    parentName: "",
    email: "",
    phone: "",
    address: "",
    previousSchool: "",
    message: "",
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      studentName: "",
      dateOfBirth: "",
      gender: "",
      classApplied: "",
      parentName: "",
      email: "",
      phone: "",
      address: "",
      previousSchool: "",
      message: "",
    });
  };

  // =========================
  // CLOSE FORM
  // =========================
  const handleCloseForm = () => {
    setShowForm(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // =========================
  // APPLY ONLINE BUTTON
  // =========================
  const handleApplyOnline = () => {
    setShowForm(true);

    setSuccessMessage("");
    setErrorMessage("");

    setTimeout(() => {
      document
        .getElementById("admission-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  // =========================
  // SUBMIT ADMISSION FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Exact data coming from the public admission form
      const admissionData = {
        studentName: formData.studentName.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        classApplied: formData.classApplied,
        parentName: formData.parentName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        previousSchool: formData.previousSchool.trim(),
        message: formData.message.trim(),
      };

      const response = await fetch(
        "http://localhost:5000/api/admissions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(admissionData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Admission form submission failed."
        );
      }

      // SUCCESS
      setSuccessMessage(
        "Admission application submitted successfully! Our school team will contact you soon."
      );

      // Clear form
      resetForm();

      // Scroll to success message
      setTimeout(() => {
        document
          .getElementById("admission-form")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      console.error(
        "Admission Form Error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admissions-page">

      {/* =====================================
          PAGE HERO
      ====================================== */}
      <section className="admissions-hero">
        <div className="admissions-hero-content">

          <span className="hero-badge">
            <GraduationCap size={18} />
            Admissions 2026–27
          </span>

          <h1>
            Begin Your Child's
            <span> Bright Future</span>
          </h1>

          <p>
            Give your child the opportunity to learn,
            grow and achieve excellence at Bright Future
            International School.
          </p>

          <button
            type="button"
            className="apply-online-btn"
            onClick={handleApplyOnline}
          >
            Apply Online
            <ArrowRight size={20} />
          </button>

        </div>
      </section>

      {/* =====================================
          ADMISSION INFORMATION
      ====================================== */}
      <section className="admission-info-section">

        <div className="section-heading">
          <span>ADMISSION PROCESS</span>

          <h2>
            Simple & Easy
            <strong> Admission Process</strong>
          </h2>

          <p>
            Follow these simple steps to complete
            your child's admission process.
          </p>
        </div>

        <div className="admission-process">

          {/* STEP 1 */}
          <div className="process-card">

            <div className="process-icon">
              <FileText size={28} />
            </div>

            <span className="process-number">
              01
            </span>

            <h3>
              Fill Application
            </h3>

            <p>
              Complete the online admission application
              form with accurate student and parent details.
            </p>

          </div>

          {/* STEP 2 */}
          <div className="process-card">

            <div className="process-icon">
              <CalendarDays size={28} />
            </div>

            <span className="process-number">
              02
            </span>

            <h3>
              Application Review
            </h3>

            <p>
              Our admission team will review your
              application and verify the submitted details.
            </p>

          </div>

          {/* STEP 3 */}
          <div className="process-card">

            <div className="process-icon">
              <User size={28} />
            </div>

            <span className="process-number">
              03
            </span>

            <h3>
              Interaction
            </h3>

            <p>
              Shortlisted candidates may be contacted
              for further interaction or assessment.
            </p>

          </div>

          {/* STEP 4 */}
          <div className="process-card">

            <div className="process-icon">
              <CheckCircle size={28} />
            </div>

            <span className="process-number">
              04
            </span>

            <h3>
              Admission Confirmation
            </h3>

            <p>
              Once approved, complete the admission
              formalities and secure your child's seat.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================
          ONLINE APPLICATION FORM
      ====================================== */}
      {showForm && (
        <section
          className="admission-form-section"
          id="admission-form"
        >

          <div className="admission-form-wrapper">

            {/* FORM HEADER */}
            <div className="form-header">

              <div>
                <span>
                  ONLINE APPLICATION
                </span>

                <h2>
                  Admission Application Form
                </h2>

                <p>
                  Please provide correct information
                  about the student and parent/guardian.
                </p>
              </div>

              <button
                type="button"
                className="close-form-btn"
                onClick={handleCloseForm}
                aria-label="Close admission form"
              >
                <X size={22} />
              </button>

            </div>

            {/* =================================
                SUCCESS MESSAGE
            ================================== */}
            {successMessage && (
              <div className="form-message success-message">

                <CheckCircle size={22} />

                <span>
                  {successMessage}
                </span>

              </div>
            )}

            {/* =================================
                ERROR MESSAGE
            ================================== */}
            {errorMessage && (
              <div className="form-message error-message">

                <AlertCircle size={22} />

                <span>
                  {errorMessage}
                </span>

              </div>
            )}

            {/* =================================
                FORM
            ================================== */}
            <form
              onSubmit={handleSubmit}
              className="admission-form"
            >

              {/* =================================
                  STUDENT DETAILS
              ================================== */}
              <div className="form-section-title">
                <GraduationCap size={22} />

                <div>
                  <h3>
                    Student Details
                  </h3>

                  <p>
                    Enter the student's basic information.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                {/* STUDENT NAME */}
                <div className="form-group">

                  <label htmlFor="studentName">
                    Student Name
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <User size={18} />

                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Enter student's full name"
                      required
                    />

                  </div>

                </div>

                {/* DATE OF BIRTH */}
                <div className="form-group">

                  <label htmlFor="dateOfBirth">
                    Date of Birth
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <CalendarDays size={18} />

                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                {/* GENDER */}
                <div className="form-group">

                  <label htmlFor="gender">
                    Gender
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <User size={18} />

                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                </div>

                {/* CLASS */}
                <div className="form-group">

                  <label htmlFor="classApplied">
                    Class Applying For
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <GraduationCap size={18} />

                    <select
                      id="classApplied"
                      name="classApplied"
                      value={formData.classApplied}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Class
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

                      <option value="Class 9">
                        Class 9
                      </option>

                      <option value="Class 10">
                        Class 10
                      </option>

                      <option value="Class 11">
                        Class 11
                      </option>

                      <option value="Class 12">
                        Class 12
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* =================================
                  PARENT DETAILS
              ================================== */}
              <div className="form-section-title">

                <User size={22} />

                <div>
                  <h3>
                    Parent / Guardian Details
                  </h3>

                  <p>
                    Enter parent or guardian contact information.
                  </p>
                </div>

              </div>

              <div className="form-grid">

                {/* PARENT NAME */}
                <div className="form-group">

                  <label htmlFor="parentName">
                    Parent / Guardian Name
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <User size={18} />

                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Enter parent/guardian name"
                      required
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <Mail size={18} />

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />

                  </div>

                </div>

                {/* PHONE */}
                <div className="form-group">

                  <label htmlFor="phone">
                    Phone Number
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <Phone size={18} />

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      minLength="10"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      required
                    />

                  </div>

                </div>

                {/* PREVIOUS SCHOOL */}
                <div className="form-group">

                  <label htmlFor="previousSchool">
                    Previous School
                  </label>

                  <div className="input-wrapper">

                    <GraduationCap size={18} />

                    <input
                      type="text"
                      id="previousSchool"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      placeholder="Enter previous school name"
                    />

                  </div>

                </div>

              </div>

              {/* =================================
                  ADDRESS
              ================================== */}
              <div className="form-group full-width">

                <label htmlFor="address">
                  Address
                  <span>*</span>
                </label>

                <div className="input-wrapper textarea-wrapper">

                  <MapPin size={18} />

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    rows="4"
                    required
                  />

                </div>

              </div>

              {/* =================================
                  MESSAGE
              ================================== */}
              <div className="form-group full-width">

                <label htmlFor="message">
                  Additional Message
                </label>

                <div className="input-wrapper textarea-wrapper">

                  <FileText size={18} />

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any additional information or message..."
                    rows="5"
                  />

                </div>

              </div>

              {/* =================================
                  SUBMIT BUTTON
              ================================== */}
              <div className="form-submit-area">

                <button
                  type="submit"
                  className="submit-admission-btn"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span className="button-loader"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={19} />
                      Submit Application
                    </>
                  )}

                </button>

                <p>
                  By submitting this form, you confirm
                  that the information provided is accurate.
                </p>

              </div>

            </form>

          </div>

        </section>
      )}

      {/* =====================================
          REQUIRED DOCUMENTS
      ====================================== */}
      <section className="documents-section">

        <div className="section-heading">

          <span>
            REQUIRED DOCUMENTS
          </span>

          <h2>
            Documents Required for
            <strong> Admission</strong>
          </h2>

          <p>
            Keep the following documents ready
            during the admission process.
          </p>

        </div>

        <div className="documents-grid">

          <div className="document-card">
            <FileText size={25} />
            <h3>
              Birth Certificate
            </h3>
            <p>
              Copy of the student's birth certificate.
            </p>
          </div>

          <div className="document-card">
            <FileText size={25} />
            <h3>
              Previous School Records
            </h3>
            <p>
              Previous academic records or transfer certificate.
            </p>
          </div>

          <div className="document-card">
            <User size={25} />
            <h3>
              Passport Size Photos
            </h3>
            <p>
              Recent passport-size photographs of the student.
            </p>
          </div>

          <div className="document-card">
            <FileText size={25} />
            <h3>
              Address Proof
            </h3>
            <p>
              Valid address proof of the parent or guardian.
            </p>
          </div>

        </div>

      </section>

      {/* =====================================
          CONTACT CTA
      ====================================== */}
      <section className="admission-contact-section">

        <div className="admission-contact-content">

          <div>

            <span>
              HAVE QUESTIONS?
            </span>

            <h2>
              Need Help With Admission?
            </h2>

            <p>
              Our admission team is here to help you
              with any questions regarding the admission
              process.
            </p>

          </div>

          <Link
            to="/contact"
            className="contact-school-btn"
          >
            Contact School
            <ArrowRight size={19} />
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Admissions;