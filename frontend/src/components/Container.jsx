const Container = ({ children, className = "max-w-6xl mx-auto container" }) => (
  <div className={className}>{children}</div>
);

export default Container;
