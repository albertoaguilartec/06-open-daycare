# SPEC 03 — Pantallas Login y Activación de cuenta

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-08-25
> **Objetivo:** Implementar las pantallas de login (`/login`) y activación de cuenta (`/activar-cuenta`) replicando los diseños de `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` como componentes visuales standalone sin lógica de autenticación.

## Scope

**In:**

- Página `/login` (`app/(auth)/login/page.tsx`): layout split 2 columnas — izquierda: panel de branding con gradiente naranja, círculos decorativos, logo OpenDayCare, título "El día de cada niño, compartido con su familia", subtítulo, texto "🌿 Guardería Sala Soles"; derecha: formulario con título "Iniciar sesión", subtexto, campos EMAIL y CONTRASEÑA, link "¿Olvidaste tu contraseña?", botón "Iniciar sesión" con gradiente, link "¿Te invitó la guardería? Activá tu cuenta". Sin botones de selección de rol (Personal/Familia eliminados del mockup).
- Página `/activar-cuenta` (`app/(auth)/activar-cuenta/page.tsx`): layout centrado — logo gradiente, título "Bienvenida a OpenDayCare", subtexto, tarjeta con avatar del niño invitado (inicial + nombre + sala), campos CÓDIGO DE INVITACIÓN, EMAIL, CREAR CONTRASEÑA, checkbox de autorización de fotos (marcado por defecto, visual), botón "Activar mi cuenta" con gradiente, link "¿Ya tenés cuenta? Iniciar sesión".
- Layout de grupo `app/(auth)/layout.tsx`: sin `<MobileNav />`, sin sidebar, fondo base `#FBF4EC`, contenido centrado. Desacoplado del layout raíz que incluye el nav.
- Datos mock estáticos inline en cada página (valores precargados del mockup). Sin archivo de datos separado por ser valores fijos.
- Todo el estilado con **clases de Tailwind CSS v4** usando hex exactos del mockup. Sin inline styles.
- Enlaces: login → `/activar-cuenta`, activación → `/login`. Sin autenticación real.
- Link "¿Olvidaste tu contraseña?" visual sin destino (`href="#"`).

**Out of scope (para futuras specs):**

- Autenticación real (login, sesión, logout, JWT/sesiones).
- Lógica de activación de cuenta (validación de código, creación de contraseña en backend).
- Selección de rol (Personal/Familia) — eliminada del alcance.
- Formulario de "¿Olvidaste tu contraseña?".
- Validación de inputs, estados de error, loading.
- Conexión a API o base de datos.

## Data model

Este feature no introduce nuevas estructuras de datos. Son valores mock estáticos inline en los componentes.

## Implementation plan

1. Crear `app/(auth)/layout.tsx`: layout de grupo que no incluye `<MobileNav />`, fondo `bg-[#FBF4EC]`, contenido centrado vertical y horizontalmente. Verificación: `npm run dev` carga sin errores y las rutas hijas no muestran el nav móvil.
2. Crear `app/(auth)/login/page.tsx`: Server Component. Layout split con `grid grid-cols-[1.05fr_1fr]`. Panel izquierdo: gradiente `linear-gradient(155deg,#F6A98E 0%,#F2937A 45%,#EC7E62 100%)` con `bg-gradient-to-br`, círculos decorativos con `rounded-full` y `bg-white/10`, logo en cuadrado `bg-white/22` con ícono SVG, título Fredoka 42px, subtítulo Nunito 17px, texto inferior. Panel derecho: formulario con campos EMAIL y CONTRASEÑA (inputs estáticos), link "¿Olvidaste tu contraseña?" en `text-[#C5503A]`, botón "Iniciar sesión" con gradiente y `shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]`, link inferior a `/activar-cuenta`. Sin botones de rol. Verificación: `/login` renderiza el layout split correctamente.
3. Crear `app/(auth)/activar-cuenta/page.tsx`: Server Component. Layout centrado `flex items-center justify-center`. Logo cuadrado con gradiente, sombra, ícono SVG. Título Fredoka 32px, subtexto. Tarjeta: avatar circular `bg-[#A9D9E8]` con inicial "M", texto "Mateo · Sala Soles". Campos: CÓDIGO DE INVITACIÓN (input con `tracking-[3px]` y Fredoka), EMAIL, CREAR CONTRASEÑA. Checkbox: fondo `bg-[#FBF1D6]`, check verde `bg-[#5FB97E]` con SVG check, texto de autorización. Botón "Activar mi cuenta" gradiente. Link a `/login`. Verificación: `/activar-cuenta` renderiza correctamente.
4. Verificación visual lado a lado contra `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` con el dev server, ajustando colores, tipografía y espaciados.
5. Verificar que `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan sin errores.

## Acceptance criteria

- [x] `/login` renderiza layout split 2 columnas: panel izquierdo con gradiente naranja, branding, círculos decorativos y texto; panel derecho con formulario.
- [x] El formulario de login muestra campos EMAIL y CONTRASEÑA, link "¿Olvidaste tu contraseña?" y botón "Iniciar sesión" con gradiente.
- [x] NO hay botones de selección de rol (Personal/Familia) en la pantalla de login.
- [x] Link "Activá tu cuenta" en login apunta a `/activar-cuenta`.
- [x] `/activar-cuenta` renderiza layout centrado con logo, título "Bienvenida a OpenDayCare", tarjeta del niño invitado (M, Mateo · Sala Soles).
- [x] Los campos de activación muestran: código `7K4P9`, email `lucia.fernandez@gmail.com`, campo de contraseña, checkbox de autorización de fotos marcado.
- [x] Botón "Activar mi cuenta" con gradiente y sombra correcta.
- [x] Link "Iniciar sesión" en activación apunta a `/login`.
- [ ] Ambas páginas son standalone: sin sidebar, sin MobileNav, fondo `#FBF4EC`.
- [x] Las fuentes Fredoka y Nunito se aplican correctamente (heredadas del layout raíz).
- [x] Colores, espaciados y tipografía coinciden con los mockups.
- [x] Sin errores en consola; `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan.

## Decisions

- **Sí:** layout de grupo `(auth)` con su propio `layout.tsx` sin nav — mantiene las pantallas de autenticación completamente desacopladas del resto de la app.
- **Sí:** datos mock inline en cada página — son valores estáticos fijos, no justifican un archivo de datos separado.
- **Sí:** Tailwind CSS v4 con hex exactos del mockup — consistencia con las specs anteriores.
- **No:** botones de rol Personal/Familia — el usuario los descartó explícitamente.
- **No:** lógica de autenticación, validación de inputs ni conexión a API — solo UI visual.
- **No:** archivo `lib/auth-data.ts` — los datos son inline y estáticos.
- **Sí:** rutas `/login` y `/activar-cuenta` bajo `(auth)` — preparado para futura integración de auth sin reubicar archivos.
- **No:** inline styles — el mockup usa inline styles pero el proyecto usa Tailwind.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| El gradiente CSS puede no replicar exactamente el gradiente lineal del mockup | Usar `bg-gradient-to-br` con los colores exactos y verificar visualmente; ajustar dirección si es necesario. |
| Los círculos decorativos del panel de login pueden verse diferentes en distintos viewports | Usar tamaños fijos en px del mockup y position absolute; verificar en 1280px y 1920px. |
| El layout split puede no verse bien en pantallas muy pequeñas | Las pantallas de auth típicamente se ven en desktop; en mobile muy pequeño, el panel izquierdo puede ocultarse o apilarse (decisión de UX futura). |

## What is **not** in this spec

- Autenticación real, sesiones, JWT, logout funcional.
- Selección de rol (Personal/Familia).
- Formulario de recuperación de contraseña.
- Validación de inputs, estados de error, loading.
- Conexión a API o base de datos.
- Responsive móvil dedicado para estas pantallas (por ahora van desktop-first).

Cada uno de esos puntos, si aterriza, va en su propia spec.
