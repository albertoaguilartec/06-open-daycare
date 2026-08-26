# SPEC 04 — Modal de agregar niño

> **Estado:** Implementado
> **Depende de:** SPEC 02
> **Fecha:** 2026-08-25
> **Objetivo:** Implementar un modal/dialogo de "Agregar niño" que se abre desde el botón "+ Agregar niño" en la pantalla de lista de niños, replicando el diseño de `references/pantallas/agregar-nino.dc.html` con componentes visuales sin lógica de guardado.

## Scope

**In:**

- Componente `components/add-child-modal.tsx` (Client Component): modal/dialogo centrado con header ("Cancelar" · "Agregar niño" · "Guardar"), formulario con campos Nombre completo (input texto), Fecha de nacimiento (input type date), Sala (select/dropdown con opciones de ejemplo), Alergias (input texto libre, placeholder "Ej. Maní, Lactosa"), Notas médicas (textarea). Botón "Guardar" solo cierra el modal. Botón "Cancelar" cierra el modal.
- Modificación de `app/ninos/page.tsx`: el botón "+ Agregar niño" cambia de `<Link href="/agregar-nino">` a un `<button>` que abre el modal. Se agrega estado `useState<boolean>` para controlar apertura/cierre.
- Backdrop oscuro semitransparente (`bg-black/40`) detrás del modal.
- Cierre con tecla Escape y click fuera del modal.
- Datos de salas de ejemplo en `lib/ninos-data.ts`: array `salas` con nombres de salas ("Soles", "Lunas", "Estrellas", "Solesito").
- Estilado con **clases de Tailwind CSS v4** usando hex exactos del mockup. Sin inline styles.
- El modal se renderiza condicionalmente en la página de lista de niños. No es una ruta separada.

**Out of scope (para futuras specs):**

- Lógica de guardado, validación de campos obligatorios, conexión a API o base de datos.
- El botón "Guardar" no guarda nada — solo cierra el modal.
- Formulario de edición de niño (otra spec).
- Selección de sala con búsqueda o creación de nuevas salas.
- Drag & drop o upload de foto del niño.
- Estados de error, loading, ni mensajes de éxito.

## Data model

```ts
// Adición a lib/ninos-data.ts
export const salas = [
  { id: "soles", nombre: "Soles" },
  { id: "lunas", nombre: "Lunas" },
  { id: "estrellas", nombre: "Estrellas" },
  { id: "solesito", nombre: "Solesito" },
];
```

El modal no persiste datos. El formulario es visual: los valores se limpian al cerrar.

## Implementation plan

1. Agregar `salas` a `lib/ninos-data.ts` con las 4 salas de ejemplo. Verificación: `npx tsc --noEmit` sin errores.
2. Crear `components/add-child-modal.tsx` como Client Component (`"use client"`): recibe props `open: boolean` y `onClose: () => void`. Renderiza overlay `fixed inset-0 z-50` con backdrop `bg-black/40`, card centrada `max-w-[520px]` con `rounded-[24px]`, sombra del mockup. Header flex con "Cancelar" (link `text-[#94887B]`), título "Agregar niño" (Fredoka 18px), "Guardar" (link `text-[#D9583C]` font-extrabold). Ambos links ejecutan `onClose`. Body: campo NOMBRE COMPLETO (label uppercase 12px `#94887B`, input `rounded-[14px]` borde `#EADFD0`), fila flex con FECHA DE NACIMIENTO (input `type="date"`, formato dd/mm/aaaa) y SALA (select con opciones de `salas`, valor por defecto "Soles"), campo ALERGIAS (input texto, placeholder "Ej. Maní, Lactosa"), campo NOTAS MÉDICAS (textarea `min-h-[90px]`). Verificación: `npm run dev`, abrir modal desde la lista, verificar que todos los campos renderizan.
3. Modificar `app/ninos/page.tsx`: importar `AddChildModal` y `useState`. Cambiar el `<Link href="/agregar-nino">` por un `<button onClick={() => setShowAddModal(true)}>`. Agregar estado `showAddModal` y renderizar `<AddChildModal open={showAddModal} onClose={() => setShowAddModal(false)} />` al final del JSX. Verificación: clicking "+ Agregar niño" abre el modal, "Cancelar" y "Guardar" lo cierran.
4. Agregar cierre con tecla Escape: en `AddChildModal`, efecto `useEffect` que escucha `keydown` para `Escape` y llama `onClose`. Verificación: presionar Escape cierra el modal.
5. Verificación visual lado a lado contra `references/pantallas/agregar-nino.dc.html` ajustando colores, tipografía y espaciados.
6. Verificar que `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan sin errores.

## Acceptance criteria

- [x] El botón "+ Agregar niños" en `/ninos` abre un modal/dialogo centrado sobre la página.
- [x] El modal muestra header con "Cancelar", título "Agregar niño" y "Guardar".
- [x] Click en "Cancelar" o "Guardar" cierra el modal.
- [x] Click en el backdrop oscuro cierra el modal.
- [x] Presionar Escape cierra el modal.
- [x] Campo NOMBRE COMPLETO: input de texto con label "NOMBRE COMPLETO" y placeholder "Ej. Martina López".
- [x] Campo FECHA DE NACIMIENTO: input `type="date"` con label "FECHA DE NACIMIENTO" y placeholder "dd/mm/aaaa".
- [x] Campo SALA: select/dropdown con label "SALA", opciones Soles/Lunas/Estrellas/Solesito, valor por defecto "Soles".
- [x] Campo ALERGIAS: input de texto con label "ALERGIAS (ETIQUETAS)" y placeholder "Ej. Maní, Lactosa".
- [x] Campo NOTAS MÉDICAS: textarea con label "NOTAS MÉDICAS" y placeholder "Indicaciones, medicación, contactos…".
- [x] Colores, tipografía (Fredoka/Nunito), bordes `rounded-[14px]`, sombra y espaciados coinciden con el mockup.
- [x] El modal no desplaza el contenido de fondo (no hay scroll del body cuando está abierto).
- [x] Sin errores en consola; `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan.

## Decisions

- **Sí:** Client Component para el modal — necesita `useState` y `useEffect` para abrir/cerrar y Escape. El botón trigger en la página también necesita estado, así que `page.tsx` se vuelve parcialmente client (o se extrae un wrapper client).
- **Sí:** modal como componente separado (`components/add-child-modal.tsx`) — reutilizable si otro trigger lo necesita.
- **Sí:** input `type="date"` para fecha de nacimiento — validación nativa del navegador, formato localizado.
- **Sí:** select nativo para sala — simples y accesible, sin dependencias externas.
- **Sí:** datos de salas en `lib/ninos-data.ts` — misma fuente que los datos de niños.
- **No:** librería de modal (Headless UI, Radix) — el proyecto no tiene dependencias UI y no se justifica agregar una por un solo componente.
- **No:** ruta `/agregar-nino` como página standalone — el mockup es claramente un modal sobre la lista, no una página separada.
- **No:** lógica de validación, guardado ni estados de error — solo visual.
- **No:** inline styles — el mockup los usa pero el proyecto usa Tailwind.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| `page.tsx` pasa de Server Component a necesitar `useState` | Extraer la parte interactiva (botón + modal) a un Client Component wrapper que se renderiza desde el Server Component. |
| Input `type="date"` se ve diferente entre navegadores/OS | El mockup muestra "dd/mm/aaaa" como placeholder — en el input date el placeholder no se ve. Usar `type="date"` sin placeholder; el formato depende del locale del navegador. |
| El modal puede no coincidir visualmente con el mockup que usa inline styles | Paso 5 de verificación visual lado a lado; ajustar until-width, paddings y sombras con Tailwind. |

## What is **not** in this spec

- Lógica de guardado, validación de campos obligatorios ni conexión a API.
- Formulario de edición de niño.
- Selección de sala con búsqueda o creación de nuevas salas.
- Upload de foto del niño.
- Estados de error, loading ni mensajes de éxito.
- Responsive móvil dedicado del modal (por ahora va desktop-first).

Cada uno de esos puntos, si aterriza, va en su propia spec.
