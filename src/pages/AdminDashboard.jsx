import { useEffect, useState } from "react";

import {
  Users,
  UserRoundCheck,
  GraduationCap,
  Bell,
  Newspaper,
  CalendarCheck,
  Trophy,
  Images,
  Mail,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";

import "./Dashboard.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// Management Components
import NoticesManagement from "./NoticesManagement";
import StudentsManagement from "./StudentsManagement";
import TeachersManagement from "./TeachersManagement";
import AdmissionsManagement from "./AdmissionsManagement";
import NewsManagement from "./NewsManagement";
import EventRegistrationManagement from "./EventRegistrationManagement";
import AchievementManagement from "./AchievementManagement";
import GalleryManagement from "./GalleryManagement";
import MessagesManagement from "./MessageManagement";
import SettingsManagement from "./SettingsManagement";

// =====================================================
// ADMIN DASHBOARD
// =====================================================

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    admissions: 0,
    eventRegistrations: 0,
    notices: 0,
    news: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH ADMIN DASHBOARD DATA
  // =====================================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      if (!token) {
        console.error(
          "Admin token not found"
        );

        setLoading(false);

        return;
      }

      const response = await fetch(
        "https://school-management-backend-jcoe.onrender.com/api/admin/dashboard",
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
          data.message ||
            "Failed to load dashboard"
        );
      }

      setStats({
        students:
          data.stats?.students || 0,

        teachers:
          data.stats?.teachers || 0,

        admissions:
          data.stats?.pendingAdmissions || 0,

        eventRegistrations:
          data.stats?.eventRegistrations || 0,

        notices:
          data.stats?.notices || 0,

        news:
          data.stats?.news || 0,

        messages:
          data.stats?.unreadContacts || 0,
      });
    } catch (error) {
      console.error(
        "Admin Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =====================================================
  // STUDENT UPDATES
  // =====================================================

  useEffect(() => {
    const handleStudentUpdate = () => {
      fetchDashboardData();
    };

    window.addEventListener(
      "studentsUpdated",
      handleStudentUpdate
    );

    return () => {
      window.removeEventListener(
        "studentsUpdated",
        handleStudentUpdate
      );
    };
  }, []);

  // =====================================================
  // TEACHER UPDATES
  // =====================================================

  useEffect(() => {
    const handleTeacherUpdate = () => {
      fetchDashboardData();
    };

    window.addEventListener(
      "teachersUpdated",
      handleTeacherUpdate
    );

    return () => {
      window.removeEventListener(
        "teachersUpdated",
        handleTeacherUpdate
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    logout();

    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================================
  // SIDEBAR MENU
  // =====================================================

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
    },
    {
      id: "teachers",
      label: "Teachers",
      icon: UserRoundCheck,
    },
    {
      id: "admissions",
      label: "Admissions",
      icon: GraduationCap,
    },
    {
      id: "notices",
      label: "Notices",
      icon: Bell,
    },
    {
      id: "news",
      label: "News",
      icon: Newspaper,
    },
    {
      id: "events",
      label: "Event Registrations",
      icon: CalendarCheck,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: Images,
    },
    {
      id: "messages",
      label: "Messages",
      icon: Mail,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  // =====================================================
  // OPEN SECTION
  // =====================================================

  const openSection = (section) => {
    setActiveSection(section);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        {/* BRAND */}

        <div className="dashboard-brand">
          <GraduationCap size={30} />

          <span>
            Bright Future
          </span>
        </div>

        {/* NAVIGATION */}

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                className={
                  activeSection === item.id
                    ? "dashboard-nav-item active"
                    : "dashboard-nav-item"
                }
                onClick={() =>
                  openSection(item.id)
                }
              >
                <Icon size={18} />

                <span>
                  {item.label}
                </span>

                {/* Admissions Badge */}

                {item.id === "admissions" &&
                  stats.admissions > 0 && (
                    <span className="admission-nav-badge">
                      {stats.admissions}
                    </span>
                  )}

                {/* News Badge */}

                {item.id === "news" &&
                  stats.news > 0 && (
                    <span className="news-nav-badge">
                      {stats.news}
                    </span>
                  )}

                {/* Event Badge */}

                {item.id === "events" &&
                  stats.eventRegistrations >
                    0 && (
                    <span className="news-nav-badge">
                      {
                        stats.eventRegistrations
                      }
                    </span>
                  )}

                {/* Messages Badge */}

                {item.id === "messages" &&
                  stats.messages > 0 && (
                    <span className="news-nav-badge">
                      {stats.messages}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT */}

        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />

          <span>
            Logout
          </span>
        </button>

      </aside>

      {/* MAIN */}

      <main className="dashboard-main">

        {/* TOPBAR */}

        <header className="dashboard-topbar">

          <div>
            <h1>
              Administrator Dashboard
            </h1>

            <p>
              Welcome back,{" "}
              <strong>
                {user?.name ||
                  "Administrator"}
              </strong>
            </p>
          </div>

          <div className="dashboard-user">

            <div className="user-avatar">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div>
              <strong>
                {user?.name ||
                  "Administrator"}
              </strong>

              <span>
                Administrator
              </span>
            </div>

          </div>

        </header>

        {/* =================================================
            DASHBOARD HOME
        ================================================= */}

        {activeSection === "dashboard" && (
          <>
            {/* STATISTICS */}

            <section className="dashboard-cards">

              {/* STUDENTS */}

              <div
                className="dashboard-stat"
                onClick={() =>
                  openSection("students")
                }
              >
                <span>
                  Total Students
                </span>

                <strong>
                  {loading
                    ? "..."
                    : stats.students}
                </strong>
              </div>

              {/* TEACHERS */}

              <div
                className="dashboard-stat"
                onClick={() =>
                  openSection("teachers")
                }
              >
                <span>
                  Total Teachers
                </span>

                <strong>
                  {loading
                    ? "..."
                    : stats.teachers}
                </strong>
              </div>

              {/* ADMISSIONS */}

              <div
                className="dashboard-stat"
                onClick={() =>
                  openSection("admissions")
                }
              >
                <span>
                  Pending Admissions
                </span>

                <strong>
                  {loading
                    ? "..."
                    : stats.admissions}
                </strong>
              </div>

              {/* EVENTS */}

              <div
                className="dashboard-stat"
                onClick={() =>
                  openSection("events")
                }
              >
                <span>
                  Event Registrations
                </span>

                <strong>
                  {loading
                    ? "..."
                    : stats.eventRegistrations}
                </strong>
              </div>

            </section>

            {/* WEBSITE MANAGEMENT */}

            <section className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h2>
                    Website Management
                  </h2>

                  <p>
                    Manage your school website
                    content from one place.
                  </p>
                </div>

                <span>
                  Administration
                </span>

              </div>

              <div className="admin-management-grid">

                {/* STUDENTS */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("students")
                  }
                >
                  <Users size={25} />

                  <h3>
                    Students
                  </h3>

                  <p>
                    Add, edit and manage
                    student records.
                  </p>
                </div>

                {/* TEACHERS */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("teachers")
                  }
                >
                  <UserRoundCheck size={25} />

                  <h3>
                    Teachers
                  </h3>

                  <p>
                    Add and manage teachers
                    and their information.
                  </p>
                </div>

                {/* ADMISSIONS */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("admissions")
                  }
                >
                  <GraduationCap size={25} />

                  <h3>
                    Admissions
                  </h3>

                  <p>
                    Review and manage
                    admission applications.
                  </p>

                  {stats.admissions > 0 && (
                    <span className="management-badge">
                      {stats.admissions} Pending
                    </span>
                  )}
                </div>

                {/* NOTICES */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("notices")
                  }
                >
                  <Bell size={25} />

                  <h3>
                    Notices
                  </h3>

                  <p>
                    Create and manage
                    school notices.
                  </p>
                </div>

                {/* NEWS */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("news")
                  }
                >
                  <Newspaper size={25} />

                  <h3>
                    News
                  </h3>

                  <p>
                    Add, manage and delete
                    school news.
                  </p>

                  {stats.news > 0 && (
                    <span className="news-management-badge">
                      {stats.news} News
                    </span>
                  )}
                </div>

                {/* EVENTS */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("events")
                  }
                >
                  <CalendarCheck size={25} />

                  <h3>
                    Event Registrations
                  </h3>

                  <p>
                    View student event
                    registrations.
                  </p>

                  {stats.eventRegistrations >
                    0 && (
                    <span className="management-badge">
                      {
                        stats.eventRegistrations
                      }{" "}
                      Registered
                    </span>
                  )}
                </div>

                {/* ACHIEVEMENTS */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("achievements")
                  }
                >
                  <Trophy size={25} />

                  <h3>
                    Achievements
                  </h3>

                  <p>
                    Add and manage school
                    achievements.
                  </p>
                </div>

                {/* GALLERY */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("gallery")
                  }
                >
                  <Images size={25} />

                  <h3>
                    Gallery
                  </h3>

                  <p>
                    Add, delete and manage
                    school photographs.
                  </p>
                </div>

                {/* MESSAGES */}

                <div
                  className="management-card"
                  onClick={() =>
                    openSection("messages")
                  }
                >
                  <Mail size={25} />

                  <h3>
                    Messages
                  </h3>

                  <p>
                    View contact messages.
                  </p>

                  {stats.messages > 0 && (
                    <span className="management-badge">
                      {stats.messages} Unread
                    </span>
                  )}
                </div>

              </div>
            </section>
          </>
        )}

        {/* STUDENTS */}

        {activeSection === "students" && (
          <section className="dashboard-panel">
            <StudentsManagement
              onStudentAdded={
                fetchDashboardData
              }
            />
          </section>
        )}

        {/* TEACHERS */}

        {activeSection === "teachers" && (
          <section className="dashboard-panel">
            <TeachersManagement
              onTeacherAdded={
                fetchDashboardData
              }
            />
          </section>
        )}

        {/* ADMISSIONS */}

        {activeSection === "admissions" && (
          <section className="dashboard-panel">
            <AdmissionsManagement
              onAdmissionUpdated={
                fetchDashboardData
              }
            />
          </section>
        )}

        {/* NOTICES */}

        {activeSection === "notices" && (
          <section className="dashboard-panel">
            <NoticesManagement />
          </section>
        )}

        {/* NEWS */}

        {activeSection === "news" && (
          <section className="dashboard-panel">
            <NewsManagement
              onNewsUpdated={
                fetchDashboardData
              }
            />
          </section>
        )}

        {/* EVENTS */}

        {activeSection === "events" && (
          <section className="dashboard-panel">
            <EventRegistrationManagement />
          </section>
        )}

        {/* ACHIEVEMENTS */}

        {activeSection === "achievements" && (
          <section className="dashboard-panel">
            <AchievementManagement />
          </section>
        )}

        {/* GALLERY */}

        {activeSection === "gallery" && (
          <section className="dashboard-panel">
            <GalleryManagement />
          </section>
        )}

        {/* =================================================
            MESSAGES
        ================================================= */}

        {activeSection === "messages" && (
          <section className="dashboard-panel">

            <MessagesManagement
              onMessageUpdated={
                fetchDashboardData
              }
            />

          </section>
        )}

        {/* SETTINGS */}

       {activeSection === "settings" && (
         <section className="dashboard-panel">
            <SettingsManagement />
         </section>
       )}
      </main>
    </div>
  );
};

export default AdminDashboard;