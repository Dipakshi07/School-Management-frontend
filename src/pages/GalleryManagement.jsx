import { useEffect, useState } from "react";
import {
  Images,
  Plus,
  Trash2,
  RefreshCw,
  X,
} from "lucide-react";
import "./GalleryManagement.css";

const API_URL = "http://localhost:5000/api/gallery";

const GalleryManagement = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Campus",
    image: "",
  });

  // ==========================================
  // TOKEN
  // ==========================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken")
    );
  };

  // ==========================================
  // FETCH GALLERY
  // ==========================================

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      console.log("Gallery API Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch gallery"
        );
      }

      setGallery(data.gallery || []);
    } catch (error) {
      console.error("Gallery Fetch Error:", error);

      setError(
        error.message || "Failed to load gallery."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD GALLERY
  // ==========================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD IMAGE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const token = getToken();

    if (!token) {
      setError("Please login again.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Image title is required.");
      return;
    }

    if (!formData.image.trim()) {
      setError("Image URL is required.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: formData.title.trim(),
          category: formData.category,
          image: formData.image.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add image"
        );
      }

      setSuccess(
        "Gallery image added successfully."
      );

      setFormData({
        title: "",
        category: "Campus",
        image: "",
      });

      setShowForm(false);

      await fetchGallery();
    } catch (error) {
      console.error("Add Image Error:", error);

      setError(
        error.message || "Failed to add image."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) {
      setError("Please login again.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete image"
        );
      }

      setSuccess(
        "Gallery image deleted successfully."
      );

      await fetchGallery();
    } catch (error) {
      console.error("Delete Image Error:", error);

      setError(
        error.message || "Failed to delete image."
      );
    }
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const closeForm = () => {
    setShowForm(false);

    setFormData({
      title: "",
      category: "Campus",
      image: "",
    });
  };

  // ==========================================
  // CATEGORY COUNT
  // ==========================================

  const categoryCount = [
    ...new Set(
      gallery.map((item) => item.category)
    ),
  ].length;

  return (
    <div className="gallery-management">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="gallery-management-header">

        <div className="gallery-management-title">

          <div className="gallery-title-icon">
            <Images size={25} />
          </div>

          <div>
            <h2>Gallery Management</h2>

            <p>
              Manage images displayed on the
              school website.
            </p>
          </div>

        </div>

        <div className="gallery-management-actions">

          <button
            type="button"
            className="gallery-refresh-btn"
            onClick={fetchGallery}
          >
            <RefreshCw size={17} />

            Refresh
          </button>

          <button
            type="button"
            className="gallery-add-btn"
            onClick={() =>
              setShowForm((prev) => !prev)
            }
          >
            {showForm ? (
              <X size={18} />
            ) : (
              <Plus size={18} />
            )}

            {showForm ? "Close" : "Add Image"}
          </button>

        </div>

      </div>


      {/* ======================================
          SUCCESS
      ====================================== */}

      {success && (
        <div className="gallery-alert gallery-success">
          <strong>✓</strong>
          {success}
        </div>
      )}


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div className="gallery-alert gallery-error">
          <strong>!</strong>
          {error}
        </div>
      )}


      {/* ======================================
          ADD FORM
      ====================================== */}

      {showForm && (
        <form
          className="gallery-form"
          onSubmit={handleSubmit}
        >

          <div className="gallery-form-heading">

            <h3>Add New Gallery Image</h3>

            <p>
              Add an image to the school gallery.
            </p>

          </div>


          <div className="gallery-form-grid">

            {/* TITLE */}

            <div className="gallery-form-group">

              <label>
                Image Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="School Annual Function"
              />

            </div>


            {/* CATEGORY */}

            <div className="gallery-form-group">

              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                <option value="Campus">
                  Campus
                </option>

                <option value="Activities">
                  Activities
                </option>

                <option value="Sports">
                  Sports
                </option>

                <option value="Events">
                  Events
                </option>

              </select>

            </div>


            {/* IMAGE URL */}

            <div className="gallery-form-group gallery-full">

              <label>
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />

              <small>
                Use a publicly accessible image URL.
              </small>

            </div>

          </div>


          {/* IMAGE PREVIEW */}

          {formData.image && (
            <div className="gallery-preview">

              <p>Preview</p>

              <img
                src={formData.image}
                alt="Preview"
              />

            </div>
          )}


          <div className="gallery-form-buttons">

            <button
              type="button"
              className="gallery-cancel-btn"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="gallery-save-btn"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <RefreshCw
                    size={16}
                    className="gallery-spin"
                  />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Image
                </>
              )}
            </button>

          </div>

        </form>
      )}


      {/* ======================================
          STATS
      ====================================== */}

      <div className="gallery-stats">

        <div className="gallery-stat-card">

          <div className="gallery-stat-icon">
            <Images size={22} />
          </div>

          <div>
            <span>Total Images</span>
            <strong>{gallery.length}</strong>
          </div>

        </div>


        <div className="gallery-stat-card">

          <div className="gallery-stat-icon">
            <Images size={22} />
          </div>

          <div>
            <span>Categories</span>
            <strong>{categoryCount}</strong>
          </div>

        </div>

      </div>


      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (
        <div className="gallery-loading">

          <RefreshCw
            size={35}
            className="gallery-spin"
          />

          <p>
            Loading gallery images...
          </p>

        </div>
      )}


      {/* ======================================
          EMPTY
      ====================================== */}

      {!loading && gallery.length === 0 && (
        <div className="gallery-empty">

          <Images size={50} />

          <h3>No Images Found</h3>

          <p>
            Add images to display them here.
          </p>

          <button
            type="button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={17} />
            Add Image
          </button>

        </div>
      )}


      {/* ======================================
          IMAGE GRID
      ====================================== */}

      {!loading && gallery.length > 0 && (

        <div className="gallery-management-grid">

          {gallery.map((item) => (

            <div
              className="gallery-management-card"
              key={item._id}
            >

              {/* IMAGE */}

              <div className="gallery-management-image">

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    console.error(
                      "Image failed:",
                      item.image
                    );

                    e.currentTarget.style.display =
                      "none";

                    e.currentTarget
                      .parentElement
                      .classList.add(
                        "gallery-image-broken"
                      );
                  }}
                />

                <div className="gallery-broken-image">

                  <Images size={35} />

                  <span>
                    Image could not be loaded
                  </span>

                </div>

              </div>


              {/* CONTENT */}

              <div className="gallery-card-content">

                <span className="gallery-category">
                  {item.category}
                </span>

                <h3>
                  {item.title}
                </h3>

                <button
                  type="button"
                  className="gallery-delete-btn"
                  onClick={() =>
                    handleDelete(item._id)
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

export default GalleryManagement;