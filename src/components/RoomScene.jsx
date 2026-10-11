import { useState } from 'react';
import { createPortal } from 'react-dom';
import { NOW_PLAYING_TRACKS } from '../data/nowPlaying.js';

export default function RoomScene({ theme, changing }) {
  const [nowPlayingOpen, setNowPlayingOpen] = useState(false);
  const [microscopeOpen, setMicroscopeOpen] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const activeTrack = NOW_PLAYING_TRACKS[activeTrackIndex] ?? NOW_PLAYING_TRACKS[0];
  const progress = Math.max(0, Math.min(100, Number(activeTrack?.progress) || 0));
  const toggleCassette = () => {
    if (nowPlayingOpen) {
      setNowPlayingOpen(false);
      return;
    }
    const available = NOW_PLAYING_TRACKS.map((_, index) => index).filter((index) => index !== activeTrackIndex);
    const choices = available.length ? available : NOW_PLAYING_TRACKS.map((_, index) => index);
    if (choices.length) setActiveTrackIndex(choices[Math.floor(Math.random() * choices.length)]);
    setNowPlayingOpen(true);
  };
  const playerPopup = nowPlayingOpen && activeTrack && createPortal(
    <div className="room-scene__player-layer">
      <div className="room-scene__player-popup" role="dialog" aria-label="Now playing">
        <button className="room-scene__player-close" type="button" aria-label="Close now playing" onClick={(event) => { event.stopPropagation(); setNowPlayingOpen(false); }}>×</button>
        <div className="room-scene__player-heading">NOW PLAYING</div>
        <div className="room-scene__player-song">{activeTrack.song}</div>
        <div className="room-scene__player-artist">{activeTrack.author}</div>
        <div className="room-scene__progress-track" role="progressbar" aria-label="Playing progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
          <span className="room-scene__progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>,
    document.body,
  );
  const microscopePopup = microscopeOpen && createPortal(
    <div className="microscope-popup-layer">
      <section className="microscope-popup" role="dialog" aria-modal="true" aria-label="Microscope view">
        <header className="microscope-popup__titlebar">
          <button className="microscope-popup__close" type="button" aria-label="Close microscope view" onClick={() => setMicroscopeOpen(false)}>×</button>
          <span>MICROSCOPE · LIVE VIEW</span>
          <span className="microscope-popup__magnification">40×</span>
        </header>
        <div className="microscope-popup__viewport">
          <div className="microscope-popup__field">
            <svg className="microscope-popup__specimen" viewBox="0 0 500 300" aria-hidden="true">
              <g fill="none" stroke="#73796e" strokeWidth="2" opacity=".58">
                <circle cx="82" cy="74" r="28"/><circle cx="82" cy="74" r="9"/>
                <circle cx="407" cy="68" r="39"/><circle cx="407" cy="68" r="13"/>
                <circle cx="104" cy="230" r="46"/><circle cx="104" cy="230" r="17"/>
                <circle cx="402" cy="223" r="31"/><circle cx="402" cy="223" r="10"/>
                <path d="M174 58q28-19 48 0t0 40q-20 18-47 0t-1-40zM295 201q23-15 45 2t-2 37q-24 13-43-3t0-36z"/>
              </g>
              <g fill="#899084" opacity=".52"><circle cx="210" cy="136" r="5"/><circle cx="263" cy="93" r="4"/><circle cx="318" cy="152" r="5"/><circle cx="183" cy="223" r="4"/><circle cx="345" cy="97" r="3"/></g>
            </svg>
            <div className="microscope-popup__cat" aria-hidden="true">
              <svg viewBox="0 0 96 70" shapeRendering="crispEdges">
                <path className="microscope-popup__tail" d="M20 43H9V32H2V20h7v9h10" fill="none" stroke="#242620" strokeWidth="6" strokeLinejoin="miter"/>
                <path d="M19 27h9V15h9V7h12v8h9v12h11v21H57v10h-9V49H35v9h-9V48h-7z" fill="#34372f"/>
                <path d="M28 15V5h11v10M49 15V5h11v10" fill="#34372f"/>
                <path d="M33 23h5v5h-5zM52 23h5v5h-5z" fill="#eeeade"/>
                <path d="M40 31h9v5h-9zM34 36h21v4H34z" fill="#b7b9ae"/>
                <path d="M27 49h8v10h-8zM48 49h9v10h-9z" fill="#242620"/>
                <path d="M24 43h-9M24 38h-9M58 43h10M58 38h10" stroke="#34372f" strokeWidth="2"/>
              </svg>
            </div>
            <div className="microscope-popup__reticle" aria-hidden="true" />
          </div>
        </div>
        <footer className="microscope-popup__status"><span>SPECIMEN: FELIS CATUS</span><span>FOCUS: AUTO</span></footer>
      </section>
    </div>,
    document.body,
  );
  return (
    <div className={`room-scene room-scene--${theme}${changing ? ' room-scene--changing' : ''}`} role="presentation">
      <svg className="room-scene__art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="room-wall-day" x2="0" y2="1"><stop stopColor="#d7ddd0"/><stop offset=".68" stopColor="#c4cdbf"/><stop offset="1" stopColor="#b6c0b2"/></linearGradient>
          <linearGradient id="room-wall-night" x2="0" y2="1"><stop stopColor="#58636a"/><stop offset=".72" stopColor="#424e56"/><stop offset="1" stopColor="#303c44"/></linearGradient>
          <linearGradient id="room-sky-day" x2="0" y2="1"><stop stopColor="#8cb5cd"/><stop offset=".62" stopColor="#c5dbe0"/><stop offset="1" stopColor="#e7dfca"/></linearGradient>
          <linearGradient id="room-sky-night" x2="0" y2="1"><stop stopColor="#101b31"/><stop offset=".75" stopColor="#273b50"/><stop offset="1" stopColor="#6b5660"/></linearGradient>
          <linearGradient id="room-glass" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".2"/><stop offset=".48" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#d9e6e7" stopOpacity=".12"/></linearGradient>
          <linearGradient id="room-table-face" x2="0" y2="1"><stop stopColor="#5b5145"/><stop offset="1" stopColor="#302e2b"/></linearGradient>
          <radialGradient id="room-sun-halo"><stop stopColor="#fff5c4" stopOpacity=".62"/><stop offset="1" stopColor="#fff5c4" stopOpacity="0"/></radialGradient>
          <radialGradient id="room-moon-halo"><stop stopColor="#bbd5ee" stopOpacity=".25"/><stop offset="1" stopColor="#bbd5ee" stopOpacity="0"/></radialGradient>
          <linearGradient id="room-dusk" x2="0" y2="1"><stop stopColor="#d08762" stopOpacity="0"/><stop offset=".55" stopColor="#d08762" stopOpacity=".38"/><stop offset="1" stopColor="#e2a078" stopOpacity="0"/></linearGradient>
          <radialGradient id="room-lamp-pool"><stop stopColor="#f6d9a0" stopOpacity=".47"/><stop offset="1" stopColor="#f6d9a0" stopOpacity="0"/></radialGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#room-wall-day)" className="room-scene__wall-day"/>
        <rect width="1600" height="900" fill="url(#room-wall-night)" className="room-scene__wall-night"/>
        <g className="room-scene__sky">
          <rect x="285" y="75" width="1030" height="570" fill="url(#room-sky-day)" className="room-scene__day"/>
          <rect x="285" y="75" width="1030" height="570" fill="url(#room-sky-night)" className="room-scene__night"/>
          <rect x="285" y="480" width="1030" height="165" fill="url(#room-dusk)" className="room-scene__dusk"/>
          <g className="room-scene__day">
            <circle className="room-scene__sun-halo" cx="370" cy="155" r="92" fill="url(#room-sun-halo)"/>
            <circle className="room-scene__sun room-scene__hover-pop" cx="370" cy="155" r="29" fill="#f4dca0"/>
            <g className="room-scene__cloud room-scene__cloud--one" fill="#eff0e8" opacity=".78"><ellipse cx="370" cy="245" rx="65" ry="17"/><circle cx="350" cy="232" r="22"/><circle cx="385" cy="227" r="28"/></g>
            <g className="room-scene__cloud room-scene__cloud--two" fill="#f2f1e8" opacity=".68"><ellipse cx="1260" cy="275" rx="52" ry="14"/><circle cx="1245" cy="263" r="18"/><circle cx="1274" cy="260" r="22"/></g>
            <g fill="#879e9b"><path d="M330 520h95v135h-95zM435 475h120v180H435zM568 525h105v130H568zM1030 485h92v170h-92zM1135 520h135v135h-135z"/><path d="M330 610q70-70 140 0t140 0 140 0v45H330z" fill="#718e83"/></g>
            <g fill="#eee7d7" opacity=".75"><path d="M455 495h10v12h-10zM480 495h10v12h-10zM505 495h10v12h-10zM455 525h10v12h-10zM480 525h10v12h-10zM505 525h10v12h-10zM1050 505h10v12h-10zM1075 505h10v12h-10zM1050 535h10v12h-10zM1075 535h10v12h-10zM1160 540h12v14h-12zM1190 540h12v14h-12z"/></g>
            <g fill="#526e60"><circle cx="385" cy="600" r="39"/><circle cx="425" cy="611" r="31"/><circle cx="1215" cy="601" r="45"/><circle cx="1170" cy="615" r="32"/></g>
          </g>
          <g className="room-scene__night">
            <circle className="room-scene__moon-halo" cx="1260" cy="155" r="105" fill="url(#room-moon-halo)"/>
            <circle className="room-scene__moon room-scene__hover-pop" cx="1260" cy="155" r="28" fill="#d8dfdc"/>
            <g className="room-scene__stars" fill="#d8e2e8">
              <circle cx="370" cy="175" r="2.5"/><circle cx="420" cy="205" r="2"/><circle cx="1260" cy="105" r="2"/><circle cx="1288" cy="205" r="2.5"/><circle cx="1220" cy="225" r="2"/><circle cx="1240" cy="115" r="2"/><circle cx="390" cy="190" r="1.8"/><circle cx="1300" cy="165" r="2"/>
            </g>
            <g fill="#182638"><path d="M330 520h95v135h-95zM435 475h120v180H435zM568 525h105v130H568zM1030 485h92v170h-92zM1135 520h135v135h-135z"/><path d="M330 610q70-70 140 0t140 0 140 0v45H330z" fill="#1b302d"/></g>
            <g fill="#d4b77d" opacity=".68"><path d="M455 495h10v12h-10zM505 525h10v12h-10zM480 555h10v12h-10zM1050 505h10v12h-10zM1075 535h10v12h-10zM1160 540h12v14h-12zM1220 570h12v14h-12z"/></g>
            <g fill="#15291f"><circle cx="385" cy="600" r="39"/><circle cx="425" cy="611" r="31"/><circle cx="1215" cy="601" r="45"/><circle cx="1170" cy="615" r="32"/></g>
          </g>
        </g>

        {/* Window frame, blinds, sill and restrained glass reflection. */}
        <rect x="260" y="45" width="1080" height="634" rx="4" fill="#77776c"/>
        <rect x="275" y="60" width="1050" height="604" fill="#d4d0c1"/>
        <rect x="285" y="75" width="1030" height="570" fill="url(#room-glass)"/>
        <g fill="#b6b3a5" opacity=".84"><path d="M287 82h1026v9H287zM287 98h1026v8H287zM287 113h1026v7H287zM287 127h1026v6H287z"/></g>
        <path d="M800 75v570M285 390h1030" stroke="#d2cdbd" strokeWidth="18"/>
        <path d="M800 75v570M285 390h1030" stroke="#77776d" strokeWidth="3" opacity=".7"/>
        <path d="M290 80l260 0-260 280z" fill="#fff" opacity=".08"/>
        <path d="M300 660h1000v31H300z" fill="#c8c3b3"/><path d="M300 660h1000v6H300z" fill="#f0ecdf"/><path d="M320 691h960v10H320z" fill="#8a877d"/>
        <rect className="room-scene__window-rim" x="262" y="47" width="1076" height="628"/>

        {/* Low-contrast research-lab details at the sides of the monitor. */}
        <g className="room-scene__wall-decor" fill="#73796f" stroke="#697068" strokeWidth="3" opacity=".8">
          <g className="room-scene__wall-left-lower" transform="translate(0 105)">
          <rect x="60" y="145" width="205" height="126" rx="2" fill="#d5d8ce"/><rect x="72" y="158" width="180" height="5" fill="#73796f"/>
          <path d="M86 240l38-56 38 56z" fill="none"/><path d="M105 224h38M107 212h34M112 200h24" fill="none"/>
          <rect x="78" y="184" width="164" height="72" fill="none" strokeDasharray="4 5"/>
          <path d="M100 222q26-42 54-4t58-8" fill="none" strokeWidth="2"/>
          <path d="M55 330h218v12H55zM68 342v90M258 342v90" fill="#8b887d"/><path d="M74 315h23v26H74zM102 302h28v39h-28zM137 310h20v31h-20zM169 295h31v46h-31zM211 307h29v34h-29z" fill="#8f7761"/>
          <path d="M86 329v-34q18-32 36 0v34M92 329h24" fill="none" strokeWidth="3"/>
          </g>
          <g transform="translate(0 -66)"><rect x="1340" y="140" width="195" height="205" rx="3" fill="#c8cec5"/><path d="M1353 158h168M1353 184h168M1353 210h168M1353 236h168M1353 262h168M1353 288h168M1380 158v150M1410 158v150M1440 158v150M1470 158v150M1500 158v150" fill="none" strokeWidth="1"/></g>
          <g className="room-scene__hover-pop room-scene__calendar" stroke="none" fill="#42463f">
            <rect x="1362" y="282" width="150" height="150" rx="2" fill="#e2e1d7" stroke="#64675f" strokeWidth="3"/>
            <rect x="1362" y="282" width="150" height="22" fill="#72766d"/>
            <text x="1437" y="297" textAnchor="middle" fill="#f4f2e8" fontSize="11" fontFamily="Courier, monospace" fontWeight="bold">DECEMBER 2006</text>
            <g fontSize="8" fontFamily="Courier, monospace" textAnchor="middle" fill="#4b5049">
              <text x="1378" y="319">S</text><text x="1398" y="319">M</text><text x="1418" y="319">T</text><text x="1438" y="319">W</text><text x="1458" y="319">T</text><text x="1478" y="319">F</text><text x="1498" y="319">S</text>
              <text x="1478" y="338">1</text><text x="1498" y="338">2</text>
              <text x="1378" y="355">3</text><text x="1398" y="355">4</text><text x="1418" y="355">5</text><text x="1438" y="355">6</text><text x="1458" y="355">7</text><text x="1478" y="355">8</text><text x="1498" y="355">9</text>
              <text x="1378" y="373">10</text><text x="1398" y="373">11</text><text x="1418" y="373">12</text><text x="1438" y="373">13</text><text x="1458" y="373">14</text><text x="1478" y="373">15</text><text x="1498" y="373">16</text>
              <text x="1378" y="391">17</text><text x="1398" y="391">18</text><text x="1418" y="391">19</text><text x="1438" y="391">20</text><text x="1458" y="391">21</text><text x="1478" y="391">22</text><text x="1498" y="391">23</text>
              <text x="1378" y="409">24</text><text x="1418" y="409">26</text><text x="1438" y="409">27</text><text x="1458" y="409">28</text><text x="1478" y="409">29</text><text x="1498" y="409">30</text>
              <text x="1378" y="427">31</text>
            </g>
            <circle cx="1398" cy="406" r="9" fill="#777b70"/><text x="1398" y="409" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Courier, monospace" fontWeight="bold">25</text>
          </g>
          <g className="room-scene__hover-pop room-scene__clock" fill="#d8d9cf" stroke="#697068">
            <circle cx="170" cy="160" r="42"/><circle cx="170" cy="160" r="35" fill="none" strokeWidth="2"/>
            <path d="M170 160v-30M170 160l25 14" fill="none" strokeWidth="4"/>
            <circle cx="170" cy="160" r="3" fill="#52564e" stroke="none"/>
            <text x="170" y="211" textAnchor="middle" fill="#e5e3d8" stroke="none" fontSize="12" fontFamily="Courier, monospace" fontWeight="bold">4:00 AM</text>
          </g>
          {/* The wall art below the clock was removed to keep this corner open. */}
        </g>

        {/* Daylight shafts and night room fill are opacity-only overlays. */}
        <g className="room-scene__day-light" fill="#fff4d5" opacity=".13"><path d="M340 660L620 664 420 900H130z"/><path d="M730 660l220 0 340 240H970z"/></g>
        <rect className="room-scene__night-light" width="1600" height="900" fill="#14283b" opacity=".25"/>
        <rect x="80" y="40" width="210" height="12" rx="6" fill="#c8cbc2" opacity=".42" className="room-scene__fluorescent"/>
      </svg>

      <div className="room-scene__table"><div className="room-scene__table-night" /></div>
      <div className="room-scene__contact-shadow" />
      <div className="room-scene__base-reflection" />
      <svg className="room-scene__props" viewBox="0 0 1600 225" preserveAspectRatio="none">
        <ellipse className="room-scene__lamp-glow" cx="1400" cy="75" rx="260" ry="170" fill="url(#room-lamp-pool)"/>
        <ellipse cx="805" cy="105" rx="300" ry="40" fill="#d7d9d4" opacity=".055" className="room-scene__screen-cast"/>
        {/* Microscope */}
        <g transform="translate(35 -122) scale(1.5 2.3)" fill="#b9b6a8" stroke="#77786f" strokeWidth="5">
          <g className="room-scene__hover-pop room-scene__microscope" role="button" tabIndex="0" aria-label="Open microscope view" aria-haspopup="dialog" onClick={() => setMicroscopeOpen(true)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setMicroscopeOpen(true); } }}>
            <path d="M40 12h44v24H40zM70 32l27 24-15 16-30-28zM87 66q38 24 3 56H48v-14h33q21-22-8-35z"/>
            <path d="M32 121h93v12H32zM63 110h15v12H63z"/>
          </g>
        </g>
        {/* Desk lamp with a night-only warm pool */}
        <g className="room-scene__hover-pop room-scene__lamp" transform="translate(1315 -177) scale(1.35 2.05)" stroke="#706e65" strokeWidth="7" fill="none"><path d="M35 176h150M105 174l22-86 52-38"/><path d="M151 38l59 18-16 37-61-17z" fill="#c4c0b1"/><path d="M153 88l49 14" stroke="#80745f" strokeWidth="4"/><path d="M82 176h48" strokeWidth="12"/></g>
        <g className="room-scene__hover-pop room-scene__water-glass" transform="translate(1553 40) scale(.9 1.25)" fill="#b9b6a8" stroke="#77786f" strokeWidth="5" aria-hidden="true">
          <path d="M4 2h44l-9 70h-28z" fill="#b9d1d4" fillOpacity=".55"/>
          <path d="M0 2h52" fill="none"/>
        </g>
        {/* Mug and a small stack of floppy disks */}
        <g className="room-scene__hover-pop room-scene__coffee" transform="translate(1170 91)" stroke="#726e63" strokeWidth="4"><path d="M0 0h62v37q-31 18-62 0z" fill="#d4d0c4"/><path d="M62 8h15q12 18-15 23" fill="none"/><ellipse cx="31" cy="4" rx="27" ry="6" fill="#080808" stroke="#171614"/><path d="M10 6h42" stroke="#9a8064"/><g className="room-scene__steam" fill="none" stroke="#e1dfd4" strokeWidth="2.5" strokeLinecap="round"><path d="M19 -5c-8-8 8-11 0-20s8-11 1-19"/><path d="M34 -7c8-8-8-12 1-21s-7-10 1-18"/><path d="M49 -5c-7-7 7-11 0-18s7-10 1-16"/></g></g>
        <g className="room-scene__cassette room-scene__hover-pop" transform="translate(1428 120) scale(.84 .74)" role="button" tabIndex="0" aria-label="Open now playing cassette" aria-expanded={nowPlayingOpen} onClick={toggleCassette} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleCassette(); } }}>
          <rect x="0" y="0" width="84" height="51" rx="3" fill="#474842" stroke="#252722" strokeWidth="3"/>
          <rect x="8" y="5" width="68" height="8" fill="#c7c4b8" stroke="#2d2e29" strokeWidth="1.5"/>
          <rect x="15" y="16" width="54" height="20" rx="2" fill="#77786e" stroke="#292a26" strokeWidth="2"/>
          <circle cx="28" cy="26" r="7" fill="#d4d1c5" stroke="#2b2c27" strokeWidth="2"/><circle cx="56" cy="26" r="7" fill="#d4d1c5" stroke="#2b2c27" strokeWidth="2"/>
          <circle cx="28" cy="26" r="2" fill="#41423c"/><circle cx="56" cy="26" r="2" fill="#41423c"/>
          <path d="M36 23h12v6H36zM4 44h6M74 44h6" fill="#bab7ab" stroke="#242520" strokeWidth="1.5"/>
        </g>
        {/* Beige 90s keyboard, corded mouse, notebook and pencil */}
        <g className="room-scene__hover-pop" transform="translate(570 149)"><path d="M0 0h455l-18 54H15z" fill="#c3c0b4" stroke="#74736d" strokeWidth="4"/><path d="M18 10h414M14 22h412M10 34h408" stroke="#88877f" strokeWidth="3"/>{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${25 + i * 29} 10v30`} stroke="#aaa79d" strokeWidth="2"/>)}<path d="M145 43h120" stroke="#74736d" strokeWidth="4"/></g>
        <g className="room-scene__hover-pop" transform="translate(1040 120)" fill="#c9c6ba" stroke="#77756e" strokeWidth="4"><path d="M0 13q18-18 38 0v32q-19 19-38 0z"/><path d="M38 19q18 7 0 20" fill="none"/><path d="M18 2q24-24 48-4" fill="none" strokeWidth="2"/></g>
        <g className="room-scene__hover-pop" transform="translate(270 110) rotate(-5)" stroke="#756f65" strokeWidth="3"><path d="M0 0h180v56H0z" fill="#d1cbb9"/><path d="M15 14h140M15 25h130M15 36h90" fill="none"/><path d="M184 7l15 40" stroke="#b29568" strokeWidth="6"/></g>
      </svg>
      <div className="room-scene__vignette-overlay" />
      {playerPopup}
      {microscopePopup}
    </div>
  );
}
