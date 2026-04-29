export function Footer() {
  return (
    <footer className="border-t border-slate-900/10 bg-[#0a0a0a] text-white overflow-hidden">

      {/* TOP CONTENT */}
      <div className="grid gap-10 px-6 py-16 mx-auto max-w-7xl md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">
            Leasing & Partnerships
          </p>
          <p className="mb-6 text-sm leading-7 text-slate-300">
            Reach the commercial team for brand placement, sponsorship, and event opportunities at Dubai Mall.
          </p>
          <p className="text-sm text-slate-300">leasing@thedubaimall.com</p>
          <p className="text-sm text-slate-300">+971 4 000 0000</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">
            Quick links
          </p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><a href="#opportunity" className="hover:text-white">Opportunity</a></li>
            <li><a href="#events" className="hover:text-white">Events</a></li>
            <li><a href="#reach" className="hover:text-white">Global Reach</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">
            Credibility
          </p>
          <p className="text-sm leading-7 text-slate-300">
            Dubai Mall Commercial Partnerships · global brand platform built for premium retail, lifestyle, and live experiences.
          </p>
        </div>
      </div>

      {/* FULL WIDTH IMAGE (EDGE TO EDGE) */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw]  -mr-[50vw]">

        <img
          src="/assets/footer-asset.png"
          alt="Dubai Mall - Premium Retail Destination"
          loading="lazy"
          decoding="async"
          width="1920"
          height="400"
          className="object-cover w-full h-fit grayscale-50"
        />
      </div>

    </footer>
  );
}