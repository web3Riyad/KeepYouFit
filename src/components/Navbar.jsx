"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitnessPlan } from "../lib/fitness-plan";

const navigation = [
  { label: "Workouts", href: "/", section: "/workouts" },
  { label: "My Plan", href: "/myplan", section: "/myplan" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved, ready } = useFitnessPlan();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="relative z-20 border-b border-white/5 bg-[#0c0d0f] text-white">
      <nav
        ref={menuRef}
        aria-label="Main navigation"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
        }}
        className="container mx-auto relative mx-auto grid min-h-16 w-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 sm:px-6"
      >
        <div className="col-start-1 row-start-1">
          <Link href="/" aria-label="FitLog home" className="hidden w-fit items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00] sm:flex">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <span className="font-[Impact,'Arial_Narrow',sans-serif] text-base tracking-[0.04em] uppercase">FitLog</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="navbar-links"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-[#d5ff00] hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#d5ff00] sm:hidden"
          >
            <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        <ul
          id="navbar-links"
          className={`${menuOpen ? "flex" : "hidden"} absolute top-full left-4 w-48 flex-col gap-1 rounded-xl border border-white/10 bg-[#0c0d0f] p-2 shadow-xl sm:static sm:col-start-2 sm:row-start-1 sm:flex sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
        >
          {navigation.map(({ label, href, section }) => {
            const isActive = pathname === href || pathname === section || pathname?.startsWith(`${section}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-11 items-center rounded-full px-4 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5ff00] sm:min-h-0 sm:text-[11px] ${isActive ? "bg-[#1c2412] font-bold text-[#d5ff00]" : "text-[#999faa] hover:bg-white/5 hover:text-white"}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="col-start-3 row-start-1 flex items-center justify-end gap-3 sm:gap-5">
          <Link href="/myplan" className="flex min-h-11 items-center gap-2 text-[11px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00]">
            Plan
            <span className="flex size-4 items-center justify-center rounded-full bg-[#d5ff00] text-[9px] font-bold text-[#0c0d0f]">{ready ? plan.length : "—"}</span>
          </Link>
          <Link href="/myplan?tab=saved" className="flex min-h-11 cursor-pointer items-center gap-2 text-[11px] text-[#999faa] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00]">
            Saved
            <span className="flex size-4 items-center justify-center rounded-full border border-[#34363d] text-[9px] text-white">{ready ? saved.length : "—"}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
