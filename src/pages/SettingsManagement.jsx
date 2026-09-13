
import { useEffect, useState } from "react";
import {
  User,
  Lock,
  School,
  Bell,
  Globe,
  Save,
  Eye,
  EyeOff,
  RefreshCw,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
} from "lucide-react";

import "./SettingsManagement.css";

const API_URL = "http://localhost:5000/api/admin/settings";

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ================================
  // PROFILE
  // ================================

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Administrator",
  });

  // ================================
  // SCHOOL SETTINGS
  // ================================

  const [school, setSchool] = useState({
    schoolName: "Bright Future International School",
    email: "",
    phone: "",
    address: "",
    academicSession: "2026-27",
    principalName: "",
    website: "",
  });

  // ================================
  // NOTIFICATIONS
  // ================================

  const [notifications, setNotifications] = useState({
    newAdmission: true,
    newMessage: true,
    eventRegistration: true,
    newContact: true,
    newsletter: false,
  });

  // ================================
  // WEBSITE
  // ================================

  const [website, setWebsite] = useState({
    websiteEnabled: true,
    maintenanceMode: false,
    showAdmissions: true,
    showNews: true,
    showEvents: true,
  });

  // ================================
  // PASSWORD
  // ================================

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================================
  // TOKEN
  // ================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken")
    );
  };

  // ================================
  // FETCH SETTINGS
  // ================================

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        throw new Error("Admin authentication token not found");
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load settings"
        );
      }

      if (data.settings) {
        setProfile(
          data.settings.profile || profile
        );

        setSchool(
          data.settings.school || school
        );

        setNotifications(
          data.settings.notifications ||
            notifications
        );

        setWebsite(
          data.settings.website || website
        );
      }
    } catch (error) {
      console.error("Settings Error:", error);

      setMessage({
        type: "error",
        text:
          error.message ||
          "Unable to load settings",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // INITIAL LOAD
  // ================================

  useEffect(() => {
    fetchSettings();
  }, []);

  // ================================
  // PROFILE HANDLER
  // ================================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // SCHOOL HANDLER
  // ================================

  const handleSchoolChange = (e) => {
    const { name, value } = e.target;

    setSchool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // NOTIFICATION HANDLER
  // ================================

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;

    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // ================================
  // WEBSITE HANDLER
  // ================================

  const handleWebsiteChange = (e) => {
    const { name, checked } = e.target;

    setWebsite((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // ================================
  // PASSWORD HANDLER
  // ================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // SAVE SETTINGS
  // ================================

  const saveSettings = async () => {
    try {
      setSaving(true);
      setMessage({
        type: "",
        text: "",
      });

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found"
        );
      }

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile,
          school,
          notifications,
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save settings"
        );
      }

      setMessage({
        type: "success",
        text: "Settings updated successfully!",
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error.message ||
          "Unable to save settings",
      });
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // CHANGE PASSWORD
  // ================================

  const changePassword = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setMessage({
        type: "error",
        text: "Please fill all password fields.",
      });

      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });

      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must contain at least 6 characters.",
      });

      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      const response = await fetch(
        `${API_URL}/password`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword:
              passwordData.currentPassword,
            newPassword:
              passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to change password"
        );
      }

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage({
        type: "success",
        text: "Password changed successfully!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.message ||
          "Password change failed",
      });
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // RESET SETTINGS
  // ================================

  const resetSettings = () => {
    fetchSettings();

    setMessage({
      type: "success",
      text: "Settings refreshed.",
    });
  };

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="settings-loading">
        <RefreshCw
          size={30}
          className="settings-spinner"
        />

        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-container">

      {/* HEADER */}

      <div className="settings-header">
        <div>
          <h2>Admin Settings</h2>

          <p>
            Manage administrator account, school
            information, notifications and website
            configuration.
          </p>
        </div>

        <button
          className="settings-refresh-btn"
          onClick={resetSettings}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {/* MESSAGE */}

      {message.text && (
        <div
          className={`settings-message ${message.type}`}
        >
          {message.type === "success" ? (
            <ShieldCheck size={18} />
          ) : (
            <Bell size={18} />
          )}

          <span>{message.text}</span>
        </div>
      )}

      {/* SETTINGS LAYOUT */}

      <div className="settings-layout">

        {/* SIDEBAR */}

        <div className="settings-sidebar">

          <button
            className={
              activeTab === "profile"
                ? "settings-tab active"
                : "settings-tab"
            }
            onClick={() =>
              setActiveTab("profile")
            }
          >
            <User size={18} />

            <div>
              <strong>Admin Profile</strong>
              <span>Personal information</span>
            </div>
          </button>

          <button
            className={
              activeTab === "school"
                ? "settings-tab active"
                : "settings-tab"
            }
            onClick={() =>
              setActiveTab("school")
            }
          >
            <School size={18} />

            <div>
              <strong>School Information</strong>
              <span>School details</span>
            </div>
          </button>

          <button
            className={
              activeTab === "password"
                ? "settings-tab active"
                : "settings-tab"
            }
            onClick={() =>
              setActiveTab("password")
            }
          >
            <Lock size={18} />

            <div>
              <strong>Security</strong>
              <span>Password & security</span>
            </div>
          </button>

          <button
            className={
              activeTab === "notifications"
                ? "settings-tab active"
                : "settings-tab"
            }
            onClick={() =>
              setActiveTab("notifications")
            }
          >
            <Bell size={18} />

            <div>
              <strong>Notifications</strong>
              <span>Notification preferences</span>
            </div>
          </button>

          <button
            className={
              activeTab === "website"
                ? "settings-tab active"
                : "settings-tab"
            }
            onClick={() =>
              setActiveTab("website")
            }
          >
            <Globe size={18} />

            <div>
              <strong>Website</strong>
              <span>Website configuration</span>
            </div>
          </button>

        </div>

        {/* CONTENT */}

        <div className="settings-content">

          {/* ===================================
              PROFILE
          =================================== */}

          {activeTab === "profile" && (
            <div className="settings-card">

              <div className="settings-card-header">
                <div className="settings-icon">
                  <User size={21} />
                </div>

                <div>
                  <h3>Administrator Profile</h3>

                  <p>
                    Update administrator account
                    information.
                  </p>
                </div>
              </div>

              <div className="settings-form-grid">

                <div className="form-group">
                  <label>Full Name</label>

                  <div className="input-with-icon">
                    <User size={17} />

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Administrator name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <div className="input-with-icon">
                    <Mail size={17} />

                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={
                        handleProfileChange
                      }
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>

                  <div className="input-with-icon">
                    <Phone size={17} />

                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Role</label>

                  <input
                    type="text"
                    value={profile.role}
                    disabled
                  />
                </div>

              </div>

              <div className="settings-actions">
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className="save-settings-btn"
                >
                  <Save size={17} />

                  {saving
                    ? "Saving..."
                    : "Save Profile"}
                </button>
              </div>

            </div>
          )}

          {/* ===================================
              SCHOOL
          =================================== */}

          {activeTab === "school" && (
            <div className="settings-card">

              <div className="settings-card-header">
                <div className="settings-icon">
                  <School size={21} />
                </div>

                <div>
                  <h3>School Information</h3>

                  <p>
                    Manage school contact and
                    academic information.
                  </p>
                </div>
              </div>

              <div className="settings-form-grid">

                <div className="form-group full-width">
                  <label>School Name</label>

                  <div className="input-with-icon">
                    <School size={17} />

                    <input
                      type="text"
                      name="schoolName"
                      value={school.schoolName}
                      onChange={
                        handleSchoolChange
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>School Email</label>

                  <div className="input-with-icon">
                    <Mail size={17} />

                    <input
                      type="email"
                      name="email"
                      value={school.email}
                      onChange={
                        handleSchoolChange
                      }
                      placeholder="school@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>School Phone</label>

                  <div className="input-with-icon">
                    <Phone size={17} />

                    <input
                      type="text"
                      name="phone"
                      value={school.phone}
                      onChange={
                        handleSchoolChange
                      }
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>School Address</label>

                  <div className="input-with-icon">
                    <MapPin size={17} />

                    <textarea
                      name="address"
                      value={school.address}
                      onChange={
                        handleSchoolChange
                      }
                      rows="3"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Academic Session</label>

                  <div className="input-with-icon">
                    <CalendarDays size={17} />

                    <input
                      type="text"
                      name="academicSession"
                      value={
                        school.academicSession
                      }
                      onChange={
                        handleSchoolChange
                      }
                      placeholder="2026-27"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Principal Name</label>

                  <input
                    type="text"
                    name="principalName"
                    value={
                      school.principalName
                    }
                    onChange={
                      handleSchoolChange
                    }
                    placeholder="Principal name"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Website URL</label>

                  <div className="input-with-icon">
                    <Globe size={17} />

                    <input
                      type="text"
                      name="website"
                      value={school.website}
                      onChange={
                        handleSchoolChange
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

              </div>

              <div className="settings-actions">
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className="save-settings-btn"
                >
                  <Save size={17} />

                  {saving
                    ? "Saving..."
                    : "Save School Information"}
                </button>
              </div>

            </div>
          )}

          {/* ===================================
              PASSWORD
          =================================== */}

          {activeTab === "password" && (
            <div className="settings-card">

              <div className="settings-card-header">
                <div className="settings-icon">
                  <Lock size={21} />
                </div>

                <div>
                  <h3>Security Settings</h3>

                  <p>
                    Change your administrator
                    password securely.
                  </p>
                </div>
              </div>

              <form
                onSubmit={changePassword}
                className="password-form"
              >

                <div className="form-group">
                  <label>
                    Current Password
                  </label>

                  <div className="password-input">
                    <input
                      type={
                        showCurrentPassword
                          ? "text"
                          : "password"
                      }
                      name="currentPassword"
                      value={
                        passwordData.currentPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Enter current password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(
                          !showCurrentPassword
                        )
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    New Password
                  </label>

                  <div className="password-input">
                    <input
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      value={
                        passwordData.newPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Enter new password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Confirm New Password
                  </label>

                  <div className="password-input">
                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={
                        passwordData.confirmPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Confirm new password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="password-note">
                  <ShieldCheck size={18} />

                  <span>
                    Use a strong password with at
                    least 6 characters.
                  </span>
                </div>

                <div className="settings-actions">
                  <button
                    type="submit"
                    disabled={saving}
                    className="save-settings-btn"
                  >
                    <Lock size={17} />

                    {saving
                      ? "Updating..."
                      : "Change Password"}
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* ===================================
              NOTIFICATIONS
          =================================== */}

          {activeTab === "notifications" && (
            <div className="settings-card">

              <div className="settings-card-header">
                <div className="settings-icon">
                  <Bell size={21} />
                </div>

                <div>
                  <h3>Notification Preferences</h3>

                  <p>
                    Choose which activities should
                    generate notifications.
                  </p>
                </div>
              </div>

              <div className="toggle-list">

                <label className="toggle-row">
                  <div>
                    <strong>
                      New Admissions
                    </strong>

                    <span>
                      Get notified when a new
                      admission application arrives.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="newAdmission"
                    checked={
                      notifications.newAdmission
                    }
                    onChange={
                      handleNotificationChange
                    }
                  />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>
                      New Messages
                    </strong>

                    <span>
                      Receive notifications for
                      contact messages.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="newMessage"
                    checked={
                      notifications.newMessage
                    }
                    onChange={
                      handleNotificationChange
                    }
                  />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>
                      Event Registrations
                    </strong>

                    <span>
                      Notify when students register
                      for school events.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="eventRegistration"
                    checked={
                      notifications.eventRegistration
                    }
                    onChange={
                      handleNotificationChange
                    }
                  />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>
                      Contact Enquiries
                    </strong>

                    <span>
                      Receive alerts for new contact
                      enquiries.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="newContact"
                    checked={
                      notifications.newContact
                    }
                    onChange={
                      handleNotificationChange
                    }
                  />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>
                      Newsletter
                    </strong>

                    <span>
                      Receive school newsletter
                      notifications.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={
                      notifications.newsletter
                    }
                    onChange={
                      handleNotificationChange
                    }
                  />
                </label>

              </div>

              <div className="settings-actions">
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className="save-settings-btn"
                >
                  <Save size={17} />

                  {saving
                    ? "Saving..."
                    : "Save Preferences"}
                </button>
              </div>

            </div>
          )}

          {/* ===================================
              WEBSITE
          =================================== */}

          {activeTab === "website" && (
            <div className="settings-card">

              <div className="settings-card-header">
                <div className="settings-icon">
                  <Globe size={21} />
                </div>

                <div>
                  <h3>Website Configuration</h3>

                  <p>
                    Control public website
                    visibility and sections.
                  </p>
                </div>
              </div>

              <div className="toggle-list">

                <label className="toggle-row">
                  <div>
                    <strong>
                      Website Enabled
                    </strong>

                    <span>
                      Allow visitors to access the
                      school website.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="websiteEnabled"
                    checked={
                      website.websiteEnabled
                    }
                    onChange={
                      handleWebsiteChange
                    }
                  />
                </label>

                <label className="toggle-row warning">
                  <div>
                    <strong>
                      Maintenance Mode
                    </strong>

                    <span>
                      Temporarily show maintenance
                      mode to website visitors.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={
                      website.maintenanceMode
                    }
                    onChange={
                      handleWebsiteChange
                    }
                  />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>
                      Show Admissions
                    </strong>

                    <span>
                      Display admissions section on
                      the public website.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="showAdmissions"
                    checked={
                      website.showAdmissions
                    }
                    onChange={
                      handleWebsiteChange
                    }
                  />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>
                      Show News
                    </strong>

                    <span>
                      Display latest school news.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="showNews"
                    checked={
                      website.showNews
                    }
                    onChange={
                      handleWebsiteChange
                    }
                  />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>
                      Show Events
                    </strong>

                    <span>
                      Display upcoming school events.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="showEvents"
                    checked={
                      website.showEvents
                    }
                    onChange={
                      handleWebsiteChange
                    }
                  />
                </label>

              </div>

              <div className="settings-actions">
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className="save-settings-btn"
                >
                  <Save size={17} />

                  {saving
                    ? "Saving..."
                    : "Save Website Settings"}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
