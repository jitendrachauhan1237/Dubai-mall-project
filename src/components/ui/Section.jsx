export function Section({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center px-6 py-20 ${className}`}
    >
      <div className="max-w-7xl w-full">
        {children}
      </div>
    </section>
  );
}