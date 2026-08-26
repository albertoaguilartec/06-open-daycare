export type TipoPost =
  | "comida"
  | "siesta"
  | "actividad"
  | "logro"
  | "animo"
  | "foto"
  | "anuncio";

export interface TipoPublicacionConfig {
  id: TipoPost;
  label: string;
  bgColor: string;
  textColor: string;
}

export const tiposPublicacion: TipoPublicacionConfig[] = [
  { id: "comida", label: "Comida", bgColor: "#9A7B1E", textColor: "#FFFFFF" },
  { id: "siesta", label: "Siesta", bgColor: "#E7DCF6", textColor: "#7B5FC0" },
  { id: "actividad", label: "Actividad", bgColor: "#2E89A6", textColor: "#FFFFFF" },
  { id: "logro", label: "Logro", bgColor: "#CFEBD8", textColor: "#3E9B6C" },
  { id: "animo", label: "Ánimo", bgColor: "#F9D2DE", textColor: "#C56486" },
  { id: "foto", label: "Foto", bgColor: "#FBD8CC", textColor: "#D9684A" },
  { id: "anuncio", label: "Anuncio", bgColor: "#CCD8F4", textColor: "#4E72C8" },
];

export interface Publicacion {
  id: string;
  tipo: TipoPost;
  nino?: string;
  hora: string;
  autorNota: string;
  destinatario: string;
  texto: string;
  fotoCaption?: string;
  reacciones: number;
  comentarios: number;
}

export const publicaciones: Publicacion[] = [
  {
    id: "1",
    tipo: "logro",
    nino: "Mateo",
    hora: "14:20",
    autorNota: "publicado por vos",
    destinatario: "Para: familia de Mateo",
    texto:
      "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    reacciones: 3,
    comentarios: 1,
  },
  {
    id: "2",
    tipo: "actividad",
    nino: "Mateo",
    hora: "09:40",
    autorNota: "publicado por vos",
    destinatario: "Para: familia de Mateo",
    texto:
      "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    fotoCaption: "Foto · pintando con témperas",
    reacciones: 5,
    comentarios: 2,
  },
  {
    id: "3",
    tipo: "anuncio",
    hora: "07:50",
    autorNota: "publicado por vos",
    destinatario: "Para: toda la sala",
    texto:
      "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    reacciones: 8,
    comentarios: 0,
  },
];

export const usuarioActual = {
  nombre: "Caro Giménez",
  rol: "Maestra · Sala Soles",
  sala: "Sala Soles",
  inicial: "C",
};
