
import { useEffect, useState } from "react";

import "./GalleryPreview.css";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  Images,
  RefreshCw,
} from "lucide-react";

const API_URL = "https://school-management-backend-jcoe.onrender.com/api/gallery";

const GalleryPreview = () => {

  const [galleryImages, setGalleryImages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // FETCH GALLERY
  // ==========================================

  const fetchGallery = async () => {

    try {

      setLoading(true);

      const response =
        await fetch(API_URL);

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch gallery"
        );
      }

      /*
        Backend newest images first bhej raha hai.

        slice(0, 4) se Home page par
        sirf 4 images show hongi.
      */

      setGalleryImages(
        (data.gallery || []).slice(0, 4)
      );

    } catch (error) {

      console.error(
        "Gallery Preview Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    fetchGallery();

  }, []);


  return (

    <section className="gallery-preview">

      <div className="gallery-container">


        {/* ====================================
            HEADER
        ==================================== */}

        <div className="gallery-header">

          <div>

            <span className="section-eyebrow">
              SCHOOL LIFE
            </span>

            <h2>
              Moments That Matter
            </h2>

            <p>
              Explore the vibrant life,
              activities and memories of
              our school community.
            </p>

          </div>


          <Link
            to="/gallery"
            className="gallery-link"
          >

            View Full Gallery

            <ArrowRight size={18} />

          </Link>

        </div>


        {/* ====================================
            LOADING
        ==================================== */}

        {loading && (

          <div className="gallery-preview-loading">

            <RefreshCw
              size={25}
              className="gallery-preview-spin"
            />

            <span>
              Loading gallery...
            </span>

          </div>

        )}


        {/* ====================================
            EMPTY
        ==================================== */}

        {!loading &&
          galleryImages.length === 0 && (

            <div className="gallery-preview-empty">

              <Images size={35} />

              <p>
                No gallery images available.
              </p>

            </div>

          )}


        {/* ====================================
            GALLERY GRID
        ==================================== */}

        {!loading &&
          galleryImages.length > 0 && (

            <div className="gallery-grid">

              {galleryImages.map((item) => (

                <Link
                  to="/gallery"
                  className="gallery-item"
                  key={item._id}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />


                  <div className="gallery-overlay">

                    <div>

                      <Images size={20} />

                      <h3>
                        {item.title}
                      </h3>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}

      </div>

    </section>

  );

};

export default GalleryPreview;
