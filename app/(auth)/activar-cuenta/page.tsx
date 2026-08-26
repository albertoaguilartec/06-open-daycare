import Link from "next/link";

export default function ActivarCuentaPage() {
  return (
    <div className="w-full max-w-[440px]">
      {/* Logo */}
      <div className="w-[58px] h-[58px] rounded-[18px] bg-gradient-to-br from-[#F8C3A8] to-[#F2937A] flex items-center justify-center mb-[22px] shadow-[0_12px_26px_-10px_rgba(238,129,100,.65)]">
        <svg
          width="30"
          height="30"
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

      {/* Title */}
      <h1 className="font-display font-semibold text-[32px] leading-[1.15] mb-[8px] text-[#3F362E]">
        Bienvenida a OpenDayCare
      </h1>
      <p className="mb-[26px] text-[#94887B] text-[15.5px] leading-[1.55]">
        Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar
        la cuenta.
      </p>

      {/* Child card */}
      <div className="flex items-center gap-[14px] bg-white border-[1.5px] border-[#EADFD0] rounded-[16px] p-[14px_16px] mb-[22px]">
        <div className="w-[44px] h-[44px] rounded-full bg-[#A9D9E8] text-[#1F7A93] font-display font-semibold text-[19px] flex items-center justify-center">
          M
        </div>
        <div>
          <div className="text-[13px] text-[#94887B]">
            Te invitaron a seguir a
          </div>
          <div className="font-display font-semibold text-[17px] text-[#3F362E]">
            Mateo · Sala Soles
          </div>
        </div>
      </div>

      {/* CÓDIGO DE INVITACIÓN */}
      <div className="text-[12px] font-bold tracking-[0.7px] text-[#94887B] mb-[8px]">
        CÓDIGO DE INVITACIÓN
      </div>
      <input
        type="text"
        defaultValue="7K4P9"
        className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[18px] tracking-[3px] font-bold text-[#3F362E] mb-[18px] font-display focus:outline-none"
      />

      {/* EMAIL */}
      <div className="text-[12px] font-bold tracking-[0.7px] text-[#94887B] mb-[8px]">
        EMAIL
      </div>
      <input
        type="email"
        defaultValue="lucia.fernandez@gmail.com"
        className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] mb-[18px] focus:outline-none"
      />

      {/* CREAR CONTRASEÑA */}
      <div className="text-[12px] font-bold tracking-[0.7px] text-[#94887B] mb-[8px]">
        CREAR CONTRASEÑA
      </div>
      <input
        type="password"
        defaultValue="contraseña"
        className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#F2A78E] bg-white text-[15px] text-[#3F362E] mb-[18px] focus:outline-none"
      />

      {/* Photo authorization checkbox */}
      <label className="flex items-start gap-[12px] bg-[#FBF1D6] rounded-[14px] p-[14px_16px] mb-[24px] cursor-pointer">
        <span className="shrink-0 w-[24px] h-[24px] rounded-[8px] bg-[#5FB97E] flex items-center justify-center mt-[1px]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="text-[14px] text-[#8A7234] leading-[1.45]">
          Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de
          la app.
        </span>
      </label>

      {/* Submit button */}
      <Link
        href="#"
        className="block text-center w-full p-[15px] rounded-[15px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[16px] shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
      >
        Activar mi cuenta
      </Link>

      {/* Login link */}
      <p className="text-center mt-[22px] text-[#94887B] text-[14.5px]">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-[#C5503A] font-extrabold">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
