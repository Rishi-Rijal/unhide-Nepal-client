const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl 2xl:max-w-screen-2xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

export default Container;

