

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0e1013] text-[#999faa]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-10">
        <Link href="/" aria-label="FitLog home" className="flex items-center gap-2 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00]">
          <Image src="/logo.png" alt="" width={20} height={20} />
          <span className="font-[Impact,'Arial_Narrow',sans-serif] text-sm tracking-[0.04em] uppercase">FitLog</span>
        </Link>
        <p className="text-center text-[10px] leading-5">© {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
