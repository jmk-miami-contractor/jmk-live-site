import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e3032 0%, #2a4a4d 60%, #4b8882 100%)" }}
    >
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logos/jmk-lockup-01-white-rgb.svg"
          alt="JMK Custom Homes"
          width={240}
          height={80}
          priority
        />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
        Know Your Budget<br />
        <span className="text-brand-light">Before You Call.</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-white/75 max-w-xl">
        Get an instant remodeling estimate in under 2 minutes — kitchen, bathroom, roofing, pools, and more.
      </p>

      <Link
        href="/quote"
        className="mt-10 inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-light hover:text-brand-primary text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg"
      >
        Get My Free Estimate
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>

      <p className="mt-4 text-sm text-white/40">No commitment. No sign-up required.</p>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
