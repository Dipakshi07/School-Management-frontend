import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Clock,
  MapPin
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "./NoticeDetails.css";

const NoticeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const notice = location.state?.notice;

  // Agar notice available nahi hai
  if (!notice) {
    return (
      <section className="notice-details-page">
        <div className="notice-details-container">

          <div className="notice-not-found">
            <Bell size={45} />

            <h2>
              Notice Not Found
            </h2>

            <p>
              The notice you are looking for is not available.
            </p>

            <button
              className="back-notice-btn"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="notice-details-page">

      <div className="notice-details-container">

        {/* Back Button */}
        <button
          className="back-notice-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back to Notices
        </button>

        {/* Main Card */}
        <div className="notice-details-card">

          {/* Header */}
          <div className="notice-details-header">

            <div className="notice-details-date">
              <strong>
                {notice.date}
              </strong>

              <span>
                {notice.month}
              </span>
            </div>

            <div className="notice-details-heading">

              <div className="notice-details-type">
                <Bell size={16} />
                Announcement
              </div>

              <h1>
                {notice.title}
              </h1>

            </div>

          </div>

          {/* Divider */}
          <div className="notice-details-divider"></div>

          {/* Description */}
          <div className="notice-details-content">

            <h2>
              Notice Details
            </h2>

            <p>
              {notice.details || notice.description}
            </p>

          </div>

          {/* Additional Information */}
          <div className="notice-extra-info">

            {notice.time && (
              <div className="notice-info-item">
                <Clock size={20} />

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

            {notice.venue && (
              <div className="notice-info-item">
                <MapPin size={20} />

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

            {notice.lastDate && (
              <div className="notice-info-item">
                <CalendarDays size={20} />

                <div>
                  <span>
                    Important Date
                  </span>

                  <strong>
                    {notice.lastDate}
                  </strong>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default NoticeDetails;