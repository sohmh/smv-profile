// PageRenderer.jsx
// Reads content.jsx data and renders two-panel layouts for each page.
// To add a new page: create a component below and add it to PAGE_MAP.

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BlogEntry      from './BlogEntry.jsx';
import VideoEntry     from './VideoEntry.jsx';
import GitHubActivity from './GitHubActivity.jsx';
import LeetCodeHeatmap from './LeetCodeHeatmap.jsx';

import {
  ABOUT, BLOG_POSTS,
  PROJECTS, EXPERIENCES, UPDATES,
  VIDEOS, FEATURED_VIDEO,
  CREDENTIALS, CERTIFICATES,
  EVENTS, NOTES,
  CONTACT,
} from '../data/content.jsx';

// ── shared primitives ──────────────────────────────────────────────────────
function Panel({ title, children, className = '' }) {
  return (
    <div className={`panel${className ? ` ${className}` : ''}`}>
      <div className="panel-title">{title}</div>
      {children}
    </div>
  );
}

function TagList({ tags }) {
  // Deduplicate
  const unique = [...new Set(tags)];
  return (
    <div className="taglist">
      {unique.map(t => <span key={t}>{t}</span>)}
    </div>
  );
}

// ── social links (used on Contact page) ────────────────────────────────────
function SocialLinks() {
  const { email, github, linkedin, twitter, medium, bereal, letterboxd, researchgate } = CONTACT;

  // Strip leading @ so the user can write "@handle" or "handle" in content.jsx
  const gh = github?.replace(/^@/, '') || '';
  const tw = twitter?.replace(/^@/, '') || '';

  const links = [
    {
      key: 'email',
      label: 'EMAIL',
      href: email ? `mailto:${email}` : null,
      display: email || '',
      show: !!email,
    },
    {
      key: 'github',
      label: 'GITHUB',
      href: gh ? `https://github.com/${gh}` : null,
      display: gh ? `@${gh} ↗` : '',
      show: !!gh,
    },
    {
      key: 'linkedin',
      label: 'LINKEDIN',
      href: linkedin ? `https://linkedin.com${linkedin}` : null,
      display: linkedin ? `${linkedin} ↗` : '',
      show: !!linkedin,
    },
    {
      key: 'twitter',
      label: 'TWITTER / X',
      href: tw ? `https://twitter.com/${tw}` : null,
      display: tw ? `@${tw} ↗` : '',
      show: !!tw,
    },
    {
      key: 'medium',
      label: 'MEDIUM',
      href: medium || null,
      display: medium ? 'Read articles ↗' : '',
      show: !!medium,
    },
    {
      key: 'bereal',
      label: 'BEREAL',
      href: null,
      display: bereal ? `@${bereal?.replace(/^@/, '')}` : '',
      show: !!bereal,
    },
    {
      key: 'letterboxd',
      label: 'LETTERBOXD',
      href: letterboxd ? `https://letterboxd.com/${letterboxd}` : null,
      display: letterboxd ? `${letterboxd} ↗` : '',
      show: !!letterboxd,
    },
    {
      key: 'researchgate',
      label: 'RESEARCHGATE',
      href: researchgate ? `https://www.researchgate.net/profile/${researchgate}` : null,
      display: researchgate ? `${researchgate} ↗` : '',
      show: !!researchgate,
    },
  ].filter(l => l.show);

  return (
    <div className="social-links">
      {links.map(({ key, label, href, display }) => (
        <div key={key} className="social-link-row">
          <span className="social-link-label">{label}</span>
          {href
            ? (
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="social-link-val social-link-val--link"
              >
                {display}
              </a>
            )
            : <span className="social-link-val">{display}</span>
          }
        </div>
      ))}
    </div>
  );
}

// ── page components ────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <>
      <Panel title="ABOUT ME">
        {ABOUT.body.map(({ title, text }) => (
          <div className="entry" key={title}>
            <div className="title">{title}</div>
            <div style={{ lineHeight: 1.75, whiteSpace: 'pre-line', fontSize: 12.5 }}>{text}</div>
          </div>
        ))}
      </Panel>
      <Panel title="UPDATES">
        {UPDATES.length === 0
          ? <div className="entry-excerpt">No updates yet — add entries to UPDATES in content.jsx.</div>
          : UPDATES.map(u => (
            <div className="entry" key={u.date + u.title}>
              <div className="meta">{u.date}</div>
              <div className="title">{u.title}</div>
              {u.text && (
                <div style={{ fontSize: 12, lineHeight: 1.65, marginTop: 4 }}>{u.text}</div>
              )}
            </div>
          ))
        }
      </Panel>
    </>
  );
}

// ── ProjectCard — opens the full project window ─────────────────────────────
function ProjectCard({ p, onReadMore }) {
  return (
    <div className="entry">
      {/* Header: title + status badge */}
      <div className="project-header">
        <div className="title">{p.title}</div>
        {p.status && (
          <span className={`project-badge project-badge--${p.status.toLowerCase().replace(/\s+/g, '-')}`}>
            {p.status}
          </span>
        )}
      </div>

      {/* Short description */}
      {p.description && (
        <div className="project-short-desc">{p.description}</div>
      )}

      {/* Tech tags */}
      {p.tech?.length > 0 && (
        <div className="taglist project-taglist">
          {p.tech.map(t => <span key={t}>{t}</span>)}
        </div>
      )}

      <button className="project-expand-btn" onClick={() => onReadMore(p)}>
        Read more
      </button>

      {/* GitHub / Live links */}
      {(p.github || p.link) && (
        <div className="project-links">
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="entry-btn">
              GitHub ↗
            </a>
          )}
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="entry-btn">
              Live ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const images = (project.images || []).filter(Boolean).map(image => (
    typeof image === 'string' ? { src: image, alt: project.title } : image
  ));
  const sections = [
    ['WHY I MADE IT', project.whyMade || project.description],
    ['WHAT WAS MY CONTRIBUTION', project.contribution],
    ['HOW IT WORKS', project.howItWorks],
    ['WHAT I LEARNT', project.whatILearnt || project.details],
  ];

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        if (activeImage !== null) setActiveImage(null);
        else onClose();
      }
    };
    closeRef.current?.focus();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose, activeImage]);

  const host = document.querySelector('.screen');
  if (!host) return null;

  return createPortal(
    <div className="project-modal-layer">
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <header className="project-modal__header">
          <div>
            <div className="project-modal__eyebrow">PROJECT FILE</div>
            <h2 id="project-modal-title">{project.title}</h2>
          </div>
          <button ref={closeRef} className="project-modal__close" type="button" onClick={onClose} aria-label="Close project details">×</button>
        </header>
        <div className="project-modal__body">
          <div className="project-modal__details">
            {sections.map(([title, text]) => (
              <section className="project-modal__section" key={title}>
                <h3>{title}</h3>
                {text?.trim()
                  ? <p>{text}</p>
                  : <p className="project-modal__placeholder">Add this section to the project entry in <code>src/data/content.jsx</code>.</p>}
              </section>
            ))}
            {(project.github || project.link) && (
              <div className="project-modal__links">
                {project.github && <a className="entry-btn" href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                {project.link && <a className="entry-btn" href={project.link} target="_blank" rel="noopener noreferrer">Live ↗</a>}
              </div>
            )}
          </div>
          <aside className="project-modal__gallery" aria-label={`${project.title} image gallery`}>
            <h3>PROJECT GALLERY</h3>
            {images.length
              ? <div className="project-modal__images">
                  {images.map((image, index) => (
                    <figure className="project-modal__image" key={`${image.src}-${index}`}>
                      <button className="project-modal__image-button" type="button" onClick={() => setActiveImage(index)} aria-label={`View ${image.alt || `${project.title} photo ${index + 1}`} larger`}>
                        <img src={image.src} alt={image.alt || `${project.title} photo ${index + 1}`} />
                        {image.caption && <span className="project-modal__image-caption">{image.caption}</span>}
                      </button>
                    </figure>
                  ))}
                </div>
              : <div className="project-modal__gallery-empty">Add project photos to <code>public/images/projects/</code>, then list their paths in this project's <code>images</code> array in <code>src/data/content.jsx</code>.</div>}
          </aside>
        </div>
        <footer className="project-modal__footer">SMV-90 · PROJECT ARCHIVE</footer>
        {activeImage !== null && (
          <div className="project-image-viewer" role="dialog" aria-modal="true" aria-label="Project image preview" onClick={() => setActiveImage(null)}>
            <button className="project-image-viewer__close" type="button" aria-label="Close image preview" onClick={() => setActiveImage(null)}>×</button>
            <img src={images[activeImage].src} alt={images[activeImage].alt || `${project.title} photo ${activeImage + 1}`} onClick={event => event.stopPropagation()} />
            {images[activeImage].caption && <div className="project-image-viewer__caption">{images[activeImage].caption}</div>}
          </div>
        )}
      </section>
    </div>,
    host,
  );
}

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const closeProject = () => setSelectedProject(null);

  return (
    <>
      <Panel title="PROJECTS">
        {PROJECTS.length === 0
          ? <div className="entry-excerpt">No projects yet — add entries to PROJECTS in content.jsx.</div>
          : PROJECTS.map(p => <ProjectCard key={p.id} p={p} onReadMore={setSelectedProject} />)
        }
      </Panel>
      <Panel title="SKILLS">
        <TagList tags={ABOUT.skills} />
      </Panel>
      {selectedProject && <ProjectModal project={selectedProject} onClose={closeProject} />}
    </>
  );
}


function BlogPage() {
  return (
    <Panel title="BLOG POSTS" className="blog-page-panel">
      {BLOG_POSTS.map(post => (
        <BlogEntry key={post.id} post={post} />
      ))}
    </Panel>
  );
}

function ExperienceModal({ experience, onClose }) {
  const closeRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const images = (experience.images || []).filter(Boolean).map(image => (
    typeof image === 'string' ? { src: image, alt: `${experience.organization} experience` } : image
  ));

  useEffect(() => {
    const closeOnEscape = event => {
      if (event.key !== 'Escape') return;
      if (activeImage !== null) setActiveImage(null);
      else onClose();
    };
    closeRef.current?.focus();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose, activeImage]);

  const host = document.querySelector('.screen');
  if (!host) return null;

  return createPortal(
    <div className="project-modal-layer" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="experience-modal-title">
        <header className="project-modal__header">
          <div>
            <div className="project-modal__eyebrow">EXPERIENCE FILE</div>
            <h2 id="experience-modal-title">{experience.role}</h2>
            <div className="experience-modal__organization">{experience.organization} · {experience.period}</div>
          </div>
          <button ref={closeRef} className="project-modal__close" type="button" onClick={onClose} aria-label="Close experience details">×</button>
        </header>
        <div className="project-modal__body">
          <div className="project-modal__details">
            <section className="project-modal__section">
              <h3>WHAT I DID</h3>
              <p>{experience.description}</p>
            </section>
          </div>
          <aside className="project-modal__gallery" aria-label={`${experience.organization} image gallery`}>
            <h3>EXPERIENCE GALLERY</h3>
            {images.length
              ? <div className="project-modal__images">{images.map((image, index) => (
                  <figure className="project-modal__image" key={`${image.src}-${index}`}>
                    <button className="project-modal__image-button" type="button" onClick={() => setActiveImage(index)} aria-label={`View ${image.alt || `${experience.organization} photo ${index + 1}`} larger`}>
                      <img src={image.src} alt={image.alt || `${experience.organization} photo ${index + 1}`} />
                      {image.caption && <span className="project-modal__image-caption">{image.caption}</span>}
                    </button>
                  </figure>
                ))}</div>
              : <div className="experience-gallery-placeholder">
                  <div className="experience-gallery-placeholder__frame" aria-hidden="true">＋</div>
                  <p>Image placeholder</p>
                  <small>Add photos under <code>public/images/experience/</code>, then list their paths in this experience&apos;s <code>images</code> array in <code>src/data/content.jsx</code>.</small>
                </div>}
          </aside>
        </div>
        <footer className="project-modal__footer">SMV-90 · EXPERIENCE ARCHIVE</footer>
        {activeImage !== null && (
          <div className="project-image-viewer" role="dialog" aria-modal="true" aria-label="Experience image preview" onClick={() => setActiveImage(null)}>
            <button className="project-image-viewer__close" type="button" aria-label="Close image preview" onClick={() => setActiveImage(null)}>×</button>
            <img src={images[activeImage].src} alt={images[activeImage].alt || `${experience.organization} photo ${activeImage + 1}`} onClick={event => event.stopPropagation()} />
            {images[activeImage].caption && <div className="project-image-viewer__caption">{images[activeImage].caption}</div>}
          </div>
        )}
      </section>
    </div>,
    host,
  );
}

function ExperiencePage() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const closeExperience = () => setSelectedExperience(null);
  return (
    <>
      <Panel title="EXPERIENCE TIMELINE" className="experience-page-panel">
        {EXPERIENCES.length === 0
          ? <div className="entry-excerpt">Add experience entries to EXPERIENCES in content.jsx.</div>
          : <div className="experience-timeline">{EXPERIENCES.map((experience, index) => (
              <button className="experience-timeline__item" type="button" key={experience.id} onClick={() => setSelectedExperience(experience)}>
                <span className="experience-timeline__marker" aria-hidden="true">{index + 1}</span>
                <span className="experience-timeline__copy">
                  <span className="experience-timeline__period">{experience.period}</span>
                  <span className="experience-timeline__role">{experience.role}</span>
                  <span className="experience-timeline__org">{experience.organization}</span>
                </span>
                <span className="experience-timeline__arrow" aria-hidden="true">↗</span>
              </button>
            ))}</div>}
      </Panel>
      {selectedExperience && <ExperienceModal experience={selectedExperience} onClose={closeExperience} />}
    </>
  );
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeajyggw';

function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle');

  const submitMessage = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Message delivery failed');
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      <Panel title="SEND A MESSAGE">
        <form onSubmit={submitMessage}>
          <input className="form-honeypot" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <div className="field">
          <label>NAME</label>
          <input name="name" type="text" placeholder="Your name" required />
        </div>
        <div className="field">
          <label>EMAIL</label>
          <input name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="field">
          <label>MESSAGE</label>
          <textarea name="message" placeholder="What's on your mind?" required />
        </div>
        <button
          className="send-btn"
          type="submit"
          disabled={formStatus === 'sending'}
        >
          SEND ▶
        </button>
        {formStatus === 'success' && <div className="form-status form-status--success" role="status">Message sent. Thank you!</div>}
        {formStatus === 'error' && <div className="form-status form-status--error" role="alert">Could not send the message. Please try again.</div>}
        </form>
      </Panel>

      <Panel title="CONTACT INFO">
        <div className="kv" style={{ gridTemplateColumns: '80px 1fr', marginBottom: 14 }}>
          <div className="k">Location:</div>
          <div>{CONTACT.location}</div>
        </div>
        <SocialLinks />
      </Panel>
    </>
  );
}

function CredentialsPage() {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!preview) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') setPreview(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [preview]);

  return (
    <>
      {/* LEFT: Education + legacy cert entries */}
      <Panel title="EDUCATION & CREDENTIALS">
        {CREDENTIALS.education.map(e => (
          <div className="entry" key={e.title}>
            <div className="meta">{e.period}</div>
            <div className="title">{e.title}</div>
            {e.institution && <div className="entry-excerpt">{e.institution}</div>}
            {e.detail && <div style={{ fontSize: 12, lineHeight: 1.65, marginTop: 4 }}>{e.detail}</div>}
          </div>
        ))}
        {CREDENTIALS.certifications.map(c => (
          <div className="entry" key={c.title}>
            <div className="meta">{c.period}</div>
            <div className="title">{c.title}</div>
          </div>
        ))}
      </Panel>

      {/* RIGHT: Certificates with view/verify buttons */}
      <Panel title="CERTIFICATES">
        {CERTIFICATES.length === 0 ? (
          <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.75 }}>
            No certificates added yet.<br />
            Drop files in <code style={{ fontSize: 11 }}>public/certificates/</code> and add entries
            to <code style={{ fontSize: 11 }}>CERTIFICATES</code> in content.jsx.
          </div>
        ) : (
          CERTIFICATES.map((cert, i) => (
            <div className="cert-card" key={i}>
              <div className="cert-title">{cert.title}</div>
              {(cert.issuer || cert.date) && (
                <div className="cert-meta">
                  {cert.issuer && <span>{cert.issuer}</span>}
                  {cert.issuer && cert.date && <span className="cert-sep">·</span>}
                  {cert.date && <span>{cert.date}</span>}
                </div>
              )}
              <div className="cert-actions">
                {cert.file && (
                  <button
                    type="button"
                    onClick={() => setPreview({ title: cert.title, file: cert.file })}
                    className="entry-btn"
                  >
                    View Certificate
                  </button>
                )}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="entry-btn cert-verify-btn"
                  >
                    Verify ↗
                  </a>
                )}
              </div>
            </div>
          ))
        )}
        <div className="cert-stack-sep" />
        <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '.4px', marginBottom: 6 }}>STACK</div>
        <TagList tags={CREDENTIALS.stack} />
      </Panel>
      {preview && (
        <div className="certificate-preview" role="presentation" onMouseDown={event => {
          if (event.target === event.currentTarget) setPreview(null);
        }}>
          <section className="certificate-preview__dialog" role="dialog" aria-modal="true" aria-label={preview.title}>
            <header className="certificate-preview__header">
              <div className="certificate-preview__title">{preview.title}</div>
              <button type="button" className="certificate-preview__close" onClick={() => setPreview(null)} aria-label="Close certificate preview">×</button>
            </header>
            {/\.(png|jpe?g|gif|webp|svg)$/i.test(preview.file) ? (
              <img className="certificate-preview__image" src={`/certificates/${preview.file}`} alt={preview.title} />
            ) : (
              <iframe className="certificate-preview__document" src={`/certificates/${preview.file}`} title={preview.title} />
            )}
          </section>
        </div>
      )}
    </>
  );
}

function ActivityPage() {
  return (
    <>
      <Panel title="GITHUB ACTIVITY">
        <GitHubActivity username={CONTACT.github} />
      </Panel>
      <Panel title="LEETCODE">
        <LeetCodeHeatmap username={CONTACT.leetcode} />
      </Panel>
    </>
  );
}

function VideosPage() {
  return (
    <>
      <Panel title="VIDEOS">
        {VIDEOS.length > 0
          ? VIDEOS.map(v => <VideoEntry key={v.id} video={v} />)
          : <div className="entry-excerpt">No videos yet — add entries to VIDEOS in content.jsx.</div>
        }
      </Panel>
      <Panel title="FEATURED">
        {FEATURED_VIDEO?.youtubeId
          ? <VideoEntry video={{ ...FEATURED_VIDEO, id: 'featured', duration: '', views: '' }} featured />
          : <div className="entry-excerpt">{FEATURED_VIDEO?.description || 'Set FEATURED_VIDEO in content.jsx.'}</div>
        }
      </Panel>
    </>
  );
}

function EventGallery() {
  const photos = (EVENTS.gallery || []).filter(Boolean);
  const [activePhoto, setActivePhoto] = useState(0);
  const displayedPhoto = photos.length ? activePhoto % photos.length : 0;

  useEffect(() => {
    if (photos.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActivePhoto(current => (current + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [photos.length]);

  if (photos.length === 0) {
    return <div className="gallery-empty">Add image filenames to <code>EVENTS.gallery</code>.</div>;
  }

  return (
    <div className="event-gallery">
      <img
        src={`/images/events/${photos[displayedPhoto]}`}
        alt={`Event gallery photo ${displayedPhoto + 1}`}
        className="event-gallery__image"
      />
      {photos.length > 1 && (
        <div className="event-gallery__status" aria-label={`Photo ${displayedPhoto + 1} of ${photos.length}`}>
          {photos.map((photo, index) => <span key={photo} className={index === displayedPhoto ? 'active' : ''} />)}
        </div>
      )}
    </div>
  );
}

function EventsPage() {
  return (
    <>
      <Panel title="UPCOMING & PAST EVENTS">
        {EVENTS.list.map(e => (
          <div className="entry" key={e.title}>
            <div className="meta">{e.date} · {e.location}</div>
            <div className="title">{e.title}</div>
            {e.detail && (
              <div style={{ fontSize: 12, lineHeight: 1.65, marginTop: 4 }}>{e.detail}</div>
            )}
            {/* Certificate / event link buttons — set `file` or `link` in EVENTS */}
            {(e.file || e.link) && (
              <div className="cert-actions">
                {e.file && (
                  <a
                    href={`/certificates/${e.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="entry-btn"
                  >
                    View Certificate ↗
                  </a>
                )}
                {e.link && (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="entry-btn cert-verify-btn"
                  >
                    View ↗
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </Panel>
      <Panel title="EVENT GALLERY">
        <EventGallery />
      </Panel>
    </>
  );
}

function NotesPage() {
  const allTags = [...new Set(NOTES.flatMap(n => n.tags || []))];
  return (
    <>
      <Panel title="NOTES">
        {NOTES.map(n => (
          <div className="entry" key={n.id || n.date + (n.text || n.link || '').slice(0, 12)}>
            <div className="meta">{n.date}</div>
            {n.text && <div>{n.text}</div>}
            {n.link && (
              <a href={n.link} target="_blank" rel="noopener noreferrer" className="entry-btn note-file-link">
                Open link
              </a>
            )}
            {n.tags?.length > 0 && (
              <div className="note-tags">
                {n.tags.map(t => <span key={t} className="blog-tag">{t}</span>)}
              </div>
            )}
          </div>
        ))}
      </Panel>
      <Panel title="TAGS">
        <TagList tags={allTags} />
      </Panel>
    </>
  );
}

// ── routing map ────────────────────────────────────────────────────────────
const PAGE_MAP = {
  about:       <AboutPage />,
  blog:        <BlogPage />,
  contact:     <ContactPage />,
  projects:    <ProjectsPage />,
  experience:  <ExperiencePage />,
  credentials: <CredentialsPage />,
  activity:    <ActivityPage />,
  videos:      <VideosPage />,
  events:      <EventsPage />,
  notes:       <NotesPage />,
};

export default function PageRenderer({ page }) {
  return (
    <div className="content-row">
      {PAGE_MAP[page] ?? (
        <Panel title="404">
          <div className="entry">Page not found.</div>
        </Panel>
      )}
    </div>
  );
}
