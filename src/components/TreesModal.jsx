import { useStore } from '../store.jsx';
import Backdrop from './Backdrop.jsx';

export default function TreesModal() {
  const { t, trees, treesOpen, setTreesOpen } = useStore();
  return (
    <Backdrop open={treesOpen} onClose={() => setTreesOpen(false)} maxWidth={640}>
      <span className="section-kicker">Medlay Forest Registry</span>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 30, marginBottom: 12 }}>{t.trees_title}</h3>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 20 }}>{t.trees_sub}</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {trees.map((tree) => (
          <div key={tree.id} style={{ padding: 16, border: '1px solid #e4dfd5', borderRadius: 8, background: '#faf8f4' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', color: '#6b5839', fontWeight: 600 }}>CERTIFICATE #{tree.id}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 21, margin: '4px 0' }}>{tree.species}</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>GPS: {tree.coords} • {t.planted}: {tree.date}</div>
          </div>
        ))}
      </div>
    </Backdrop>
  );
}
