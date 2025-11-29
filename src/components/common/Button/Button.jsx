const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-medium shadow-sm transition hover:shadow-md active:scale-[0.99] bg-teal-600 text-white hover:bg-teal-700 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;