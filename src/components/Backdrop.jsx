export default function Backdrop({ open, onClose, children, maxWidth }) {
  return (
    <div
      className={`overlay-backdrop${open ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box" style={maxWidth ? { maxWidth } : undefined}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}
