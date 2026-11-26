import { useStore } from '../store.jsx';

export default function ConciergeButton() {
  const { setSearchOpen } = useStore();
  return (
    <button className="concierge-fab" onClick={() => setSearchOpen(true)}>
      <span>✦</span>
      <span>Medlay Concierge</span>
    </button>
  );
}
