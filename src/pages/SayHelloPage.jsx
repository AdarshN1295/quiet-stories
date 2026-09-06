import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Leaf,
  Mail,
  Menu,
  Moon,
  PenLine,
  Sun,
  Sunset,
  User,
  X,
} from "lucide-react";
import "./HomePage.css";
import "./SayHelloPage.css";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { seo } from "../data/seo";

function InstagramIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const WEB3FORMS_ACCESS_KEY = "775677a8-715e-4aa4-9e65-1b63ba4cf796";

function SayHelloPage() {
  useDocumentMeta(seo.sayHello);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
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

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const cycleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "evening" : current === "evening" ? "light" : "dark"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className={`site ${theme}`}>

      {/* Grain Overlay */}
      <div className="grain" />

      {/* Success popup */}
      {status === "success" && (
        <div className="hello-toast" role="status">
          <p className="hello-toast-text">
            Got it — thank you for the little hello. I'll write back soon.
          </p>
          <button
            className="hello-toast-close"
            onClick={() => setStatus("idle")}
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}

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

          <Link to="/notes">
            A Note
          </Link>

          <Link to="/say-hello" className="active">
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

              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/stories" onClick={() => setMenuOpen(false)}>
                Stories
              </Link>

              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>

              <Link to="/notes" onClick={() => setMenuOpen(false)}>
                A Note
              </Link>

              <Link to="/say-hello" onClick={() => setMenuOpen(false)}>
                Say Hello
              </Link>

            </nav>

            <p className="script menu-signature">
              Good stories never really end...
            </p>

          </div>
        </div>
      )}


      {/* ================= SAY HELLO ================= */}
      <section ref={heroRef} className="section hello-section">

        <div className="hello-note-top script">
          Same stories
          <br />
          begin with a hello...
        </div>

        <div className="hello-note-side script">
          Good
          <br />
          people make
          <br />
          better stories.
        </div>

        <div className="hello-photo">
          <img
            src="https://images.unsplash.com/photo-1784876403638-c27558b82854?auto=format&fit=crop&w=900&q=80"
            alt="A rainy evening view from a quiet window"
          />
          <div className="hello-photo-shade" />
          <p className="hello-photo-note script">
            Same strangers.
            <br />
            Brighter days.
            <span className="note-line" />
          </p>
        </div>

        <div className="hello-copy">

          <p className="eyebrow">A little hello</p>

          <h1 className="hello-title">
            Say Hello
            <Heart className="hello-heart" size={26} />
          </h1>

          <p className="hello-intro">
            If a story made you smile, think, remember, or feel
            something... I'd love to hear from you.
          </p>

          <form className="hello-form" onSubmit={handleSubmit}>

            <label className="hello-field">
              <User size={16} />
              <span className="hello-field-text">
                <span className="hello-field-label">Your name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="What should I call you?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </span>
            </label>

            <label className="hello-field">
              <Mail size={16} />
              <span className="hello-field-text">
                <span className="hello-field-label">Your email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Where can I write back?"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </span>
            </label>

            <label className="hello-field hello-field-message">
              <PenLine size={16} />
              <span className="hello-field-text">
                <span className="hello-field-label-row">
                  <span className="hello-field-label">Your message</span>
                  <ChevronDown size={14} />
                </span>
                <textarea
                  name="message"
                  placeholder="Leave a little note..."
                  maxLength={500}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                />
              </span>
              <span className="hello-char-count">{message.length}/500</span>
            </label>

            <button type="submit" className="hello-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send a little hello"}
              <ArrowRight size={16} />
            </button>

            {status === "error" && (
              <p className="hello-status hello-status-error">
                Something went wrong sending that. Mind trying again?
              </p>
            )}

          </form>

          <p className="hello-footnote mt-4">
            <Leaf size={14} />
            <span>
              You don't need a reason to write.
              <br />
              A simple hello is enough.
            </span>
          </p>

        </div>

      </section>


      {/* ================= SAY HELLO ELSEWHERE ================= */}
      <section className="section hello-elsewhere-section">

        <div className="hello-elsewhere">

          <div className="hello-elsewhere-left">

            <h3>Or say hello somewhere else</h3>
            <p>Same person. Just different places.</p>

            <div className="hello-elsewhere-links">

              <a
                href="#"
                className="hello-pill"
              >
                <InstagramIcon size={16} />
                Instagram
                <ArrowRight size={14} />
              </a>

              <a
                href="#"
                className="hello-pill"
              >
                <Mail size={16} />
                Email
                <ArrowRight size={14} />
              </a>

            </div>

          </div>

          <div className="hello-elsewhere-divider" />

          <div className="hello-elsewhere-right">
            <p className="script">
              “Every message is a little story
              <br />
              I get to be a part of.”
              <span className="note-line" />
            </p>
            <Heart size={14} fill="currentColor" />
          </div>

        </div>

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

export default SayHelloPage;
