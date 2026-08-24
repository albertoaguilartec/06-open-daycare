export type TipoPost = "logro" | "actividad" | "anuncio";

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
