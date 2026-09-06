import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  ChevronRight,
  Heart,
  Mail,
  Menu,
  Moon,
  Search,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Sunset,
  X,
} from "lucide-react";
import { stories } from "../data/stories.js";
import "./HomePage.css";
import "./StoriesPage.css";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { seo } from "../data/seo";

const categories = [
  "All",
  "Adventure",
  "Romance",
  "Friendship",
  "Slice of Life",
  "Fantasy",
  "Hope",
];
function StoriesPage() {
  useDocumentMeta(seo.stories);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleBookmark = (no) => {
    setBookmarked((current) =>
      current.includes(no) ? current.filter((item) => item !== no) : [...current, no]
    );
  };

  const cycleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "evening" : current === "evening" ? "light" : "dark"
    );
  };

  const pickRandomStory = () => {
    const random = stories[Math.floor(Math.random() * stories.length)];
    navigate(`/stories/${random.no}`);
  };

  const filteredStories = stories.filter((story) => {
    const matchesFilter = activeFilter === "All" || story.tags.includes(activeFilter);
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      story.title.toLowerCase().includes(query) ||
      story.tagline.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <main className={`site ${theme}`}>

      {/* Grain Overlay */}
      <div className="grain" />

      {/* ================= HEADER ================= */}
      <header className={`topbar${scrolled ? " scrolled" : ""}`}>

        <Link
          to="/"
          className="brand"
          aria-label="QuietStories Home"
        >
          <span className="brand-name">QuietStories</span>
          <span className="brand-abbr">T.S.T.N.H.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/">
            Home
          </Link>

          <Link to="/stories" className="active">
            Stories
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/notes">
            A Note
          </Link>

          <Link to="/say-hello">
            Say Hello
          </Link>
        </nav>

        <div className="top-actions">

          {/* Desktop handwritten quote */}
          <span className="script desktop-quote">
            Good stories never really end...
          </span>

          {/* Theme toggle */}
          <button
            className="theme-btn"
            onClick={cycleTheme}
            aria-label="Switch theme"
          >
            {theme === "dark" && <Moon size={15} />}
            {theme === "evening" && <Sunset size={15} className="icon-evening" />}
            {theme === "light" && <Sun size={15} />}
          </button>

          {/* Mobile menu */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

        </div>
      </header>


      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="mobile-menu">

          <div className="mobile-menu-inner">

            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            <span className="brand brand-center">
              <span className="brand-name">QuietStories</span>
              <span className="brand-abbr">T.S.T.N.H.</span>
            </span>

            <nav>

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/stories"
                onClick={() => setMenuOpen(false)}
              >
                Stories
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/notes"
                onClick={() => setMenuOpen(false)}
              >
                A Note
              </Link>

              <Link
                to="/say-hello"
                onClick={() => setMenuOpen(false)}
              >
                Say Hello
              </Link>

            </nav>

            <p className="script menu-signature">
              Good stories never really end...
            </p>

          </div>
        </div>
      )}


      {/* ================= STORIES HERO ================= */}
      <section
        id="stories-hero"
        ref={heroRef}
        className="hero stories-hero"
      >

        <div className="hero-bg stories-hero-bg" />

        <div className="hero-overlay" />

        <div className="hero-note hero-note-left script">
          Different people
          <br />
          Different places
          <br />
          Different feelings
          <br />
          Some stories never happened...
        </div>

        <div className="hero-copy">

          <h1>Stories</h1>

          <p className="hero-subtitle">
            A collection of moments that existed somewhere{' '}
            <br className="desktop-only" />
            between imagination and reality.
          </p>

        </div>

        <div className="hero-note script">
          “Some stories stay with you,
          <br />
          even though they never happened..”
          <span className="note-line" />
        </div>

      </section>


      {/* ================= FILTERS ================= */}
      <div className="stories-search-bar">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search for a feeling..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="filter-bar">

        <div className="filter-pills">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-pill${activeFilter === category ? " active" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}

          <button className="filter-pill pill-random" onClick={pickRandomStory}>
            <Shuffle size={13} />
            Pick Randomly
          </button>
        </div>

        <button className="filter-more" aria-label="More filters">
          <SlidersHorizontal size={15} />
        </button>

      </div>


      {/* ================= STORIES GRID ================= */}
      <section className="section stories-section">

        {filteredStories.length === 0 ? (
          <p className="no-results">No stories match that feeling yet.</p>
        ) : (
          <div className="stories-grid">

            {filteredStories.map((story) => (

              <article
                className="story-tile"
                key={story.no}
                onClick={() => navigate(`/stories/${story.no}`)}
              >

                <div className="tile-image">

                  <img
                    src={story.image}
                    alt={story.title}
                  />

                  <button
                    className="bookmark-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleBookmark(story.no);
                    }}
                    aria-label="Bookmark story"
                  >
                    <Bookmark
                      size={14}
                      fill={bookmarked.includes(story.no) ? "currentColor" : "none"}
                    />
                  </button>

                </div>

                <div className="tile-body">

                  <span className="story-no">{story.no}</span>

                  <h3>{story.title}</h3>

                  <p>{story.tagline}</p>

                  <div className="tags">
                    <span>
                      <Sparkles size={11} />
                      {story.tags[0]}
                    </span>
                    <span>
                      <Heart size={11} />
                      {story.tags[1]}
                    </span>
                  </div>

                  <span className="read-link">
                    Read Story
                    <ArrowRight size={14} />
                  </span>

                </div>

                <ChevronRight className="tile-chevron" size={18} />

              </article>

            ))}

          </div>
        )}

      </section>


      {/* ================= FOOTER ================= */}
      <footer id="about" className="site-footer">

        <div className="footer-bg" />
        <div className="footer-overlay" />

        <div className="footer-top">

          <p className="footer-note script">
            Thanks for being here.
            <br />
            For reading, for feeling,
            <br />
            for imagining...
          </p>

          <div className="footer-brand">

            <h2 className="footer-title">QuietStories</h2>

            <span className="footer-abbr">T.S.T.N.H.</span>

            <p className="footer-tagline">
              Some stories are written. Some are lived.
              <br />
              Some are simply imagined beautifully.
            </p>

            <div className="footer-socials">

              <a href="mailto:quietstories.tstnh@gmail.com" aria-label="Email">
                <Mail size={16} />
              </a>

            </div>

          </div>

          <p className="footer-quote script">
            “A little corner of the internet
            <br />
            for stories that never happened.”
            <span className="footer-signed">
              — Adarsh <Heart size={12} fill="currentColor" />
            </span>
          </p>

        </div>


        <div className="footer-bottom">

          <nav className="footer-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/stories">
              Stories
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/notes">
              A Note
            </Link>

            <a href="/say-hello">
              Say Hello
            </a>

          </nav>

          <p className="copyright">
            © 2026 QuietStories. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}

export default StoriesPage;
