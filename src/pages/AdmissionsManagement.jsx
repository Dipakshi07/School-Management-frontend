import { useEffect, useState } from "react";

import {
  GraduationCap,
  User,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  School,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

import "./AdmissionsManagement.css";

const AdmissionsManagement = ({ onAdmissionUpdated }) => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // ==============================
  // GET TOKEN
  // ==============================
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // ==============================
  // FORMAT DOB
  // ==============================
  const formatDOB = (date) => {
    if (!date) return "—";

    const parts = date.split("-");

    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    return date;
  };

  // ==============================
  // FORMAT CREATED DATE
  // ==============================
  const formatCreatedDate = (date) => {
    if (!date) return "—";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // ==============================
  // FETCH ADMISSIONS
  // ==============================
  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found. Please login again."
        );
      }

      const response = await fetch(
        "https://school-management-backend-jcoe.onrender.com/api/admin/admissions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch admissions."
        );
      }

      if (Array.isArray(data)) {
        setAdmissions(data);
      } else if (Array.isArray(data.admissions)) {
        setAdmissions(data.admissions);
      } else {
        setAdmissions([]);
      }
    } catch (error) {
      console.error("Fetch Admissions Error:", error);

      setError(
        error.message ||
          "Failed to load admission applications."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPDATE ADMISSION STATUS
  // ==============================
  const updateStatus = async (id, status) => {
    try {
      if (status === "Declined") {
        const confirmed = window.confirm(
          "Are you sure you want to decline this admission application?"
        );

        if (!confirmed) {
          return;
        }
      }

      setUpdatingId(id);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found. Please login again."
        );
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/admissions/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update admission status."
        );
      }

      // Update UI immediately
      setAdmissions((previousAdmissions) =>
        previousAdmissions.map((admission) =>
          admission._id === id
            ? {
                ...admission,
                status: data.admission?.status || status,
              }
            : admission
        )
      );

      // Update dashboard statistics
      if (onAdmissionUpdated) {
        onAdmissionUpdated();
      }
    } catch (error) {
      console.error(
        "Update Admission Status Error:",
        error
      );

      setError(
        error.message ||
          "Failed to update admission status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==============================
  // LOAD DATA ON COMPONENT MOUNT
  // ==============================
  useEffect(() => {
    fetchAdmissions();
  }, []);

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="admissions-loading">
        <div className="admissions-spinner"></div>

        <p>
          Loading admission applications...
        </p>
      </div>
    );
  }

  return (
    <div className="admissions-management">

      {/* ================= HEADER ================= */}
      <div className="admissions-header">
        <div className="admissions-heading">
          <div className="admissions-heading-icon">
            <GraduationCap size={28} />
          </div>

          <div>
            <h2>Admission Applications</h2>

            <p>
              Manage student admission applications
              submitted through the school website.
            </p>
          </div>
        </div>

        <button
          className="admissions-refresh-btn"
          onClick={fetchAdmissions}
          disabled={loading}
        >
          <RefreshCw size={17} />

          Refresh
        </button>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="admissions-error">
          <AlertCircle size={20} />

          <span>{error}</span>

          <button onClick={fetchAdmissions}>
            Try Again
          </button>
        </div>
      )}

      {/* ================= SUMMARY ================= */}
      <div className="admission-summary">

        <div className="admission-summary-card total">
          <div className="summary-icon">
            <GraduationCap size={22} />
          </div>

          <div>
            <span>Total Applications</span>

            <strong>
              {admissions.length}
            </strong>
          </div>
        </div>

        <div className="admission-summary-card pending">
          <div className="summary-icon">
            <Clock size={22} />
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {
                admissions.filter(
                  (item) =>
                    item.status === "Pending"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="admission-summary-card approved">
          <div className="summary-icon">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Approved</span>

            <strong>
              {
                admissions.filter(
                  (item) =>
                    item.status === "Approved"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="admission-summary-card declined">
          <div className="summary-icon">
            <XCircle size={22} />
          </div>

          <div>
            <span>Declined</span>

            <strong>
              {
                admissions.filter(
                  (item) =>
                    item.status === "Declined"
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* ================= EMPTY ================= */}
      {admissions.length === 0 ? (
        <div className="admissions-empty">

          <div className="empty-icon">
            <GraduationCap size={42} />
          </div>

          <h3>No Admission Applications</h3>

          <p>
            No student admission applications
            have been submitted yet.
          </p>

          <button
            className="admissions-refresh-btn"
            onClick={fetchAdmissions}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>
      ) : (
        /* ================= APPLICATIONS ================= */
        <div className="admissions-list">

          {admissions.map((admission, index) => (

            <div
              className="admission-card"
              key={admission._id}
            >

              {/* ================= CARD HEADER ================= */}
              <div className="admission-card-header">

                <div className="student-title">

                  <div className="student-avatar">
                    <User size={23} />
                  </div>

                  <div>
                    <span className="application-number">
                      Application #{admissions.length - index}
                    </span>

                    <h3>
                      {admission.studentName}
                    </h3>
                  </div>

                </div>

                <div
                  className={`admission-status ${
                    admission.status?.toLowerCase()
                  }`}
                >
                  {admission.status ===
                    "Approved" && (
                    <CheckCircle size={16} />
                  )}

                  {admission.status ===
                    "Declined" && (
                    <XCircle size={16} />
                  )}

                  {admission.status ===
                    "Pending" && (
                    <Clock size={16} />
                  )}

                  <span>
                    {admission.status ||
                      "Pending"}
                  </span>
                </div>

              </div>

              {/* ================= DETAILS ================= */}
              <div className="admission-details">

                {/* Student Name */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <User size={18} />
                  </div>

                  <div>
                    <span>Student Name</span>

                    <strong>
                      {admission.studentName ||
                        "—"}
                    </strong>
                  </div>

                </div>

                {/* DOB */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <span>Date of Birth</span>

                    <strong>
                      {formatDOB(
                        admission.dateOfBirth
                      )}
                    </strong>
                  </div>

                </div>

                {/* Gender */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <User size={18} />
                  </div>

                  <div>
                    <span>Gender</span>

                    <strong>
                      {admission.gender ||
                        "—"}
                    </strong>
                  </div>

                </div>

                {/* Class */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <GraduationCap size={18} />
                  </div>

                  <div>
                    <span>Class Applied</span>

                    <strong>
                      {admission.classApplied ||
                        "—"}
                    </strong>
                  </div>

                </div>

                {/* Parent */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <User size={18} />
                  </div>

                  <div>
                    <span>Parent / Guardian</span>

                    <strong>
                      {admission.parentName ||
                        "—"}
                    </strong>
                  </div>

                </div>

                {/* Email */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <Mail size={18} />
                  </div>

                  <div>
                    <span>Email</span>

                    <strong>
                      {admission.email || "—"}
                    </strong>
                  </div>

                </div>

                {/* Phone */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <Phone size={18} />
                  </div>

                  <div>
                    <span>Phone</span>

                    <strong>
                      {admission.phone || "—"}
                    </strong>
                  </div>

                </div>

                {/* Previous School */}
                <div className="admission-detail">

                  <div className="detail-icon">
                    <School size={18} />
                  </div>

                  <div>
                    <span>Previous School</span>

                    <strong>
                      {admission.previousSchool ||
                        "Not Provided"}
                    </strong>
                  </div>

                </div>

                {/* Address */}
                <div className="admission-detail full-width">

                  <div className="detail-icon">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <span>Address</span>

                    <strong>
                      {admission.address ||
                        "—"}
                    </strong>
                  </div>

                </div>

                {/* Message */}
                <div className="admission-detail full-width">

                  <div className="detail-icon">
                    <MessageSquare size={18} />
                  </div>

                  <div>
                    <span>Message</span>

                    <strong>
                      {admission.message ||
                        "No message provided"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* ================= FOOTER ================= */}
              <div className="admission-card-footer">

                <div className="submitted-date">
                  <CalendarDays size={15} />

                  <span>
                    Applied on{" "}
                    {formatCreatedDate(
                      admission.createdAt
                    )}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="admission-actions">

                  {admission.status !==
                    "Approved" && (
                    <button
                      className="approve-btn"
                      onClick={() =>
                        updateStatus(
                          admission._id,
                          "Approved"
                        )
                      }
                      disabled={
                        updatingId ===
                        admission._id
                      }
                    >
                      <CheckCircle size={17} />

                      {updatingId ===
                      admission._id
                        ? "Updating..."
                        : "Approve"}
                    </button>
                  )}

                  {admission.status !==
                    "Declined" && (
                    <button
                      className="decline-btn"
                      onClick={() =>
                        updateStatus(
                          admission._id,
                          "Declined"
                        )
                      }
                      disabled={
                        updatingId ===
                        admission._id
                      }
                    >
                      <XCircle size={17} />

                      {updatingId ===
                      admission._id
                        ? "Updating..."
                        : "Decline"}
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default AdmissionsManagement;