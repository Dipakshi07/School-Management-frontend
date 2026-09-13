import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Edit,
  Trash2,
  Bell,
  CalendarDays,
  Clock,
  MapPin,
  Search
} from "lucide-react";

const API_URL = "https://school-management-backend-jcoe.onrender.com/api/notices";

const NoticesManagement = () => {
  const [notices, setNotices] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingNotice, setEditingNotice] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    date: "",
    time: "",
    venue: "",
    lastDate: "",
    category: "Announcement",
    isActive: true
  });


  /* ==========================================
     GET TOKEN
  ========================================== */

  const getToken = () => {
    return localStorage.getItem("token");
  };


  /* ==========================================
     FETCH NOTICES
  ========================================== */

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch notices"
        );
      }

      setNotices(data);

    } catch (error) {
      console.error(
        "Fetch Notices Error:",
        error
      );

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };


  /* ==========================================
     LOAD NOTICES
  ========================================== */

  useEffect(() => {
    fetchNotices();
  }, []);


  /* ==========================================
     INPUT CHANGE
  ========================================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value
    }));
  };


  /* ==========================================
     OPEN ADD FORM
  ========================================== */

  const handleAddNotice = () => {
    setEditingNotice(null);

    setFormData({
      title: "",
      description: "",
      details: "",
      date: "",
      time: "",
      venue: "",
      lastDate: "",
      category: "Announcement",
      isActive: true
    });

    setShowForm(true);
  };


  /* ==========================================
     OPEN EDIT FORM
  ========================================== */

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);

    setFormData({
      title: notice.title || "",
      description: notice.description || "",
      details: notice.details || "",
      date: notice.date
        ? notice.date.split("T")[0]
        : "",
      time: notice.time || "",
      venue: notice.venue || "",
      lastDate: notice.lastDate || "",
      category:
        notice.category || "Announcement",
      isActive:
        notice.isActive !== undefined
          ? notice.isActive
          : true
    });

    setShowForm(true);
  };


  /* ==========================================
     SUBMIT FORM
  ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editingNotice
        ? "PUT"
        : "POST";

      const url = editingNotice
        ? `${API_URL}/${editingNotice._id}`
        : API_URL;

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${getToken()}`
        },

        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save notice"
        );
      }


      alert(
        editingNotice
          ? "Notice updated successfully!"
          : "Notice added successfully!"
      );


      setShowForm(false);

      setEditingNotice(null);

      setFormData({
        title: "",
        description: "",
        details: "",
        date: "",
        time: "",
        venue: "",
        lastDate: "",
        category: "Announcement",
        isActive: true
      });


      /*
        IMPORTANT:
        MongoDB se latest data dobara
        fetch kar rahe hain.
      */

      fetchNotices();

    } catch (error) {
      console.error(
        "Save Notice Error:",
        error
      );

      alert(error.message);
    }
  };


  /* ==========================================
     DELETE NOTICE
  ========================================== */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete notice"
        );
      }

      alert(
        "Notice deleted successfully!"
      );

      fetchNotices();

    } catch (error) {
      console.error(
        "Delete Notice Error:",
        error
      );

      alert(error.message);
    }
  };


  /* ==========================================
     SEARCH
  ========================================== */

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      notice.category
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );


  /* ==========================================
     FORMAT DATE
  ========================================== */

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(
      date
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };


  return (
    <div>

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="panel-header">

        <div>
          <h2>
            Notices Management
          </h2>

          <span>
            Create and manage school notices
          </span>
        </div>


        <button
          type="button"
          className="dashboard-primary-btn"
          onClick={handleAddNotice}
        >
          <Plus size={17} />

          Add Notice
        </button>

      </div>


      {/* =====================================
          SEARCH
      ====================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "18px"
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px"
          }}
        >
          <Search
            size={17}
            style={{
              position: "absolute",
              left: "11px",
              top: "50%",
              transform:
                "translateY(-50%)",
              color: "#94a3b8"
            }}
          />

          <input
            className="dashboard-search"
            style={{
              paddingLeft: "36px"
            }}
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>


      {/* =====================================
          LOADING
      ====================================== */}

      {loading ? (

        <div className="dashboard-loading">

          <div className="dashboard-spinner" />

        </div>

      ) : filteredNotices.length === 0 ? (

        /* ===================================
           EMPTY
        ==================================== */

        <div className="dashboard-empty-state">

          <Bell
            size={35}
          />

          <p>
            No notices found.
          </p>

          <button
            type="button"
            className="dashboard-primary-btn"
            onClick={handleAddNotice}
          >
            <Plus size={16} />
            Add Your First Notice
          </button>

        </div>

      ) : (

        /* ===================================
           TABLE
        ==================================== */

        <div className="dashboard-table-wrapper">

          <table className="dashboard-table">

            <thead>

              <tr>

                <th>
                  Notice
                </th>

                <th>
                  Category
                </th>

                <th>
                  Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredNotices.map(
                (notice) => (

                  <tr key={notice._id}>

                    <td>

                      <strong>
                        {notice.title}
                      </strong>

                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: "12px",
                          marginTop: "4px"
                        }}
                      >
                        {notice.description}
                      </div>

                    </td>


                    <td>
                      {notice.category ||
                        "Announcement"}
                    </td>


                    <td>
                      {formatDate(
                        notice.date
                      )}
                    </td>


                    <td>

                      <span
                        className={`dashboard-status ${
                          notice.isActive
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {notice.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>


                    <td>

                      <div className="dashboard-action-group">

                        <button
                          type="button"
                          className="dashboard-action-btn"
                          onClick={() =>
                            handleEditNotice(
                              notice
                            )
                          }
                        >
                          <Edit size={14} />
                          Edit
                        </button>


                        <button
                          type="button"
                          className="dashboard-action-btn delete"
                          onClick={() =>
                            handleDelete(
                              notice._id
                            )
                          }
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>
      )}


      {/* =====================================
          ADD / EDIT MODAL
      ====================================== */}

      {showForm && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 23, 42, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 2000
          }}
        >

          <div
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "25px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.18)"
            }}
          >

            {/* Modal Header */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                marginBottom: "22px"
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                    color: "#172033",
                    fontSize: "20px"
                  }}
                >
                  {editingNotice
                    ? "Edit Notice"
                    : "Add New Notice"}
                </h2>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color: "#64748b",
                    fontSize: "13px"
                  }}
                >
                  {editingNotice
                    ? "Update this school notice"
                    : "Create a new notice for the school website"}
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  border: "none",
                  borderRadius: "8px",
                  background:
                    "#f1f5f9",
                  color: "#64748b",
                  cursor: "pointer"
                }}
              >
                <X size={19} />
              </button>

            </div>


            {/* Form */}

            <form
              className="dashboard-form"
              onSubmit={handleSubmit}
            >

              {/* Title */}

              <div className="dashboard-form-group full">

                <label>
                  Notice Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter notice title"
                  required
                />

              </div>


              {/* Description */}

              <div className="dashboard-form-group full">

                <label>
                  Short Description *
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  placeholder="Enter short description"
                  required
                />

              </div>


              {/* Details */}

              <div className="dashboard-form-group full">

                <label>
                  Full Details
                </label>

                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Enter complete notice details"
                />

              </div>


              {/* Date */}

              <div className="dashboard-form-group">

                <label>
                  Notice Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Category */}

              <div className="dashboard-form-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={handleChange}
                >
                  <option value="Announcement">
                    Announcement
                  </option>

                  <option value="Event">
                    Event
                  </option>

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Holiday">
                    Holiday
                  </option>

                  <option value="Exam">
                    Exam
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Important">
                    Important
                  </option>
                </select>

              </div>


              {/* Time */}

              <div className="dashboard-form-group">

                <label>
                  Time
                </label>

                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g. 10:00 AM onwards"
                />

              </div>


              {/* Venue */}

              <div className="dashboard-form-group">

                <label>
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. School Auditorium"
                />

              </div>


              {/* Last Date */}

              <div className="dashboard-form-group">

                <label>
                  Last Date
                </label>

                <input
                  type="text"
                  name="lastDate"
                  value={
                    formData.lastDate
                  }
                  onChange={handleChange}
                  placeholder="e.g. 20 September 2026"
                />

              </div>


              {/* Active */}

              <div
                className="dashboard-form-group"
                style={{
                  justifyContent:
                    "center"
                }}
              >

                <label
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "8px",
                    cursor:
                      "pointer"
                  }}
                >

                  <input
                    type="checkbox"
                    name="isActive"
                    checked={
                      formData.isActive
                    }
                    onChange={handleChange}
                    style={{
                      width: "16px",
                      height: "16px"
                    }}
                  />

                  Show on website

                </label>

              </div>


              {/* Buttons */}

              <div
                className="dashboard-form-group full"
                style={{
                  display: "flex",
                  flexDirection:
                    "row",
                  justifyContent:
                    "flex-end",
                  gap: "10px",
                  marginTop: "5px"
                }}
              >

                <button
                  type="button"
                  className="dashboard-action-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                  style={{
                    padding:
                      "10px 16px"
                  }}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="dashboard-primary-btn"
                >
                  {editingNotice
                    ? "Update Notice"
                    : "Add Notice"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default NoticesManagement;