import { useEffect, useState } from "react";

import {
  Trophy,
  Plus,
  Trash2,
  RefreshCw,
  Award,
  CalendarDays,
  X,
  AlertCircle,
} from "lucide-react";

import "./AchievementManagement.css";

const API_URL =
  "http://localhost:5000/api/achievements";

const AchievementManagement = () => {
  const [achievements, setAchievements] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Academic",
    year: new Date().getFullYear().toString(),
    icon: "Trophy",
    image: "",
  });

  // ==========================================
  // TOKEN
  // ==========================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken")
    );
  };

  // ==========================================
  // FETCH ACHIEVEMENTS
  // ==========================================

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch achievements"
        );
      }

      setAchievements(
        data.achievements || []
      );
    } catch (error) {
      console.error(
        "Fetch Achievements Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load achievements"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD ACHIEVEMENT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found. Please login again."
        );
      }

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add achievement"
        );
      }

      setAchievements((prev) => [
        data.achievement,
        ...prev,
      ]);

      setSuccess(
        "Achievement added successfully!"
      );

      setFormData({
        title: "",
        description: "",
        category: "Academic",
        year: new Date()
          .getFullYear()
          .toString(),
        icon: "Trophy",
        image: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(
        "Add Achievement Error:",
        error
      );

      setError(
        error.message ||
          "Failed to add achievement"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // DELETE ACHIEVEMENT
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this achievement?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Please login again."
        );
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
            "Failed to delete achievement"
        );
      }

      setAchievements((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      setSuccess(
        "Achievement deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Delete Achievement Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete achievement"
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="achievement-management-loading">
        <RefreshCw
          size={30}
          className="achievement-spin"
        />

        <p>
          Loading achievements...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="achievement-management">

      {/* HEADER */}

      <div className="achievement-admin-header">

        <div>
          <div className="achievement-admin-title">
            <Trophy size={28} />

            <h1>
              Achievement Management
            </h1>
          </div>

          <p>
            Manage achievements displayed on
            the school website.
          </p>
        </div>

        <div className="achievement-header-actions">

          <button
            type="button"
            className="achievement-refresh-btn"
            onClick={fetchAchievements}
          >
            <RefreshCw size={17} />

            Refresh
          </button>

          <button
            type="button"
            className="achievement-add-btn"
            onClick={() =>
              setShowForm(true)
            }
          >
            <Plus size={18} />

            Add Achievement
          </button>

        </div>
      </div>

      {/* SUCCESS */}

      {success && (
        <div className="achievement-success">
          <Award size={19} />

          <span>{success}</span>

          <button
            type="button"
            onClick={() =>
              setSuccess("")
            }
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="achievement-error">
          <AlertCircle size={19} />

          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* FORM */}

      {showForm && (
        <div className="achievement-form-card">

          <div className="achievement-form-header">

            <div>
              <h2>
                Add New Achievement
              </h2>

              <p>
                This achievement will appear
                on the main website.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowForm(false)
              }
            >
              <X size={20} />
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="achievement-form"
          >

            <div className="achievement-form-grid">

              <div className="achievement-input-group full">
                <label>
                  Achievement Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. National Science Olympiad Winner"
                  required
                />
              </div>

              <div className="achievement-input-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>

                  <option value="Award">
                    Award
                  </option>

                  <option value="Competition">
                    Competition
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

              </div>

              <div className="achievement-input-group">

                <label>
                  Year
                </label>

                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2026"
                  required
                />

              </div>

              <div className="achievement-input-group">

                <label>
                  Icon
                </label>

                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                >
                  <option value="Trophy">
                    Trophy
                  </option>

                  <option value="Award">
                    Award
                  </option>

                  <option value="Medal">
                    Medal
                  </option>

                  <option value="Star">
                    Star
                  </option>

                  <option value="GraduationCap">
                    Graduation Cap
                  </option>
                </select>

              </div>

              <div className="achievement-input-group">

                <label>
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Optional image URL"
                />

              </div>

              <div className="achievement-input-group full">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  placeholder="Describe the achievement..."
                  rows="5"
                  required
                />

              </div>

            </div>

            <div className="achievement-form-actions">

              <button
                type="button"
                className="achievement-cancel-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="achievement-submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <RefreshCw
                      size={17}
                      className="achievement-spin"
                    />

                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={17} />

                    Add Achievement
                  </>
                )}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* STATS */}

      <div className="achievement-admin-stats">

        <div className="achievement-stat-card">

          <div className="achievement-stat-icon">
            <Trophy size={23} />
          </div>

          <div>
            <span>
              Total Achievements
            </span>

            <strong>
              {achievements.length}
            </strong>
          </div>

        </div>

        <div className="achievement-stat-card">

          <div className="achievement-stat-icon">
            <Award size={23} />
          </div>

          <div>
            <span>
              Categories
            </span>

            <strong>
              {
                new Set(
                  achievements.map(
                    (item) => item.category
                  )
                ).size
              }
            </strong>
          </div>

        </div>

        <div className="achievement-stat-card">

          <div className="achievement-stat-icon">
            <CalendarDays size={23} />
          </div>

          <div>
            <span>
              Latest Year
            </span>

            <strong>
              {achievements.length
                ? achievements[0].year
                : "-"}
            </strong>
          </div>

        </div>

      </div>

      {/* ACHIEVEMENT LIST */}

      {achievements.length === 0 ? (
        <div className="achievement-empty">

          <Trophy size={50} />

          <h3>
            No Achievements Found
          </h3>

          <p>
            Add your first achievement to
            display it on the website.
          </p>

          <button
            type="button"
            onClick={() =>
              setShowForm(true)
            }
          >
            <Plus size={17} />

            Add Achievement
          </button>

        </div>
      ) : (
        <div className="achievement-admin-grid">

          {achievements.map(
            (achievement) => (
              <div
                className="achievement-admin-card"
                key={achievement._id}
              >

                <div className="achievement-card-top">

                  <div className="achievement-card-icon">
                    <Trophy size={25} />
                  </div>

                  <button
                    type="button"
                    className="achievement-delete-btn"
                    onClick={() =>
                      handleDelete(
                        achievement._id
                      )
                    }
                    title="Delete Achievement"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

                <span className="achievement-category">
                  {achievement.category}
                </span>

                <h3>
                  {achievement.title}
                </h3>

                <p>
                  {achievement.description}
                </p>

                <div className="achievement-card-footer">

                  <span>
                    <CalendarDays
                      size={15}
                    />

                    {achievement.year}
                  </span>

                  <span>
                    <Award size={15} />

                    Achievement
                  </span>

                </div>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
};

export default AchievementManagement;