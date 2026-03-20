import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-light py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <Image
            src="/logos/jmk-primary-wordmark-white-rgb.svg"
            alt="JMK Custom Homes"
            width={140}
            height={36}
          />
          <p className="mt-3 text-sm text-brand-light/70 max-w-xs">
            Licensed & insured contractor serving South Florida. Custom homes, renovations, and outdoor living.
          </p>
        </div>
        <div className="text-sm text-brand-light/70 space-y-1">
          <p className="font-semibold text-white mb-2">Contact</p>
          <p>info@jmkcontractor.com</p>
          <p>(305) 890-4953</p>
          <p>Miami Beach, FL 33139</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs text-brand-light/40">
        © {new Date().getFullYear()} JMK Custom Homes & Construction. All rights reserved.
      </div>
    </footer>
  );
}
