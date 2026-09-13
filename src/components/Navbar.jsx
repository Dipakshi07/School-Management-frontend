import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setAcademicOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================== */}

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <div className="logo-icon">
            <GraduationCap size={30} />
          </div>

          <div className="logo-text">
            <h2>Bright Future</h2>
            <span>International School</span>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <nav className="desktop-nav">

          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          {/* =========================
              ACADEMICS DROPDOWN
          ========================== */}

          <div className="nav-dropdown">

            <button
              type="button"
              className="dropdown-btn"
            >
              Academics
              <ChevronDown size={15} />
            </button>

            <div className="dropdown-menu">

              <Link
                to="/academics/programs"
                onClick={closeMenu}
              >
                Academic Programs
              </Link>

              <Link
                to="/academics/curriculum"
                onClick={closeMenu}
              >
                Curriculum
              </Link>

              <Link
                to="/academics/departments"
                onClick={closeMenu}
              >
                Departments
              </Link>

            </div>
          </div>

          <NavLink to="/admissions">
            Admissions
          </NavLink>

          <NavLink to="/campus">
            Campus
          </NavLink>

          <NavLink to="/activities">
            Activities
          </NavLink>

          <NavLink to="/faculty">
            Faculty
          </NavLink>

          <NavLink to="/gallery">
            Gallery
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

        </nav>

        {/* =========================
            ADMIN LOGIN
        ========================== */}

        <Link
          to="/login"
          className="navbar-login"
        >
          Admin Login
        </Link>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={27} />
          ) : (
            <Menu size={27} />
          )}
        </button>

      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}

      {menuOpen && (
        <div className="mobile-nav">

          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>

          {/* =========================
              MOBILE ACADEMICS
          ========================== */}

          <div className="mobile-dropdown">

            <button
              type="button"
              onClick={() =>
                setAcademicOpen(!academicOpen)
              }
            >
              <span>Academics</span>

              <ChevronDown
                size={17}
                className={
                  academicOpen
                    ? "rotate-icon"
                    : ""
                }
              />
            </button>

            {academicOpen && (
              <div className="mobile-submenu">

                <Link
                  to="/academics/programs"
                  onClick={closeMenu}
                >
                  Academic Programs
                </Link>

                <Link
                  to="/academics/curriculum"
                  onClick={closeMenu}
                >
                  Curriculum
                </Link>

                <Link
                  to="/academics/departments"
                  onClick={closeMenu}
                >
                  Departments
                </Link>

              </div>
            )}

          </div>

          <NavLink
            to="/admissions"
            onClick={closeMenu}
          >
            Admissions
          </NavLink>

          <NavLink
            to="/campus"
            onClick={closeMenu}
          >
            Campus
          </NavLink>

          <NavLink
            to="/activities"
            onClick={closeMenu}
          >
            Activities
          </NavLink>

          <NavLink
            to="/faculty"
            onClick={closeMenu}
          >
            Faculty
          </NavLink>

          <NavLink
            to="/gallery"
            onClick={closeMenu}
          >
            Gallery
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          {/* Admin Login */}

          <Link
            to="/login"
            className="mobile-login"
            onClick={closeMenu}
          >
            Admin Login
          </Link>

        </div>
      )}
    </header>
  );
};

export default Navbar;