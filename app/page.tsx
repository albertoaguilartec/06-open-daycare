import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { PostCard } from "@/components/post-card";
import { publicaciones, usuarioActual } from "@/lib/feed-data";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F6ECDF]">
      <Sidebar />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[760px] w-full mx-auto py-[34px] px-10 pb-20">
          <div className="mb-6">
            <div className="text-[12.5px] font-extrabold tracking-widest text-[#D9583C] mb-1">
              GUARDERÍA · SALA SOLES
            </div>
            <h1 className="font-[var(--font-fredoka)] font-semibold text-[30px] m-0 text-[#3F362E]">
              Buenas, {usuarioActual.nombre.split(" ")[0]}
            </h1>
            <p className="mt-[5px] text-[#94887B] text-[14.5px]">
              12 niños · martes 17 jun
            </p>
          </div>

          <Link
            href="/crear-publicacion"
            className="flex items-center gap-[14px] bg-[#FFFDF9] border border-[#ECE0D0] rounded-[18px] p-[14px] px-[18px] mb-6 shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
          >
            <div className="w-10 h-10 rounded-full bg-[#F2937A] text-white font-[var(--font-fredoka)] font-semibold text-base flex items-center justify-center flex-none">
              {usuarioActual.inicial}
            </div>
            <span className="flex-1 text-[#A89A8B] text-[15px]">
              Compartí un momento…
            </span>
            <span className="w-[38px] h-[38px] rounded-xl bg-[#FBE3D8] text-[#E0654A] flex items-center justify-center">
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
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
          </Link>

          <div className="flex items-center gap-[14px] mb-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-widest text-[#8A7C6D]">
              PUBLICADO HOY
            </span>
            <span className="flex-1 h-px bg-[#E7DAC8]" />
          </div>

          <div className="flex flex-col gap-4">
            {publicaciones.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
