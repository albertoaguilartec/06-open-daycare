# SPEC 05 — Modal Vincular Padre

> **Estado:** Implementado
> **Depende de:** SPEC 02
> **Fecha:** 2026-08-26
> **Objetivo:** Implementar el modal/diálogo "Vincular padre" replicando `references/pantallas/vincular-padre.dc.html` como componente visual que se abre desde la pantalla de perfil de niño (`/ninos/[id]`), con validación visual de email y selección de parentesco solo UI.

## Scope

**In:**

- Componente `components/vincular-padre-modal.tsx` (Client Component) que renderiza el modal centrado con fondo semi-transparente
- Estructura visual idéntica al mockup: encabezado "Vincular padre" / "a {nombreNiño}", botón cerrar (X), banner informativo, campos Nombre (obligatorio) y Email (obligatorio, tipo email), selector de parentesco (Mamá/Papá/Tutor/a) solo visual, código de invitación estático "7K4P9" con expiración "Vence en 7 días", botón "Enviar invitación"
- Validación visual personalizada para email: muestra mensaje de error y borde rojo cuando el email es inválido al perder foco o al intentar enviar
- Selección de parentesco solo visual (cambio de estilos Tailwind al hacer click, sin estado de formulario real)
- Integración en `app/ninos/[id]/page.tsx`: botón "Vincular otro padre" abre el modal, recibe `nombreNiño` como prop
- Estilado 100% Tailwind CSS v4 con hex exactos del mockup (`#F6ECDF`, `#FBF4EC`, `#ECE0D0`, `#3F362E`, `#A89A8B`, `#E3ECFB`, `#4E72C8`, `#9FB8EC`, `#CCD8F4`, `#FFFDF9`, `#6E6359`, `#FBF1D6`, `#E6D08A`, `#A88526`, `#8A7234`, `#F4977E`, `#EE8164`)
- Fuentes Fredoka + Nunito heredadas del layout raíz (SPEC 01)
- Adaptación móvil `<768px`: modal ocupa ancho completo con bordes redondeados solo arriba, padding ajustado
- Sin lógica de envío real, sin API, sin persistencia — solo componentes y parte visual

**Out of scope (para futuras specs):**

- Envío real de invitación, backend, API, base de datos
- Generación dinámica de código de invitación
- Validación de nombre (solo required HTML5)
- Estados de carga, éxito, error de envío
- Persistencia de selección de parentesco
- Accesibilidad avanzada (focus trap, ARIA) — solo lo básico nativo
- Tests automatizados

## Data model

Esta feature no introduce nuevas estructuras de datos persistentes. Reutiliza el nombre del niño desde `lib/ninos-data.ts` (prop `nombre` del objeto `Nino`) que se pasa al modal desde la página de perfil.

El modal maneja estado local temporal (solo UI):
- `isOpen: boolean` — controla visibilidad del modal
- `emailValue: string` — valor del input email para validación visual
- `emailError: boolean` — flag para mostrar error visual
- `parentescoSeleccionado: "Mamá" | "Papá" | "Tutor/a"` — solo para estilos visuales

## Implementation plan

1. Crear `components/vincular-padre-modal.tsx` como Client Component (`"use client"`): estructura del modal con `Dialog`/`div` role="dialog", overlay semi-transparente, contenedor centrado `max-w-[480px]`, encabezado con título/subtítulo y botón cerrar (icono X), banner informativo azul, dos inputs (nombre, email con validación visual onBlur/onChange), grupo de 3 botones de parentesco con estado visual activo/inactivo, tarjeta código invitación dashed, botón "Enviar invitación" con gradiente y sombra. Props: `isOpen`, `onClose`, `nombreNiño`. Verificación: `npx tsc --noEmit` sin errores.
2. En `app/ninos/[id]/page.tsx`: importar `VincularPadreModal`, añadir estado `modalAbierto`, pasar `nombreNiño={nino.nombre}` al modal, conectar el enlace "Vincular otro padre" (cambiar `href="#"` por `onClick={() => setModalAbierto(true)}`). Verificación: al clickear se abre el modal, al cerrar se cierra.
3. Ajustes visuales finos comparando lado a lado contra `references/pantallas/vincular-padre.dc.html` en desktop (~1280px) y móvil (~390px): colores, tipografía, espaciados, sombras, radius, estados hover/focus de botones, validación email (borde rojo + mensaje "Email inválido" bajo el input). Verificación: coincidencia visual.
4. Verificar build completo: `npm run lint`, `npx tsc --noEmit`, `npm run build` pasan sin errores.

## Acceptance criteria

- [x] El modal se abre al clickear "Vincular otro padre" en `/ninos/[id]` y se cierra con el botón X o click en overlay
- [x] El subtítulo muestra "a {nombreNiño}" (ej. "a Mateo Fernández") dinámicamente
- [x] El banner informativo azul con icono y texto "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de Mateo." se ve idéntico al mockup
- [x] Input "Nombre del padre/madre": placeholder "Ej. Diego Fernández", required, borde `#EADFD0`, fondo blanco, radius 14px
- [x] Input "Email": type="email", placeholder "correo@ejemplo.com", required, validación visual: al perder foco si no es email válido → borde rojo `#EE8164` + mensaje "Email inválido" en rojo bajo el input
- [x] Selector parentesco: tres botones "Mamá" (activo por defecto: fondo `#CCD8F4`, borde `#9FB8EC`, texto `#4E72C8`), "Papá" y "Tutor/a" (inactivos: fondo `#FFFDF9`, borde `#ECE0D0`, texto `#6E6359`); al clickear cambia estilos visualmente solo
- [x] Tarjeta código invitación: fondo `#FBF1D6`, borde dashed `#E6D08A`, radius 16px, label "CÓDIGO DE INVITACIÓN", código "7K4P9" (Fredoka 34px, letter-spacing 7px, color `#8A7234`), texto "Vence en 7 días"
- [x] Botón "Enviar invitación": gradiente `#F4977E` a `#EE8164`, texto blanco, icono flecha, sombra `0 10px 22px -8px rgba(238,129,100,.7)`, radius 14px
- [ ] En móvil `<768px`: modal ancho 100%, bordes redondeados solo arriba (top-24px), sin margen lateral
- [x] Fuentes Fredoka (títulos) y Nunito (resto) aplicadas correctamente
- [x] `npm run lint`, `npx tsc --noEmit`, `npm run build` pasan

## Decisions

- **Sí:** Modal/Dialog sobre la página de perfil — mantiene contexto, evita navegar fuera, coherente con "pantalla modal o dialogo" del prompt
- **Sí:** Componente separado `components/vincular-padre-modal.tsx` — reutilizable, aisla lógica de UI, Server Component en la página de perfil
- **Sí:** Validación visual personalizada para email — el usuario pidió "custom validation UI", mejora UX sobre solo HTML5
- **No:** Validación de nombre más allá de `required` — el mockup no muestra error para nombre
- **Sí:** Parentesco solo visual (estado local para estilos) — el usuario confirmó "Visual only", sin form state real
- **Sí:** Código invitación estático "7K4P9" — el usuario confirmó "Static mock", evita lógica aleatoria en UI-only spec
- **Sí:** Tailwind CSS v4 con valores arbitrarios hex exactos — convención del proyecto (SPEC 01, 02)
- **No:** Inline styles ni CSS modules — contradice convención
- **Sí:** Client Component solo para el modal (estado `isOpen`, validación email, parentesco visual) — resto Server Components
- **No:** Focus trap, ARIA avanzado, escape key para cerrar — solo lo básico; spec es solo visual
- **Sí:** Overlay click cierra modal — patrón estándar de dialogs

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Diferencias sutiles de rendering (sombras, letter-spacing, gradientes) entre mockup HTML y React/Tailwind | Paso 3 de comparación visual lado a lado con ajuste fino hasta coincidencia |
| Validación email visual puede parpadear o no limpiarse al corregir | Usar `onChange` para limpiar error al escribir, `onBlur` para validar al salir |
| Modal no se cierra al clickear overlay si estructura de DOM no lo permite | Envolver contenido en contenedor con `onClick` en overlay que llama `onClose`, `onClick` en contenido que `stopPropagation` |

## What is **not** in this spec

- Envío real de invitación, backend, API, base de datos
- Generación dinámica de código de invitación
- Validación de nombre más allá de required nativo
- Estados de carga, éxito, error de envío
- Persistencia de selección de parentesco
- Accesibilidad avanzada (focus trap, ARIA completo, tecla Escape)
- Tests automatizados
- Pantalla de confirmación post-envío

Cada uno de esos puntos, si aterriza, va en su propia spec.