import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Cloud,
  Compass,
  Heart,
  Leaf,
  Mail,
  Menu,
  Moon,
  Star,
  Sun,
  Sunset,
  Users,
  X,
} from "lucide-react";
import "./HomePage.css";
import "./AboutPage.css";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { seo } from "../data/seo";

const features = [
  {
    icon: BookOpen,
    title: "Imagination",
    text: "A place where “what if” feels real.",
  },
  {
    icon: Heart,
    title: "Emotions",
    text: "Stories about the feelings we all understand.",
  },
  {
    icon: Compass,
    title: "Connection",
    text: "Different people. Same feelings.",
  },
  {
    icon: Star,
    title: "A Kinder You",
    text: "A reminder that it's okay to feel, to dream, to imagine.",
  },
];

const beliefs = [
  { icon: Heart, text: "Kindness makes everything better." },
  { icon: Users, text: "Every person has a story worth telling." },
  { icon: Cloud, text: "It's okay to live in your imagination sometimes." },
  { icon: Leaf, text: "The little moments matter the most." },
  { icon: Star, text: "Stories can heal, even if they never happened." },
];

function AboutPage() {
  useDocumentMeta(seo.about);
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

          <Link to="/about" className="active">
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


      {/* ================= ABOUT HERO ================= */}
      <section
        ref={heroRef}
        className="hero about-hero"
      >

        <div className="hero-note hero-note-left script">
          Same person.
          <br />
          Different stories.
          <br />
          Still here...
          <span className="note-line" />
        </div>

        <div className="hero-copy">

          <p className="eyebrow">A little more about</p>

          <h1>QuietStories</h1>

          <span className="hero-abbr">T.S.T.N.H.</span>

          <p className="hero-subtitle">
            The thoughts behind the stories.
          </p>

        </div>

        <div className="hero-note script">
          “Just a person
          <br />
          who imagines a little more
          <br />
          than usual...”
          <span className="note-line" />
        </div>

      </section>


      {/* ================= THE IDEA ================= */}
      <section className="section idea-section">

        <div className="idea-image">
          <img
            src="https://images.unsplash.com/photo-1754697831323-6d51e460ba8f?auto=format&fit=crop&w=900&q=80"
            alt="A cozy corner with a lantern and stacked books"
          />
        </div>

        <div className="idea-copy">

          <p className="eyebrow">The idea</p>

          <h2>Why QuietStories?</h2>

          <p>Because not every story needs to be loud.</p>

          <p>
            Some stories happen in crowded places. Some happen between two
            strangers. And some never happen at all.
          </p>

          <p>
            There are conversations we imagine having, places we've never
            been, people we never met, and moments we sometimes wonder
            “what if?” about. QuietStories is a little space for those moments. It's a
            collection of imagined stories, quiet possibilities, unexpected
            encounters, and feelings that are difficult to put into words.
          </p>

          <p>
            Not everything here is meant to be realistic. Some stories may
            be impossible. Some may feel strangely familiar. But perhaps
            that's the point.
          </p>

          <p>
            Because sometimes, a story doesn't need to happen in real life
            to make us feel something real.
          </p>

          <p>
            Maybe you'll find a story that reminds you of someone. Maybe
            you'll imagine yourself somewhere you've never been. Maybe
            you'll simply spend a few quiet minutes here.
          </p>

          <p>
            And if even one story stays with you after you leave, then it
            has already found its purpose.
          </p>

        </div>

      </section>


      {/* ================= FEATURE CARDS ================= */}
      <section className="section feature-section">

        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <div className="feature-card" key={title}>
              <Icon size={20} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

      </section>


      {/* ================= THE CREATOR ================= */}
      <section className="section creator-section">

        <div className="creator-copy">

          <p className="eyebrow">The creator</p>

          <h2>Just a Storyteller</h2>

          <p>
            I'm just a regular person who notices things — conversations,
            glances, places, songs, silence... and turns them into stories.
          </p>

          <p>These aren't real stories. But the feelings are.</p>

          <p>Thanks for being here.</p>

          <p className="script creator-signed">
           <span className="text-[1.05rem]"> — Adarsh</span> <Heart size={14} fill="currentColor" />
          </p>

        </div>

        <div className="creator-image">
          <img
            src="https://images.unsplash.com/photo-1559837058-eda3a0dacb3e?auto=format&fit=crop&w=900&q=80"
            alt="Silhouette overlooking the city at dusk"
          />
          <div className="creator-image-shade" />
          <p className="creator-image-note script">
            Same skies.
            <br />
            Different thoughts.
            <br />
            A little more stories...
            <span className="note-line" />
          </p>
        </div>

        <div className="beliefs">

          <p className="eyebrow">A few things I believe in</p>

          <ul>
            {beliefs.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={15} />
                <span>{text}</span>
              </li>
            ))}
          </ul>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer id="about" className="site-footer about-footer">

        <div className="footer-top">

          <p className="footer-note script">
            Thanks for stopping by.
            <br />
            It means more than you know.
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
            A little corner of the internet
            <br />
            for stories that never happened.
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

export default AboutPage;
