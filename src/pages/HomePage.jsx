import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  Menu,
  Moon,
  RotateCcw,
  Sun,
  Sunset,
  Sparkles,
  X,
} from "lucide-react";
import "./HomePage.css";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { seo } from "../data/seo";
import { stories } from "../data/stories.js";

/**
 * The "What should you do?" panel: 5 independent chapters, browsed with
 * the prev/next chapter arrows. Each chapter is its own little scenario —
 * clicking an option does NOT move you to a new chapter, it just shows
 * that option's outcome (a possibility/side effect) within the SAME
 * chapter. Only the chapter arrows change the chapter number.
 *
 * choiceChapters is an array — one object per chapter:
 * {
 *   moments: [             // the chapter's root prompt, then its outcomes
 *     {
 *       title: string,     // unique WITHIN this chapter
 *       content: string,   // the story text shown for this moment
 *       options: [         // 1-3 choices; omit/empty array to end the chapter
 *         {
 *           icon: string,          // emoji shown in the choice button
 *           label: string,         // button text
 *           leadsTo: { title },    // points at another moment's `title`
 *                                  // above, in this same chapter
 *         },
 *       ],
 *     },
 *     ...
 *   ],
 * }
 *
 * To add a chapter: add a new { moments: [...] } object to this array —
 * the panel's "Chapter X of Y" and the arrows update automatically.
 * Within a chapter, if a `leadsTo.title` doesn't match any moment yet,
 * the panel just shows that title as a quiet ending — so you can wire up
 * the options before writing the outcome they lead to.
 */
const choiceChapters = [
  {
    moments: [
      {
        title: "What should you do?",
        content:
          "It's raining heavily. Someone nearby is struggling with a broken umbrella under a shop roof. What do you do?",
        options: [
          {
            icon: "☂️",
            label: "Share your umbrella",
            leadsTo: { title: "A Small Kindness" },
          },
          {
            icon: "▣",
            label: "Give them yours",
            leadsTo: { title: "A Quiet Presence of help" },
          },
          {
            icon: "♟",
            label: "Keep walking",
            leadsTo: { title: "A Missed Moment" },
          },
        ],
      },
      {
        title: "A Small Kindness",
        content:
          "You stop and share your umbrella with them, giving them some shelter from the rain. They smile with relief and thank you warmly for your kindness.",
        options: [],
      },
      {
        title: "A Quiet Presence of help",
        content:
          "You hand them your umbrella and choose to continue without it. They are surprised by your generosity and thank you with a grateful smile and a kind gesture.",
        options: [],
      },
      {
        title: "A Missed Moment",
        content:
          "You walk past without stopping. They watch you go and quietly return to waiting under the shop roof, hoping the rain will stop soon.",
        options: [],
      },
    ],
  },
  {
    moments: [
      {
        title: "What should you do?",
        content:
          "A girl sits alone by the window, quietly reading a book while her coffee slowly gets cold. What do you do?",
        options: [
          {
            icon: "👥",
            label: "Ask to join her",
            leadsTo: { title: "A Strange Connection" },
          },
          {
            icon: "📘",
            label: "Ask about her book",
            leadsTo: { title: "A Shared Laugh" },
          },
          {
            icon: "👀",
            label: "Leave her alone",
            leadsTo: { title: "A Quiet Regret" },
          },
        ],
      },
      {
        title: "A Strange Connection",
        content:
          "You politely ask if you can sit with her. She looks up from her book, smiles, and welcomes you to the table. A small conversation begins, and your friendly gesture makes her feel a little less alone.",
        options: [],
      },
      {
        title: "A Shared Laugh",
        content:
          "You show genuine interest and ask what she’s reading. She happily tells you about the story, smiling as she shares something she enjoys. Your curiosity turns a quiet moment into a pleasant little connection.",
        options: [],
      },
      {
        title: "A Quiet Regret",
        content:
          "You choose not to disturb her and let her enjoy her peaceful moment. She continues reading quietly, appreciating the calm and privacy of being left undisturbed.",
        options: [],
      },
    ],
  },
  {
    moments: [
      {
        title: "What should you do?",
        content:
          "You're on a nearly empty late-night train. A stranger sits across from you and gives you a small smile.",
        options: [
          {
            icon: "🙋‍♂️",
            label: "Smile and say hello",
            leadsTo: { title: "A Small Gesture" },
          },
          {
            icon: "🙊",
            label: "Put on your earphones",
            leadsTo: { title: "A Respectful Distance" },
          },
          {
            icon: "📝",
            label: "Ask where they're going",
            leadsTo: { title: "An Anonymous Enquiry" },
          },
        ],
      },
      {
        title: "A Small Gesture",
        content:
          "You return their smile and greet them warmly. They smile back and say hello, creating a small but friendly moment between two strangers.",
        options: [],
      },
      {
        title: "A Respectful Distance",
        content:
          "You put on your earphones and quietly enjoy your own space. They understand that you want to be left alone and turn their attention back to the journey.",
        options: [],
      },
      {
        title: "An Anonymous Enquiry",
        content:
          "You ask where they’re headed, showing a little curiosity and friendliness. They seem pleasantly surprised and answer with a smile, perhaps continuing the conversation with you.",
        options: [],
      },
    ],
  },
  {
    moments: [
      {
        title: "What should you do?",
        content:
          "You both reach for the same book at the exact same moment. Your hands meet, and you both pause.",
        options: [
          {
            icon: "😊",
            label: "Let them have it",
            leadsTo: { title: "An Unexpected Friend" },
          },
          {
            icon: "📢",
            label: "Make a little joke",
            leadsTo: { title: "An Humour" },
          },
          {
            icon: "🔍",
            label: "Ask if they've read it",
            leadsTo: { title: "A Nagging Thought" },
          },
        ],
      },
      {
        title: "An Unexpected Friend",
        content:
          "You pull your hand back and let them take the book. They smile appreciatively and thank you for the thoughtful gesture before walking away with it.",
        options: [],
      },
      {
        title: "An Humour",
        content:
          "You laugh and make a light joke about reaching for the same book. They laugh too, and the awkward moment quickly turns into a warm, friendly interaction.",
        options: [],
      },
      {
        title: "A Nagging Thought",
        content:
          "You ask if they’ve read the book before, showing genuine interest. They smile and start telling you what they think about it, giving you a chance to discover a shared interest.",
        options: [],
      },
    ],
  },
  {
    moments: [
      {
        title: "What should you do?",
        content:
          "You're stuck in a slow elevator with a stranger who looks like they're having the worst day of their life. What do you do?",
        options: [
          {
            icon: "💬",
            label: "Make a little small talk",
            leadsTo: { title: "A Brief Kindness" },
          },
          {
            icon: "🤫",
            label: "Give them space and stay quiet",
            leadsTo: { title: "A Silent Understanding" },
          },
          {
            icon: "😊",
            label: "Just smile when you leave",
            leadsTo: { title: "A Small Light" },
          },
        ],
      },
      {
        title: "A Brief Kindness",
        content:
          "You start a simple conversation to make the long elevator ride feel a little lighter. They slowly open up and give you a small smile, grateful for the distraction.",
        options: [],
      },
      {
        title: "A Silent Understanding",
        content:
          "You respect their mood and let them enjoy the silence. They may not say anything, but your quiet understanding makes the ride a little more comfortable.",
        options: [],
      },
      {
        title: "A Small Light",
        content:
          "You don’t interrupt their thoughts, but as you step out, you give them a warm smile. They notice the small gesture and smile back, carrying that little moment of kindness with them.",
        options: [],
      },
    ],
  },
];

function HomePage() {
  useDocumentMeta(seo.home);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [choiceNode, setChoiceNode] = useState(choiceChapters[0].moments[0]);
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

  const scrollToStories = () => {
    document
      .querySelector("#stories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const chooseOption = (option) => {
    if (!option.leadsTo) return;

    const moments = choiceChapters[chapterIndex].moments;
    const nextMoment = moments.find(
      (moment) => moment.title === option.leadsTo.title
    ) ?? { ...option.leadsTo, options: [] };

    setChoiceNode(nextMoment);
  };

  const restartChoiceStory = () => setChoiceNode(choiceChapters[chapterIndex].moments[0]);

  const goToChapter = (nextIndex) => {
    const wrapped = (nextIndex + choiceChapters.length) % choiceChapters.length;
    setChapterIndex(wrapped);
    setChoiceNode(choiceChapters[wrapped].moments[0]);
  };

  const cycleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "evening" : current === "evening" ? "light" : "dark"
    );
  };

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
          <Link
            to="/"
            className="active"
          >
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


      {/* ================= HERO ================= */}
      <section
        id="home"
        ref={heroRef}
        className="hero"
      >

        <div className="hero-bg" />

        <div className="hero-overlay" />

        <div className="hero-copy">

          <p className="eyebrow">
            T H E &nbsp; S T O R I E S
          </p>

          <h1>
            THE STORIES
            <br />
            THAT NEVER HAPPENED
          </h1>

          <p className="hero-subtitle">
            A collection of moments that existed somewhere{' '}
            <br className="desktop-only" />
            between imagination and reality.
          </p>

          <button
            className="outline-btn"
            onClick={scrollToStories}
          >
            Explore the Stories
            <ArrowRight size={16} />
          </button>

        </div>


        {/* Handwritten Hero Note */}
        <div className="hero-note script">

          Some stories don't need
          <br />

          to be true. They just need
          <br />

          to make you feel something.

          <span className="note-line" />

        </div>

      </section>


      {/* ================= FEATURED STORIES ================= */}
      <section
        id="stories"
        className="section"
      >

        <div className="section-heading">

          <h2>
            A Few Stories That Never Happened
          </h2>

          <span>
            More stories await...
          </span>

        </div>


        <div className="story-grid">

          {stories.map((story) => (

            <Link
              to={`/stories/${story.no}`}
              className="story-card"
              key={story.no}
            >

              {/* Image */}
              <div className="card-image">

                <img
                  src={story.homeImage}
                  alt={story.title}
                />

                <div className="image-shade" />

              </div>


              {/* Content */}
              <div className="card-content">

                <span className="story-no">
                  {story.no}
                </span>

                <h3>
                  {story.title}
                </h3>

                <p>
                  {story.tagline}
                </p>


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

                <span className="card-read-link">
                  Read Story
                  <ArrowRight size={13} />
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* ================= LOWER CONTENT ================= */}
      <section className="lower-layout">


        {/* ================= ENDING PANEL ================= */}
        <article className="ending-panel">

          <div className="ending-image" />

          <div className="ending-overlay" />


          <div className="ending-copy">

            <p>

              Maybe this never happened.
              <br />

              Maybe it never will.

              <br />
              <br />

              But somewhere, in a little corner{' '}
              <br className="desktop-only" />

              of the internet,

              <br />

              they got their happy ending.

            </p>


            <Heart
              className="ending-heart"
              size={16}
              fill="currentColor"
            />


            <div className="ending-actions">

              <a href="/stories"><button className="small-btn">
                Explore the Stories
              </button></a>

              {/* <button className="small-btn ghost">
                Back to Home
              </button> */}

            </div>

          </div>

        </article>


        {/* ================= CHOICE PANEL ================= */}
        <article className="choice-panel">

          <div className="chapter-top">

            <span>
              Chapter {chapterIndex + 1} of {choiceChapters.length}
            </span>

            <div className="progress">
              {choiceChapters.map((_, index) => (
                <i
                  key={index}
                  className={index === chapterIndex ? "filled" : ""}
                />
              ))}
            </div>

            <div className="chapter-nav">
              <button
                onClick={() => goToChapter(chapterIndex - 1)}
                aria-label="Previous chapter"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => goToChapter(chapterIndex + 1)}
                aria-label="Next chapter"
              >
                <ChevronRight size={15} />
              </button>
            </div>

          </div>


          <div className="choice-copy">

            <h3>
              {choiceNode.title}
            </h3>

            <p>
              {choiceNode.content}
            </p>

            {choiceNode.options && choiceNode.options.length > 0 ? (
              choiceNode.options.map((option) => (
                <ChoiceButton
                  key={option.label}
                  icon={option.icon}
                  text={option.label}
                  onClick={() => chooseOption(option)}
                />
              ))
            ) : (
              <>
                <p className="ending-note">
                  This is where this path ends.
                </p>
                <button className="restart-btn" onClick={restartChoiceStory}>
                  <RotateCcw size={14} />
                  Start Over
                </button>
              </>
            )}

          </div>


          <p className="script bottom-note">
            Every choice leads to a different story...
          </p>

        </article>


        {/* ================= NOTE PANEL ================= */}
        <aside
          id="note"
          className="note-panel"
        >

          <h3 className="script">
            A little note...
          </h3>


          <p>
            These are not real stories.
            <br />
            But the feelings are.
          </p>


          <p>
            Thank you for being here,
            <br />
            for reading, for feeling.
          </p>


          <p>
            Maybe one day, some of these
            <br />
            moments will be real.
          </p>


          <p>
            Until then, keep imagining.
            <br />
            It's a beautiful place to be.
          </p>


          <p className="script signed">
            — Adarsh. ♡
          </p>


          <div className="mountain-mark">
            ⌁⌁⌁
          </div>


          <p className="script bottom-script">
            <span className="text-[1.05rem]">Some stories. A kinder you...</span>
          </p>

        </aside>

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


/* ================= CHOICE BUTTON ================= */

function ChoiceButton({ icon, text, onClick }) {

  return (

    <button className="choice-btn" onClick={onClick}>

      <span className="choice-icon">
        {icon}
      </span>

      <span>
        {text}
      </span>

      <ArrowRight size={14} />

    </button>

  );
}


export default HomePage;