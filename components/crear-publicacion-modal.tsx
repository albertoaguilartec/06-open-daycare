"use client";

import { useEffect, useState } from "react";
import { ninos } from "@/lib/ninos-data";
import { tiposPublicacion, type TipoPost } from "@/lib/feed-data";

interface CrearPublicacionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CrearPublicacionModal({
  isOpen,
  onClose,
}: CrearPublicacionModalProps) {
  const [ninosSeleccionados, setNinosSeleccionados] = useState<string[]>([]);
  const [todaLaSala, setTodaLaSala] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoPost | null>(
    null,
  );
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function toggleNino(id: string) {
    setTodaLaSala(false);
    setNinosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleTodaLaSala() {
    setTodaLaSala((prev) => !prev);
    if (!todaLaSala) setNinosSeleccionados([]);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[40px] px-[24px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-[580px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[26px] py-[20px] border-b border-[#ECE0D0]">
          <button
            onClick={onClose}
            className="text-[#94887B] font-bold text-[15px]"
          >
            Cancelar
          </button>
          <span className="font-[family-name:var(--font-fredoka)] font-semibold text-[18px] text-[#3F362E]">
            Nueva publicación
          </span>
          <button
            onClick={onClose}
            className="text-[#D9583C] font-extrabold text-[15px]"
          >
            Publicar
          </button>
        </div>

        {/* Body */}
        <div className="px-[26px] py-[24px]">
          {/* PARA */}
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            PARA
          </div>
          <div className="flex flex-wrap gap-[9px] mb-[22px]">
            {ninos.map((nino) => {
              const activo = ninosSeleccionados.includes(nino.id);
              return (
                <button
                  key={nino.id}
                  onClick={() => toggleNino(nino.id)}
                  className={`flex items-center gap-[8px] py-[6px] pr-[14px] pl-[6px] rounded-full border-[1.5px] font-bold text-[14px] cursor-pointer transition-colors ${
                    activo
                      ? "border-[#3F362E] bg-[#3F362E] text-white"
                      : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                  }`}
                >
                  <span
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center font-[family-name:var(--font-fredoka)] font-semibold text-[13px]"
                    style={{
                      backgroundColor: nino.colorAvatar,
                      color: nino.colorLetraAvatar,
                    }}
                  >
                    {nino.inicial}
                  </span>
                  {nino.nombre.split(" ")[0]}
                </button>
              );
            })}
            <button
              onClick={toggleTodaLaSala}
              className={`py-[6px] px-[16px] rounded-full border-[1.5px] font-bold text-[14px] cursor-pointer transition-colors ${
                todaLaSala
                  ? "border-[#3F362E] bg-[#3F362E] text-white"
                  : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
              }`}
            >
              Toda la sala
            </button>
          </div>

          {/* TIPO */}
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            TIPO
          </div>
          <div className="flex flex-wrap gap-[9px] mb-[22px]">
            {tiposPublicacion.map((tipo) => (
              <button
                key={tipo.id}
                onClick={() =>
                  setTipoSeleccionado(
                    tipoSeleccionado === tipo.id ? null : tipo.id,
                  )
                }
                className="py-[8px] px-[16px] rounded-full border-none font-extrabold text-[13.5px] cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: tipo.bgColor,
                  color: tipo.textColor,
                  opacity:
                    tipoSeleccionado && tipoSeleccionado !== tipo.id ? 0.5 : 1,
                }}
              >
                {tipo.label}
              </button>
            ))}
          </div>

          {/* DESCRIPCIÓN */}
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            DESCRIPCIÓN
          </div>
          <textarea
            placeholder="Contá cómo le fue hoy…"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full min-h-[120px] resize-vertical px-[14px] py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] leading-[1.5] mb-[22px] placeholder:text-[#B6A99B]"
          />

          {/* FOTOS */}
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            FOTOS
          </div>
          <div className="flex gap-[12px]">
            {/* Foto placeholder */}
            <div className="w-[96px] h-[96px] rounded-[14px] bg-[#F4ECE1] border border-[#ECE0D0] flex items-center justify-center text-[#CBB89F]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
              </svg>
            </div>
            {/* Slot agregar */}
            <div className="w-[96px] h-[96px] rounded-[14px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] flex flex-col items-center justify-center gap-[6px] text-[#B0A290] cursor-pointer">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5503A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-[12px]">Agregar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
