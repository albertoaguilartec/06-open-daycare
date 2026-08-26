export interface Padre {
  nombre: string;
  rol: "Mamá" | "Papá";
  inicial: string;
  colorAvatar: string;
  colorLetraAvatar: string;
  estado: "activa" | "pendiente";
}

export interface Nino {
  id: string;
  nombre: string;
  inicial: string;
  edad: string;
  sala: string;
  colorAvatar: string;
  colorLetraAvatar: string;
  alergia?: string;
  alergiaBadgeBg?: string;
  alergiaBadgeText?: string;
  alergiasNotas?: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  padres: Padre[];
}

export const salaActual = {
  nombre: "Sala Soles",
};

export const salas = [
  { id: "soles", nombre: "Soles" },
  { id: "lunas", nombre: "Lunas" },
  { id: "estrellas", nombre: "Estrellas" },
  { id: "solesito", nombre: "Solesito" },
];

export const ninos: Nino[] = [
  {
    id: "mateo-fernandez",
    nombre: "Mateo Fernández",
    inicial: "M",
    edad: "3 años",
    sala: "Soles",
    colorAvatar: "#A9D9E8",
    colorLetraAvatar: "#1F7A93",
    alergia: "MANÍ",
    alergiaBadgeBg: "#FBD8CC",
    alergiaBadgeText: "#D9684A",
    alergiasNotas: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    fechaNacimiento: "12 mar 2022",
    fechaIngreso: "feb 2025",
    padres: [
      {
        nombre: "Lucía Fernández",
        rol: "Mamá",
        inicial: "L",
        colorAvatar: "#C9B6E8",
        colorLetraAvatar: "#fff",
        estado: "activa",
      },
      {
        nombre: "Diego Fernández",
        rol: "Papá",
        inicial: "D",
        colorAvatar: "#A9C7E8",
        colorLetraAvatar: "#fff",
        estado: "pendiente",
      },
    ],
  },
  {
    id: "sofia-mendez",
    nombre: "Sofía Méndez",
    inicial: "S",
    edad: "2 años",
    sala: "Soles",
    colorAvatar: "#F4B8CC",
    colorLetraAvatar: "#C44A7A",
    fechaNacimiento: "15 may 2024",
    fechaIngreso: "ago 2025",
    padres: [],
  },
  {
    id: "benjamin-ruiz",
    nombre: "Benjamín Ruiz",
    inicial: "B",
    edad: "3 años",
    sala: "Soles",
    colorAvatar: "#B9DEC4",
    colorLetraAvatar: "#3E8B62",
    fechaNacimiento: "8 ene 2023",
    fechaIngreso: "mar 2025",
    padres: [],
  },
  {
    id: "valentina-soto",
    nombre: "Valentina Soto",
    inicial: "V",
    edad: "2 años",
    sala: "Soles",
    colorAvatar: "#F4DC8E",
    colorLetraAvatar: "#9A7B1E",
    alergia: "VINCULAR",
    alergiaBadgeBg: "#F9D2DE",
    alergiaBadgeText: "#C56486",
    fechaNacimiento: "3 jul 2024",
    fechaIngreso: "sep 2025",
    padres: [],
  },
  {
    id: "tomas-diaz",
    nombre: "Tomás Díaz",
    inicial: "T",
    edad: "3 años",
    sala: "Soles",
    colorAvatar: "#C9B6E8",
    colorLetraAvatar: "#7B5FC0",
    alergia: "LACTOSA",
    alergiaBadgeBg: "#FBD8CC",
    alergiaBadgeText: "#D9684A",
    alergiasNotas: "Intolerancia a la lactosa. Evitar lácteos en snacks y almuerzo.",
    fechaNacimiento: "22 nov 2022",
    fechaIngreso: "ene 2025",
    padres: [],
  },
  {
    id: "emma-castro",
    nombre: "Emma Castro",
    inicial: "E",
    edad: "2 años",
    sala: "Soles",
    colorAvatar: "#F4B8CC",
    colorLetraAvatar: "#C44A7A",
    fechaNacimiento: "19 abr 2024",
    fechaIngreso: "jun 2025",
    padres: [],
  },
  {
    id: "lucas-romero",
    nombre: "Lucas Romero",
    inicial: "L",
    edad: "3 años",
    sala: "Soles",
    colorAvatar: "#A9D9E8",
    colorLetraAvatar: "#1F7A93",
    fechaNacimiento: "5 sep 2022",
    fechaIngreso: "abr 2025",
    padres: [],
  },
  {
    id: "olivia-vega",
    nombre: "Olivia Vega",
    inicial: "O",
    edad: "2 años",
    sala: "Soles",
    colorAvatar: "#B9DEC4",
    colorLetraAvatar: "#3E8B62",
    fechaNacimiento: "11 dic 2024",
    fechaIngreso: "feb 2026",
    padres: [],
  },
];
