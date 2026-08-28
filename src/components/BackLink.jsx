export const BackLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="block font-nameplate text-[10px] tracking-widest uppercase text-sub hover:text-ink transition-smooth mb-3 min-h-11 border-b border-transparent hover:border-accent w-fit"
  >
    ‹ {children}
  </button>
);
