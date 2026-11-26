import { useState } from 'react';
import { useStore } from '../store.jsx';
import { METALS, SIZES, asset } from '../data/products.js';
import Backdrop from './Backdrop.jsx';

function ConfigBody({ product }) {
  const { t, productTitle, formatPrice, addToBag } = useStore();
  const [metal, setMetal] = useState(METALS[0]);
  const [size, setSize] = useState(SIZES[1]);

  const title = productTitle(product);
  const finalPrice = Math.round(product.priceUsd * (metal === 'Platinum 950' ? 1.15 : 1));

  return (
    <div className="config-layout">
      <div className="config-stage">
        <img src={asset(product.image)} alt={title} />
      </div>
      <div>
        <span className="launch-pill">LAUNCH PRICE • {product.collection}</span>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 30, marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>{product.specs}</p>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18 }}>
          <span className="price-old" style={{ marginRight: 10 }}>{formatPrice(product.oldPriceUsd)}</span>
          {formatPrice(finalPrice)}
        </div>

        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)' }}>{t.metal}</div>
        <div className="option-pills">
          {METALS.map((m) => (
            <button key={m} className={`opt-pill${metal === m ? ' active' : ''}`} onClick={() => setMetal(m)}>{m}</button>
          ))}
        </div>

        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)' }}>{t.size}</div>
        <div className="option-pills">
          {SIZES.map((s) => (
            <button key={s} className={`opt-pill${size === s ? ' active' : ''}`} onClick={() => setSize(s)}>{s}</button>
          ))}
        </div>

        <button
          className="btn-cream"
          style={{ width: '100%', justifyContent: 'center', background: 'var(--forest-deep)', color: '#fff' }}
          onClick={() => addToBag(product, metal, size, finalPrice)}
        >
          {t.add_to_bag} • {formatPrice(finalPrice)}
        </button>
      </div>
    </div>
  );
}

export default function ConfigModal() {
  const { products, configProductId, closeConfig } = useStore();
  const product = products.find((p) => p.id === configProductId);
  return (
    <Backdrop open={!!product} onClose={closeConfig}>
      {/* key — чтобы выбор металла/размера сбрасывался для каждого изделия */}
      {product && <ConfigBody key={product.id} product={product} />}
    </Backdrop>
  );
}
