import { ReactNode } from "react";

export function Section({
  id,
  label,
  title,
  children,
  className = "",
}: {
  id?: string;
  label?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative border-t border-[var(--line-2)] px-6 md:px-12 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {(label || title) && (
          <header className="mb-16 md:mb-24 flex flex-col gap-6">
            {label && <span className="label">{label}</span>}
            {title && (
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
