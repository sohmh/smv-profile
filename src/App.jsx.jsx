import { useState, useEffect, useRef } from "react";

// ============================================================
//  ✏️  EDIT ONLY THIS CONFIG — everything else is automatic
// ============================================================
const CONFIG = {
  // ── Identity ─────────────────────────────────────────────
  username: "smv",
  displayName: "Soham Sandeep Gurav",
  role: "Artificial Intelligence & Data Science Engineering Freshman",
  org: "pvgcoet&m",
  focus: "AI & ML foundations, quantum computing, data science, applied research",
  photoUrl: import.meta.env.BASE_URL + "profile.png", // leave empty to hide photo

  // ── Nav sections (order matters) ─────────────────────────
  // Each section must match a key in SECTIONS below
  nav: ["about", "research", "credentials", "writings", "blog", "events", "notes", "contact"],

  // ── Social links ─────────────────────────────────────────
  links: [
    { label: "email", icon: "✉", href: "mailto:sohamsgurav2006@gmail.com" },
    { label: "researchgate", icon: "◆", href: "https://www.researchgate.net/profile/Soham-Gurav?ev=hdr_xprf" },
    { label: "linkedin", icon: "○", href: "https://www.linkedin.com/in/soham-gurav-94b6b3384" },
    { label: "github", icon: "⌥", href: "https://github.com/sohmh" },
    { label: "twitter", icon: "𝕏", href: "https://x.com/7smv25" },
    { label: "letterboxd", icon: "⏯", href: "https://letterboxd.com/sohmh/" },
  ],

  // ── Updates log ──────────────────────────────────────────
  updates: [
    { date: "3-4-2026", label: "NEW", text: "Competed in my first hackathon - 24HR Ignition hackverse" },
    { date: "30-3-2026", label: "NEW", text: "Launched personal website. You're looking at it." },
    { date: "30-3-2026", label: "IMP", text: "Website layout and Design is adapted from mariya.fyi " },

  ],

  // ── Sections content ─────────────────────────────────────
  sections: {

    about: {
      title: "about",
      outputLines: [
        "[ OK ] Starting session – {smv}.fyi",
        "[ OK ] User profile loaded",
        "[ INFO ] Last login: Mon Mar 30 2026 12:00:00 AM",
      ],
      // Paragraphs for smv about.txt
      bio: [
        "I'm a 19 year old who has dedicated himself to pursue knowledge across multiple disciplines and channel it into breakthroughs which can alter the course of society",
        "Apart from that my interests lie in Problem-Solving, mathematics, quantum computing technology, physics, quantitative finance, aerospace, race dynamics, history and philosophical Inquiry through writing.",
      ],
      // Show links and updates on about page
      showLinks: true,
      showUpdates: true,
      showResearchPreview: true,
    },

    research: {
      title: "research",
      outputLines: [
        "[ OK ] Loaded {smv}.fyi/research",
        "[ OK ] Mounted publications index – {count} entries found",
        "[ INFO ] Click any entry to expand abstract & links",
      ],
      // Research statement paragraphs (smv research_statement.txt)
      statement: [
        "I'm interested in machine learning, quantum algorithms, and the emerging field of quantum ML",
        "My goal is to build research experience that connects classical AI systems with quantum computational paradigms working toward intelligent systems that go beyond today's limitations.",
        "I'm currently open to research collaborations, reading groups, and mentorship opportunities.",
      ],
      // Projects — add as many as you like
      projects: [
        {
          id: "01",
          title: "Finance Capital",
          tags: ["APP"],
          year: "2026-02",
          status: "Built and live on my Github",
          abstract: "A comprehensive finance tracking application to monitor expenses, income, and budget goals. Features include real-time budget analysis, spending categorization, and visual reports to help users make informed financial decisions..",
          links: [{ label: "Demo", href: "https://capital-finance-tracking-app.vercel.app/" }, { label: "Github", href: "https://github.com/sohmh/Capital-Finance-Tracking-App" }],
        },
        {
          id: "02",
          title: "Physique Log",
          tags: ["APP"],
          year: "2026-02",
          status: "Built and live on my Github",
          abstract: "A standalone mobile application that allows complete workout customization and daily progress tracking",
          links: [{ label: "Demo", href: "https://physique-log-application.vercel.app/" }, { label: "Github", href: "https://github.com/sohmh/Physique-Log-Application" }],
        },
        {
          id: "03",
          title: "Verdict",
          tags: ["APP"],
          year: "2026-02",
          status: "Built and live on my Github",
          abstract: "A minimalist daily routine tracker that scores your day on a 0–10 scale and delivers a verdict on how well you spent your time.",
          links: [{ label: "Demo", href: "https://verdict-routine-tracker-app.vercel.app/" }, { label: "Github", href: "https://github.com/sohmh/Verdict-Routine-Tracker-App" }],
        },

        {
          id: "04",
          title: "LockChain",
          tags: ["dAPP"],
          year: "2026-04",
          status: "Built and live on my Github",
          abstract: "a decentralized application which leverages blockchain technology to provide secure peer to peer transactions through escrow smart contracts.",
          links: [{ label: "Demo", href: "https://merkle-mavericks-code.vercel.app/" }, { label: "Github", href: "https://github.com/sohmh/MerkleMavericksCode" }],
        },
      ],
    },
    credentials: {
      title: "credentials",
      outputLines: [
        "[ OK ] Loaded {smv}.fyi/credentials",
        "[ OK ] Verified certifications index",
        "[ INFO ] Click to view details",
      ],
      items: [
        {
          id: "01",
          title: "Google AI Essentials",
          issuer: "Coursera / Google",
          year: "25-12-2025",
          link: "https://www.credly.com/badges/cb2859ff-82d4-4930-a378-6b806e27a603/linked_in_profile"
        },

      ]
    },
    writings: {
      title: "writings",
      outputLines: [
        "[ OK ] Mounted {smv}.fyi/writings",
        "[ OK ] {count} published article(s) fetched from medium",
        "[ INFO ] Reading: medium.com/@esmvee2006",
      ],
    },

    blog: {
      title: "blog",
      outputLines: [
        "[ OK ] Mounted {smv}.fyi/blog",
        "[ OK ] {count} published post(s)",
        "[ INFO ] Reading: posts/latest.txt",
      ],
      posts: [
        // Add your blog posts here
        {
          id: "01",
          title: "Current Hackathon Update",
          date: "12-4-2026",
          slug: "current_hackathon_update",
          preview: [
            "Just registered for the IIT Madras Road Safety Hackathon",
            "Excited to work on an AI based solution for road safety",
            "Will be updating this space with my progress"
          ],
        },
      ],
    },

    events: {
      title: "events",
      outputLines: [
        "[ OK ] Loaded {username}.fyi/events",
        "[ INFO ] Showing competitions, seminars & events",
      ],
      entries: [
        {
          id: "01",
          title: "SPPU Startup Bootcamp",
          type: "SEMINAR",
          org: "SPPU + Wadhwani Foundation",
          date: "10-02-2026",
          location: "PVGCOET, Pune, India",
          note: "Understood & tried to apply the principals of Design Thinking & the fundamental finance behind starting a startup ",
          certificate: "/smv-profile/certificates/Sppustartupbootcamp.jpeg",

        },
        {
          id: "02",
          title: "Youth Parliament 2026",
          type: "COMPETITION",
          org: "Lakshya Aspirants Club - PVGCOET",
          date: "03-02-2026",
          location: "PVGCOET, Pune, India",
          note: "Spoke as member of the ruling party (which ultimately won, not much contribution from my side ngl)",
          certificate: "/smv-profile/certificates/YouthParliament.jpeg",

        },
        {
          id: "03",
          title: "War of Words -Spectrum 2K26",
          type: "COMPETITION",
          org: "PCCOE Pimpri",
          date: "07-03-2026",
          location: "PCCOE Pimpri, Pune, India",
          note: "e.g. Finalist in the English Debate",
          certificate: "/smv-profile/certificates/pccoespectrumdebatecert.png",

        },
        {
          id: "04",
          title: "Ignition Hackverse PVGCOET 2026 , 24 HR Hackathon",
          type: "COMPETITION",
          org: "PVGCOET",
          date: "20-03-2026",
          location: "Offline",
          note: "Participated in the 24HR Hackathon under the Blockchain Track",
          certificate: "/smv-profile/certificates/ignitioncertificate.jpeg",
        },
      ],
    },
    notes: {
      title: "notes",
      outputLines: [
        "[ OK ] Loaded {username}.fyi/notes",
        "[ INFO ] Exported from Obsidian Canvas",
      ],
      entries: [
        {
          id: "01",
          title: "Blockchain Basics",
          topic: "Blockchain",
          date: "19-03-2026",
          description: "Studying about how blockchain technology works",
          file: "/smv-profile/notes/Blockchains.html",
        },
      ],
    },
    contact: {
      title: "contact",
      outputLines: [
        "[ OK ] Loaded contact module",
        "[ INFO ] Preferred: email or linkedin",
      ],
      message: "I'm always open to discussing new projects, opportunities, collaborations and intellectual discussions. Feel free to reach out through any of the platforms below.",
    }
  }
};

// ============================================================
//  End of config — don't edit below unless you know React
// ============================================================

// ── Helpers ─────────────────────────────────────────────────
function interpolate(str, cfg, extras = {}) {
  return str
    .replace(/\{username\}/g, cfg.username)
    .replace(/\{displayName\}/g, cfg.displayName)
    .replace(/\{role\}/g, cfg.role)
    .replace(/\{org\}/g, cfg.org)
    .replace(/\{count\}/g, extras.count ?? "?")
    .replace(/\{education\}/g, cfg.education)
    .replace(/\{focus\}/g, cfg.focus);
}

function useMediumPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@esmvee2006")
      .then(r => r.json())
      .then(data => {
        setPosts(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return { posts, loading };
}

const TAG_COLORS = {
  BENCHMARK: "#f97316",
  MODEL: "#3b82f6",
  DATASET: "#a855f7",
  PAPER: "#10b981",
  DEFAULT: "#6b7280",
  SEMINAR: "#06b6d4",
  COMPETITION: "#f43f5e",
  WORKSHOP: "#84cc16",
  NOTE: "#e879f9",
  TOPIC: "#e879f9",
};

function tagColor(tag) {
  return TAG_COLORS[tag] || TAG_COLORS.DEFAULT;
}

// ── Styles ──────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0d;
    --surface: #141414;
    --border: #2a2a2a;
    --text: #c9c9c9;
    --text-dim: #555;
    --text-bright: #e8e8e8;
    --green: #4ade80;
    --orange: #f97316;
    --blue: #60a5fa;
    --yellow: #facc15;
    --prompt: #e8e8e8;
    --font: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    --nav-h: 42px;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); font-size: 13px; line-height: 1.7; min-height: 100vh; }

  /* Nav */
  .nav { position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--border); height: var(--nav-h); display: flex; align-items: center; padding: 0 24px; gap: 28px; }
  .nav-home { color: var(--text-bright); text-decoration: none; font-weight: 500; margin-right: 8px; }
  .nav-link { color: var(--text-dim); text-decoration: none; font-size: 12px; cursor: pointer; background: none; border: none; font-family: var(--font); transition: color 0.15s; }
  .nav-link:hover, .nav-link.active { color: var(--text-bright); }
  .nav-link.active { text-decoration: underline; text-underline-offset: 3px; }
  .nav-toggle { margin-left: auto; width: 36px; height: 20px; background: var(--border); border-radius: 10px; border: none; cursor: pointer; position: relative; }
  .nav-toggle::after { content: ''; position: absolute; width: 14px; height: 14px; background: var(--text-dim); border-radius: 50%; top: 3px; left: 3px; transition: 0.2s; }

  /* Page */
  .page { max-width: 860px; margin: 0 auto; padding: 48px 24px 100px; }

  /* Output block */
  .output-block { border: 1px solid var(--border); padding: 14px 18px; margin-bottom: 40px; font-size: 12px; }
  .output-label { color: var(--text-dim); font-size: 11px; margin-bottom: 6px; letter-spacing: 0.08em; }
  .out-ok { color: var(--green); }
  .out-info { color: var(--yellow); }
  .out-link { color: var(--blue); text-decoration: none; }
  .out-link:hover { text-decoration: underline; }

  /* Command */
  .cmd { margin: 36px 0 16px; }
  .cmd-line { color: var(--text-dim); font-size: 13px; margin-bottom: 12px; }
  .cmd-line span.dollar { color: var(--text-bright); margin-right: 6px; }
  .cmd-line span.cmd-text { color: var(--orange); }
  .cmd-line span.cmd-arg { color: var(--blue); }

  /* Text block (smv output) */
  .textblock { border-left: 2px solid var(--border); padding: 0 0 0 20px; color: var(--text); }
  .textblock p { margin-bottom: 18px; line-height: 1.8; }
  .textblock p:last-child { margin-bottom: 0; }
  .textblock a { color: var(--blue); text-decoration: none; }
  .textblock a:hover { text-decoration: underline; }
  .highlight { color: var(--blue); font-weight: 500; }

  /* Profile card */
  .profile-row { display: flex; gap: 32px; align-items: flex-start; margin-bottom: 28px; }
  .profile-photo { width: 150px; height: 150px; object-fit: cover; flex-shrink: 0; filter: grayscale(20%); }
  .profile-photo-placeholder { width: 150px; height: 150px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--text-dim); font-size: 11px; flex-shrink: 0; }
  .profile-meta { flex: 1; }
  .meta-row { display: flex; gap: 0; margin-bottom: 4px; font-size: 12.5px; }
  .meta-key { color: var(--text-dim); min-width: 60px; flex-shrink: 0; }
  .meta-colon { color: var(--text-dim); margin: 0 8px; }
  .meta-val { color: var(--text-bright); }
  .meta-val a { color: var(--blue); text-decoration: none; }
  .meta-val a:hover { text-decoration: underline; }

  /* Projects list */
  .project-row { border: 1px solid var(--border); margin-bottom: 8px; cursor: pointer; transition: border-color 0.15s; }
  .project-row:hover { border-color: #444; }
  .project-header { display: flex; align-items: center; padding: 14px 18px; gap: 16px; }
  .project-id { color: var(--text-dim); min-width: 24px; font-size: 12px; }
  .project-title { flex: 1; color: var(--text-bright); font-size: 13px; }
  .project-tags { display: flex; gap: 8px; align-items: center; }
  .tag { font-size: 11px; letter-spacing: 0.06em; font-weight: 500; }
  .project-year { color: var(--text-dim); font-size: 12px; }
  .project-status { font-size: 11px; letter-spacing: 0.06em; }
  .chevron { color: var(--text-dim); font-size: 10px; transition: transform 0.2s; }
  .chevron.open { transform: rotate(90deg); }
  .project-body { border-top: 1px solid var(--border); padding: 16px 18px 18px 58px; background: #0a0a0a; }
  .project-abstract { color: var(--text); line-height: 1.75; margin-bottom: 12px; font-size: 12.5px; }
  .project-links { display: flex; gap: 12px; }
  .project-link { color: var(--blue); font-size: 12px; text-decoration: none; border: 1px solid var(--border); padding: 3px 10px; }
  .project-link:hover { border-color: var(--blue); }

  /* Blog */
  .post-row { border: 1px solid var(--border); margin-bottom: 8px; cursor: pointer; }
  .post-row.disabled { opacity: 0.4; cursor: default; }
  .post-row:not(.disabled):hover { border-color: #444; }
  .post-header { display: flex; align-items: center; padding: 14px 18px; gap: 16px; }
  .post-id { color: var(--text-dim); min-width: 24px; font-size: 12px; }
  .post-title { flex: 1; color: var(--text-bright); }
  .post-date { color: var(--orange); font-size: 12px; }
  .post-preview { border: 1px solid var(--border); border-top: none; }
  .preview-titlebar { background: #1a1a1a; padding: 8px 18px; display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-dim); }
  .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .dot-r { background: #ff5f57; } .dot-y { background: #febc2e; } .dot-g { background: #28c840; }
  .preview-filename { flex: 1; text-align: center; }
  .preview-lines { color: var(--text-dim); }
  .preview-content { padding: 14px 18px 16px; font-size: 12.5px; line-height: 1.8; }
  .preview-content p { margin-bottom: 12px; }
  .preview-content p:empty { height: 6px; margin: 0; }
  .preview-bold { font-weight: 700; color: var(--text-bright); }

  /* Links */
  .links-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
  .ext-link { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--border); padding: 5px 14px; color: var(--text); text-decoration: none; font-size: 12px; transition: border-color 0.15s, color 0.15s; }
  .ext-link:hover { border-color: var(--text-dim); color: var(--text-bright); }
  .ext-link-icon { font-size: 11px; color: var(--text-dim); }

  /* Updates */
  .update-row { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 8px; font-size: 12.5px; }
  .update-date { color: var(--text-dim); min-width: 54px; }
  .update-badge { background: transparent; border: 1px solid var(--orange); color: var(--orange); font-size: 10px; padding: 1px 6px; letter-spacing: 0.06em; flex-shrink: 0; margin-top: 2px; }
  .update-text { color: var(--text); }

  /* Contact */
  .contact-block { border-left: 2px solid var(--border); padding-left: 20px; margin-bottom: 28px; line-height: 1.8; }
`;

// ── Sub-components ───────────────────────────────────────────
function OutputBlock({ lines, extras }) {
  return (
    <div className="output-block">
      <div className="output-label">OUTPUT</div>
      {lines.map((l, i) => {
        const text = interpolate(l, CONFIG, extras);
        const [bracket, ...rest] = text.split("]");
        const tag = bracket.replace("[", "").trim();
        const cls = tag === "OK" ? "out-ok" : tag === "INFO" ? "out-info" : "out-info";
        const content = rest.join("]").trim();
        const parts = content.split(/(mariya\.fyi\/\w*|{username}\.fyi\/\w*|\S+\.fyi\/?\w*)/);
        return (
          <div key={i}>
            <span className={cls}>[&nbsp;{tag}&nbsp;]</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: content.replace(/([\w-]+\.fyi[\w/]*)/, `<a class="out-link" href="#">$1</a>`) }} />
          </div>
        );
      })}
    </div>
  );
}

function Cmd({ dollar, cmd, arg }) {
  return (
    <div className="cmd">
      <div className="cmd-line">
        <span className="dollar">$</span>
        <span className="cmd-text">{cmd}</span>
        {arg && <span className="cmd-arg"> {arg}</span>}
      </div>
    </div>
  );
}

function ProfileCard() {
  const s = CONFIG.sections.about;
  return (
    <div className="profile-row">
      {CONFIG.photoUrl
        ? <img src={CONFIG.photoUrl} alt={CONFIG.displayName} className="profile-photo" />
        : <div className="profile-photo-placeholder">[photo]</div>}
      <div className="profile-meta">
        {[
          ["name", CONFIG.displayName],
          ["role", CONFIG.role],
          ["org", <a href={CONFIG.orgUrl}>{CONFIG.org}</a>],
          ["focus", CONFIG.focus],
        ].map(([k, v]) => (
          <div className="meta-row" key={k}>
            <span className="meta-key">{k}</span>
            <span className="meta-colon">:</span>
            <span className="meta-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectRow({ project }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="project-row">
      <div className="project-header" onClick={() => setOpen(o => !o)}>
        <span className="project-id">{project.id}</span>
        <span className="project-title">{project.title}</span>
        <div className="project-tags">
          {project.tags.map(t => (
            <span className="tag" key={t} style={{ color: tagColor(t) }}>{t}</span>
          ))}
          {project.year && <span className="project-year"> {project.year}</span>}
          {project.status && <span className="project-status" style={{ color: tagColor("BENCHMARK") }}> {project.status}</span>}
        </div>
        <span className={`chevron ${open ? "open" : ""}`}>▶</span>
      </div>
      {open && (
        <div className="project-body">
          <p className="project-abstract">{project.abstract}</p>
          {project.links?.length > 0 && (
            <div className="project-links">
              {project.links.map(l => (
                <a key={l.label} href={l.href} className="project-link">{l.label}</a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PostRow({ post }) {
  const [open, setOpen] = useState(false);
  const disabled = !post.slug;
  return (
    <div className={`post-row ${disabled ? "disabled" : ""}`}>
      <div className="post-header" onClick={() => !disabled && setOpen(o => !o)}>
        <span className="post-id">{post.id}</span>
        <span className="post-title">{post.title}</span>
        {post.date && <span className="post-date">{post.date}</span>}
        {!disabled && <span className={`chevron ${open ? "open" : ""}`}>▶</span>}
      </div>
      {open && post.preview.length > 0 && (
        <div className="post-preview">
          <div className="preview-titlebar">
            <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            <span className="preview-filename">posts/{post.slug}.txt</span>
            <span className="preview-lines">{post.preview.length * 4} lines</span>
          </div>
          <div className="preview-content">
            {post.preview.map((line, i) => (
              <p key={i}>{i === 0 ? <span className="preview-bold">{line}</span> : line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LinksSection() {
  return (
    <>
      <Cmd cmd="smv" arg="links.txt" />
      <div className="links-row">
        {CONFIG.links.map(l => (
          <a key={l.label} href={l.href} className="ext-link">
            <span className="ext-link-icon">{l.icon}</span>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

function UpdatesSection() {
  return (
    <>
      <Cmd cmd="tail" arg="-n 10 updates.log" />
      {CONFIG.updates.map((u, i) => (
        <div className="update-row" key={i}>
          <span className="update-date">{u.date}</span>
          {u.label && <span className="update-badge">{u.label}</span>}
          <span className="update-text">{u.text}</span>
        </div>
      ))}
    </>
  );
}

// ── Pages ────────────────────────────────────────────────────
function AboutPage() {
  const s = CONFIG.sections.about;
  const projects = CONFIG.sections.research?.projects ?? [];
  return (
    <div>
      <OutputBlock lines={s.outputLines} />
      <Cmd cmd="whois" arg={CONFIG.username} />
      <ProfileCard />
      <Cmd cmd="smv" arg="about.txt" />
      <div className="textblock">
        {s.bio.map((para, i) => (
          <p key={i}>{interpolate(para, CONFIG)}</p>
        ))}
      </div>
      {s.showLinks && <LinksSection />}
      {s.showUpdates && <UpdatesSection />}
      {s.showResearchPreview && projects.length > 0 && (
        <>
          <Cmd cmd="ls" arg="-lt ./research/ | head -3" />
          {projects.slice(0, 3).map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: "12.5px" }}>
              <span style={{ color: tagColor(p.tags[0]) }}>{p.status || p.tags[0]}</span>
              <span style={{ color: "var(--text-bright)", flex: 1, margin: "0 16px" }}>{p.title}</span>
              <span style={{ color: tagColor(p.tags[0]), border: `1px solid ${tagColor(p.tags[0])}`, padding: "0 6px", fontSize: "11px" }}>{p.tags[0]}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function ResearchPage() {
  const s = CONFIG.sections.research;
  const count = s.projects.length;
  return (
    <div>
      <OutputBlock lines={s.outputLines} extras={{ count }} />
      <Cmd cmd="smv" arg="research_statement.txt" />
      <div className="textblock" style={{ marginBottom: "36px" }}>
        {s.statement.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <Cmd cmd="ls" arg="-lt ./projects/" />
      {s.projects.map(p => <ProjectRow key={p.id} project={p} />)}
    </div>
  );
}

function CredentialsPage() {
  const s = CONFIG.sections.credentials;

  return (
    <div>
      <OutputBlock lines={s.outputLines} />
      <Cmd cmd="ls" arg="-lt ./credentials/" />

      {s.items.map(item => (
        <div key={item.id} className="project-row">
          <div className="project-header">
            <span className="project-id">{item.id}</span>
            <span className="project-title">{item.title}</span>
            <span className="project-year">{item.year}</span>
          </div>

          <div className="project-body">
            <p className="project-abstract">
              Issued by: {item.issuer}
            </p>

            {item.link && (
              <a href={item.link} className="project-link" target="_blank">
                View Certificate
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function MediumPostRow({ id, title, date, url, slug, preview, thumbnail }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="post-row">
      <div className="post-header" onClick={() => setOpen(o => !o)}>
        <span className="post-id">{id}</span>
        <span className="post-title">{title}</span>
        {date && <span className="post-date">{date}</span>}
        <span className={`chevron ${open ? "open" : ""}`}>▶</span>
      </div>
      {open && (
        <div className="post-preview">
          <div className="preview-titlebar">
            <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            <span className="preview-filename">posts/{slug}.txt</span>
            <a href={url} target="_blank" rel="noreferrer" style={{ color: "var(--blue)", fontSize: "11px", textDecoration: "none" }}>↗ read on medium</a>
          </div>
          <div className="preview-content">
            {thumbnail && <img src={thumbnail} alt="" style={{ width: "100%", maxHeight: "180px", objectFit: "cover", marginBottom: "12px", opacity: 0.85 }} />}
            <p>{preview}...</p>
          </div>
        </div>
      )}
    </div>
  );
}

function WritingsPage() {
  const s = CONFIG.sections.writings;
  const { posts, loading } = useMediumPosts();
  return (
    <div>
      <OutputBlock lines={s.outputLines} extras={{ count: posts.length }} />
      <Cmd cmd="ls" arg="-lt ./writings/" />
      {loading && <div style={{ color: "var(--text-dim)", padding: "12px 0" }}>[ fetching posts from medium.com/@esmvee2006... ]</div>}
      {!loading && posts.length === 0 && <div style={{ color: "var(--text-dim)" }}>[ no articles found ]</div>}
      {posts.map((post, i) => {
        const date = post.pubDate?.slice(0, 10);
        const slug = post.title?.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "").slice(0, 30);
        const preview = post.description?.replace(/<[^>]+>/g, "").slice(0, 400);
        return (
          <MediumPostRow key={i} id={String(i + 1).padStart(2, "0")} title={post.title} date={date} url={post.link} slug={slug} preview={preview} thumbnail={post.thumbnail} />
        );
      })}
    </div>
  );
}

function BlogPage() {
  const s = CONFIG.sections.blog;
  return (
    <div>
      <OutputBlock lines={s.outputLines} extras={{ count: s.posts.length }} />
      <Cmd cmd="ls" arg="-lt ./blog/" />
      {s.posts.length === 0 && (
        <div style={{ color: "var(--text-dim)", padding: "12px 0" }}>[ no posts yet — add entries to CONFIG.sections.blog.posts ]</div>
      )}
      {s.posts.map(post => <PostRow key={post.id} post={post} />)}
    </div>
  );
}

function EventEntry({ e }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="project-row">
      <div className="project-header" onClick={() => e.certificate && setOpen(o => !o)} style={{ cursor: e.certificate ? "pointer" : "default" }}>
        <span className="project-id">{e.id}</span>
        <span className="project-title">{e.title}</span>
        <div className="project-tags">
          <span className="tag" style={{ color: tagColor(e.type) }}>{e.type}</span>
        </div>
        <span style={{ color: "var(--text-dim)", fontSize: "12px" }}>{e.date}</span>
        {e.certificate && <span className={`chevron ${open ? "open" : ""}`}>▶</span>}
      </div>
      <div style={{ padding: "0 18px 14px 58px", fontSize: "12.5px", color: "var(--text-dim)" }}>
        <span style={{ color: "var(--text)" }}>{e.org}</span>
        {e.location && <span> · {e.location}</span>}
        {e.note && <p style={{ marginTop: "6px", color: "var(--text)", lineHeight: "1.7" }}>{e.note}</p>}
        {e.certificate && (
          <a href={e.certificate} target="_blank" rel="noreferrer"
            style={{ display: "inline-block", marginTop: "8px", color: "var(--blue)", border: "1px solid var(--border)", padding: "3px 10px", fontSize: "12px", textDecoration: "none" }}>
            ↗ view certificate
          </a>
        )}
      </div>
      {open && e.certificate && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "16px 18px" }}>
          <img src={e.certificate} alt="certificate" style={{ width: "100%", maxHeight: "500px", objectFit: "contain", opacity: 0.9 }} />
        </div>
      )}
    </div>
  );
}

function EventsPage() {
  const s = CONFIG.sections.events;
  return (
    <div>
      <OutputBlock lines={s.outputLines} />
      <Cmd cmd="ls" arg="-lt ./events/" />
      {s.entries.map(e => <EventEntry key={e.id} e={e} />)}
    </div>
  );
}
function NotesPage() {
  const s = CONFIG.sections.notes;
  return (
    <div>
      <OutputBlock lines={s.outputLines} />
      <Cmd cmd="ls" arg="-lt ./notes/" />
      {s.entries.map(e => (
        <div className="project-row" key={e.id}>
          <div className="project-header">
            <span className="project-id">{e.id}</span>
            <span className="project-title">{e.title}</span>
            <div className="project-tags">
              <span className="tag" style={{ color: tagColor(e.topic) }}>{e.topic}</span>
            </div>
            <span style={{ color: "var(--text-dim)", fontSize: "12px" }}>{e.date}</span>
          </div>
          <div style={{ padding: "0 18px 14px 58px", fontSize: "12.5px" }}>
            {e.description && <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "8px" }}>{e.description}</p>}
            <a href={e.file} target="_blank" rel="noreferrer"
              style={{ color: "var(--blue)", border: "1px solid var(--border)", padding: "3px 10px", fontSize: "12px", textDecoration: "none", display: "inline-block" }}>
              ↗ open note
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
function ContactPage() {
  const s = CONFIG.sections.contact;
  return (
    <div>
      <OutputBlock lines={s.outputLines} />
      <Cmd cmd="smv" arg="contact.txt" />
      <div className="contact-block">
        <p>{s.message}</p>
      </div>
      <LinksSection />
    </div>
  );
}

const PAGE_COMPONENTS = { about: AboutPage, research: ResearchPage, credentials: CredentialsPage, writings: WritingsPage, blog: BlogPage, events: EventsPage, notes: NotesPage, contact: ContactPage };

// ── App ──────────────────────────────────────────────────────
export default function App() {
  const [booting, setBooting] = useState(true);
  const [text, setText] = useState("");
  useEffect(() => {
    const lines = [
      "> initializing smv.fyi...",
      "> loading modules...",
      "> welcome, Soham"
    ];

    let i = 0;
    let j = 0;

    function type() {
      if (i < lines.length) {
        if (j < lines[i].length) {
          setText(prev => prev + lines[i][j]);
          j++;
          setTimeout(type, 30);
        } else {
          setText(prev => prev + "\n");
          i++;
          j = 0;
          setTimeout(type, 300);
        }
      } else {
        setTimeout(() => setBooting(false), 500);
      }
    }

    type();
  }, []);
  const [active, setActive] = useState(CONFIG.nav[0]);

  const PageComponent = PAGE_COMPONENTS[active] || (() => (
    <div style={{ color: "var(--text-dim)", padding: "40px 0" }}>
      [ section "{active}" has no renderer — add one in PAGE_COMPONENTS ]
    </div>
  ));

  if (booting) {
    return (
      <div style={{
        background: "#0d0d0d",
        color: "#4ade80",
        height: "100vh",
        padding: "40px",
        fontFamily: "monospace",
        whiteSpace: "pre-line"
      }}>
        {text}
      </div>
    );
  }
  return (
    <>
      <style>{css}</style>
      <nav className="nav">
        <a className="nav-home nav-link" onClick={() => setActive(CONFIG.nav[0])}>~/{CONFIG.username}</a>
        {CONFIG.nav.map(sec => (
          <button
            key={sec}
            className={`nav-link ${active === sec ? "active" : ""}`}
            onClick={() => setActive(sec)}
          >{sec}</button>
        ))}
        <button className="nav-toggle" aria-label="toggle theme" />
      </nav>
      <div className="page">
        <PageComponent />
      </div>
    </>
  );
}