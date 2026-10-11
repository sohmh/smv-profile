// App.jsx — Shell layout: titlebar, menubar, sidebar, main area, statusbar
// You should not need to edit this file for content changes.
// To add new nav items, add entries to NAV_TOP or NAV_SIDE below.

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PageRenderer from './components/PageRenderer.jsx';
import RoomScene from './components/RoomScene.jsx';
import { PROFILE, STATS, SYSTEM_MESSAGE, STATUS_BAR } from './data/content.jsx';

// ── navigation config ──────────────────────────────────────────────────────
const NAV_TOP = [
  { id: 'about',   label: 'About'   },
  { id: 'blog',    label: 'Blog'    },
  { id: 'contact', label: 'Contact' },
  { id: 'resume',  label: 'Resume', href: '/SohamSandeepGuravResume.pdf', download: true },
];

const NAV_SIDE = [
  { id: 'projects',     icon: '◈', label: 'Projects'    },
  { id: 'experience',  icon: '◷', label: 'Experience'  },
  { id: 'credentials', icon: '◉', label: 'Credentials' },
  { id: 'activity',    icon: '●', label: 'Activity'    },
  { id: 'videos',      icon: '▶', label: 'Videos'     },
  { id: 'events',      icon: '◆', label: 'Events'     },
  { id: 'notes',       icon: '□', label: 'Notes'      },
];

// ── helpers ────────────────────────────────────────────────────────────────
function pad(n) { return String(n).padStart(2, '0'); }

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const date = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
      setTime(`${date}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useUptime() {
  const [start] = useState(Date.now);
  const [uptime, setUptime] = useState('00:00:00');
  useEffect(() => {
    const tick = () => {
      const s = Math.floor((Date.now() - start) / 1000);
      setUptime(`${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`);
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [start]);
  return uptime;
}

// ── sub-components ─────────────────────────────────────────────────────────
function Titlebar({ clock }) {
  return (
    <div className="titlebar">
      <div className="titlebar-dots" aria-hidden="true">
        <span className="titlebar-dot titlebar-dot--red" />
        <span className="titlebar-dot titlebar-dot--yellow" />
        <span className="titlebar-dot titlebar-dot--green" />
      </div>
      <div className="titlebar-version">ver.25.12.06</div>
      <div className="right titlebar-clock" id="clock">{clock}</div>
    </div>
  );
}

function Menubar({ page, setPage, theme, setTheme, toggleFullscreen }) {
  return (
    <div className="menubar">
      <nav className="menu-items" aria-label="Top navigation">
        {NAV_TOP.map(({ id, label, href, download }) => href ? (
          <a key={id} id={`nav-top-${id}`} href={href} download={download ? '' : undefined}>
            {label}
          </a>
        ) : (
          <button
            key={id}
            id={`nav-top-${id}`}
            data-page={id}
            className={page === id ? 'active' : ''}
            onClick={() => setPage(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="theme-toggle">
        <button className="screen-fullscreen" type="button" onClick={toggleFullscreen} aria-label="Toggle screen fullscreen" title="Toggle fullscreen">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <button
          id="theme-toggle"
          className={`theme-switch${theme === 'dark' ? ' theme-switch--dark' : ''}`}
          type="button"
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Theme: ${theme}`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <span className="theme-switch__thumb" />
        </button>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar" aria-label="Side navigation">
      <nav className="nav">
        {NAV_SIDE.map(({ id, icon, label }) => (
          <button
            key={id}
            id={`nav-side-${id}`}
            data-page={id}
            className={page === id ? 'active' : ''}
            onClick={() => setPage(id)}
          >
            <span className="tag">{icon}</span> {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function ProfilePanel() {
  return (
    <div className="profile-row">
      {/* Left: user profile */}
      <div className="panel">
        <div className="panel-title">USER PROFILE</div>
        <div className="profile-inner">
          {/* Avatar — image or ASCII art */}
          <div className="avatar" tabIndex={PROFILE.avatarImage && PROFILE.asciiImage ? 0 : undefined}>
            {PROFILE.avatarImage ? (
              <>
                <img src={PROFILE.avatarImage} alt={PROFILE.name} className="avatar-img avatar-img--normal" />
                {PROFILE.asciiImage && (
                  <img src={PROFILE.asciiImage} alt={`${PROFILE.name} ASCII portrait`} className="avatar-img avatar-img--ascii" />
                )}
              </>
            ) : <pre>{PROFILE.asciiArt}</pre>}
          </div>
          <div className="profile-details">
            <h1>
              {PROFILE.name}
              <span className="status-badge">ONLINE</span>
            </h1>
            <div className="quote">&ldquo;{PROFILE.quote}&rdquo;</div>
            <div className="kv">
              <div className="k">User ID:</div>   <div>{PROFILE.userId}</div>
              <div className="k">Role:</div>       <div>{PROFILE.role}</div>
              <div className="k">Location:</div>  <div>{PROFILE.location}</div>
              <div className="k">Domain:</div>    <div>{PROFILE.domain}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: stats */}
      <div className="panel">
        <div className="panel-title">STATS</div>
        <div className="stats-list">
          {STATS.map(({ label, value }) => (
            <div key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SysMsg() {
  return (
    <div className="sysmsg">
      <div className="head">SYSTEM MESSAGE</div>
      <div className="msg">{SYSTEM_MESSAGE}</div>
    </div>
  );
}

function Statusbar({ uptime }) {
  return (
    <div className="statusbar">
      <div>{STATUS_BAR.left}</div>
      <div>UPTIME: {uptime}</div>
      <div>VISITORS TODAY: {STATUS_BAR.visitorsToday}</div>
    </div>
  );
}

// ── root App ───────────────────────────────────────────────────────────────
export default function App() {
  const screenRef = useRef(null);
  const [page, setPage]   = useState('about');
  const [displayedPage, setDisplayedPage] = useState('about');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderLeaving, setIsLoaderLeaving] = useState(false);
  const pageTransitionTimer = useRef(null);
  const sceneTransitionTimer = useRef(null);
  const [sceneChanging, setSceneChanging] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('smv-theme') === 'dark' ? 'dark' : 'light');
  const clock  = useClock();
  const uptime = useUptime();

  useLayoutEffect(() => {
    const assembly = document.querySelector('.monitor-assembly');
    if (!assembly) return undefined;
    const resize = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      const scale = window.matchMedia('(max-width: 699px)').matches
        ? 1
        : Math.min((height * 0.84) / 900, (width * 0.76) / 1160);
      assembly.style.setProperty('--crt-scale', String(scale));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const toggleFullscreen = async () => {
    const screen = screenRef.current;
    if (!screen) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (screen.requestFullscreen) await screen.requestFullscreen();
    } catch (error) {
      console.warn('Fullscreen could not be opened.', error);
    }
  };

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('smv-theme', theme);
  }, [theme]);

  useEffect(() => {
    let lastTouchY = 0;
    const scroller = () => document.querySelector('.content-scroll');
    const forwardWheel = (event) => {
      if (window.matchMedia('(max-width: 699px)').matches) return;
      if (event.target.closest?.('.content-scroll, .project-modal__details, .project-modal__gallery')) return;
      const target = scroller();
      if (!target || !event.deltaY) return;
      event.preventDefault();
      target.scrollTop += event.deltaY;
    };
    const rememberTouch = (event) => { lastTouchY = event.touches[0]?.clientY ?? lastTouchY; };
    const forwardTouch = (event) => {
      if (window.matchMedia('(max-width: 699px)').matches) return;
      if (event.target.closest?.('.content-scroll, .project-modal__details, .project-modal__gallery')) return;
      const target = scroller();
      const currentY = event.touches[0]?.clientY ?? lastTouchY;
      if (target) { event.preventDefault(); target.scrollTop += lastTouchY - currentY; }
      lastTouchY = currentY;
    };
    window.addEventListener('wheel', forwardWheel, { passive: false });
    window.addEventListener('touchstart', rememberTouch, { passive: true });
    window.addEventListener('touchmove', forwardTouch, { passive: false });
    return () => {
      window.removeEventListener('wheel', forwardWheel);
      window.removeEventListener('touchstart', rememberTouch);
      window.removeEventListener('touchmove', forwardTouch);
    };
  }, []);

  useEffect(() => () => {
    window.clearTimeout(pageTransitionTimer.current);
    window.clearTimeout(sceneTransitionTimer.current);
  }, []);

  const changeTheme = (nextTheme) => {
    setTheme(nextTheme);
    setSceneChanging(true);
    window.clearTimeout(sceneTransitionTimer.current);
    sceneTransitionTimer.current = window.setTimeout(() => setSceneChanging(false), 1700);
  };

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsLoaderLeaving(true), 1600);
    const removeTimer = window.setTimeout(() => setIsLoading(false), 1950);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  const navigateTo = (nextPage) => {
    if (nextPage === page) return;

    window.clearTimeout(pageTransitionTimer.current);
    setPage(nextPage);
    setIsPageTransitioning(true);

    pageTransitionTimer.current = window.setTimeout(() => {
      setDisplayedPage(nextPage);
      window.requestAnimationFrame(() => setIsPageTransitioning(false));
    }, 160);
  };

  return (
    <>
    <RoomScene theme={theme} changing={sceneChanging} />
    <div className="monitor-assembly">
      <div className="monitor">
      {isLoading && (
        <div className={`loading-screen${isLoaderLeaving ? ' loading-screen--leaving' : ''}`} role="status" aria-label="Loading portfolio">
          <div className="loading-screen__content">
            <div className="loading-screen__label">BOOTING PORTFOLIO</div>
            <div className="loading-screen__logo" aria-label="S M V">
              <pre className="loading-screen__glyph loading-screen__glyph--s">{` █████
█
 ████
     █
█████`}</pre>
              <pre className="loading-screen__glyph loading-screen__glyph--m">{`█   █
██ ██
█ █ █
█   █
█   █`}</pre>
              <pre className="loading-screen__glyph loading-screen__glyph--v">{`█   █
█   █
 █ █
 █ █
  █`}</pre>
            </div>
            <div className="loading-screen__prompt">&gt; INITIALIZING<span className="loading-screen__cursor">_</span></div>
          </div>
        </div>
      )}
      <div className="screen" ref={screenRef}>
        <Titlebar clock={clock} />
        <Menubar page={page} setPage={navigateTo} theme={theme} setTheme={changeTheme} toggleFullscreen={toggleFullscreen} />

        <div className="content-scroll">
        <div className="body-grid">
          <Sidebar page={page} setPage={navigateTo} />

          <main className="main">
                <div
                  className={`profile-section${page === 'about' ? '' : ' profile-section--hidden'}`}
                  aria-hidden={page !== 'about'}
                >
                  <ProfilePanel />
                </div>
            <div className={`page-transition${isPageTransitioning ? ' page-transition--leaving' : ''}`}>
              <PageRenderer page={displayedPage} />
            </div>
            <SysMsg />
          </main>
        </div>
        </div>

        <Statusbar uptime={uptime} />
      </div>
      </div>
      <div className="monitor-seam" aria-hidden="true" />
      <div className="monitor-vents" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="monitor-stand" aria-hidden="true"><div className="stand-neck"/><div className="stand-base"/></div>
    </div>
    </>
  );
}
