import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store.jsx';

const DROPDOWN = [
  ['#tier-befree', 'Be Free — Tropical Birds'],
  ['#tier-betrue', 'Be True — Botanical Leaf'],
  ['#tier-kohana', 'Kohana — Hydrangea Bloom'],
  ['#tier-justbee', 'Just Bee — Golden Honeycomb'],
];

export default function Header() {
  const {
    t, lang, setLang, currency, setCurrency, bag,
    setBagOpen, setSearchOpen, setTreesOpen,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setLocaleOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const totalQty = bag.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
    <div className="top-bar">{t.top_bar}</div>
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <nav className="nav-left">
        <a href="#bestsellers" className="nav-link">{t.nav_best}</a>
        <div className="dropdown">
          <button className="nav-link">{t.nav_coll}</button>
          <div className="dropdown-menu">
            {DROPDOWN.map(([href, label]) => (
              <a key={href} href={href} className="dropdown-item">{label}</a>
            ))}
          </div>
        </div>
        <a href="#mission" className="nav-link">{t.nav_mission}</a>
        <button className="nav-link" onClick={() => setTreesOpen(true)}>{t.nav_trees}</button>
      </nav>

      <a href="#" className="brand-logo">
        <svg viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 2C7 7 5 11.5 5 15a7 7 0 0 0 14 0c0-3.5-2-8-7-13Z" />
          <path d="M12 7v13M12 12l4-3M12 15l-4-3" />
        </svg>
        MEDLAY
      </a>

      <div className="nav-right">
        <button className="icon-action" onClick={() => setSearchOpen(true)} aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
        </button>

        <div className="locale-wrap" ref={wrapRef}>
          <button className="icon-action locale-pill" onClick={() => setLocaleOpen((v) => !v)}>
            {`UZ - ${currency} - ${lang} ▾`}
          </button>
          <div className={`locale-menu${localeOpen ? ' open' : ''}`}>
            <div className="locale-group-title">{t.currency_lang}</div>
            <div className="locale-grid">
              {[['UZS', 'UZS'], ['USD', 'USD ($)'], ['AED', 'AED']].map(([code, label]) => (
                <button
                  key={code}
                  className={`locale-opt${currency === code ? ' active' : ''}`}
                  onClick={() => setCurrency(code)}
                >{label}</button>
              ))}
            </div>
            <div className="locale-group-title">{t.language}</div>
            <div className="locale-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 0 }}>
              {[['RU', 'Русский'], ['EN', 'English']].map(([code, label]) => (
                <button
                  key={code}
                  className={`locale-opt${lang === code ? ' active' : ''}`}
                  onClick={() => setLang(code)}
                >{label}</button>
              ))}
            </div>
          </div>
        </div>

        <button className="icon-action" onClick={() => setBagOpen(true)}>
          <span>{t.nav_bag}</span>
          <span className="cart-badge">{totalQty}</span>
        </button>
      </div>
    </header>
    </>
  );
}
