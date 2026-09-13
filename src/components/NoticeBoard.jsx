import { useEffect, useState } from "react";

import "./NoticeBoard.css";

import {
  Bell,
  CalendarDays,
  ArrowRight,
  ArrowDown
} from "lucide-react";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  const [expandedNotice, setExpandedNotice] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* ==========================================
     FETCH NOTICES
  ========================================== */

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://school-management-backend-jcoe.onrender.com/api/notices"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch notices"
        );
      }

      const data = await response.json();

      setNotices(data);
    } catch (error) {
      console.error(
        "Notice Fetch Error:",
        error
      );

      setError(
        "Unable to load notices."
      );
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
     EXPAND / COLLAPSE
  ========================================== */

  const handleArrowClick = (id) => {
    if (expandedNotice === id) {
      setExpandedNotice(null);
    } else {
      setExpandedNotice(id);
    }
  };


  /* ==========================================
     FORMAT DATE
  ========================================== */

  const getDate = (date) => {
    const noticeDate = new Date(date);

    return noticeDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit"
      }
    );
  };


  const getMonth = (date) => {
    const noticeDate = new Date(date);

    return noticeDate
      .toLocaleDateString(
        "en-US",
        {
          month: "short"
        }
      )
      .toUpperCase();
  };


  const getFormattedDate = (date) => {
    const noticeDate = new Date(date);

    return noticeDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );
  };


  return (
    <section className="notice-section">

      <div className="notice-container">

        {/* ================================
            HEADER
        ================================= */}

        <div className="notice-header">

          <div>

            <span className="section-eyebrow">
              NOTICE BOARD
            </span>

            <h2>
              Latest Announcements
            </h2>

          </div>


          <button className="view-all-btn">

            View All

            <ArrowRight size={17} />

          </button>

        </div>


        {/* ================================
            LOADING
        ================================= */}

        {loading && (
          <div className="notice-loading">
            Loading notices...
          </div>
        )}


        {/* ================================
            ERROR
        ================================= */}

        {!loading && error && (
          <div className="notice-error">
            {error}
          </div>
        )}


        {/* ================================
            NO NOTICES
        ================================= */}

        {!loading &&
          !error &&
          notices.length === 0 && (

            <div className="notice-empty">

              <Bell size={28} />

              <p>
                No notices available
                right now.
              </p>

            </div>
          )}


        {/* ================================
            NOTICE LIST
        ================================= */}

        {!loading &&
          !error &&
          notices.length > 0 && (

            <div className="notice-list">

              {notices.map((notice) => (

                <div
                  className={`notice-card ${
                    expandedNotice ===
                    notice._id
                      ? "notice-card-expanded"
                      : ""
                  }`}
                  key={notice._id}
                >

                  {/* ======================
                      DATE
                  ======================= */}

                  <div className="notice-date">

                    <strong>
                      {getDate(
                        notice.date
                      )}
                    </strong>

                    <span>
                      {getMonth(
                        notice.date
                      )}
                    </span>

                  </div>


                  {/* ======================
                      CONTENT
                  ======================= */}

                  <div className="notice-content">

                    <div className="notice-type">

                      <Bell size={14} />

                      {notice.category ||
                        "Announcement"}

                    </div>


                    <h3>
                      {notice.title}
                    </h3>


                    <p>
                      {notice.description}
                    </p>


                    {/* ==================
                        FULL DETAILS
                    =================== */}

                    {expandedNotice ===
                      notice._id && (

                      <div className="notice-full-details">

                        <div className="notice-details-divider">
                        </div>


                        <h4>
                          Notice Details
                        </h4>


                        {notice.details && (
                          <p className="notice-details-text">
                            {notice.details}
                          </p>
                        )}


                        <div className="notice-extra-info">


                          {/* DATE */}

                          <div className="notice-info-item">

                            <CalendarDays
                              size={18}
                            />

                            <div>

                              <span>
                                Date
                              </span>

                              <strong>
                                {notice.lastDate ||
                                  getFormattedDate(
                                    notice.date
                                  )}
                              </strong>

                            </div>

                          </div>


                          {/* TIME */}

                          {notice.time && (

                            <div className="notice-info-item">

                              <CalendarDays
                                size={18}
                              />

                              <div>

                                <span>
                                  Time
                                </span>

                                <strong>
                                  {notice.time}
                                </strong>

                              </div>

                            </div>

                          )}


                          {/* VENUE */}

                          {notice.venue && (

                            <div className="notice-info-item">

                              <CalendarDays
                                size={18}
                              />

                              <div>

                                <span>
                                  Venue
                                </span>

                                <strong>
                                  {notice.venue}
                                </strong>

                              </div>

                            </div>

                          )}

                        </div>

                      </div>
                    )}

                  </div>


                  {/* ======================
                      ARROW BUTTON
                  ======================= */}

                  <button
                    className="notice-arrow-btn"

                    onClick={() =>
                      handleArrowClick(
                        notice._id
                      )
                    }

                    aria-label="View notice details"
                  >

                    {expandedNotice ===
                    notice._id ? (

                      <ArrowDown
                        className="notice-arrow"
                        size={20}
                      />

                    ) : (

                      <ArrowRight
                        className="notice-arrow"
                        size={20}
                      />

                    )}

                  </button>

                </div>

              ))}

            </div>
          )}

      </div>

    </section>
  );
};

export default NoticeBoard;