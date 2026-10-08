// GitHubActivity.jsx
// Profile stats + contribution heatmap (last year).
// Calendar data: https://github-contributions-api.jogruber.de (community proxy; CORS-enabled)

import { useState, useEffect } from 'react';

const stripAt = s => s?.replace(/^@/, '') || '';

const GITHUB_API = 'https://api.github.com';
const CONTRIB_API = 'https://github-contributions-api.jogruber.de/v4';

function padWeeks(contributions) {
  const padded = [...contributions];
  const rem = padded.length % 7;
  if (rem !== 0) {
    const last = padded[padded.length - 1]?.date;
    for (let i = 0; i < 7 - rem; i += 1) {
      padded.push({ date: `${last}-pad-${i}`, count: 0, level: 0, pad: true });
    }
  }
  const weekCount = padded.length / 7;
  return Array.from({ length: weekCount }, (_, wi) =>
    padded.slice(wi * 7, wi * 7 + 7),
  );
}

export default function GitHubActivity({ username: raw }) {
  const username = stripAt(raw);

  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!username) return;

    Promise.all([
      fetch(`${GITHUB_API}/users/${username}`).then(r => r.json()),
      fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`).then(r => r.json()),
      fetch(`${CONTRIB_API}/${username}?y=last`).then(r => r.json()),
    ])
      .then(([prof, rps, cal]) => {
        if (prof.message) { setStatus('error'); return; }
        if (!Array.isArray(cal?.contributions)) { setStatus('error'); return; }
        setData({
          profile: prof,
          totalStars: (Array.isArray(rps) ? rps : []).reduce((a, r) => a + r.stargazers_count, 0),
          contributions: cal.contributions,
          lastYearTotal: cal.total?.lastYear ?? cal.contributions.reduce((a, d) => a + d.count, 0),
        });
        setStatus('ok');
      })
      .catch(() => setStatus('error'));
  }, [username]);

  if (status === 'loading') return <div className="gh-status">FETCHING GITHUB DATA…</div>;
  if (status === 'error' || !data) {
    return (
      <div className="gh-status gh-status--err">
        Could not load GitHub data for &quot;{username}&quot;. Check CONTACT.github in content.jsx.
      </div>
    );
  }

  const { profile, totalStars, contributions, lastYearTotal } = data;
  const weeks = padWeeks(contributions);
  const inPeriod = contributions.reduce((a, d) => a + d.count, 0);

  return (
    <div className="gh-activity">
      <div className="gh-stats">
        {[
          { label: 'Repos',         val: profile.public_repos },
          { label: 'Stars',         val: totalStars },
          { label: 'Contributions', val: lastYearTotal },
          { label: 'Followers',     val: profile.followers },
        ].map(({ label, val }) => (
          <div key={label} className="gh-stat">
            <span className="gh-stat-val">{val}</span>
            <span className="gh-stat-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="heatmap-section">
        <div className="heatmap-label">
          Commits &amp; contributions &mdash; last {weeks.length} weeks &middot; {inPeriod} in view
        </div>
        <div className="heatmap-grid">
          {weeks.map((week, wi) => (
            <div key={wi} className="heatmap-week">
              {week.map(day => (
                <div
                  key={day.date}
                  className={`heatmap-cell gh-cell--${day.level ?? 0}`}
                  title={
                    day.pad
                      ? ''
                      : `${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
