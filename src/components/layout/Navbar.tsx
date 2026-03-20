import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5 md:px-12">
      <Link href="/">
        <Image
          src="/logos/jmk-wordmark-only-white.svg"
          alt="JMK Custom Homes"
          width={120}
          height={36}
          priority
        />
      </Link>
      <Link
        href="/quote"
        className="bg-brand-accent hover:bg-brand-light hover:text-brand-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Get a Quote
      </Link>
    </nav>
  );
}
