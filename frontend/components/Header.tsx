"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/routes";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-deep/45 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 sm:px-10 lg:px-18">
        <Link href="/" className="flex items-center gap-3" aria-label="União Andrade, início">
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
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-red ${pathname === link.href ? "text-red" : ""}`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
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
          <span aria-hidden className="relative flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navegação móvel"
        inert={!open}
        className={`overflow-hidden border-t border-white/10 bg-navy-deep/95 backdrop-blur-xl transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open
            ? "max-h-[360px] opacity-100 motion-safe:translate-y-0"
            : "max-h-0 opacity-0 motion-safe:-translate-y-1"
        }`}
      >
        <ul className="flex flex-col gap-5 px-6 py-6 text-base font-medium text-white/90">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)} className="block py-1">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
