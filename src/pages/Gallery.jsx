
import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";

import {
  X,
  Maximize2,
  RefreshCw,
  Images,
} from "lucide-react";

import "./Gallery.css";

const API_URL = "https://school-management-backend-jcoe.onrender.com/api/gallery";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  const [filter, setFilter] = useState("All");

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // CATEGORIES
  // ==========================================

  const categories = [
    "All",
    "Campus",
    "Activities",
    "Sports",
    "Events",
  ];

  // ==========================================
  // FETCH GALLERY FROM BACKEND
  // ==========================================

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch gallery"
        );
      }

      setGallery(data.gallery || []);
    } catch (error) {
      console.error(
        "Fetch Gallery Error:",
        error
      );

      setError(
        "Unable to load gallery. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD GALLERY ON PAGE LOAD
  // ==========================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // ==========================================
  // FILTER GALLERY
  // ==========================================

  const filteredGallery =
    filter === "All"
      ? gallery
      : gallery.filter(
          (item) =>
            item.category === filter
        );

  // ==========================================
  // OPEN LIGHTBOX
  // ==========================================

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  // ==========================================
  // CLOSE LIGHTBOX
  // ==========================================

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="inner-page">

      {/* ======================================
          HERO
      ====================================== */}

      <section className="page-hero">
        <div>

          <span>
            GALLERY
          </span>

          <h1>
            Life At
            <br />
            Bright Future
          </h1>

          <p>
            A glimpse into our campus,
            activities and unforgettable moments.
          </p>

        </div>
      </section>


      {/* ======================================
          GALLERY SECTION
      ====================================== */}

      <section className="gallery-page-section">

        <SectionTitle
          eyebrow="PHOTO GALLERY"
          title="Explore School Life"
          description="Take a look at the experiences that make our school community special."
        />


        {/* ====================================
            FILTERS
        ==================================== */}

        <div className="gallery-filters">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              className={
                filter === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* ====================================
            LOADING
        ==================================== */}

        {loading && (

          <div className="gallery-page-message">

            <RefreshCw
              size={30}
              className="gallery-page-spin"
            />

            <p>
              Loading gallery...
            </p>

          </div>

        )}


        {/* ====================================
            ERROR
        ==================================== */}

        {!loading && error && (

          <div className="gallery-page-message">

            <Images size={38} />

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={fetchGallery}
            >
              Try Again
            </button>

          </div>

        )}


        {/* ====================================
            EMPTY
        ==================================== */}

        {!loading &&
          !error &&
          filteredGallery.length === 0 && (

            <div className="gallery-page-message">

              <Images size={45} />

              <h3>
                No Images Available
              </h3>

              <p>
                There are no gallery images
                in this category yet.
              </p>

            </div>

          )}


        {/* ====================================
            GALLERY GRID
        ==================================== */}

        {!loading &&
          !error &&
          filteredGallery.length > 0 && (

            <div className="gallery-page-grid">

              {filteredGallery.map((item) => (

                <div
                  className="gallery-page-item"
                  key={item._id}
                  onClick={() =>
                    openLightbox(item)
                  }
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />


                  {/* OVERLAY */}

                  <div className="gallery-page-overlay">

                    <div>

                      <h3>
                        {item.title}
                      </h3>

                      <span>
                        {item.category}
                      </span>

                    </div>

                    <Maximize2 size={20} />

                  </div>

                </div>

              ))}

            </div>

          )}

      </section>


      {/* ======================================
          LIGHTBOX
      ====================================== */}

      {selectedImage && (

        <div
          className="lightbox"
          onClick={closeLightbox}
        >

          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image"
          >
            <X size={27} />
          </button>


          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            onClick={(e) =>
              e.stopPropagation()
            }
          />

        </div>

      )}

    </div>
  );
};

export default Gallery;
