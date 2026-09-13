
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SectionTitle from "../components/SectionTitle";
import NoticeBoard from "../components/NoticeBoard";
import EventCard from "../components/EventCard";
import Testimonial from "../components/Testimonial";
import GalleryPreview from "../components/GalleryPreview";
import Achievement from "../components/Achievement";
import CTA from "../components/CTA";
import News from "./News";

import "./Home.css";

import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Users,
  Lightbulb,
  Heart,
  ShieldCheck,
  Globe
} from "lucide-react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* ==============================
          HERO
      ============================== */}
      <Hero />

      {/* ==============================
          STATS
      ============================== */}
      <Stats />

      {/* ==============================
          ABOUT PREVIEW
      ============================== */}
      <section className="home-about">
        <div className="home-about-container">

          <div className="home-about-image">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
              alt="Bright Future International School campus"
            />

            <div className="experience-card">
              <strong>25+</strong>

              <span>
                Years of
                <br />
                Excellence
              </span>
            </div>
          </div>

          <div className="home-about-content">

            <span className="section-eyebrow">
              ABOUT OUR SCHOOL
            </span>

            <h2>
              Where Learning
              <span> Meets Possibilities</span>
            </h2>

            <p>
              Bright Future International School
              is committed to providing a holistic
              learning experience that prepares
              students not only for examinations,
              but for life.
            </p>

            <p>
              Through innovative teaching,
              technology-enabled classrooms,
              sports, arts and leadership
              opportunities, we help every student
              discover their unique potential.
            </p>

            <div className="about-features">

              <div>
                <CheckCircle2 size={18} />
                <span>Student-Centered Learning</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Experienced Faculty</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Modern Infrastructure</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Holistic Development</span>
              </div>

            </div>

            <Link
              to="/about"
              className="learn-more-btn"
            >
              Discover Our Story
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </section>

      {/* ==============================
          ACADEMIC PROGRAMS
      ============================== */}
      <section className="program-section">
        <div className="program-container">

          <SectionTitle
            eyebrow="ACADEMIC PROGRAMS"
            title="Learning For Every Stage"
            description="Thoughtfully designed academic programs that help students grow academically, socially and personally."
          />

          <div className="program-grid">

            {/* PRIMARY */}
            <article className="program-card">

              <div className="program-icon">
                🌱
              </div>

              <span className="program-number">
                01
              </span>

              <h3>
                Primary School
              </h3>

              <p>
                Building strong foundations
                through curiosity, creativity
                and joyful learning.
              </p>

              <Link to="/academics">
                Explore Program
                <ArrowRight size={16} />
              </Link>

            </article>

            {/* MIDDLE */}
            <article className="program-card">

              <div className="program-icon">
                🚀
              </div>

              <span className="program-number">
                02
              </span>

              <h3>
                Middle School
              </h3>

              <p>
                Developing critical thinking,
                collaboration and confidence
                through experiential learning.
              </p>

              <Link to="/academics">
                Explore Program
                <ArrowRight size={16} />
              </Link>

            </article>

            {/* SENIOR */}
            <article className="program-card">

              <div className="program-icon">
                🎯
              </div>

              <span className="program-number">
                03
              </span>

              <h3>
                Senior School
              </h3>

              <p>
                Preparing students for higher
                education, careers and
                responsible citizenship.
              </p>

              <Link to="/academics">
                Explore Program
                <ArrowRight size={16} />
              </Link>

            </article>

          </div>
        </div>
      </section>

      {/* ==============================
          WHY CHOOSE US
      ============================== */}
      <section className="why-section">
        <div className="why-container">

          <SectionTitle
            eyebrow="WHY BRIGHT FUTURE"
            title="More Than Just A School"
            description="We believe education should prepare children for the real world while helping them enjoy the journey."
          />

          <div className="why-grid">

            <div className="why-card">
              <div className="why-icon">
                <BookOpen />
              </div>

              <h3>
                Modern Learning
              </h3>

              <p>
                Technology-enabled classrooms
                and innovative teaching methods.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <Users />
              </div>

              <h3>
                Expert Teachers
              </h3>

              <p>
                Dedicated educators focused on
                every child's individual growth.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <Lightbulb />
              </div>

              <h3>
                Innovation
              </h3>

              <p>
                Encouraging creativity, curiosity
                and problem-solving skills.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <Heart />
              </div>

              <h3>
                Holistic Growth
              </h3>

              <p>
                Equal focus on academics, sports,
                arts and character development.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <ShieldCheck />
              </div>

              <h3>
                Safe Environment
              </h3>

              <p>
                A secure, inclusive and welcoming
                environment for every student.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <Globe />
              </div>

              <h3>
                Global Outlook
              </h3>

              <p>
                Preparing students to confidently
                participate in a connected world.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==============================
          NOTICE BOARD
      ============================== */}
      <NoticeBoard />

      {/* ==============================
          NEWS
      ============================== */}
      <News />

      {/* ==============================
          EVENTS
      ============================== */}
      <section className="events-section">
        <div className="events-container">

          <SectionTitle
            eyebrow="UPCOMING EVENTS"
            title="What's Happening At School"
            description="Stay updated with important school events, activities and celebrations."
          />

          <div className="events-grid">

            {/* EVENT 1 */}
            <EventCard
              id="event-001"
              date="15"
              month="SEP"
              title="Inter School Football Championship"
              location="Main Sports Ground"
              time="09:00 AM"
              description="Students can participate in the Inter School Football Championship and showcase their sports skills."
            />

            {/* EVENT 2 */}
            <EventCard
              id="event-002"
              date="20"
              month="SEP"
              title="Annual Science Exhibition"
              location="Science Block"
              time="10:00 AM"
              description="Students will present innovative science projects and creative experiments at the Annual Science Exhibition."
            />

            {/* EVENT 3 */}
            <EventCard
              id="event-003"
              date="28"
              month="SEP"
              title="Parent Teacher Meeting"
              location="School Auditorium"
              time="11:00 AM"
              description="Parents can meet teachers and discuss their child's academic performance and overall development."
            />

          </div>
        </div>
      </section>

      {/* ==============================
          ACHIEVEMENTS
      ============================== */}
      <Achievement />

      {/* ==============================
          GALLERY
      ============================== */}
      <GalleryPreview />

      {/* ==============================
          TESTIMONIALS
      ============================== */}
      <Testimonial />

      {/* ==============================
          CTA
      ============================== */}
      <CTA />
    </>
  );
};

export default Home;
