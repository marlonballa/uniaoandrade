"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "#metodologia", label: "Metodologia" },
  { href: "#programas", label: "Programas" },
  { href: "#faq", label: "FAQ" },
  { href: "#historias", label: "Histórias" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-deep/45 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 sm:px-10 lg:px-18">
        <Link href="#top" className="flex items-center gap-3" aria-label="União Andrade, início">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="font-brand text-[17px] tracking-wide text-paper">
              UNIÃO ANDRADE
            </span>
            <span className="font-sans text-[10px] font-medium tracking-[0.2em] text-red">
              TAEKWONDO MARCIAL
            </span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-10 text-sm font-medium text-white/85 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-red">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Navegação móvel"
          className="border-t border-white/10 bg-navy-deep/95 px-6 py-6 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-5 text-base font-medium text-white/90">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="block py-1">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
