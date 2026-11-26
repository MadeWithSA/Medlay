import { useStore } from '../store.jsx';

export default function Mission() {
  const { t, openConfig, setTreesOpen } = useStore();
  return (
    <section className="forest-finale" id="mission">
      <div className="finale-grid">
        <div className="finale-card">
          <span>{t.m1_k}</span>
          <h3>{t.m1_t}</h3>
          <p>{t.m1_d}</p>
          <button className="btn-cream" onClick={() => openConfig('kohana-ring')}>{t.m1_btn}</button>
        </div>
        <div className="finale-card">
          <span>{t.m2_k}</span>
          <h3>{t.m2_t}</h3>
          <p>{t.m2_d}</p>
          <button className="btn-cream" onClick={() => setTreesOpen(true)}>{t.m2_btn}</button>
        </div>
      </div>
    </section>
  );
}
