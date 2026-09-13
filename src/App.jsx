import { Routes, Route } from "react-router-dom";

/* =========================
   PUBLIC LAYOUT
========================= */

import MainLayout from "./layouts/MainLayout";

/* =========================
   PUBLIC PAGES
========================= */

import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import AcademicPrograms from "./pages/AcademicsPrograms";
import Curriculum from "./pages/Curriculum";
import Departments from "./pages/Departments";
import Admissions from "./pages/Admissions";
import Campus from "./pages/Campus";
import Activities from "./pages/Activities";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import Achievements from "./pages/Achievements";
import News from "./pages/News";
import Contact from "./pages/Contact";
import EventRegistration from "./pages/EventRegistration";
import NoticeDetails from "./pages/NoticeDetails";

/* =========================
   LOGIN
========================= */

import Login from "./pages/Login";

/* =========================
   ADMIN DASHBOARD
========================= */

import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* =====================================
          PUBLIC WEBSITE
      ====================================== */}

      <Route element={<MainLayout />}>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ABOUT */}

        <Route
          path="/about"
          element={<About />}
        />

        {/* =================================
            ACADEMICS MAIN PAGE
        ================================= */}

        <Route
          path="/academics"
          element={<Academics />}
        />

        {/* =================================
            ACADEMIC PROGRAMS
        ================================= */}

        <Route
          path="/academics/programs"
          element={<AcademicPrograms />}
        />

        {/* =================================
            CURRICULUM
        ================================= */}

        <Route
          path="/academics/curriculum"
          element={<Curriculum />}
        />

        {/* =================================
            DEPARTMENTS
        ================================= */}

        <Route
          path="/academics/departments"
          element={<Departments />}
        />

        {/* ADMISSIONS */}

        <Route
          path="/admissions"
          element={<Admissions />}
        />

        {/* CAMPUS */}

        <Route
          path="/campus"
          element={<Campus />}
        />

        {/* ACTIVITIES */}

        <Route
          path="/activities"
          element={<Activities />}
        />

        {/* FACULTY */}

        <Route
          path="/faculty"
          element={<Faculty />}
        />

        {/* GALLERY */}

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        {/* ACHIEVEMENTS */}

        <Route
          path="/achievements"
          element={<Achievements />}
        />

        {/* NEWS */}

        <Route
          path="/news"
          element={<News />}
        />

        {/* EVENT REGISTRATION */}

        <Route
          path="/event-registration"
          element={<EventRegistration />}
        />

        {/* NOTICE DETAILS */}

        <Route
          path="/notice/:id"
          element={<NoticeDetails />}
        />

        {/* CONTACT */}

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>

      {/* =====================================
          ADMIN LOGIN
      ====================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* =====================================
          ADMIN DASHBOARD
          ONLY ADMIN CAN ACCESS
      ====================================== */}

      <Route
        path="/admin-dashboard/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;