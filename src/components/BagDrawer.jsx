import { useState } from 'react';
import { useStore } from '../store.jsx';
import { asset } from '../data/products.js';

export default function BagDrawer() {
  const {
    t, lang, bag, updateQty, formatPrice, bagOpen, setBagOpen,
    promoDiscount, promoMsg, applyPromo, completeOrder,
  } = useStore();
  const [promo, setPromo] = useState('');

  const subtotal = bag.reduce((sum, i) => sum + i.priceUsd * i.qty, 0);
  const total = subtotal * (1 - promoDiscount);

  return (
    <aside className={`bag-drawer${bagOpen ? ' open' : ''}`}>
      <div className="bag-header">
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500 }}>{t.bag_title}</h3>
        <button className="modal-close" style={{ position: 'static' }} onClick={() => setBagOpen(false)}>&times;</button>
      </div>

      <div className="bag-body">
        {bag.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontSize: 13.5, textAlign: 'center', marginTop: 40 }}>{t.bag_empty}</p>
        ) : bag.map((item, idx) => (
          <div className="bag-item" key={`${item.id}-${item.metal}-${item.size}`}>
            <img src={asset(item.image)} alt="" />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500 }}>
                {lang === 'RU' ? item.nameRu : item.nameEn}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{item.metal} • {item.size}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{formatPrice(item.priceUsd * item.qty)}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button onClick={() => updateQty(idx, -1)} style={{ width: 24, height: 24, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>-</button>
              <span style={{ fontSize: 12 }}>{item.qty}</span>
              <button onClick={() => updateQty(idx, 1)} style={{ width: 24, height: 24, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bag-footer">
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') applyPromo(promo); }}
            placeholder={t.promo_ph}
            style={{ flex: 1, padding: '10px 12px', border: '1px solid #d5d0c8', borderRadius: 4, fontSize: 12 }}
          />
          <button
            onClick={() => applyPromo(promo)}
            style={{ padding: '10px 14px', background: 'var(--forest-deep)', color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >{t.apply}</button>
        </div>
        <div style={{ fontSize: 11.5, color: '#2b6a3e', marginBottom: 10 }}>
          {promoMsg === 'ok' ? t.promo_ok : promoMsg === 'bad' ? t.promo_bad : ''}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600, marginBottom: 14 }}>
          <span>{t.total}</span>
          <span>{formatPrice(total)}</span>
        </div>
        <button
          className="btn-cream"
          style={{ width: '100%', justifyContent: 'center', background: 'var(--forest-deep)', color: '#fff' }}
          onClick={completeOrder}
        >
          {t.checkout}
        </button>
      </div>
    </aside>
  );
}
