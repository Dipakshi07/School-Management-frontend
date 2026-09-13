import { useEffect, useState } from "react";

import {
  CalendarDays,
  ArrowRight,
  Newspaper,
  Megaphone,
  Trophy,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

import "./News.css";

const API_URL = "http://localhost:5000/api/news";

const getNewsIcon = (category) => {
  switch (category) {
    case "Academic":
      return GraduationCap;

    case "Event":
      return Megaphone;

    case "Achievement":
      return Trophy;

    case "Announcement":
      return Megaphone;

    default:
      return Newspaper;
  }
};

const formatDate = (date) => {
  if (!date) return "";

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

const News = () => {
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // FETCH NEWS FROM BACKEND
  // ==========================================

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch news"
        );
      }

      const newsData = Array.isArray(data)
        ? data
        : data.news || [];

      setNews(newsData);
    } catch (error) {
      console.error(
        "Website News Error:",
        error
      );

      setError(
        "Unable to load latest news."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD NEWS
  // ==========================================

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="news-section">

      <div className="news-container">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="news-section-header">

          <div>

            <span className="news-small-title">
              SCHOOL UPDATES
            </span>

            <h2>
              Latest{" "}
              <span>
                News & Announcements
              </span>
            </h2>

            <p>
              Stay updated with the latest
              happenings, announcements and
              important information from our
              school.
            </p>

          </div>

          <button
            className="view-all-news-btn"
            onClick={fetchNews}
            type="button"
          >
            View All News

            <ArrowRight size={17} />
          </button>

        </div>

        {/* ====================================
            LOADING
        ==================================== */}

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
            }}
          >

            <RefreshCw
              size={35}
              className="news-refresh-spin"
            />

            <p>
              Loading latest news...
            </p>

          </div>
        )}

        {/* ====================================
            ERROR
        ==================================== */}

        {!loading && error && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
            }}
          >

            <Newspaper size={40} />

            <h3>
              Unable to Load News
            </h3>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={fetchNews}
              className="read-news-btn"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ====================================
            NO NEWS
        ==================================== */}

        {!loading &&
          !error &&
          news.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
              }}
            >

              <Newspaper size={45} />

              <h3>
                No News Available
              </h3>

              <p>
                There are currently no latest
                news or announcements.
              </p>

            </div>
          )}

        {/* ====================================
            NEWS GRID
        ==================================== */}

        {!loading &&
          !error &&
          news.length > 0 && (

            <div className="news-grid">

              {news.map((item) => {

                const Icon = getNewsIcon(
                  item.category
                );

                return (
                  <article
                    className="news-card"
                    key={item._id}
                  >

                    {/* TOP */}

                    <div className="news-card-top">

                      <div className="news-icon">
                        <Icon size={22} />
                      </div>

                      <span className="news-category">
                        {item.category}
                      </span>

                    </div>

                    {/* DATE */}

                    <div className="news-date">

                      <CalendarDays
                        size={15}
                      />

                      <span>
                        {formatDate(
                          item.date
                        )}
                      </span>

                    </div>

                    {/* CONTENT */}

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    {/* READ MORE */}

                    <button
                      className="read-news-btn"
                      type="button"
                    >
                      Read More

                      <ArrowRight
                        size={15}
                      />
                    </button>

                  </article>
                );

              })}

            </div>

          )}

      </div>

    </section>
  );
};

export default News;