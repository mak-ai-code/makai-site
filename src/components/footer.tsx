export function Footer() {
  return (
    <footer className="border-t border-[var(--line-2)] px-6 md:px-12 py-12 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
          <div>
            <p className="font-display text-6xl md:text-8xl leading-none">MAKAI</p>
            <p className="label mt-4">We build systems that grow your business.</p>
          </div>
          <div className="flex gap-12 label">
            <div className="space-y-2">
              <p className="text-[var(--fg)]">Site</p>
              <a href="#services" className="block hover:text-[var(--fg)]">Services</a>
              <a href="#work" className="block hover:text-[var(--fg)]">Work</a>
              <a href="#process" className="block hover:text-[var(--fg)]">Process</a>
              <a href="#contact" className="block hover:text-[var(--fg)]">Contact</a>
            </div>
            <div className="space-y-2">
              <p className="text-[var(--fg)]">Contact</p>
              <a href="mailto:hello@makai.ai" className="block hover:text-[var(--fg)]">hello@makai.ai</a>
              <a href="#" className="block hover:text-[var(--fg)]">X / Twitter</a>
              <a href="#" className="block hover:text-[var(--fg)]">Instagram</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2 label pt-8 border-t border-[var(--line-2)]">
          <span>© {new Date().getFullYear()} Makai Holdings LLC</span>
          <span>Made in South Florida</span>
          <span>v1.0 · SYS.01</span>
        </div>
      </div>
    </footer>
  );
}
