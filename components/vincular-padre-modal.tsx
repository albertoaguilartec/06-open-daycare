"use client";

import { useState } from "react";

interface VincularPadreModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombreNino: string;
}

export function VincularPadreModal({ isOpen, onClose, nombreNino }: VincularPadreModalProps) {
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [parentescoSeleccionado, setParentescoSeleccionado] = useState<"Mamá" | "Papá" | "Tutor/a">("Mamá");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (emailValue && !validateEmail(emailValue)) {
      setEmailError(true);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmailValue(value);
    if (emailError) {
      setEmailError(false);
    }
  };

  const handleParentescoClick = (parentesco: "Mamá" | "Papá" | "Tutor/a") => {
    setParentescoSeleccionado(parentesco);
  };

  if (!isOpen) return null;

  const parentescoOptions = ["Mamá", "Papá", "Tutor/a"] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vincular-padre-title"
    >
      <div
        className="relative w-full max-w-[480px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[26px] py-[20px] border-b border-[#ECE0D0]">
          <div>
            <div className="font-['Fredoka'] font-semibold text-[18px] text-[#3F362E]">
              Vincular padre
            </div>
            <div className="text-[13px] text-[#A89A8B]">a {nombreNino}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-[10px] bg-[#F0E6D8] text-[#94887B] flex items-center justify-center hover:bg-[#ECE0D0] transition-colors"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-[22px] px-[26px]">
          <div className="flex gap-[11px] bg-[#E3ECFB] rounded-[14px] p-[13px] px-[16px] mb-[20px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E72C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-[1px]" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span className="text-[13.5px] text-[#3F5694] leading-[1.45]">
              Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {nombreNino.split(" ")[0]}.
            </span>
          </div>
          <div className="text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[8px] uppercase">
            NOMBRE DEL PADRE/MADRE
          </div>
          <input
            type="text"
            placeholder="Ej. Diego Fernández"
            className="w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none mb-[18px]"
            required
          />
          <div className="text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[8px] uppercase">
            EMAIL
          </div>
          <div className="relative mb-[18px]">
            <input
              type="email"
              value={emailValue}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="correo@ejemplo.com"
              className={`w-full px-[16px] py-[13px] rounded-[14px] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none transition-colors ${
                emailError
                  ? "border-[1.5px] border-[#EE8164]"
                  : "border-[1.5px] border-[#EADFD0]"
              }`}
              required
            />
            {emailError && (
              <p className="absolute bottom-[-18px] left-[16px] text-[12px] text-[#EE8164]">
                Email inválido
              </p>
            )}
          </div>
          <div className="text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[10px] uppercase">
            PARENTESCO
          </div>
          <div className="flex gap-[9px] mb-[20px]">
            {parentescoOptions.map((parentesco) => {
              const isActive = parentescoSeleccionado === parentesco;
              return (
                <button
                  key={parentesco}
                  type="button"
                  onClick={() => handleParentescoClick(parentesco)}
                  className={`flex-1 px-[11px] py-[11px] rounded-full border-[1.5px] font-extrabold text-[14px] cursor-pointer transition-all ${
                    isActive
                      ? "border-[#9FB8EC] bg-[#CCD8F4] text-[#4E72C8]"
                      : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                  }`}
                >
                  {parentesco}
                </button>
              );
            })}
          </div>
          <div className="bg-[#FBF1D6] border-[1.5px] border-dashed border-[#E6D08A] rounded-[16px] p-[18px] text-center mb-[20px]">
            <div className="text-[12px] font-extrabold tracking-[.7px] text-[#A88526] mb-[8px] uppercase">
              CÓDIGO DE INVITACIÓN
            </div>
            <div className="font-['Fredoka'] font-semibold text-[34px] tracking-[7px] text-[#8A7234]">
              7K4P9
            </div>
            <div className="text-[13px] text-[#A88526] mt-[6px]">
              Vence en 7 días
            </div>
          </div>
          <a
            href="#"
            className="flex items-center justify-center gap-[9px] w-full py-[14px] rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[15.5px] shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
            aria-label="Enviar invitación"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
            Enviar invitación
          </a>
        </div>
      </div>
    </div>
  );
}