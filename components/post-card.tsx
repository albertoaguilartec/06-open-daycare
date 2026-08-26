import Link from "next/link";
import type { Publicacion } from "@/lib/feed-data";

const badgeConfig = {
  comida: {
    label: "COMIDA",
    bg: "bg-[#9A7B1E]",
    dot: "bg-[#9A7B1E]",
    text: "text-[#9A7B1E]",
    avatarBg: "bg-[#A9D9E8]",
    avatarText: "text-[#1F7A93]",
    initial: "M",
  },
  siesta: {
    label: "SIESTA",
    bg: "bg-[#E7DCF6]",
    dot: "bg-[#7B5FC0]",
    text: "text-[#7B5FC0]",
    avatarBg: "bg-[#A9D9E8]",
    avatarText: "text-[#1F7A93]",
    initial: "M",
  },
  actividad: {
    label: "ACTIVIDAD",
    bg: "bg-[#C7E7F1]",
    dot: "bg-[#2E89A6]",
    text: "text-[#2E89A6]",
    avatarBg: "bg-[#A9D9E8]",
    avatarText: "text-[#1F7A93]",
    initial: "M",
  },
  logro: {
    label: "LOGRO",
    bg: "bg-[#CFEBD8]",
    dot: "bg-[#3E9B6C]",
    text: "text-[#3E9B6C]",
    avatarBg: "bg-[#A9D9E8]",
    avatarText: "text-[#1F7A93]",
    initial: "M",
  },
  animo: {
    label: "ÁNIMO",
    bg: "bg-[#F9D2DE]",
    dot: "bg-[#C56486]",
    text: "text-[#C56486]",
    avatarBg: "bg-[#F4B8CC]",
    avatarText: "text-[#C44A7A]",
    initial: "S",
  },
  foto: {
    label: "FOTO",
    bg: "bg-[#FBD8CC]",
    dot: "bg-[#D9684A]",
    text: "text-[#D9684A]",
    avatarBg: "bg-[#A9D9E8]",
    avatarText: "text-[#1F7A93]",
    initial: "M",
  },
  anuncio: {
    label: "ANUNCIO",
    bg: "bg-[#CCD8F4]",
    dot: "bg-[#4E72C8]",
    text: "text-[#4E72C8]",
    avatarBg: "bg-[#CCD8F4]",
    avatarText: "text-[#4E72C8]",
    initial: null as string | null,
  },
};

function AnuncioAvatar() {
  return (
    <div className="w-[44px] h-[44px] rounded-full bg-[#CCD8F4] text-[#4E72C8] flex items-center justify-center flex-none">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E0654A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

export function PostCard({ post }: { post: Publicacion }) {
  const config = badgeConfig[post.tipo];

  return (
    <article className="bg-[#FFFDF9] border border-[#ECE0D0] rounded-[20px] p-5 px-[22px] shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="flex items-center gap-3 mb-[14px]">
        {post.tipo === "anuncio" ? (
          <AnuncioAvatar />
        ) : (
          <div
            className={`w-[44px] h-[44px] rounded-full ${config.avatarBg} ${config.avatarText} font-semibold text-[17px] flex items-center justify-center flex-none`}
          >
            {config.initial}
          </div>
        )}
        <div className="flex-1">
          <div className="font-[var(--font-fredoka)] font-semibold text-[16.5px] text-[#3F362E]">
            {post.tipo === "anuncio" ? "Anuncio general" : post.nino}
          </div>
          <div className="text-[12.5px] text-[#A89A8B]">
            {post.hora} · {post.autorNota}
          </div>
        </div>
        <div
          className={`flex items-center gap-[7px] py-[6px] px-3 rounded-full ${config.bg}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${config.dot}`}
          />
          <span
            className={`text-xs font-extrabold tracking-wider ${config.text}`}
          >
            {config.label}
          </span>
        </div>
      </div>

      <div className="text-[12.5px] text-[#A89A8B] mb-[10px]">
        {post.destinatario}
      </div>

      <p className="text-[15.5px] leading-[1.55] text-[#4A4038] m-0">
        {post.texto}
      </p>

      {post.fotoCaption && (
        <Link
          href="/foto"
          className="flex flex-col items-center justify-center gap-2 mt-[14px] border-[1.5px] border-dashed border-[#DBCDBA] rounded-2xl bg-[#F4ECE1] h-[200px] text-[#B0A290]"
        >
          <svg
            width="30"
            height="30"
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
          <span className="text-[13.5px]">{post.fotoCaption}</span>
        </Link>
      )}

      <div className="flex items-center gap-[18px] mt-4 pt-[14px] border-t border-[#F0E6D8]">
        <span className="flex items-center gap-[7px] text-[#E0654A] font-bold text-sm">
          <HeartIcon />
          {post.reacciones}
        </span>
        <Link
          href="/detalle-publicacion"
          className="flex items-center gap-[7px] text-[#94887B] font-bold text-sm"
        >
          <CommentIcon />
          {post.comentarios}
        </Link>
        <span className="flex-1" />
        <span className="text-[#C5503A] font-extrabold text-sm cursor-default">
          Editar
        </span>
      </div>
    </article>
  );
}
