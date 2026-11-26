import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store.jsx';
import { asset } from '../data/products.js';
import Backdrop from './Backdrop.jsx';

export default function SearchModal() {
  const { t, lang, products, productTitle, formatPrice, searchOpen, setSearchOpen, openConfig } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery('');
  }, [searchOpen]);

  const q = query.toLowerCase();
  const matches = products.filter((p) =>
    p.nameRu.toLowerCase().includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.collection.toLowerCase().includes(q) ||
    p.specs.toLowerCase().includes(q)
  );

  return (
    <Backdrop open={searchOpen} onClose={() => setSearchOpen(false)} maxWidth={620}>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, marginBottom: 14 }}>{t.search_title}</h3>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.search_ph}
        style={{ width: '100%', padding: '14px 16px', border: '1px solid #d5d0c8', borderRadius: 6, fontSize: 14, marginBottom: 18 }}
      />
      <div style={{ display: 'grid', gap: 12 }}>
        {matches.map((p) => (
          <div
            key={p.id}
            onClick={() => { setSearchOpen(false); openConfig(p.id); }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 10, border: '1px solid #eee', borderRadius: 8, cursor: 'pointer' }}
          >
            <img src={asset(p.image)} alt="" style={{ width: 52, height: 52, objectFit: 'contain' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>{productTitle(p)}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{p.collection} • {p.specs}</div>
            </div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{formatPrice(p.priceUsd)}</div>
          </div>
        ))}
      </div>
    </Backdrop>
  );
}
