
import { useEffect, useState } from "react";

import {
  Trophy,
  Medal,
  Award,
  Star,
  GraduationCap,
} from "lucide-react";

import "./Achievement.css";

const API_URL =
  "https://school-management-backend-jcoe.onrender.com/api/achievements";

// ==========================================
// ICON HELPER
// ==========================================

const getAchievementIcon = (iconName) => {
  switch (iconName) {
    case "Trophy":
      return Trophy;

    case "Medal":
      return Medal;

    case "Award":
      return Award;

    case "Star":
      return Star;

    case "GraduationCap":
      return GraduationCap;

    default:
      return Trophy;
  }
};


// ==========================================
// ACHIEVEMENT COMPONENT
// ==========================================

const Achievement = () => {
  const [achievements, setAchievements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ========================================
  // FETCH ACHIEVEMENTS
  // ========================================

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const contentType =
        response.headers.get("content-type");

      // ------------------------------------
      // CHECK RESPONSE
      // ------------------------------------

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          `API Error ${response.status}: ${
            text || "Failed to fetch achievements"
          }`
        );
      }

      // ------------------------------------
      // CHECK JSON
      // ------------------------------------

      if (
        !contentType ||
        !contentType.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "Server returned an invalid response. Please check the Achievement API."
        );
      }

      const data = await response.json();

      // ------------------------------------
      // SET DATA
      // ------------------------------------

      setAchievements(
        data.achievements || []
      );
    } catch (error) {
      console.error(
        "Fetch Achievements Error:",
        error
      );

      setError(
        "Unable to load achievements."
      );
    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // LOAD ON PAGE OPEN
  // ========================================

  useEffect(() => {
    fetchAchievements();
  }, []);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="achievement-section">
        <div className="achievement-container">

          <div className="achievement-header">

            <span className="section-eyebrow">
              OUR ACHIEVEMENTS
            </span>

            <h2>
              Excellence Beyond Classrooms
            </h2>

            <p>
              Our students continue to make us
              proud through achievements in
              academics, sports, arts and innovation.
            </p>

          </div>

          <div className="achievement-loading">
            Loading achievements...
          </div>

        </div>
      </section>
    );
  }


  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <section className="achievement-section">
        <div className="achievement-container">

          <div className="achievement-header">

            <span className="section-eyebrow">
              OUR ACHIEVEMENTS
            </span>

            <h2>
              Excellence Beyond Classrooms
            </h2>

            <p>
              Our students continue to make us
              proud through achievements in
              academics, sports, arts and innovation.
            </p>

          </div>

          <div className="achievement-error">
            {error}
          </div>

        </div>
      </section>
    );
  }


  // ========================================
  // EMPTY STATE
  // ========================================

  if (achievements.length === 0) {
    return (
      <section className="achievement-section">
        <div className="achievement-container">

          <div className="achievement-header">

            <span className="section-eyebrow">
              OUR ACHIEVEMENTS
            </span>

            <h2>
              Excellence Beyond Classrooms
            </h2>

            <p>
              Our students continue to make us
              proud through achievements in
              academics, sports, arts and innovation.
            </p>

          </div>

          <div className="achievement-empty">
            No achievements available at the moment.
          </div>

        </div>
      </section>
    );
  }


  // ========================================
  // MAIN UI
  // ========================================

  return (
    <section className="achievement-section">

      <div className="achievement-container">

        {/* ==================================
            HEADER
        ================================== */}

        <div className="achievement-header">

          <span className="section-eyebrow">
            OUR ACHIEVEMENTS
          </span>

          <h2>
            Excellence Beyond Classrooms
          </h2>

          <p>
            Our students continue to make us
            proud through achievements in
            academics, sports, arts and innovation.
          </p>

        </div>


        {/* ==================================
            ACHIEVEMENT GRID
        ================================== */}

        <div className="achievement-grid">

          {achievements.map((item) => {

            const Icon =
              getAchievementIcon(item.icon);

            return (
              <div
                className="achievement-card"
                key={item._id}
              >

                {/* ICON */}

                <div className="achievement-icon">
                  <Icon size={27} />
                </div>


                {/* TITLE */}

                <h3>
                  {item.title}
                </h3>


                {/* DESCRIPTION */}

                <p>
                  {item.description}
                </p>


                {/* CATEGORY / YEAR */}

                {(item.category ||
                  item.year) && (
                  <div className="achievement-meta">

                    {item.category && (
                      <span>
                        {item.category}
                      </span>
                    )}

                    {item.year && (
                      <span>
                        {item.year}
                      </span>
                    )}

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Achievement;
