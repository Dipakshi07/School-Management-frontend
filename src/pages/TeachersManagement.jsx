
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  User,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Briefcase,
  MapPin,
  Users,
} from "lucide-react";

import "./TeacherManagement.css";

const API_URL = "http://localhost:5000/api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  employeeId: "",
  subject: "",
  qualification: "",
  experience: "",
  department: "",
  gender: "",
  address: "",
};

const TeachersManagement = ({ onTeacherAdded }) => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ ...emptyForm });

  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= GET TOKEN =================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // ================= SAFE STRING =================
  // Backend se agar number/null/object aaye to bhi crash nahi hoga.

  const safeString = (value) => {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  };

  // ================= FETCH RESPONSE =================

  const getResponseData = async (response) => {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();

    return {
      message:
        text || `Server error (${response.status})`,
    };
  };

  // ================= FETCH TEACHERS =================

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(
        `${API_URL}/admin/teachers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to load teachers (${response.status})`
        );
      }

      setTeachers(
        Array.isArray(data.teachers)
          ? data.teachers
          : Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error("Fetch Teachers Error:", err);

      setError(
        err.message || "Failed to load teachers"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= OPEN ADD MODAL =================

  const openAddModal = () => {
    setEditingTeacher(null);

    setFormData({
      ...emptyForm,
    });

    setError("");
    setSuccess("");

    setShowModal(true);
  };

  // ================= OPEN EDIT MODAL =================

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);

    const user = teacher?.user || {};

    setFormData({
      name: safeString(
        user.name || teacher.name
      ),

      email: safeString(
        user.email || teacher.email
      ),

      phone: safeString(
        user.phone || teacher.phone
      ),

      employeeId: safeString(
        teacher.employeeId
      ),

      subject: safeString(
        teacher.subject
      ),

      qualification: safeString(
        teacher.qualification
      ),

      // IMPORTANT:
      // Backend me experience number ho sakta hai.
      // Isliye String() conversion zaroori hai.
      experience: safeString(
        teacher.experience
      ),

      department: safeString(
        teacher.department
      ),

      gender: safeString(
        teacher.gender
      ),

      address: safeString(
        teacher.address
      ),
    });

    setError("");
    setSuccess("");

    setShowModal(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingTeacher(null);

    setFormData({
      ...emptyForm,
    });

    setError("");
    setSuccess("");
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Convert every field safely to string.
    // This prevents .trim() errors when backend
    // previously returned numbers.

    const name = safeString(formData.name).trim();
    const email = safeString(formData.email).trim();
    const phone = safeString(formData.phone).trim();
    const employeeId = safeString(
      formData.employeeId
    ).trim();

    const subject = safeString(
      formData.subject
    ).trim();

    const qualification = safeString(
      formData.qualification
    ).trim();

    const experience = safeString(
      formData.experience
    ).trim();

    const department = safeString(
      formData.department
    ).trim();

    const address = safeString(
      formData.address
    ).trim();

    const gender = safeString(
      formData.gender
    ).trim();

    // ================= VALIDATION =================

    if (!name) {
      setError("Teacher name is required");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    // Basic email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      // ================= PAYLOAD =================

      const payload = {
        name,
        email,
        phone,
        employeeId,
        subject,
        qualification,
        experience,
        department,
        gender,
        address,
      };

      console.log(
        "Teacher Payload:",
        payload
      );

      // ================= URL + METHOD =================

      let url = `${API_URL}/admin/teachers`;
      let method = "POST";

      // ================= EDIT =================

      if (editingTeacher) {
        if (!editingTeacher._id) {
          throw new Error(
            "Teacher ID is missing. Cannot update teacher."
          );
        }

        url = `${API_URL}/admin/teachers/${editingTeacher._id}`;
        method = "PUT";
      }

      // ================= API REQUEST =================

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      const data = await getResponseData(response);

      console.log(
        "Teacher API Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            (editingTeacher
              ? `Failed to update teacher (${response.status})`
              : `Failed to add teacher (${response.status})`)
        );
      }

      // ================= SUCCESS =================

      setSuccess(
        editingTeacher
          ? "Teacher updated successfully!"
          : "Teacher added successfully!"
      );

      // ================= REFRESH LIST =================

      await fetchTeachers();

      // ================= PARENT DASHBOARD REFRESH =================

      if (onTeacherAdded) {
        onTeacherAdded();
      }

      // ================= RESET =================

      setFormData({
        ...emptyForm,
      });

      setEditingTeacher(null);

      // ================= CLOSE MODAL =================

      setTimeout(() => {
        setShowModal(false);
        setSuccess("");
      }, 700);
    } catch (err) {
      console.error(
        editingTeacher
          ? "Update Teacher Error:"
          : "Save Teacher Error:",
        err
      );

      setError(
        err.message ||
          (editingTeacher
            ? "Failed to update teacher"
            : "Failed to add teacher")
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (teacher) => {
    const user = teacher?.user || {};

    const teacherName =
      safeString(
        user.name ||
          teacher.name ||
          "this teacher"
      );

    const confirmed = window.confirm(
      `Are you sure you want to delete ${teacherName}?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      if (!teacher?._id) {
        throw new Error(
          "Teacher ID is missing. Cannot delete teacher."
        );
      }

      const token = getToken();

      const response = await fetch(
        `${API_URL}/admin/teachers/${teacher._id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to delete teacher (${response.status})`
        );
      }

      setSuccess(
        "Teacher deleted successfully!"
      );

      // Refresh teacher list
      await fetchTeachers();

      // Refresh dashboard
      if (onTeacherAdded) {
        onTeacherAdded();
      }
    } catch (err) {
      console.error(
        "Delete Teacher Error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete teacher"
      );
    }
  };

  // ================= SEARCH =================

  const filteredTeachers = teachers.filter(
    (teacher) => {
      const user = teacher?.user || {};

      const name = safeString(
        user.name || teacher.name
      ).toLowerCase();

      const email = safeString(
        user.email || teacher.email
      ).toLowerCase();

      const subject = safeString(
        teacher.subject
      ).toLowerCase();

      const employeeId = safeString(
        teacher.employeeId
      ).toLowerCase();

      const search =
        safeString(searchTerm)
          .toLowerCase()
          .trim();

      return (
        name.includes(search) ||
        email.includes(search) ||
        subject.includes(search) ||
        employeeId.includes(search)
      );
    }
  );

  // ================= JSX =================

  return (
    <div className="teachers-management">

      {/* ================= HEADER ================= */}

      <div className="management-header">
        <div>
          <h2>Teachers Management</h2>

          <p>
            Add, edit and manage all teachers
          </p>
        </div>

        <button
          className="dashboard-primary-btn"
          onClick={openAddModal}
          type="button"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      {/* ================= MESSAGES ================= */}

      {error && (
        <div className="management-message error">
          {error}
        </div>
      )}

      {success && (
        <div className="management-message success">
          {success}
        </div>
      )}

      {/* ================= SEARCH ================= */}

      <div className="management-toolbar">

        <div className="management-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by name, email, subject or employee ID..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="teacher-count">
          {filteredTeachers.length} Teachers
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="dashboard-table-wrapper">

        {loading ? (
          <div className="dashboard-loading">

            <div className="dashboard-spinner"></div>

            <p>
              Loading teachers...
            </p>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="empty-state">

            <Users size={45} />

            <h3>
              No Teachers Found
            </h3>

            <p>
              {searchTerm
                ? "No teacher matches your search."
                : "Add your first teacher to get started."}
            </p>
          </div>
        ) : (
          <table className="dashboard-table">

            <thead>
              <tr>
                <th>Teacher</th>
                <th>Employee ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredTeachers.map(
                (teacher) => {
                  const user =
                    teacher?.user || {};

                  const teacherName =
                    safeString(
                      user.name ||
                        teacher.name ||
                        "N/A"
                    );

                  const email =
                    safeString(
                      user.email ||
                        teacher.email ||
                        "N/A"
                    );

                  const phone =
                    safeString(
                      user.phone ||
                        teacher.phone ||
                        "N/A"
                    );

                  const experience =
                    safeString(
                      teacher.experience
                    );

                  return (
                    <tr
                      key={teacher._id}
                    >

                      {/* NAME */}

                      <td>
                        <div className="teacher-name-cell">

                          <div className="teacher-avatar">
                            {teacherName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {teacherName}
                            </strong>

                            <span>
                              {safeString(
                                teacher.department
                              ) || "Faculty"}
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* EMPLOYEE ID */}

                      <td>
                        <span className="employee-id">
                          {safeString(
                            teacher.employeeId
                          ) || "N/A"}
                        </span>
                      </td>

                      {/* EMAIL */}

                      <td>
                        <div className="table-contact">
                          <Mail size={14} />

                          {email}
                        </div>
                      </td>

                      {/* PHONE */}

                      <td>
                        <div className="table-contact">
                          <Phone size={14} />

                          {phone}
                        </div>
                      </td>

                      {/* SUBJECT */}

                      <td>
                        {safeString(
                          teacher.subject
                        ) || "N/A"}
                      </td>

                      {/* QUALIFICATION */}

                      <td>
                        {safeString(
                          teacher.qualification
                        ) || "N/A"}
                      </td>

                      {/* EXPERIENCE */}

                      <td>
                        {experience || "N/A"}
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="dashboard-action-group">

                          {/* EDIT */}

                          <button
                            type="button"
                            className="dashboard-action-btn edit"
                            onClick={() =>
                              handleEdit(
                                teacher
                              )
                            }
                            title="Edit Teacher"
                          >
                            <Edit size={16} />
                            Edit
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            className="dashboard-action-btn delete"
                            onClick={() =>
                              handleDelete(
                                teacher
                              )
                            }
                            title="Delete Teacher"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <div
          className="teacher-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="teacher-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="teacher-modal-header">

              <div>
                <h3>
                  {editingTeacher
                    ? "Edit Teacher"
                    : "Add New Teacher"}
                </h3>

                <p>
                  {editingTeacher
                    ? "Update teacher information"
                    : "Enter teacher information"}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={closeModal}
                disabled={saving}
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              className="teacher-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="form-group">

                <label>
                  <User size={15} />
                  Teacher Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter teacher name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label>
                  <Mail size={15} />
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="teacher@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PHONE */}

              <div className="form-group">

                <label>
                  <Phone size={15} />
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              {/* EMPLOYEE ID */}

              <div className="form-group">

                <label>
                  <Briefcase size={15} />
                  Employee ID
                </label>

                <input
                  type="text"
                  name="employeeId"
                  placeholder={
                    editingTeacher
                      ? "Employee ID"
                      : "Leave blank for auto generation"
                  }
                  value={
                    formData.employeeId
                  }
                  onChange={handleChange}
                />

              </div>

              {/* SUBJECT */}

              <div className="form-group">

                <label>
                  <BookOpen size={15} />
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Mathematics"
                  value={formData.subject}
                  onChange={handleChange}
                />

              </div>

              {/* QUALIFICATION */}

              <div className="form-group">

                <label>
                  <GraduationCap size={15} />
                  Qualification
                </label>

                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g. M.Sc, B.Ed"
                  value={
                    formData.qualification
                  }
                  onChange={handleChange}
                />

              </div>

              {/* EXPERIENCE */}

              <div className="form-group">

                <label>
                  <Briefcase size={15} />
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  placeholder="e.g. 5 Years"
                  value={
                    formData.experience
                  }
                  onChange={handleChange}
                />

              </div>

              {/* DEPARTMENT */}

              <div className="form-group">

                <label>
                  <BookOpen size={15} />
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Science"
                  value={
                    formData.department
                  }
                  onChange={handleChange}
                />

              </div>

              {/* GENDER */}

              <div className="form-group">

                <label>
                  <Users size={15} />
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
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

              {/* ADDRESS */}

              <div className="form-group full-width">

                <label>
                  <MapPin size={15} />
                  Address
                </label>

                <textarea
                  name="address"
                  rows="3"
                  placeholder="Enter teacher address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

              {/* ERROR */}

              {error && (
                <div className="form-error full-width">
                  {error}
                </div>
              )}

              {/* BUTTONS */}

              <div className="form-actions full-width">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingTeacher
                    ? "Update Teacher"
                    : "Add Teacher"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersManagement;
