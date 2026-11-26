import { useState } from 'react';
import { useStore } from '../store.jsx';
import { SCENES, asset } from '../data/products.js';

function Hotspot({ product }) {
  const { t, productTitle, formatPrice, openConfig } = useStore();
  const [active, setActive] = useState(false);
  const title = productTitle(product);

  return (
    <div
      className={`hotspot${active ? ' active' : ''}`}
      style={{ left: `${product.x}%`, top: `${product.y}%` }}
      onClick={() => setActive((v) => !v)}
    >
      <div className="hotspot-lens">
        <div className="hotspot-ring" />
        <img className="hotspot-preview-cutout" src={asset(product.image)} alt={title} />
      </div>
      <div className="hotspot-from-tag">{t.from}{formatPrice(product.priceUsd)}</div>
      <div className="hotspot-card" onClick={(e) => e.stopPropagation()}>
        <span className="hc-badge">LAUNCH PRICE • {product.collection}</span>
        <img src={asset(product.image)} alt={title} />
        <h5>{title}</h5>
        <p>{product.specs}</p>
        <div className="hc-price">{formatPrice(product.priceUsd)}</div>
        <button className="hc-btn" onClick={() => openConfig(product.id)}>{t.choose}</button>
      </div>
    </div>
  );
}

export default function Collections() {
  const { t, products } = useStore();

  return (
    <section id="panorama-collections">
      <div className="panorama-intro">
        <span className="section-kicker">{t.pan_kicker}</span>
        <h2>{t.pan_title}</h2>
        <p>{t.pan_sub}</p>
      </div>

      <div className="panorama-wrapper">
        {SCENES.map((scene, i) => (
          <div className="scene" id={scene.id} key={scene.id}>
            <div className="scene-stage">
              <img
                src={asset(scene.img)}
                alt={`Medlay — ${scene.alt}`}
                decoding="async"
                loading={i === 0 ? undefined : 'lazy'}
              />
              <div className="scene-hotspots">
                {products.filter((p) => p.scene === i).map((p) => (
                  <Hotspot key={p.id} product={p} />
                ))}
              </div>
            </div>
            <div className="tier-label">
              <span>Collection {scene.n}</span>
              <h3>{scene.name}</h3>
              <p>{t[scene.descKey]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
