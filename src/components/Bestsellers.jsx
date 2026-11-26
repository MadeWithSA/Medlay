import { useStore } from '../store.jsx';
import { asset } from '../data/products.js';

const SWATCHES = [
  ['#e9e7e2', '18K White Gold'],
  ['#e4c988', '18K Yellow Gold'],
  ['#e3b49b', '18K Rose Gold'],
];

function Guarantee({ title, text, children }) {
  return (
    <div className="guarantee-item">
      <svg viewBox="0 0 24 24" strokeWidth="1.5">{children}</svg>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default function Bestsellers() {
  const { t, products, productTitle, formatPrice, openConfig } = useStore();
  const items = products.filter((p) => p.bestseller);

  return (
    <section className="bestsellers-section" id="bestsellers">
      <div className="section-header">
        <span className="section-kicker">{t.bs_kicker}</span>
        <h2 className="section-title">{t.bs_title}</h2>
      </div>

      <div className="bs-grid">
        {items.map((p) => {
          const title = productTitle(p);
          return (
            <div className="bs-card" key={p.id}>
              <div>
                <span className="launch-pill">LAUNCH PRICE</span>
                <div className="bs-img-stage" onClick={() => openConfig(p.id)}>
                  <img src={asset(p.image)} alt={title} loading="lazy" decoding="async" />
                </div>
                <div className="bs-collection">{p.collection}</div>
                <h3 className="bs-name">{title}</h3>
                <p className="bs-specs">{p.specs}</p>
              </div>
              <div>
                <div className="bs-price-row">
                  <span className="price-old">{formatPrice(p.oldPriceUsd)}</span>
                  <span className="price-now">{t.from}{formatPrice(p.priceUsd)}</span>
                </div>
                <div className="swatches">
                  {SWATCHES.map(([color, name], i) => (
                    <span key={name} className={`swatch${i === 0 ? ' active' : ''}`} style={{ background: color }} title={name} />
                  ))}
                </div>
                <button className="btn-outline-dark" onClick={() => openConfig(p.id)}>{t.choose_opts}</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="guarantees-strip">
        <Guarantee title={t.g1_t} text={t.g1_d}>
          <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
          <circle cx="7.5" cy="17.5" r="2" /><circle cx="17.5" cy="17.5" r="2" />
        </Guarantee>
        <Guarantee title={t.g2_t} text={t.g2_d}>
          <path d="M12 2 4 6v6c0 5.5 3.4 10.3 8 12 4.6-1.7 8-6.5 8-12V6l-8-4Z" />
          <path d="m9 12 2 2 4-4" />
        </Guarantee>
        <Guarantee title={t.g3_t} text={t.g3_d}>
          <path d="M12 22v-9M12 13c-4 0-7-3-7-7 4 0 7 3 7 7ZM12 11c4 0 7-3 7-7-4 0-7 3-7 7Z" />
        </Guarantee>
      </div>
    </section>
  );
}
