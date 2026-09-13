
import { useEffect, useState } from "react";

import {
  Plus,
  X,
  Edit,
  Trash2,
  Users,
  Search,
} from "lucide-react";

import "./Dashboard.css";

const API_URL = "http://localhost:5000/api/admin/students";

/* =====================================================
   EMPTY FORM
===================================================== */

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  studentId: "",
  rollNumber: "",
  className: "",
  section: "",
  gender: "",
  dateOfBirth: "",
  fatherName: "",
  motherName: "",
  address: "",
};

/* =====================================================
   STUDENTS MANAGEMENT
===================================================== */

const StudentsManagement = () => {
  const [students, setStudents] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [formData, setFormData] =
    useState(emptyForm);

  /* =====================================================
     GET TOKEN
  ===================================================== */

  const getToken = () => {
    return localStorage.getItem("token");
  };

  /* =====================================================
     FETCH STUDENTS
  ===================================================== */

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const token = getToken();

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch students"
        );
      }

      /*
        Backend response:

        {
          success: true,
          students: [...]
        }
      */

      setStudents(
        Array.isArray(data.students)
          ? data.students
          : Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch Students Error:",
        error
      );

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOAD STUDENTS
  ===================================================== */

  useEffect(() => {
    fetchStudents();
  }, []);

  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     OPEN ADD STUDENT FORM
  ===================================================== */

  const handleAddStudent = () => {
    setEditingStudent(null);

    setFormData({
      ...emptyForm,
    });

    setShowForm(true);
  };

  /* =====================================================
     OPEN EDIT FORM
  ===================================================== */

  const handleEditStudent = (student) => {
    /*
      Currently your adminRoutes.js does not have:

      PUT /api/admin/students/:id

      So editing is not connected to backend yet.

      We keep the form ready, but backend update route
      will be added separately.
    */

    const user = student.user || {};

    setEditingStudent(student);

    setFormData({
      name: user.name || student.name || "",
      email:
        user.email ||
        student.email ||
        "",
      phone:
        user.phone ||
        student.phone ||
        "",

      studentId:
        student.studentId || "",

      rollNumber:
        student.rollNumber || "",

      className:
        student.className ||
        student.class ||
        "",

      section:
        student.section || "",

      gender:
        student.gender || "",

      dateOfBirth: student.dateOfBirth
        ? String(
            student.dateOfBirth
          ).split("T")[0]
        : "",

      fatherName:
        student.fatherName || "",

      motherName:
        student.motherName || "",

      address:
        student.address || "",
    });

    setShowForm(true);
  };

  /* =====================================================
     SUBMIT STUDENT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* -----------------------------------------------
         FRONTEND VALIDATION
      ------------------------------------------------ */

      if (!formData.name.trim()) {
        alert("Please enter student name.");
        return;
      }

      if (!formData.email.trim()) {
        alert("Please enter student email.");
        return;
      }

      if (!formData.studentId.trim()) {
        alert("Please enter student ID.");
        return;
      }

      setSaving(true);

      const token = getToken();

      /*
        IMPORTANT:

        Backend expects:

        name
        email
        phone
        studentId
        className
        section
        rollNumber
        dateOfBirth
        gender
        fatherName
        motherName
        address
      */

      const payload = {
        name: formData.name.trim(),

        email: formData.email
          .trim()
          .toLowerCase(),

        phone: formData.phone.trim(),

        studentId:
          formData.studentId.trim(),

        className:
          formData.className.trim(),

        section:
          formData.section.trim(),

        rollNumber:
          formData.rollNumber.trim(),

        dateOfBirth:
          formData.dateOfBirth || null,

        gender:
          formData.gender.trim(),

        fatherName:
          formData.fatherName.trim(),

        motherName:
          formData.motherName.trim(),

        address:
          formData.address.trim(),
      };

      /*
        ------------------------------------------------
        ADD STUDENT
        ------------------------------------------------
      */

      if (!editingStudent) {
        const response = await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to add student"
          );
        }

        alert(
          "Student added successfully!"
        );
      }

      /*
        ------------------------------------------------
        EDIT STUDENT
        ------------------------------------------------

        NOTE:
        Your current adminRoutes.js does not contain
        PUT /students/:id.

        Therefore edit is temporarily disabled.
      */

      if (editingStudent) {
        alert(
          "Student edit API is not connected yet. Add the PUT route first."
        );

        return;
      }

      /* -----------------------------------------------
         CLOSE FORM
      ------------------------------------------------ */

      setShowForm(false);

      setEditingStudent(null);

      setFormData({
        ...emptyForm,
      });

      /* -----------------------------------------------
         REFRESH STUDENTS
      ------------------------------------------------ */

      await fetchStudents();

      /* -----------------------------------------------
         REFRESH ADMIN DASHBOARD COUNT
      ------------------------------------------------ */

      window.dispatchEvent(
        new Event("studentsUpdated")
      );
    } catch (error) {
      console.error(
        "Save Student Error:",
        error
      );

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     DELETE STUDENT
  ===================================================== */

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete student"
        );
      }

      alert(
        "Student deleted successfully!"
      );

      await fetchStudents();

      window.dispatchEvent(
        new Event("studentsUpdated")
      );
    } catch (error) {
      console.error(
        "Delete Student Error:",
        error
      );

      alert(error.message);
    }
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredStudents =
    students.filter((student) => {
      const user = student.user || {};

      const searchText =
        search.toLowerCase();

      return (
        (
          user.name ||
          student.name ||
          ""
        )
          .toLowerCase()
          .includes(searchText) ||

        (
          user.email ||
          student.email ||
          ""
        )
          .toLowerCase()
          .includes(searchText) ||

        (
          student.studentId ||
          ""
        )
          .toLowerCase()
          .includes(searchText) ||

        (
          student.rollNumber ||
          ""
        )
          .toLowerCase()
          .includes(searchText) ||

        (
          student.className ||
          student.class ||
          ""
        )
          .toLowerCase()
          .includes(searchText)
      );
    });

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="panel-header">

        <div>
          <h2>
            Students Management
          </h2>

          <span>
            Add and manage school students
          </span>
        </div>

        <button
          type="button"
          className="dashboard-primary-btn"
          onClick={handleAddStudent}
        >
          <Plus size={17} />

          Add Student
        </button>

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "18px",
        }}
      >

        <div
          style={{
            position: "relative",
            width: "300px",
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
              color: "#94a3b8",
            }}
          />

          <input
            type="text"
            className="dashboard-search"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              paddingLeft: "36px",
            }}
          />

        </div>

      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="dashboard-loading">
          <div className="dashboard-spinner"></div>
        </div>
      )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {!loading &&
        filteredStudents.length === 0 && (
          <div className="dashboard-empty-state">

            <Users size={45} />

            <h3>
              No Students Found
            </h3>

            <p>
              Add your first student
              to the system.
            </p>

            <button
              type="button"
              className="dashboard-primary-btn"
              onClick={handleAddStudent}
            >
              <Plus size={16} />

              Add Student
            </button>

          </div>
        )}

      {/* =================================================
          STUDENT TABLE
      ================================================= */}

      {!loading &&
        filteredStudents.length > 0 && (
          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Roll No.</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.map(
                  (student) => {
                    const user =
                      student.user || {};

                    const studentName =
                      user.name ||
                      student.name ||
                      "-";

                    const studentEmail =
                      user.email ||
                      student.email ||
                      "-";

                    const studentPhone =
                      user.phone ||
                      student.phone ||
                      "-";

                    return (
                      <tr
                        key={student._id}
                      >

                        {/* STUDENT */}

                        <td>
                          <strong>
                            {studentName}
                          </strong>

                          <div
                            style={{
                              color:
                                "#94a3b8",
                              fontSize:
                                "12px",
                              marginTop:
                                "4px",
                            }}
                          >
                            {studentEmail}
                          </div>
                        </td>

                        {/* STUDENT ID */}

                        <td>
                          {student.studentId ||
                            "-"}
                        </td>

                        {/* ROLL NUMBER */}

                        <td>
                          {student.rollNumber ||
                            "-"}
                        </td>

                        {/* CLASS */}

                        <td>
                          {student.className ||
                            student.class ||
                            "-"}
                        </td>

                        {/* SECTION */}

                        <td>
                          {student.section ||
                            "-"}
                        </td>

                        {/* PHONE */}

                        <td>
                          {studentPhone}
                        </td>

                        {/* ACTIONS */}

                        <td>
                          <div className="dashboard-action-group">

                            <button
                              type="button"
                              className="dashboard-action-btn"
                              onClick={() =>
                                handleEditStudent(
                                  student
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
                                  student._id
                                )
                              }
                            >
                              <Trash2 size={14} />
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

          </div>
        )}

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

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
            zIndex: 2000,
          }}
        >

          <div
            style={{
              width: "100%",
              maxWidth: "750px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "25px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.18)",
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                marginBottom: "22px",
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                    color: "#172033",
                    fontSize: "20px",
                  }}
                >
                  {editingStudent
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  {editingStudent
                    ? "Update student information"
                    : "Enter student information"}
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
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "8px",
                  background: "#f1f5f9",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <X size={19} />
              </button>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              className="dashboard-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="dashboard-form-group">

                <label>
                  Student Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="dashboard-form-group">

                <label>
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter student email"
                  required
                />

              </div>

              {/* STUDENT ID */}

              <div className="dashboard-form-group">

                <label>
                  Student ID *
                </label>

                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. STU-001"
                  required
                />

              </div>

              {/* PHONE */}

              <div className="dashboard-form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              </div>

              {/* ROLL NUMBER */}

              <div className="dashboard-form-group">

                <label>
                  Roll Number
                </label>

                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="e.g. 101"
                />

              </div>

              {/* CLASS */}

              <div className="dashboard-form-group">

                <label>
                  Class *
                </label>

                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Class
                  </option>

                  <option value="PG">
                    PG
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

                  <option value="1">
                    Class 1
                  </option>

                  <option value="2">
                    Class 2
                  </option>

                  <option value="3">
                    Class 3
                  </option>

                  <option value="4">
                    Class 4
                  </option>

                  <option value="5">
                    Class 5
                  </option>

                  <option value="6">
                    Class 6
                  </option>

                  <option value="7">
                    Class 7
                  </option>

                  <option value="8">
                    Class 8
                  </option>

                </select>

              </div>

              {/* SECTION */}

              <div className="dashboard-form-group">

                <label>
                  Section
                </label>

                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Section
                  </option>

                  <option value="A">
                    A
                  </option>

                  <option value="B">
                    B
                  </option>

                  <option value="C">
                    C
                  </option>

                  <option value="D">
                    D
                  </option>

                </select>

              </div>

              {/* GENDER */}

              <div className="dashboard-form-group">

                <label>
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

              {/* DATE OF BIRTH */}

              <div className="dashboard-form-group">

                <label>
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    formData.dateOfBirth
                  }
                  onChange={handleChange}
                />

              </div>

              {/* FATHER NAME */}

              <div className="dashboard-form-group">

                <label>
                  Father / Guardian Name
                </label>

                <input
                  type="text"
                  name="fatherName"
                  value={
                    formData.fatherName
                  }
                  onChange={handleChange}
                  placeholder="Enter father/guardian name"
                />

              </div>

              {/* MOTHER NAME */}

              <div className="dashboard-form-group">

                <label>
                  Mother Name
                </label>

                <input
                  type="text"
                  name="motherName"
                  value={
                    formData.motherName
                  }
                  onChange={handleChange}
                  placeholder="Enter mother name"
                />

              </div>

              {/* ADDRESS */}

              <div className="dashboard-form-group full">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter student address"
                  rows="3"
                />

              </div>

              {/* BUTTONS */}

              <div
                className="dashboard-form-group full"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent:
                    "flex-end",
                  gap: "10px",
                  marginTop: "5px",
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
                      "10px 16px",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="dashboard-primary-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingStudent
                    ? "Update Student"
                    : "Add Student"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default StudentsManagement;
