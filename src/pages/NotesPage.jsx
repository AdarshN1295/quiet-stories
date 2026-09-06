import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Heart,
  Mail,
  Menu,
  Moon,
  Quote,
  Star,
  Sun,
  Sunset,
  Users,
  X,
} from "lucide-react";
import "./HomePage.css";
import "./AboutPage.css";
import "./NotesPage.css";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { seo } from "../data/seo";

const kindness = [
  {
    icon: Heart,
    title: "Thank You",
    text: "To every reader who takes the time to be here.",
  },
  {
    icon: Compass,
    title: "Keep Imagining",
    text: "Because imagination makes life a little kinder.",
  },
  {
    icon: Users,
    title: "Share the Feelings",
    text: "If a story made you feel something, share it with someone who might need it too.",
  },
  {
    icon: Star,
    title: "Stay A While",
    text: "There are many more stories waiting for you.",
  },
];

function NotesPage() {
  useDocumentMeta(seo.notes);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const cycleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "evening" : current === "evening" ? "light" : "dark"
    );
  };

  return (
    <main className={`site ${theme} about-page`}>

      {/* Continuous background photo behind the whole page */}
      <div className="about-bg" />
      <div className="about-bg-overlay" />

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

          <Link to="/stories">
            Stories
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/notes" className="active">
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


      {/* ================= NOTE HERO ================= */}
      <section
        ref={heroRef}
        className="hero about-hero note-hero"
      >

        <div className="hero-note hero-note-left script">
          Just a small note...
          <br />
          To anyone who's here...
          <br />
          Thank you...
          <span className="note-line" />
        </div>

        <div className="hero-copy">

          <h1>A Note</h1>

          <p className="hero-subtitle">
            A few words from this side of the screen.{' '}
            <br className="desktop-only" />
            Because some things are better said quietly.
          </p>

        </div>

        <div className="hero-note script">
          “Not all stories have an ending,
          <br />
          but they still matter.”
          <span className="idea-quote-sign">T.S.T.N.H.</span>
        </div>

      </section>


      {/* ================= DEAR READER ================= */}
      <section className="section idea-section">

        <div className="idea-image">
          <img
            src="https://images.unsplash.com/photo-1754697831323-6d51e460ba8f?auto=format&fit=crop&w=900&q=80"
            alt="A lantern beside a stack of books and an open journal"
          />
        </div>

        <div className="idea-copy">

          <h2 className="letter-heading">Dear Reader,</h2>

          <p>
            If you're here, it means you were curious enough to explore a
            place filled with stories that never happened — and that means
            a lot.
          </p>

          <p>
            This space is a small part of me. A place where thoughts,
            feelings, imaginations, and "what ifs" find a home. These
            aren't real stories, but the emotions are very real.
          </p>

          <p>
            I created QuietStories (T.S.T.N.H.) as a reminder that it's
            okay to imagine, to feel deeply, to get lost in thoughts, and
            to appreciate the little moments — even if they only exist in
            our minds.
          </p>

          <p>
            So, thank you. For being here. For reading. For feeling. For
            making this little corner of the internet feel alive.
          </p>

          <p className="script creator-signed">
            <span className="text-[1.45rem]">— Adarsh</span> <Heart size={14} fill="currentColor" />
          </p>

        </div>

        {/* <div className="idea-quote">
          <Quote className="idea-quote-icon" size={22} />
          <p>
            There are so many beautiful things in the world that never
            happen, but still deserve to be told.
          </p>
          <span className="idea-quote-sign">T.S.T.N.H.</span>
        </div> */}

      </section>


      {/* ================= KINDNESS CARDS ================= */}
      <section className="section feature-section">

        <div className="feature-grid">
          {kindness.map(({ icon: Icon, title, text }) => (
            <div className="feature-card" key={title}>
              <Icon size={20} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer id="note" className="site-footer about-footer">

        <div className="footer-top">

          <p className="footer-note script">
            Same sky...
            <br />
            Different people...
            <br />
            A little more kinder...
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
            Thanks for being a part
            <br />
            of this quiet journey...
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

export default NotesPage;
