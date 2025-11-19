const Badge = ({ children, className = '' }) => (
  <span className={[
    'inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200',
    className,
  ].filter(Boolean).join(' ')}>
    {children}
  </span>
);

export default Badge;