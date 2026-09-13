
import "./EventCard.css";

import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const EventCard = ({
  id,
  date = "15",
  month = "SEP",
  title = "Inter School Football Championship",
  location = "Main Sports Ground",
  time = "09:00 AM",
  description = "Join us for an exciting school event."
}) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/event-registration", {
      state: {
        event: {
          id,
          title,
          date: `${date} ${month}`,
          location,
          time,
          description
        }
      }
    });
  };

  return (
    <article className="event-card">

      {/* DATE */}
      <div className="event-date">
        <strong>{date}</strong>

        <span>{month}</span>
      </div>

      {/* EVENT DETAILS */}
      <div className="event-details">

        <div className="event-category">
          <CalendarDays size={14} />
          Upcoming Event
        </div>

        <h3>{title}</h3>

        <div className="event-meta">

          <span>
            <MapPin size={15} />
            {location}
          </span>

          <span>
            <Clock size={15} />
            {time}
          </span>

        </div>

      </div>

      {/* REGISTER BUTTON */}
      <button
        className="event-arrow"
        onClick={handleRegister}
        type="button"
        aria-label={`Register for ${title}`}
      >
        <ArrowRight size={19} />
      </button>

    </article>
  );
};

export default EventCard;