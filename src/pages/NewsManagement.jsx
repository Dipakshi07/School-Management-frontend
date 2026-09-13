import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  Newspaper,
  CalendarDays,
  Trophy,
  GraduationCap,
  Megaphone,
  X,
  RefreshCw,
} from "lucide-react";

import "./NewsManagement.css";

const API_URL = "https://school-management-backend-jcoe.onrender.com/api/news";

const getNewsIcon = (category) => {
  switch (category) {
    case "Academic":
      return GraduationCap;

    case "Event":
      return Megaphone;

    case "Achievement":
      return Trophy;

    default:
      return Newspaper;
  }
};

const NewsManagement = ({ onNewsUpdated }) => {
  const [news, setNews] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "Announcement",
    description: "",
  });

  // ==========================================
  // GET NEWS
  // ==========================================

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch news"
        );
      }

      setNews(Array.isArray(data) ? data : data.news || []);
    } catch (error) {
      console.error("Fetch News Error:", error);

      setError(
        error.message ||
          "Unable to load news."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH NEWS WHEN COMPONENT LOADS
  // ==========================================

  useEffect(() => {
    fetchNews();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD NEWS
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.date ||
      !formData.description.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      // ======================================
      // GET ADMIN TOKEN
      // ======================================

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      if (!token) {
        alert(
          "Admin session not found. Please login again."
        );

        return;
      }

      // ======================================
      // SEND NEWS TO BACKEND
      // ======================================

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: formData.title.trim(),

          description:
            formData.description.trim(),

          category: formData.category,

          date: formData.date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add news"
        );
      }

      // ======================================
      // RESET FORM
      // ======================================

      setFormData({
        title: "",
        date: "",
        category: "Announcement",
        description: "",
      });

      setShowForm(false);

      // ======================================
      // REFRESH NEWS FROM DATABASE
      // ======================================

      await fetchNews();

      // Update dashboard stats if provided
      if (onNewsUpdated) {
        onNewsUpdated();
      }

      alert("News added successfully!");
    } catch (error) {
      console.error(
        "Add News Error:",
        error
      );

      setError(
        error.message ||
          "Failed to add news."
      );

      alert(
        error.message ||
          "Failed to add news."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // DELETE NEWS
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      if (!token) {
        alert(
          "Admin session not found. Please login again."
        );

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
            "Failed to delete news"
        );
      }

      // Remove from UI
      setNews((previousNews) =>
        previousNews.filter(
          (item) => item._id !== id
        )
      );

      // Update dashboard stats
      if (onNewsUpdated) {
        onNewsUpdated();
      }

      alert("News deleted successfully!");
    } catch (error) {
      console.error(
        "Delete News Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete news."
      );

      alert(
        error.message ||
          "Failed to delete news."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    // If backend already sends formatted date
    if (
      date.includes("September") ||
      date.includes("January") ||
      date.includes("February") ||
      date.includes("March") ||
      date.includes("April") ||
      date.includes("May") ||
      date.includes("June") ||
      date.includes("July") ||
      date.includes("August") ||
      date.includes("October") ||
      date.includes("November") ||
      date.includes("December")
    ) {
      return date;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <div className="news-management">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="news-management-header">

        <div className="news-management-title">

          <div className="news-management-icon">
            <Newspaper size={24} />
          </div>

          <div>
            <h2>News Management</h2>

            <p>
              Add, manage and remove school news
              and announcements.
            </p>
          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >

          <button
            type="button"
            className="add-news-btn"
            onClick={fetchNews}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "news-refresh-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            className="add-news-btn"
            onClick={() =>
              setShowForm(
                (previous) => !previous
              )
            }
          >
            {showForm ? (
              <>
                <X size={17} />
                Close
              </>
            ) : (
              <>
                <Plus size={17} />
                Add News
              </>
            )}
          </button>

        </div>

      </div>

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#b91c1c",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* ======================================
          ADD NEWS FORM
      ====================================== */}

      {showForm && (
        <form
          className="news-form"
          onSubmit={handleSubmit}
        >

          <h3>Add Latest News</h3>

          <div className="news-form-grid">

            {/* TITLE */}

            <div className="news-form-group full">

              <label htmlFor="title">
                News Title *
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter news title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            {/* DATE */}

            <div className="news-form-group">

              <label htmlFor="date">
                News Date *
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />

            </div>

            {/* CATEGORY */}

            <div className="news-form-group">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                <option value="Announcement">
                  Announcement
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Event">
                  Event
                </option>

                <option value="Achievement">
                  Achievement
                </option>

                <option value="Notice">
                  Notice
                </option>

                <option value="School News">
                  School News
                </option>

              </select>

            </div>

            {/* DESCRIPTION */}

            <div className="news-form-group full">

              <label htmlFor="description">
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Write a short description about the news..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* FORM BUTTONS */}

          <div className="news-form-actions">

            <button
              type="button"
              className="cancel-news-btn"
              onClick={() =>
                setShowForm(false)
              }
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-news-btn"
              disabled={submitting}
            >

              <Plus size={16} />

              {submitting
                ? "Adding..."
                : "Add News"}

            </button>

          </div>

        </form>
      )}

      {/* ======================================
          LOADING
      ====================================== */}

      {loading ? (
        <div className="news-empty">

          <RefreshCw
            size={40}
            className="news-refresh-spin"
          />

          <h3>Loading News...</h3>

          <p>
            Please wait while news is being
            loaded from the database.
          </p>

        </div>
      ) : news.length === 0 ? (

        /* ====================================
           EMPTY
        ==================================== */

        <div className="news-empty">

          <Newspaper size={40} />

          <h3>No News Available</h3>

          <p>
            Add your first school news or
            announcement.
          </p>

        </div>

      ) : (

        /* ====================================
           NEWS LIST
        ==================================== */

        <div className="admin-news-list">

          {news.map((item) => {

            const Icon = getNewsIcon(
              item.category
            );

            return (
              <div
                className="admin-news-card"
                key={item._id}
              >

                <div className="admin-news-info">

                  <div className="admin-news-icon">
                    <Icon size={20} />
                  </div>

                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    <div className="admin-news-date">

                      <CalendarDays
                        size={13}
                      />

                      <span>
                        {formatDate(
                          item.date
                        )}

                        {" • "}

                        {item.category}
                      </span>

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="delete-news-btn"
                  onClick={() =>
                    handleDelete(
                      item._id
                    )
                  }
                  disabled={
                    deletingId ===
                    item._id
                  }
                >

                  <Trash2 size={16} />

                  {deletingId === item._id
                    ? "Deleting..."
                    : "Delete"}

                </button>

              </div>
            );

          })}

        </div>

      )}

    </div>
  );
};

export default NewsManagement;