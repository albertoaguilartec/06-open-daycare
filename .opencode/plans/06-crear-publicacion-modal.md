# SPEC 06 — Modal Crear Publicación

> **Estado:** Borrador
> **Depende de:** SPEC 01, SPEC 02
> **Fecha:** 2026-08-26
> **Objetivo:** Implementar el modal/diálogo "Nueva publicación" replicando `references/pantallas/crear-publicacion.dc.html` como componente visual que se abre desde los 3 triggers existentes (sidebar, prompt in-feed, FAB móvil), con selección de niños, selección de tipo de publicación, textarea de descripción y sección de fotos solo UI.

## Scope

**In:**

- Componente `components/crear-publicacion-modal.tsx` (Client Component) que renderiza el modal centrado con fondo semi-transparente
- Estructura visual idéntica al mockup: header con "Cancelar" (izq), "Nueva publicación" (centro, Fredoka), "Publicar" (der, coral `#D9583C`)
- Sección **PARA**: pills con avatar + nombre de cada niño (toggleable, selección múltiple) + pill "Toda la sala". Datos de niños desde `lib/ninos-data.ts`
- Sección **TIPO**: 7 pills de tipo de publicación con colores del mockup — Comida (`#9A7B1E`), Siesta (`#E7DCF6`/`#7B5FC0`), Actividad (`#2E89A6`), Logro (`#CFEBD8`/`#3E9B6C`), Ánimo (`#F9D2DE`/`#C56486`), Foto (`#FBD8CC`/`#D9684A`), Anuncio (`#CCD8F4`/`#4E72C8`)
- Sección **DESCRIPCIÓN**: textarea `min-h-[120px]`, placeholder "Contá cómo le fue hoy…", borde `#EADFD0`, fondo blanco
- Sección **FOTOS**: grid de cuadrados 96x96 con border-radius 14px — 1 foto placeholder con icono de imagen + 1 slot "Agregar" con borde dashed y icono "+". 100% visual, sin upload
- Ampliación de `TipoPost` en `lib/feed-data.ts` a los 7 tipos: `comida | siesta | actividad | logro | animo | foto | anuncio`
- Modificación de los 3 triggers existentes para abrir el modal en vez de navegar a `/crear-publicacion`:
  - `components/sidebar.tsx`: botón "Nueva publicación" → `onClick` abre modal
  - `app/page.tsx`: prompt "Compartí un momento…" → `onClick` abre modal
  - `components/mobile-nav.tsx`: FAB "+" → `onClick` abre modal
- Eliminación de los `<Link href="/crear-publicacion">` existentes (ya no hay ruta)
- Backdrop oscuro semitransparente (`bg-black/40`) detrás del modal
- Cierre con tecla Escape y click fuera del modal
- Estilado 100% Tailwind CSS v4 con hex exactos del mockup
- Fuentes Fredoka + Nunito heredadas del layout raíz
- Sin lógica de envío real, sin API, sin persistencia — solo componentes y parte visual

**Out of scope (para futuras specs):**

- Envío real de publicación, backend, API, base de datos
- Upload real de fotos (file picker, drag & drop)
- Lógica de selección de destinatarios (guardar en state de formulario)
- Lógica de selección de tipo (guardar en state de formulario)
- Publicación dinámica (las fotos placeholder son estáticas)
- Estados de carga, éxito, error de envío
- Edición de publicación existente
- Contador de caracteres en textarea
- Accesibilidad avanzada (focus trap, ARIA completo) — solo lo básico nativo
- Tests automatizados

## Data model

Extensión de `TipoPost` en `lib/feed-data.ts`:

```ts
// TipoPost ampliado
export type TipoPost =
  | "comida"
  | "siesta"
  | "actividad"
  | "logro"
  | "animo"
  | "foto"
  | "anuncio";
```

Nuevo tipo para la configuración visual de cada tipo de publicación:

```ts
export interface TipoPublicacionConfig {
  id: TipoPost;
  label: string;
  bgColor: string;   // color de fondo del pill
  textColor: string;  // color del texto del pill
}

export const tiposPublicacion: TipoPublicacionConfig[] = [
  { id: "comida",     label: "Comida",     bgColor: "#9A7B1E", textColor: "#FFFFFF" },
  { id: "siesta",     label: "Siesta",     bgColor: "#E7DCF6", textColor: "#7B5FC0" },
  { id: "actividad",  label: "Actividad",  bgColor: "#2E89A6", textColor: "#FFFFFF" },
  { id: "logro",      label: "Logro",      bgColor: "#CFEBD8", textColor: "#3E9B6C" },
  { id: "animo",      label: "Ánimo",      bgColor: "#F9D2DE", textColor: "#C56486" },
  { id: "foto",       label: "Foto",       bgColor: "#FBD8CC", textColor: "#D9684A" },
  { id: "anuncio",    label: "Anuncio",    bgColor: "#CCD8F4", textColor: "#4E72C8" },
];
```

El modal maneja estado local temporal (solo UI):
- `isOpen: boolean` — controla visibilidad del modal
- `ninosSeleccionados: string[]` — IDs de niños seleccionados (toggle)
- `todaLaSala: boolean` — flag para "Toda la sala"
- `tipoSeleccionado: TipoPost | null` — tipo de publicación seleccionado
- `descripcion: string` — contenido del textarea

## Implementation plan

1. **Ampliar tipos en `lib/feed-data.ts`**: cambiar `TipoPost` de 3 tipos a los 7 tipos del mockup. Agregar interfaz `TipoPublicacionConfig` y array `tiposPublicacion` con los 7 tipos y sus colores. Verificación: `npx tsc --noEmit` sin errores.

2. **Crear `components/crear-publicacion-modal.tsx`** como Client Component (`"use client"`): props `isOpen: boolean`, `onClose: () => void`. Estructura:
   - Overlay `fixed inset-0 z-50 flex items-start justify-center pt-[40px] px-[24px] bg-black/40` con `onClick={onClose}`
   - Card `w-full max-w-[580px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] overflow-hidden` con `onClick={e.stopPropagation()}`
   - Header flex con "Cancelar" (`text-[#94887B] font-bold`), título "Nueva publicación" (Fredoka 18px), "Publicar" (`text-[#D9583C] font-extrabold`). Ambos ejecutan `onClose`
   - Sección PARA: label uppercase 12px, pills flex-wrap con gap. Cada pill tiene avatar circle (26x26, Fredoka) + nombre. Pills de niños: `border-[1.5px] border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]` (inactivo), `border-[#3F362E] bg-[#3F362E] text-white` (activo). Pill "Toda la sala" sin avatar. Toggle: clickea agrega/quita del array `ninosSeleccionados` o activa `todaLaSala`
   - Sección TIPO: label uppercase, pills flex-wrap. Pills con colores de `tiposPublicacion`. Activo: mismo estilo (los pills no tienen estado inactivo distinto en el mockup — siempre se ven con su color). Toggle: clickea cambia `tipoSeleccionado`
   - Sección DESCRIPCIÓN: label uppercase, textarea full-width `min-h-[120px] resize-vertical px-[14px] py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] leading-[1.5]`
   - Sección FOTOS: label uppercase, flex con gap. Foto placeholder: 96x96 `rounded-[14px] bg-[#F4ECE1] border border-[#ECE0D0]` con SVG icono de imagen. Slot agregar: 96x96 `rounded-[14px] border-[1.5px] dashed border-[#DBCDBA] bg-[#F4ECE1]` con icono "+" y texto "Agregar"
   - `useEffect` para Escape key
   - Verificación: `npx tsc --noEmit` sin errores

3. **Modificar `app/page.tsx`**: importar `CrearPublicacionModal` y `useState`. Reemplazar `<Link href="/crear-publicacion">` del prompt in-feed por un `<button onClick={() => setShowCreateModal(true)}>` manteniendo el estilo visual del link. Agregar estado `showCreateModal` y renderizar `<CrearPublicacionModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />`. Verificación: clicking "Compartí un momento…" abre el modal.

4. **Modificar `components/sidebar.tsx`**: este es un Server Component. Extraer el botón "Nueva publicación" a un pequeño Client Component wrapper `components/nueva-publicacion-button.tsx` que maneje `useState` y `onClick`. Importarlo en `sidebar.tsx`. Verificación: clicking en sidebar abre el modal.

5. **Modificar `components/mobile-nav.tsx`**: es ya Client Component. Reemplazar el `<Link>` del FAB "+" por un `<button onClick>` que abra el modal. Agregar estado y renderizar el modal. Verificación: clicking FAB abre el modal.

6. **Verificación visual lado a lado** contra `references/pantallas/crear-publicacion.dc.html` en desktop (~1280px) y móvil (~390px): colores, tipografía, espaciados, sombras, radius, estados hover de botones. Ajustar hasta coincidencia.

7. **Verificar build completo**: `npm run lint`, `npx tsc --noEmit`, `npm run build` pasan sin errores.

## Acceptance criteria

- [ ] El modal se abre al clickear "Compartí un momento…" en el feed (`app/page.tsx`) y se cierra con "Cancelar", "Publicar" o click en overlay
- [ ] El modal se abre al clickear "Nueva publicación" en el sidebar (`components/sidebar.tsx`)
- [ ] El modal se abre al clickear el FAB "+" en móvil (`components/mobile-nav.tsx`)
- [ ] Presionar Escape cierra el modal
- [ ] Header: "Cancelar" (izq, `#94887B`), "Nueva publicación" (centro, Fredoka 18px), "Publicar" (der, `#D9583C` font-extrabold)
- [ ] Sección PARA: label "PARA" uppercase 12px `#94887B`, pills con avatar circle (26x26, Fredoka, color de fondo del niño) + nombre, toggleable con selección múltiple
- [ ] Sección PARA: pill "Toda la sala" sin avatar, toggleable. Al activar "Toda la sala", se deseleccionan niños individuales
- [ ] Pills de niños: inactivo `bg-[#FFFDF9] border-[#ECE0D0] text-[#6E6359]`, activo `bg-[#3F362E] border-[#3F362E] text-white`
- [ ] Sección TIPO: label "TIPO" uppercase, 7 pills con colores exactos del mockup (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio)
- [ ] Pills de tipo: cada uno con `bgColor` y `textColor` de `tiposPublicacion`, border-radius 999px, font-weight 800, 13.5px
- [ ] Sección DESCRIPCIÓN: textarea `min-h-[120px]`, placeholder "Contá cómo le fue hoy…", borde `#EADFD0`, fondo blanco
- [ ] Sección FOTOS: label "FOTOS" uppercase, 1 cuadrado 96x96 con icono de imagen (placeholder foto), 1 cuadrado 96x96 dashed con "+" y "Agregar"
- [ ] No hay `<Link href="/crear-publicacion">` restante en el proyecto
- [ ] Colores, tipografía (Fredoka/Nunito), bordes `rounded-[14px]`, sombra y espaciados coinciden con el mockup
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` pasan sin errores

## Decisions

- **Sí:** Modal/Dialog sobre la página — consistente con modales existentes (SPEC 04, 05), evita navegar fuera del feed
- **Sí:** Componente separado `components/crear-publicacion-modal.tsx` — reutilizable desde 3 triggers, aisla lógica de UI
- **Sí:** Ampliar `TipoPost` a 7 tipos en este spec — el mockup los define, el componente los necesita, y es un cambio mínimo en `lib/feed-data.ts`
- **Sí:** Nuevo array `tiposPublicacion` con configuración visual — centraliza colores por tipo, evita hardcodeo en el componente
- **Sí:** Selección múltiple de niños (toggle) — el usuario confirmó, coherente con UX de "para quién es la publicación"
- **Sí:** "Toda la sala" como opción excluyente — al seleccionar "Toda la sala" se deseleccionan individuos, y viceversa
- **No:** Upload real de fotos — el usuario confirmó "100% visual", upload va en otro spec
- **Sí:** Client Component wrapper para el botón del sidebar — el sidebar es Server Component y no puede usar `useState`
- **Sí:** Eliminar `<Link href="/crear-publicacion">` — la ruta ya no existe, el modal la reemplaza completamente
- **No:** Focus trap, ARIA avanzado — solo lo básico; spec es UI-only
- **Sí:** Overlay click cierra modal — patrón estándar, consistente con modales existentes
- **No:** Inline styles — el mockup los usa pero el proyecto usa Tailwind
- **No:** Persistencia de selección de niños/tipo/descripción — valores se limpian al cerrar el modal

## Risks

| Riesgo | Mitigación |
| --- | --- |
| 3 triggers en 3 archivos distintos necesitan estado `isOpen` + renderizar el modal | Cada archivo maneja su propio estado; el modal se renderiza 3 veces (una por trigger) pero solo 1 está abierto a la vez. Alternativa: extraer un provider/context si 3 modales idénticos parece wasteful |
| `sidebar.tsx` es Server Component y no puede usar `useState` | Extraer botón a un Client Component wrapper (`nueva-publicacion-button.tsx`) |
| Colores de pills de tipo pueden no coincidir exactamente con el mockup (inline styles vs Tailwind) | Paso 6 de verificación visual lado a lado |
| El textarea puede no resize correctamente en todos los navegadores | Usar `resize-vertical` que es soportado ampliamente |

## What is **not** in this spec

- Envío real de publicación, backend, API, base de datos
- Upload real de fotos (file picker, drag & drop, preview)
- Lógica de guardado de selección de destinatarios, tipo o descripción
- Publicaciones dinámicas (fotos placeholder son estáticas)
- Estados de carga, éxito, error de envío
- Edición de publicación existente
- Contador de caracteres en textarea
- Accesibilidad avanzada (focus trap, ARIA completo)
- Tests automatizados
- Responsive móvil dedicado del modal (va desktop-first, mobile basics)

Cada uno de esos puntos, si aterriza, va en su propia spec.
