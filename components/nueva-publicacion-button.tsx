"use client";

import { useState } from "react";
import { CrearPublicacionModal } from "@/components/crear-publicacion-modal";

export function NuevaPublicacionButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)] mb-[18px] cursor-pointer"
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
      </button>

      <CrearPublicacionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
