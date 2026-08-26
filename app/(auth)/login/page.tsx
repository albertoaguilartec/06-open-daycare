import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-[1.05fr_1fr] bg-[#FBF4EC]">
      {/* Left panel — branding */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F6A98E] from-0% via-[#F2937A] via-45% to-[#EC7E62] to-100% flex flex-col justify-between p-[56px_60px] text-white">
        {/* Decorative circles */}
        <div className="absolute w-[420px] h-[420px] rounded-full bg-white/12 -top-[140px] -right-[120px]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 -bottom-[110px] -left-[80px]" />

        {/* Logo */}
        <div className="flex items-center gap-[13px] relative">
          <div className="w-[46px] h-[46px] rounded-[14px] bg-white/22 flex items-center justify-center">
            <svg
              width="26"
              height="26"
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
          <span className="font-display font-semibold text-[21px] tracking-[0.5px]">
            OpenDayCare
          </span>
        </div>

        {/* Title & subtitle */}
        <div className="relative">
          <h1 className="font-display font-semibold text-[42px] leading-[1.12] mb-[18px]">
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-[430px] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>

        {/* Footer */}
        <div className="relative text-[14px] text-white/90">
          🌿 Guardería Sala Soles
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-[40px]">
        <div className="w-full max-w-[392px]">
          <h2 className="font-display font-semibold text-[30px] mb-[6px] text-[#3F362E]">
            Iniciar sesión
          </h2>
          <p className="mb-[28px] text-[#94887B] text-[15px]">
            Ingresá para ver el día de hoy.
          </p>

          {/* EMAIL */}
          <div className="text-[12px] font-bold tracking-[0.7px] text-[#94887B] mb-[8px]">
            EMAIL
          </div>
          <input
            type="email"
            placeholder="caro@opendaycare.com"
            className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] mb-[18px] placeholder:text-[#B6A99B] focus:outline-none"
          />

          {/* CONTRASEÑA */}
          <div className="text-[12px] font-bold tracking-[0.7px] text-[#94887B] mb-[8px]">
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] mb-[10px] placeholder:text-[#B6A99B] focus:outline-none"
          />

          {/* Forgot password */}
          <div className="text-right mb-[20px]">
            <span className="text-[#C5503A] text-[13.5px] font-bold cursor-pointer">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          {/* Submit button */}
          <Link
            href="#"
            className="block text-center w-full p-[15px] rounded-[15px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[16px] shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
          >
            Iniciar sesión
          </Link>

          {/* Activate account link */}
          <p className="text-center mt-[24px] text-[#94887B] text-[14.5px]">
            ¿Te invitó la guardería?{" "}
            <Link
              href="/activar-cuenta"
              className="text-[#C5503A] font-extrabold"
            >
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
