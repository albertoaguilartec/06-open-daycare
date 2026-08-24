"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#FFFDF9] border-b border-[#ECE0D0] flex items-center px-4 gap-3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-9 h-9 rounded-xl bg-[#FBE3D8] text-[#D9583C] flex items-center justify-center"
          aria-label="Abrir menú"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-[11px]">
          <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#F8C3A8] to-[#F2937A] flex items-center justify-center flex-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </div>
          <span className="font-[var(--font-fredoka)] font-semibold text-[15px] text-[#3F362E]">
            OpenDayCare
          </span>
        </Link>
      </header>

      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/30"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute top-0 left-0 w-[260px] h-full bg-[#FFFDF9] border-r border-[#ECE0D0] flex flex-col p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-[11px] mb-6">
              <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#F8C3A8] to-[#F2937A] flex items-center justify-center flex-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              </div>
              <span className="font-[var(--font-fredoka)] font-semibold text-[15px] text-[#3F362E]">
                OpenDayCare
              </span>
            </div>

            <Link
              href="/crear-publicacion"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)] mb-5"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nueva publicación
            </Link>

            <nav className="flex flex-col gap-1 flex-1">
              <Link
                href="/"
                className="flex items-center gap-3 py-[11px] px-3 rounded-xl bg-[#FBE3D8] text-[#D9583C] font-extrabold text-[14.5px]"
                onClick={() => setDrawerOpen(false)}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                </svg>
                Feed
              </Link>
              <Link
                href="/ninos"
                className="flex items-center gap-3 py-[11px] px-3 rounded-xl bg-transparent text-[#6E6359] font-semibold text-[14.5px]"
                onClick={() => setDrawerOpen(false)}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="7" r="3" />
                  <circle cx="17" cy="9" r="2.4" />
                  <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
                </svg>
                Niños
              </Link>
              <Link
                href="/avisos"
                className="flex items-center gap-3 py-[11px] px-3 rounded-xl bg-transparent text-[#6E6359] font-semibold text-[14.5px]"
                onClick={() => setDrawerOpen(false)}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                Avisos
              </Link>
              <Link
                href="/mi-cuenta"
                className="flex items-center gap-3 py-[11px] px-3 rounded-xl bg-transparent text-[#6E6359] font-semibold text-[14.5px]"
                onClick={() => setDrawerOpen(false)}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Mi cuenta
              </Link>
            </nav>

            <div className="border-t border-[#ECE0D0] pt-3 mt-2">
              <div className="flex items-center gap-[11px] px-2 py-[6px]">
                <div className="w-8 h-8 rounded-full bg-[#F2937A] text-white font-[var(--font-fredoka)] font-semibold text-sm flex items-center justify-center flex-none">
                  C
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[13px] text-[#3F362E]">
                    Caro Giménez
                  </div>
                  <div className="text-[11px] text-[#A89A8B]">
                    Maestra · Soles
                  </div>
                </div>
                <Link
                  href="/login"
                  title="Cerrar sesión"
                  className="flex-none w-7 h-7 rounded-[10px] bg-[#F6ECDF] text-[#94887B] flex items-center justify-center"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Link
        href="/crear-publicacion"
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#F4977E] to-[#EE8164] text-white shadow-[0_8px_20px_-4px_rgba(238,129,100,0.7)] flex items-center justify-center"
        aria-label="Nueva publicación"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Link>
    </>
  );
}
