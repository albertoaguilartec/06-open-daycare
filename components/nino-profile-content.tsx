"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { VincularPadreModal } from "@/components/vincular-padre-modal";

interface NinoProfileContentProps {
  nino: {
    id: string;
    nombre: string;
    inicial: string;
    edad: string;
    sala: string;
    colorAvatar: string;
    colorLetraAvatar: string;
    alergiasNotas?: string;
    fechaNacimiento: string;
    fechaIngreso: string;
    padres: Array<{
      nombre: string;
      rol: string;
      inicial: string;
      colorAvatar: string;
      colorLetraAvatar: string;
      estado: "activa" | "pendiente";
    }>;
  };
}

export function NinoProfileContent({ nino }: NinoProfileContentProps) {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F6ECDF]">
      <Sidebar activeItem="ninos" />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[820px] w-full mx-auto py-[34px] px-10 pb-20">
          <Link
            href="/ninos"
            className="flex items-center gap-[7px] text-[#94887B] font-bold text-[14px] mb-5"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a Niños
          </Link>

          <div className="flex gap-[26px] items-start flex-wrap">
            <div className="flex-1 min-w-[300px] flex flex-col-[18px]">
              <div className="flex items-center gap-[18px]">
                <div
                  className="w-[84px] h-[84px] rounded-full font-[var(--font-fredoka)] font-semibold text-[34px] flex items-center justify-center flex-none"
                  style={{
                    backgroundColor: nino.colorAvatar,
                    color: nino.colorLetraAvatar,
                  }}
                >
                  {nino.inicial}
                </div>
                <div className="flex-1">
                  <h1 className="font-[var(--font-fredoka)] font-semibold text-[28px] m-0 text-[#3F362E]">
                    {nino.nombre}
                  </h1>
                  <p className="mt-[3px] text-[#94887B] text-[15px]">
                    {nino.edad} · Sala {nino.sala}
                  </p>
                </div>
                <Link
                  href={`/editar-nino/${nino.id}`}
                  className="border-[1.5px] border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359] font-bold text-[14px] py-[9px] px-4 rounded-xl"
                >
                  Editar
                </Link>
              </div>

              {nino.alergiasNotas && (
                <div className="flex gap-[14px] bg-[#FBDAD6] rounded-[16px] p-[16px] px-[18px]">
                  <div className="w-10 h-[42px] rounded-[11px] bg-[#F4A8A0] flex items-center justify-center flex-none">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                      <path d="M12 9v4M12 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#C5413A] text-[15px] mb-[2px]">
                      Alergias y notas
                    </div>
                    <div className="text-[#B25249] text-[14.5px] leading-relaxed">
                      {nino.alergiasNotas}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-[#FFFDF9] border border-[#ECE0D0] rounded-[16px] overflow-hidden">
                <div className="flex justify-between py-[15px] px-[18px] border-b border-[#F0E6D8]">
                  <span className="text-[#94887B] text-[14.5px]">
                    Fecha de nacimiento
                  </span>
                  <span className="font-extrabold text-[#3F362E] text-[14.5px]">
                    {nino.fechaNacimiento}
                  </span>
                </div>
                <div className="flex justify-between py-[15px] px-[18px] border-b border-[#F0E6D8]">
                  <span className="text-[#94887B] text-[14.5px]">Sala</span>
                  <span className="font-extrabold text-[#3F362E] text-[14.5px]">
                    {nino.sala}
                  </span>
                </div>
                <div className="flex justify-between py-[15px] px-[18px]">
                  <span className="text-[#94887B] text-[14.5px]">Ingreso</span>
                  <span className="font-extrabold text-[#3F362E] text-[14.5px]">
                    {nino.fechaIngreso}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-[300px] flex-none flex flex-col-[14px]">
              <a
                href="/resumen-dia"
                className="flex items-center justify-center gap-[9px] w-full py-[13px] rounded-[14px] bg-[#3F362E] text-white font-extrabold text-[15px]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
                Resumen del día
              </a>

              <div className="bg-[#FFFDF9] border border-[#ECE0D0] rounded-[16px] p-[16px] px-[18px]">
                <div className="text-[12.5px] font-extrabold tracking-widest text-[#8A7C6D] mb-[14px]">
                  PADRES VINCULADOS
                </div>
                <div className="flex flex-col-[14px]">
                  {nino.padres.map((padre, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full font-[var(--font-fredoka)] font-semibold text-[16px] flex items-center justify-center flex-none"
                        style={{
                          backgroundColor: padre.colorAvatar,
                          color: padre.colorLetraAvatar,
                        }}
                      >
                        {padre.inicial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-[14.5px] text-[#3F362E]">
                          {padre.nombre}
                        </div>
                        <div className="text-[12.5px] text-[#A89A8B]">
                          {padre.rol} · {padre.estado === "activa" ? "activa" : "invitación enviada"}
                        </div>
                      </div>
                      <span
                        className={`flex-none text-[10.5px] font-extrabold py-1 px-[9px] rounded-full ${
                          padre.estado === "activa"
                            ? "bg-[#CFEBD8] text-[#3E9B6C]"
                            : "bg-[#F7E7A6] text-[#9A7B1E]"
                        }`}
                      >
                        {padre.estado === "activa" ? "ACTIVA" : "PENDIENTE"}
                      </span>
                    </div>
                  ))}
                  <a
                    onClick={() => setModalAbierto(true)}
                    className="flex items-center gap-3 pt-2 cursor-pointer"
                  >
                    <span className="w-10 h-10 rounded-full border-[1.5px] border-dashed border-[#D8CBBA] flex items-center justify-center text-[#B0A290] flex-none">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <span className="font-extrabold text-[14.5px] text-[#C5503A]">
                      Vincular otro padre
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <VincularPadreModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        nombreNino={nino.nombre}
      />
    </div>
  );
}