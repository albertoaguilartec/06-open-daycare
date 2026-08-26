"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { ninos } from "@/lib/ninos-data";
import { AddChildModal } from "@/components/add-child-modal";

export default function NinosPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F6ECDF]">
      <Sidebar activeItem="ninos" />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[880px] w-full mx-auto py-[34px] px-10 pb-20">
          <div className="flex items-end justify-between gap-4 mb-[22px]">
            <div>
              <div className="text-[12.5px] font-extrabold tracking-widest text-[#D9583C] mb-1">
                GESTIÓN
              </div>
              <h1 className="font-[var(--font-fredoka)] font-semibold text-[30px] m-0 text-[#3F362E]">
                Niños
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 py-[11px] px-[18px] rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
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
              Agregar niño
            </button>
          </div>

          <div className="flex items-center gap-[11px] bg-[#FFFDF9] border border-[#ECE0D0] rounded-[14px] py-3 px-4 mb-[22px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B0A290"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder="Buscar niño…"
              className="flex-1 border-none bg-none text-[15px] text-[#3F362E] outline-none placeholder:text-[#B6A99B]"
            />
          </div>

          <div className="flex items-center gap-3 mb-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-widest text-[#3F362E]">
              SALA SOLES
            </span>
            <span className="text-[13px] text-[#A89A8B]">
              {ninos.length} niños
            </span>
            <span className="flex-1 h-px bg-[#E7DAC8]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            {ninos.map((nino) => (
              <Link
                key={nino.id}
                href={`/ninos/${nino.id}`}
                className="kid flex items-center gap-[14px] min-w-0 bg-[#FFFDF9] border border-[#ECE0D0] rounded-[18px] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)]"
              >
                <div
                  className="w-12 h-12 rounded-full font-[var(--font-fredoka)] font-semibold text-[19px] flex items-center justify-center flex-none"
                  style={{
                    backgroundColor: nino.colorAvatar,
                    color: nino.colorLetraAvatar,
                  }}
                >
                  {nino.inicial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-[var(--font-fredoka)] font-semibold text-[16px] text-[#3F362E]">
                    {nino.nombre}
                  </div>
                  <div className="text-[13px] text-[#A89A8B]">
                    {nino.edad} · {nino.padres.length}{" "}
                    {nino.padres.length === 1 ? "padre vinculado" : "padres vinculados"}
                  </div>
                </div>
                {nino.alergia ? (
                  <span
                    className="flex-none text-[11px] font-extrabold py-[5px] px-[9px] rounded-full"
                    style={{
                      backgroundColor: nino.alergiaBadgeBg ?? "#FBD8CC",
                      color: nino.alergiaBadgeText ?? "#D9684A",
                    }}
                  >
                    {nino.alergia}
                  </span>
                ) : (
                  <svg
                    className="flex-none"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#CBB89F"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          <AddChildModal open={showAddModal} onClose={() => setShowAddModal(false)} />
        </div>
      </main>
    </div>
  );
}
