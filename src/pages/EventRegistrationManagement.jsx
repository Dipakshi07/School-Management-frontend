
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  RefreshCw,
  Search,
  Trash2,
  Users,
  Mail,
  Phone,
  GraduationCap,
  Eye,
  X,
  AlertCircle,
} from "lucide-react";

import "./EventRegistrationManagement.css";

const API_URL =
  "https://school-management-backend-jcoe.onrender.com/api/event-registrations";

const EventRegistrationManagement = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All");

  const [selectedRegistration, setSelectedRegistration] =
    useState(null);

  // ==============================
  // GET AUTH TOKEN
  // ==============================
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken")
    );
  };

  // ==============================
  // FETCH REGISTRATIONS
  // ==============================
  const fetchRegistrations = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found. Please login again."
        );
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch registrations"
        );
      }

      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error(
        "Fetch Event Registrations Error:",
        err
      );

      setError(
        err.message ||
          "Unable to load event registrations."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==============================
  // LOAD ON PAGE OPEN
  // ==============================
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // ==============================
  // DELETE REGISTRATION
  // ==============================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmed) return;

    try {
      const token = getToken();

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete registration"
        );
      }

      setRegistrations((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (
        selectedRegistration?._id === id
      ) {
        setSelectedRegistration(null);
      }

      alert(
        "Registration deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete Registration Error:",
        err
      );

      alert(
        err.message ||
          "Failed to delete registration."
      );
    }
  };

  // ==============================
  // UNIQUE EVENTS
  // ==============================
  const events = useMemo(() => {
    const eventNames = registrations
      .map((item) => item.eventTitle)
      .filter(Boolean);

    return ["All", ...new Set(eventNames)];
  }, [registrations]);

  // ==============================
  // SEARCH + FILTER
  // ==============================
  const filteredRegistrations = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return registrations.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.studentName
          ?.toLowerCase()
          .includes(searchValue) ||
        item.email
          ?.toLowerCase()
          .includes(searchValue) ||
        item.phone
          ?.toLowerCase()
          .includes(searchValue) ||
        item.rollNumber
          ?.toLowerCase()
          .includes(searchValue) ||
        item.className
          ?.toLowerCase()
          .includes(searchValue) ||
        item.eventTitle
          ?.toLowerCase()
          .includes(searchValue);

      const matchesEvent =
        eventFilter === "All" ||
        item.eventTitle === eventFilter;

      return matchesSearch && matchesEvent;
    });
  }, [
    registrations,
    search,
    eventFilter,
  ]);

  // ==============================
  // FORMAT DATE
  // ==============================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="event-registration-management">
        <div className="erm-loading">
          <RefreshCw
            size={28}
            className="erm-spin"
          />

          <p>
            Loading event registrations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-registration-management">

      {/* ==============================
          HEADER
      ============================== */}
      <div className="erm-header">

        <div>
          <div className="erm-title-row">
            <Users size={27} />

            <h1>
              Event Registrations
            </h1>
          </div>

          <p>
            View and manage students registered
            for school events.
          </p>
        </div>

        <button
          type="button"
          className="erm-refresh-btn"
          onClick={() =>
            fetchRegistrations(true)
          }
          disabled={refreshing}
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "erm-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* ==============================
          ERROR
      ============================== */}
      {error && (
        <div className="erm-error">
          <AlertCircle size={20} />

          <div>
            <strong>
              Unable to load registrations
            </strong>

            <p>{error}</p>
          </div>
        </div>
      )}

      {/* ==============================
          STATS
      ============================== */}
      <div className="erm-stats">

        <div className="erm-stat-card">
          <div className="erm-stat-icon">
            <Users size={23} />
          </div>

          <div>
            <span>
              Total Registrations
            </span>

            <strong>
              {registrations.length}
            </strong>
          </div>
        </div>

        <div className="erm-stat-card">
          <div className="erm-stat-icon">
            <CalendarDays size={23} />
          </div>

          <div>
            <span>
              Total Events
            </span>

            <strong>
              {events.length - 1}
            </strong>
          </div>
        </div>

        <div className="erm-stat-card">
          <div className="erm-stat-icon">
            <GraduationCap size={23} />
          </div>

          <div>
            <span>
              Showing
            </span>

            <strong>
              {filteredRegistrations.length}
            </strong>
          </div>
        </div>

      </div>

      {/* ==============================
          FILTER BAR
      ============================== */}
      <div className="erm-filter-bar">

        <div className="erm-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search student, email, event, roll no..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={eventFilter}
          onChange={(e) =>
            setEventFilter(e.target.value)
          }
          className="erm-event-filter"
        >
          {events.map((eventName) => (
            <option
              key={eventName}
              value={eventName}
            >
              {eventName === "All"
                ? "All Events"
                : eventName}
            </option>
          ))}
        </select>

      </div>

      {/* ==============================
          TABLE
      ============================== */}
      <div className="erm-table-wrapper">

        {filteredRegistrations.length === 0 ? (
          <div className="erm-empty">

            <Users size={45} />

            <h3>
              No Registrations Found
            </h3>

            <p>
              {registrations.length === 0
                ? "No student has registered for any event yet."
                : "No registrations match your search or filter."}
            </p>

          </div>
        ) : (
          <table className="erm-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Event</th>
                <th>Class</th>
                <th>Roll No.</th>
                <th>Contact</th>
                <th>Registered On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredRegistrations.map(
                (registration) => (
                  <tr key={registration._id}>

                    <td>
                      <div className="erm-student">

                        <div className="erm-avatar">
                          {registration.studentName
                            ?.charAt(0)
                            ?.toUpperCase() || "S"}
                        </div>

                        <div>
                          <strong>
                            {registration.studentName}
                          </strong>

                          <span>
                            Section{" "}
                            {registration.section ||
                              "-"}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div className="erm-event-name">
                        <CalendarDays
                          size={15}
                        />

                        <span>
                          {registration.eventTitle ||
                            "-"}
                        </span>
                      </div>
                    </td>

                    <td>
                      {registration.className ||
                        "-"}
                    </td>

                    <td>
                      {registration.rollNumber ||
                        "-"}
                    </td>

                    <td>
                      <div className="erm-contact">

                        <span>
                          <Mail size={14} />

                          {registration.email ||
                            "-"}
                        </span>

                        <span>
                          <Phone size={14} />

                          {registration.phone ||
                            "-"}
                        </span>

                      </div>
                    </td>

                    <td>
                      {formatDate(
                        registration.createdAt
                      )}
                    </td>

                    <td>
                      <div className="erm-actions">

                        <button
                          type="button"
                          className="erm-view-btn"
                          title="View Details"
                          onClick={() =>
                            setSelectedRegistration(
                              registration
                            )
                          }
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          className="erm-delete-btn"
                          title="Delete Registration"
                          onClick={() =>
                            handleDelete(
                              registration._id
                            )
                          }
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>
        )}

      </div>

      {/* ==============================
          DETAILS MODAL
      ============================== */}
      {selectedRegistration && (
        <div
          className="erm-modal-overlay"
          onClick={() =>
            setSelectedRegistration(null)
          }
        >

          <div
            className="erm-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="erm-modal-header">

              <div>
                <span>
                  EVENT REGISTRATION
                </span>

                <h2>
                  Student Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRegistration(null)
                }
              >
                <X size={21} />
              </button>

            </div>

            <div className="erm-detail-grid">

              <div className="erm-detail-item full">
                <span>
                  Event
                </span>

                <strong>
                  {
                    selectedRegistration.eventTitle
                  }
                </strong>
              </div>

              <div className="erm-detail-item">
                <span>
                  Student Name
                </span>

                <strong>
                  {
                    selectedRegistration.studentName
                  }
                </strong>
              </div>

              <div className="erm-detail-item">
                <span>
                  Class
                </span>

                <strong>
                  {
                    selectedRegistration.className
                  }
                </strong>
              </div>

              <div className="erm-detail-item">
                <span>
                  Section
                </span>

                <strong>
                  {
                    selectedRegistration.section
                  }
                </strong>
              </div>

              <div className="erm-detail-item">
                <span>
                  Roll Number
                </span>

                <strong>
                  {
                    selectedRegistration.rollNumber
                  }
                </strong>
              </div>

              <div className="erm-detail-item">
                <span>
                  Email
                </span>

                <strong>
                  {
                    selectedRegistration.email
                  }
                </strong>
              </div>

              <div className="erm-detail-item">
                <span>
                  Phone
                </span>

                <strong>
                  {
                    selectedRegistration.phone
                  }
                </strong>
              </div>

              <div className="erm-detail-item full">
                <span>
                  Additional Information
                </span>

                <p>
                  {selectedRegistration.message ||
                    "No additional information provided."}
                </p>
              </div>

              <div className="erm-detail-item">
                <span>
                  Registered On
                </span>

                <strong>
                  {formatDate(
                    selectedRegistration.createdAt
                  )}
                </strong>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EventRegistrationManagement;
