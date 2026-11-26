import { useStore } from '../store.jsx';

export default function Footer() {
  const { t, setTreesOpen } = useStore();
  const onSubscribe = (e) => {
    e.preventDefault();
    window.alert(t.f_welcome);
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand-logo" style={{ marginBottom: 16 }}>MEDLAY</div>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 300, color: 'rgba(255,255,255,0.68)' }}>
            Lab-Grown Diamond High Jewelry.<br />Dubai Design District • Tashkent Concierge
          </p>
        </div>
        <div>
          <h4>{t.f_coll}</h4>
          <a href="#tier-befree">Be Free</a>
          <a href="#tier-betrue">Be True</a>
          <a href="#tier-kohana">Kohana</a>
          <a href="#tier-justbee">Just Bee</a>
        </div>
        <div>
          <h4>{t.f_care}</h4>
          <a href="#bestsellers">Global Free Delivery</a>
          <a href="#mission">Zero Duty Guarantee</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setTreesOpen(true); }}>GPS Tree Registry</a>
          <a href="mailto:concierge@medlay.com">concierge@medlay.com</a>
        </div>
        <div>
          <h4>{t.f_news}</h4>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.68)' }}>
            {t.f_news_d} <strong>MEDLAY10</strong>.
          </p>
          <form className="newsletter-form" onSubmit={onSubscribe}>
            <input type="email" placeholder={t.f_email} required />
            <button type="submit" className="btn-cream" style={{ padding: '12px 18px' }}>OK</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Medlay High Jewelry. All rights reserved.</span>
        <span>18K Recycled Gold • IGI Certified Lab-Grown Diamonds</span>
      </div>
    </footer>
  );
}
