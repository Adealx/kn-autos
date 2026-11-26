"use client";

import Link from "next/link";
import { useState } from "react";

const WHATSAPP_NUMBER = "2349012773916";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 bg-white/5 text-white transition hover:bg-white/10"
      >
        {isOpen ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <span className="text-xl leading-none">☰</span>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-slate-950/98 px-6 py-5 shadow-2xl backdrop-blur-md">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              href="/inventory"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Inventory
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-full bg-red-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-red-700"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}