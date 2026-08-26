"use client";

import { useEffect } from "react";
import { salas } from "@/lib/ninos-data";

interface AddChildModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddChildModal({ open, onClose }: AddChildModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-child-title"
    >
      <div
        className="relative w-full max-w-[520px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[26px] py-[20px] border-b border-[#ECE0D0]">
          <button
            type="button"
            onClick={onClose}
            className="text-[#94887B] font-bold text-[15px] hover:underline"
          >
            Cancelar
          </button>
          <h2 id="add-child-title" className="font-['Fredoka'] font-semibold text-[18px] text-[#3F362E]">
            Agregar niño
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#D9583C] font-extrabold text-[15px] hover:underline"
          >
            Guardar
          </button>
        </div>
        <div className="p-[24px] px-[26px]">
          <div className="mb-[18px]">
            <label
              htmlFor="nombre-completo"
              className="block text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[8px] uppercase"
            >
              NOMBRE COMPLETO
            </label>
            <input
              id="nombre-completo"
              type="text"
              placeholder="Ej. Martina López"
              className="w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
            />
          </div>
          <div className="flex gap-[14px] mb-[18px]">
            <div className="flex-1">
              <label
                htmlFor="fecha-nacimiento"
                className="block text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[8px] uppercase"
              >
                FECHA DE NACIMIENTO
              </label>
              <input
                id="fecha-nacimiento"
                type="date"
                className="w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="sala"
                className="block text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[8px] uppercase"
              >
                SALA
              </label>
              <select
                id="sala"
                className="w-full appearance-none px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] font-bold focus:outline-none cursor-pointer"
              >
                {salas.map((sala) => (
                  <option key={sala.id} value={sala.id}>
                    {sala.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-[18px]">
            <label
              htmlFor="alergias"
              className="block text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[8px] uppercase"
            >
              ALERGIAS (ETIQUETAS)
            </label>
            <input
              id="alergias"
              type="text"
              placeholder="Ej. Maní, Lactosa"
              className="w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="notas-medicas"
              className="block text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[8px] uppercase"
            >
              NOTAS MÉDICAS
            </label>
            <textarea
              id="notas-medicas"
              placeholder="Indicaciones, medicación, contactos…"
              className="w-full min-h-[90px] resize-y px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none leading-[1.5]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}