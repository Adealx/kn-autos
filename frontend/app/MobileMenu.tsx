"use client";

import Link from "next/link";
import { useState } from "react";

const WHATSAPP_NUMBER = "2348067491717";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:border-[#D7B779] hover:bg-white/15"
      >
        {isOpen ? (
          <span className="text-2xl leading-none" aria-hidden="true">Ã—</span>
        ) : (
          <span className="text-xl leading-none" aria-hidden="true">â˜°</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-[100] w-[min(90vw,340px)] rounded-2xl border border-white/10 bg-[#08101F] p-4 shadow-2xl">
          <div className="mb-3 border-b border-white/10 px-3 pb-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-black tracking-tight text-white"
            >
              SAM-A <span className="text-[#D7B779]">AUTOS</span>
            </Link>
            <p className="mt-1 text-xs text-slate-300">Quality vehicles. Confident choices.</p>
          </div>

          <nav className="flex flex-col gap-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#D7B779]">
              Home
            </Link>
            <Link href="/inventory" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#D7B779]">
              Inventory
            </Link>
            <Link href="/#about" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#D7B779]">
              About
            </Link>
            <Link href="/#contact" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#D7B779]">
              Contact
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D7B779] px-5 py-3 text-center text-sm font-bold text-[#0B1830] transition hover:bg-[#EAD7AD]"
            >
              Chat on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
