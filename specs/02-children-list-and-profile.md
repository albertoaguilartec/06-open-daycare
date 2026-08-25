# SPEC 02 — Pantallas Niños (lista + perfil)

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-08-25
> **Objetivo:** Implementar las pantallas de lista de niños (`/ninos`) y perfil de niño (`/ninos/[id]`) replicando los diseños de `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html` con datos mock locales, usando el sidebar existente y Tailwind CSS v4.

## Scope

**In:**

- Página `/ninos` (`app/ninos/page.tsx`): encabezado "GESTIÓN / Niños", botón "Agregar niño", barra de búsqueda, etiqueta "SALA SOLES · 8 niños", grid 2 columnas de tarjetas de niño (avatar con inicial, nombre, edad, padres vinculados, badge de alergia opcional). Cada tarjeta enlaza a `/ninos/[id]`.
- Página `/ninos/[id]` (`app/ninos/[id]/page.tsx`): breadcrumb "Volver a Niños", layout 2 columnas (izq: avatar grande + nombre + edad + sala, botón "Editar", tarjeta de alerta "Alergias y notas", card con fecha de nacimiento / sala / ingreso; der: botón "Resumen del día", sección "PADRES VINCULADOS" con lista de padres — nombre, rol, estado ACTIVA/PENDIENTE — y enlace "Vincular otro padre").
- Reutilización de `components/sidebar.tsx` existente en ambas páginas, con nav activa en "Niños".
- Datos mock tipados en `lib/ninos-data.ts` (8 niños del mockup con nombre, edad, sala, alergias, padres vinculados, fecha de nacimiento, fecha de ingreso).
- Todo el estilado con **clases de Tailwind CSS v4** usando hex exactos del mockup. Sin inline styles.
- Adaptación móvil `<768px`: grid de niños a 1 columna, perfil en layout stacked (una columna).
- Sidebar reutilizada desde `components/sidebar.tsx`. En mobile, se oculta y se muestra mediante el mismo mecanismo de hamburger/nav móvil existente (`components/mobile-nav.tsx`).
- Enlaces a rutas futuras: `/agregar-nino`, `/editar-nino/[id]`, `/resumen-dia/[id]`, `/vincular-padre/[id]`. Dan 404 por ahora.
- Botones "Resumen del día" y "Vincular otro padre" como `<a href="#">` con estilo visual correcto.

**Out of scope (para futuras specs):**

- Formulario de agregar/editar niño (pantalla `agregar-nino.dc.html`).
- Pantalla de resumen del día (`resumen-dia.dc.html`).
- Pantalla de vincular padre (`vincular-padre.dc.html`).
- Búsqueda funcional con filtrado real.
- CRUD de niños, autenticación, base de datos o API.
- Interactividad de edición, modales, drawers.

## Data model

```ts
// lib/ninos-data.ts
interface Padre {
  nombre: string;
  rol: "Mamá" | "Papá";
  inicial: string;
  colorAvatar: string;   // bg hex, ej "#C9B6E8"
  estado: "activa" | "pendiente";
}

interface Nino {
  id: string;
  nombre: string;
  inicial: string;
  edad: string;           // "3 años"
  sala: string;            // "Soles"
  colorAvatar: string;     // bg hex, ej "#A9D9E8"
  colorLetraAvatar: string; // text hex, ej "#1F7A93"
  alergia?: string;        // badge corto, ej "MANÍ"
  alergiasNotas?: string;  // texto largo para perfil
  fechaNacimiento: string; // "12 mar 2022"
  fechaIngreso: string;    // "feb 2025"
  padres: Padre[];
}

export const ninos: Nino[] = [
  // Los 8 del mockup: Mateo, Sofía, Benjamín, Valentina, Tomás, Emma, Lucas, Olivia
];

export const salaActual = {
  nombre: "Sala Soles",
};
```

## Implementation plan

1. Crear `lib/ninos-data.ts` con la interfaz `Nino`, `Padre`, `salaActual` y el array de 8 niños con datos exactos del mockup. Verificación: `npx tsc --noEmit` sin errores.
2. Crear `app/ninos/page.tsx` como Server Component: encabezado "GESTIÓN / Niños", botón "Agregar niño" con icono `+`, barra de búsqueda (input visual, sin handler), etiqueta "SALA SOLES · 8 niños", grid 2 columnas mapeando `ninos`. Cada tarjeta: avatar con inicial, nombre (Fredoka), "X años · N padres vinculados", badge de alergia si existe (o flecha chevron si no). Colores exactos del mockup. En mobile `<768px`, grid 1 columna.
3. Crear `app/ninos/[id]/page.tsx` como Server Component: breadcrumb "Volver a Niños" con chevron izquierdo, layout 2 columnas (flex-wrap). Columna izquierda: avatar grande 84px, nombre (Fredoka 28px), "X años · Sala Soles", botón "Editar" con borde, tarjeta alerta "Alergias y notas" (fondo `#FBDAD6`, icono warning, texto rojo), card con 3 filas (Fecha de nacimiento, Sala, Ingreso). Columna derecha: botón "Resumen del día" (fondo `#3F362E`, texto blanco, icono sol), sección "PADRES VINCULADOS" con cada padre (avatar, nombre, rol + estado, badge ACTIVA verde o PENDIENTE amarillo), enlace "Vincular otro padre" con icono `+` dashed. En mobile `<768px`, layout stacked.
4. Verificar que `components/sidebar.tsx` se reutiliza correctamente (ya se incluye en el layout raíz de SPEC 01). Si la nav activa no se puede controlar, ajustar `sidebar.tsx` para aceptar un prop `activeItem` o leer la ruta actual.
5. Verificación visual lado a lado contra los HTML mockups directamente con el dev server o inspección en navegador.

## Acceptance criteria

- [x] `/ninos` renderiza encabezado "GESTIÓN / Niños", barra de búsqueda, etiqueta "SALA SOLES · 8 niños", grid de 8 tarjetas con avatar, nombre, edad, padres vinculados y badge de alergia (Mateo: MANÍ, Tomás: LACTOSA, Valentina: VINCULAR).
- [x] Las tarjetas de niños enlazan a `/ninos/[id]` con el `id` correspondiente.
- [x] En viewport `<768px` el grid pasa a 1 columna.
- [x] `/ninos/[id]` (ej. Mateo) muestra: breadcrumb "Volver a Niños", avatar grande, nombre "Mateo Fernández", "3 años · Sala Soles", botón "Editar", tarjeta "Alergias y notas" con texto "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.", card con fecha nacimiento "12 mar 2022", sala "Soles", ingreso "feb 2025".
- [x] Columna derecha del perfil muestra: botón "Resumen del día", sección "PADRES VINCULADOS" con Lucía (Mamá, ACTIVA) y Diego (Papá, PENDIENTE), enlace "Vincular otro padre".
- [x] En mobile `<768px` el perfil va en layout stacked (una columna).
- [x] Sidebar reutilizada con nav activa en "Niños".
- [x] Colores, tipografía (Fredoka/Nunito) y espaciados coinciden con los mockups.
- [x] Sin errores en consola; `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan.

## Decisions

- **Sí:** reutilizar `components/sidebar.tsx` existente — misma sidebar en toda la app, consistencia visual.
- **Sí:** datos mock en `lib/ninos-data.ts` separado de `lib/feed-data.ts` — cada pantalla tiene su fuente de datos independiente.
- **Sí:** rutas `/ninos` y `/ninos/[id]` — convención estándar de Next.js App Router para listado + detalle.
- **No:** implementar búsqueda funcional — es solo UI visual por ahora.
- **No:** pantallas de agregar niño, resumen del día, vincular padre — futuras specs.
- **Sí:** Tailwind CSS v4 para todo el estilado, con hex exactos del mockup en valores arbitrarios.
- **No:** inline styles copiados del mockup.
- **Sí:** botones sin destino como `<a href="#">` con estilo visual — preparados para integración futura.
- **No:** lógica de datos, handlers de edición, modales ni drawers.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Sidebar existente no controla nav activa por ruta | Ajustar `sidebar.tsx` con prop `activeItem` o lectura de pathname en paso 4. |
| Grid de tarjetas puede no verse bien en todos los tamaños intermedios | Verificar en 768px, 1024px, 1280px durante la comparación visual. |
| Datos mock del perfil pueden no coincidir exactamente con los de la lista | Ambas fuentes salen de `lib/ninos-data.ts`, mismo objeto `Nino`. |
