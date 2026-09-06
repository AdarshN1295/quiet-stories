import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Heart,
  LayoutGrid,
  Mail,
  Menu,
  Moon,
  Pause,
  Play,
  Share2,
  Sparkles,
  Sun,
  Sunset,
  X,
} from "lucide-react";
import { getAdjacentStories, getRelatedStories, getStoryByNo } from "../data/stories.js";
import "./HomePage.css";
import "./AboutPage.css";
import "./StoryPage.css";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { getStorySEO } from "../data/seo";

// Picks up any .mp3 files dropped into src/music — no code changes needed
// to add, remove, or rename tracks.
const musicModules = import.meta.glob("/src/music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
});
const musicTracks = Object.values(musicModules);

function pickRandomTrack(excludeTrack) {
  if (musicTracks.length === 0) return null;
  const options =
    musicTracks.length > 1 && excludeTrack
      ? musicTracks.filter((track) => track !== excludeTrack)
      : musicTracks;
  return options[Math.floor(Math.random() * options.length)];
}

function StoryPage() {
  const { no } = useParams();
  const story = getStoryByNo(no);
  useDocumentMeta(getStorySEO(story));

  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);
  const [musicHint, setMusicHint] = useState("");
  const [activeChapter, setActiveChapter] = useState(0);
  const [shareStatus, setShareStatus] = useState("");

  const heroRef = useRef(null);
  const chapterRefs = useRef([]);
  const audioRef = useRef(null);
  const currentTrackRef = useRef(null);

  const { prev, next } = useMemo(
    () => (story ? getAdjacentStories(story.no) : { prev: null, next: null }),
    [story]
  );
  const related = useMemo(
    () => (story ? getRelatedStories(story.no) : []),
    [story]
  );

  useEffect(() => {
    setActiveChapter(0);
    window.scrollTo({ top: 0 });
  }, [no]);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [no]);

  useEffect(() => {
    if (!story) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.chapterIndex);
            setActiveChapter(index);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    chapterRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [story]);

  if (!story) {
    return (
      <main className={`site ${theme} story-page`}>
        <div className="grain" />
        <section className="story-not-found">
          <h1>Story not found</h1>
          <p>This one might not have happened after all.</p>
          <Link to="/stories" className="outline-btn">
            Back to Stories
          </Link>
        </section>
      </main>
    );
  }

  const progress = Math.round(((activeChapter + 1) / story.chapters.length) * 100);

  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingMusic) {
      audio.pause();
      setPlayingMusic(false);
      return;
    }

    if (musicTracks.length === 0) {
      setMusicHint("Drop .mp3 files into src/music to enable this.");
      setTimeout(() => setMusicHint(""), 3000);
      return;
    }

    if (!audio.src) {
      const track = pickRandomTrack();
      currentTrackRef.current = track;
      audio.src = track;
    }

    audio
      .play()
      .then(() => setPlayingMusic(true))
      .catch(() => {
        setMusicHint("Couldn't play background music.");
        setTimeout(() => setMusicHint(""), 3000);
      });
  };

  const handleTrackEnded = () => {
    const audio = audioRef.current;
    const nextTrack = pickRandomTrack(currentTrackRef.current);
    if (!audio || !nextTrack) {
      setPlayingMusic(false);
      return;
    }
    currentTrackRef.current = nextTrack;
    audio.src = nextTrack;
    audio.play().catch(() => setPlayingMusic(false));
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: story.title, url });
      } catch {
        // user cancelled, do nothing
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("Link copied!");
      setTimeout(() => setShareStatus(""), 2000);
    } catch {
      setShareStatus("Couldn't copy link");
      setTimeout(() => setShareStatus(""), 2000);
    }
  };

  const cycleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "evening" : current === "evening" ? "light" : "dark"
    );
  };

  return (
    <main className={`site ${theme} story-page`}>

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

          <button
            className="theme-btn"
            onClick={cycleTheme}
            aria-label="Switch theme"
          >
            {theme === "dark" && <Moon size={15} />}
            {theme === "evening" && <Sunset size={15} className="icon-evening" />}
            {theme === "light" && <Sun size={15} />}
          </button>

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
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/stories" onClick={() => setMenuOpen(false)}>Stories</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/notes" onClick={() => setMenuOpen(false)}>A Note</Link>
              <Link to="/say-hello" onClick={() => setMenuOpen(false)}>Say Hello</Link>
            </nav>

            <p className="script menu-signature">
              Good stories never really end...
            </p>

          </div>
        </div>
      )}


      {/* ================= STORY HERO ================= */}
      <section ref={heroRef} className="hero story-hero">

        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${story.image})` }}
        />
        <div className="hero-overlay story-hero-overlay" />

        <Link to="/stories" className="back-link">
          <ArrowLeft size={15} />
          Back to Stories
        </Link>

        <div className="story-hero-copy">

          <span className="story-no">{story.no}</span>

          <h1>{story.title}</h1>

          <p className="story-tagline">{story.tagline}</p>

          <div className="story-meta">
            <span>
              <Clock size={13} />
              {story.readTime}
            </span>
            <span>
              <Heart size={13} />
              {story.tags[0]}
            </span>
            <span>
              <Sparkles size={13} />
              {story.tags[1]}
            </span>
          </div>

          <div className="story-actions">
            <a href="#chapter-0" className="outline-btn">
              Continue Reading
              <ArrowRight size={15} />
            </a>

            <button
              className="music-btn"
              onClick={handleToggleMusic}
            >
              <span className="music-icon">
                {playingMusic ? <Pause size={13} /> : <Play size={13} />}
              </span>
              <span className="music-copy">
                <strong>{playingMusic ? "Pause Background Music" : "Play Background Music"}</strong>
                <small>{musicHint || "A softer reading experience"}</small>
              </span>
            </button>

            <audio
              ref={audioRef}
              onEnded={handleTrackEnded}
              preload="none"
            />
          </div>

        </div>

        <div className="hero-note script story-hero-quote">
          {story.heroQuote.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < story.heroQuote.length - 1 && <br />}
            </React.Fragment>
          ))}
          <span className="note-line" />
        </div>

      </section>


      {/* ================= STORY BODY ================= */}
      <div className="section story-page-body">

        <article className="story-content story-content-full">

          {story.chapters.map((chapter, index) => (
            <div
              className="story-chapter"
              id={`chapter-${index}`}
              key={chapter.title}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
              data-chapter-index={index}
            >

              <div className="chapter-text">
                <span className="chapter-label">Chapter {index + 1}</span>
                <h2>{chapter.title}</h2>

                {chapter.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}

                {chapter.reflection && (
                  <p className="chapter-reflection">{chapter.reflection}</p>
                )}
              </div>

              <div className="chapter-image">
                <img src={chapter.image} alt={chapter.title} />
                {chapter.caption && (
                  <p className="chapter-caption script">
                    {chapter.caption}
                    <span className="note-line" />
                  </p>
                )}
              </div>

            </div>
          ))}

          <div className="story-nav-row">

            <Link to={`/stories/${prev.no}`} className="story-nav-link">
              <ArrowLeft size={16} />
              <span>
                <small>Previous Story</small>
                {prev.title}
              </span>
            </Link>

            <Link to="/stories" className="story-nav-grid">
              <LayoutGrid size={16} />
              Back to Stories
            </Link>

            <Link to={`/stories/${next.no}`} className="story-nav-link next">
              <span>
                <small>Next Story</small>
                {next.title}
              </span>
              <ArrowRight size={16} />
            </Link>

          </div>

        </article>


        <div className="engagement-grid">

          <div className="sidebar-card">
            <h3>Your Reading Progress</h3>
            <div className="progress-row">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="progress-percent">{progress}%</span>
            </div>

            <ul className="chapter-list">
              {story.chapters.map((chapter, index) => (
                <li
                  key={chapter.title}
                  className={index === activeChapter ? "active" : ""}
                >
                  <span className="chapter-dot" />
                  <div>
                    <span className="chapter-list-label">Chapter {index + 1}</span>
                    <span className="chapter-list-title">{chapter.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Liked this story?</h3>
            <p className="sidebar-subtext">Your support keeps these stories alive.</p>

            <div className="like-actions">
              <button onClick={handleShare}>
                <Share2 size={17} />
                <span>
                  Share
                  <br />
                  {shareStatus || "with a friend"}
                </span>
              </button>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Share your thoughts</h3>
            <p className="sidebar-subtext">What did this story make you feel?</p>

            <Link to="/say-hello" className="outline-btn note-submit">
              Share your thoughts
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>


      {/* ================= RELATED STORIES ================= */}
      <section className="section related-section">

        <div className="related-section-head">
          <h2>Related Stories</h2>
          <Link to="/stories">
            See All
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="related-grid">
          {related.map((item) => (
            <Link
              to={`/stories/${item.no}`}
              className="related-grid-card"
              key={item.no}
            >
              <div className="related-grid-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="related-grid-body">
                <span className="story-no">{item.no}</span>
                <h3>{item.title}</h3>
                <p>{item.tagline}</p>
              </div>
            </Link>
          ))}
        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer id="about" className="site-footer">

        <div className="footer-bg" />
        <div className="footer-overlay" />

        <div className="footer-top">

          <p className="footer-note script">
            Thanks for reading.
            <br />
            Keep feeling.
            <span className="footer-signed">
              — Adarsh <Heart size={12} fill="currentColor" />
            </span>
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
              <a href="mailto:quietstories.tstnh@gmail.com" aria-label="Email"><Mail size={16} /></a>
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
            <Link to="/">Home</Link>
            <Link to="/stories">Stories</Link>
            <Link to="/about">About</Link>
            <Link to="/notes">A Note</Link>
            <a href="/say-hello">Say Hello</a>
          </nav>

          <p className="copyright">
            © 2026 QuietStories. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}

export default StoryPage;
