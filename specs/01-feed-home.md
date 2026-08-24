# SPEC 01 — Feed como home (`/`)

> **Estado:** Borrador
> **Depende de:** ninguna
> **Fecha:** 2026-08-23
> **Objetivo:** Implementar la plantilla `references/pantallas/feed.dc.html` como página home (`/`) con estilo idéntico al mockup, datos mock locales y adaptación móvil básica.

## Scope

**In:**

- Página `/` (`app/page.tsx`) réplica del mockup: sidebar, encabezado de saludo, composer "Compartí un momento…", separador "PUBLICADO HOY" y 3 tarjetas de publicación (logro, actividad con foto placeholder, anuncio).
- Sidebar completa: logo OpenDayCare · Sala Soles, botón "Nueva publicación", nav (Feed activo, Niños, Avisos, Mi cuenta), pie con usuaria Caro Giménez y acción cerrar sesión.
- Tipografías Fredoka + Nunito vía `next/font/google` en `app/layout.tsx` (reemplazan Geist).
- Datos mock tipados en `lib/feed-data.ts`.
- Todo el estilado se implementa con **clases de Tailwind CSS v4**, usando valores arbitrarios con los hex exactos del mockup donde haga falta (`bg-[#F6ECDF]`, `text-[#3F362E]`, …). Sin inline styles ni CSS modules.
- Adaptación móvil `<768px`: header con logo + hamburguesa que abre drawer lateral con los ítems de navegación, y FAB flotante "+" para nueva publicación.
- Enlaces apuntando a rutas futuras reales (dan 404 por ahora): `/crear-publicacion`, `/ninos`, `/avisos`, `/mi-cuenta`, `/detalle-publicacion`, `/foto`, `/login`.

**Out of scope (para futuras specs):**

- Autenticación (login real, sesión, logout funcional).
- Base de datos o API: todo el contenido vive en el mock local.
- Las páginas destino de los enlaces (niños, avisos, mi cuenta, crear/editar publicación, detalle, foto, login) — una spec propia por pantalla.
- Interactividad de datos: reacciones, comentarios y "Editar" son visuales, sin handlers.
- Dark mode y layout tablet dedicado (>768px usa el diseño desktop).

## Data model

```ts
// lib/feed-data.ts
type TipoPost = "logro" | "actividad" | "anuncio";

interface Publicacion {
  id: string;
  tipo: TipoPost;
  nino?: string;         // nombre para título/avatar; ausente en "Anuncio general"
  hora: string;          // "14:20"
  autorNota: string;     // "publicado por vos"
  destinatario: string;  // "Para: familia de Mateo" | "Para: toda la sala"
  texto: string;
  fotoCaption?: string;  // solo actividad con placeholder de foto
  reacciones: number;    // 3, 5 y 8 en el mockup
  comentarios: number;   // 1, 2 y 0 en el mockup
}

export const publicaciones: Publicacion[] = [ /* los 3 posts del mockup */ ];

export const usuarioActual = {
  nombre: "Caro Giménez",
  rol: "Maestra · Soles",
  sala: "Sala Soles",
  inicial: "C",
};
```

## Implementation plan

1. `app/layout.tsx`: cargar Fredoka (400–700) y Nunito (400–800) con `next/font/google` como variables CSS, `lang="es"`, metadata title "OpenDayCare". `app/globals.css`: mapear `--font-sans` a Nunito, fondo base `#F6ECDF` y estilo de scrollbar del mockup. Verificación: `npm run dev` carga sin errores con las nuevas fuentes.
2. Crear `lib/feed-data.ts` con los tipos y los 3 posts + `usuarioActual`.
3. Crear `components/sidebar.tsx` (Server Component, estilado 100% Tailwind): logo, botón "Nueva publicación", nav con Feed marcado activo, bloque de usuaria. Enlaces con `next/link` a rutas futuras.
4. Crear `components/post-card.tsx` (estilado Tailwind; variantes por tipo: badge LOGRO/ACTIVIDAD/ANUNCIO, color de avatar, placeholder de foto dashed en actividad) y reescribir `app/page.tsx`: encabezado de saludo, composer, separador "PUBLICADO HOY", listado mapeando `publicaciones`.
5. Nav móvil `<768px` en un client component (`components/mobile-nav.tsx`, estilado Tailwind): header con logo + hamburguesa que abre/cierra el drawer con los mismos 4 ítems, y FAB "+". Único estado de UI interactivo (`useState`); cero lógica de datos.
6. Verificación visual lado a lado contra `references/screenshots/feed.png` (desktop ~1280px y móvil ~390px) con ajuste fino de colores, tipografía y espaciados hasta coincidencia.

## Acceptance criteria

- [ ] `/` renderiza sidebar + feed con los colores exactos del mockup (fondo `#F6ECDF`, tarjetas `#FFFDF9`, bordes `#ECE0D0`) y las fuentes Fredoka/Nunito aplicadas.
- [ ] La comparación con `references/screenshots/feed.png` no muestra diferencias visibles a simple vista en desktop.
- [ ] Los 3 posts muestran el contenido exacto del mockup (textos, horas, badges, contadores 3/1, 5/2, 8/0).
- [ ] Cada enlace navega a su ruta futura (`/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`, `/detalle-publicacion`, `/foto`, `/login`) y todas dan 404 por ahora.
- [ ] En viewport `<768px` hay header con hamburguesa que abre/cierra el drawer con los 4 ítems, y un FAB "+" flotante.
- [ ] Sin errores en consola; `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan.

## Decisions

- **Sí:** mock tipado en `lib/feed-data.ts` que la página mapea — conectar la BD después no toca la UI.
- **No:** JSX estático literal del HTML — duplicaría contenido y complicaría la futura integración.
- **Sí:** enlaces a rutas futuras reales aunque den 404 — las próximas specs crean esas páginas sin modificar esta.
- **No:** páginas placeholder — trabajo desechable.
- **Sí:** Fredoka + Nunito en el root layout — toda la app comparte el design system desde ya.
- **Sí:** Tailwind CSS v4 para todo el estilado, replicando el diseño con clases utilitarias y valores arbitrarios exactos del mockup — es el stack del proyecto y mantiene fidelidad visual.
- **No:** inline styles copiados del mockup ni CSS modules/styled-components — contradirían la convención del proyecto.
- **Sí:** un solo client component (nav móvil); el resto Server Components estáticos.
- **No:** dark mode, responsive tablet dedicado, ni estados hover extra a los naturales.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Rendering sutilmente distinto entre el runtime del mockup y React/Tailwind (sombras, letter-spacing) | Paso final de comparación lado a lado contra el screenshot con ajuste fino. |
| Rutas 404 pueden confundir en demos tempranas | Documentado en Scope; las siguientes specs cubren cada pantalla. |

## What is **not** in this spec

- Autenticación y base de datos.
- Páginas Niños, Avisos, Mi cuenta, Crear/Edit publicación, Detalle, Foto, Login.
- Interactividad de reacciones/comentarios/edición, dark mode, responsive tablet dedicado.

Cada uno de esos puntos, si aterriza, va en su propia spec.
