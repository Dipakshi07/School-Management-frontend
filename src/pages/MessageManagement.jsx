import { useEffect, useState } from "react";

import {
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  EyeOff,
  Trash2,
  RefreshCw,
} from "lucide-react";

import "./MessageManagement.css";

const MessagesManagement = ({
  onMessageUpdated,
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET MESSAGES
  // =====================================================

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      if (!token) {
        setError(
          "Admin authentication token not found."
        );
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/admin/contacts",
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
            "Failed to fetch messages"
        );
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error(
        "Fetch Messages Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load messages"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchMessages();
  }, []);

  // =====================================================
  // MARK READ / UNREAD
  // =====================================================

  const toggleReadStatus = async (
    id,
    currentStatus
  ) => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isRead: !currentStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update message"
        );
      }

      setMessages((previousMessages) =>
        previousMessages.map((message) =>
          message._id === id
            ? {
                ...message,
                isRead: !currentStatus,
              }
            : message
        )
      );

      if (onMessageUpdated) {
        onMessageUpdated();
      }
    } catch (error) {
      console.error(
        "Update Message Error:",
        error
      );

      alert(error.message);
    }
  };

  // =====================================================
  // DELETE MESSAGE
  // =====================================================

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/${id}`,
        {
          method: "DELETE",
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
            "Failed to delete message"
        );
      }

      setMessages((previousMessages) =>
        previousMessages.filter(
          (message) =>
            message._id !== id
        )
      );

      if (onMessageUpdated) {
        onMessageUpdated();
      }
    } catch (error) {
      console.error(
        "Delete Message Error:",
        error
      );

      alert(error.message);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="messages-loading">
        <RefreshCw
          size={30}
          className="loading-icon"
        />

        <p>Loading messages...</p>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="messages-management">

      {/* HEADER */}

      <div className="messages-header">
        <div>
          <h2>Contact Messages</h2>

          <p>
            View and manage messages received
            from website visitors.
          </p>
        </div>

        <button
          type="button"
          className="refresh-messages-btn"
          onClick={fetchMessages}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {/* ERROR */}

      {error && (
        <div className="messages-error">
          {error}
        </div>
      )}

      {/* EMPTY */}

      {!error &&
        messages.length === 0 && (
          <div className="messages-empty">
            <Mail size={48} />

            <h3>No Messages Yet</h3>

            <p>
              Contact messages submitted
              from the website will appear
              here.
            </p>
          </div>
        )}

      {/* MESSAGES */}

      {messages.length > 0 && (
        <div className="messages-list">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`message-card ${
                message.isRead
                  ? "read"
                  : "unread"
              }`}
            >

              {/* TOP */}

              <div className="message-card-top">

                <div className="message-user">

                  <div className="message-avatar">
                    {message.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <h3>
                      {message.name}
                    </h3>

                    <span
                      className={
                        message.isRead
                          ? "read-status"
                          : "unread-status"
                      }
                    >
                      {message.isRead
                        ? "Read"
                        : "Unread"}
                    </span>
                  </div>

                </div>

                <div className="message-date">
                  <Calendar size={15} />

                  {formatDate(
                    message.createdAt
                  )}
                </div>

              </div>

              {/* CONTACT INFO */}

              <div className="message-info">

                <div>
                  <Mail size={16} />

                  <span>
                    {message.email}
                  </span>
                </div>

                {message.phone && (
                  <div>
                    <Phone size={16} />

                    <span>
                      {message.phone}
                    </span>
                  </div>
                )}

              </div>

              {/* SUBJECT */}

              {message.subject && (
                <div className="message-subject">
                  <strong>
                    Subject:
                  </strong>

                  <span>
                    {message.subject}
                  </span>
                </div>
              )}

              {/* MESSAGE */}

              <div className="message-content">
                <strong>
                  Message
                </strong>

                <p>
                  {message.message}
                </p>
              </div>

              {/* ACTIONS */}

              <div className="message-actions">

                <button
                  type="button"
                  className="message-read-btn"
                  onClick={() =>
                    toggleReadStatus(
                      message._id,
                      message.isRead
                    )
                  }
                >
                  {message.isRead ? (
                    <>
                      <EyeOff size={16} />
                      Mark Unread
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Mark Read
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="message-delete-btn"
                  onClick={() =>
                    deleteMessage(
                      message._id
                    )
                  }
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesManagement;