---
name: spec-verifier
description: Verifica criterios de aceptación de specs contra código implementado y mockups visuales. Usa Context7 para Next.js y Playwright MCP para verificación visual.
---

# /spec-verifier — Verificador de criterios de aceptación

## Session context

Specs disponibles:
!`ls specs/ 2>/dev/null || echo "No hay specs disponibles"`

---

## Instructions

Este skill verifica que los criterios de aceptación de un spec se cumplan. Sigue estas fases en orden estricto.

---

### Fase 1 — Cargar contexto

1. Si `$ARGUMENTS` está vacío, lista los specs disponibles y pide al usuario que especifique cuál verificar.
2. Localiza el archivo del spec en `specs/`. Acepta número (`01`), slug (`feed-home`) o nombre completo (`01-feed-home`).
3. Lee el spec completo y extrae:
   - El **estado** actual (solo verificar si es `Approved`/`Aprobado`)
   - Los **Acceptance criteria** (sección `## Acceptance criteria` o `## Criterios de aceptación`)
   - Los **archivos referenciados** en el data model y implementation plan
   - Las **rutas** mencionadas (ej: `/`, `/ninos`, `/avisos`)
4. Si el estado NO es Approved/Aprobado, muestra error y detente.

**Error si no está aprobado:**
```
❌ No puedo verificar este spec.

Estado actual: [ESTADO ENCONTRADO]
Solo verifico specs en estado "Approved" / "Aprobado".

Opciones:
  1. Cambia el estado a "Approved" manualmente si el spec está listo
  2. Usa /spec [nombre] para continuar trabajando en él
```

---

### Fase 2 — Verificar criterios de código

Para cada criterio que involucre compilación, tipos o errores:

1. **Tipocheck**: ejecuta `npx tsc --noEmit`
   - Guarda el resultado (éxito/fallo + mensajes de error)

2. **Lint**: ejecuta `npm run lint`
   - Guarda el resultado

3. **Build**: ejecuta `npm run build`
   - Guarda el resultado

4. **Existencia de archivos**: verifica que los archivos mencionados en el spec existan:
   - Usa `Glob` para buscar archivos del data model
   - Usa `Grep` para verificar que funciones/componentes estén definidos

5. **Código fuente**: lee los archivos relevantes y verifica que:
   - Los componentes/funciones mencionados existan
   - Los tipos de datos coincidan con el spec
   - Las rutas estén configuradas correctamente

---

### Fase 3 — Verificar con Context7

Para criterios que involucren uso de Next.js, React, Tailwind o librerías:

1. Usa `resolve-library-id` para obtener el ID de la librería:
   - `next.js` → `/vercel/next.js`
   - `react` → `/facebook/react`
   - `tailwindcss` → `/tailwindlabs/tailwindcss`

2. Usa `query-docs` con consultas específicas:
   - "App Router layout props"
   - "Server Components vs Client Components"
   - "next/font/google configuration"
   - "Tailwind CSS v4 configuration"

3. Compara el código implementado contra las mejores prácticas documentadas
4. Documenta cualquier desviación encontrada

---

### Fase 4 — Verificación visual con Playwright

Para criterios de UI/visual (comparación con mockups):

1. **Preparar el entorno**:
   - Asegúrate de que `npm run dev` esté corriendo (o inícialo)
   - Identifica la ruta a verificar

2. **Navegar con Playwright**:
   - Usa `playwright_browser_navigate` para ir a la ruta
   - Usa `playwright_browser_snapshot` para capturar el estado actual

3. **Tomar screenshot**:
   - Usa `playwright_browser_take_screenshot` con `scale: "css"`
   - Guarda en `.playwright-mcp/` con nombre descriptivo

4. **Comparar con mockup**:
   - Localiza el screenshot de referencia en `references/screenshots/`
   - Usa el modelo con visión para comparar:
     - Colores (fondo, texto, bordes)
     - Tipografía (tamaño, peso, familia)
     - Espaciados y layout
     - Contenido (textos, badges, contadores)

5. **Documentar diferencias**:
   - Lista cada diferencia encontrada
   - Clasifica por severidad (crítica, menor, cosmética)

**Para verificar responsive**:
- Desktop: viewport ~1280px
- Móvil: viewport ~390px
- Verificar hamburger menu, drawer, FAB según el spec

---

### Fase 5 — Marcar y reportar

1. **Marcar checks en el spec**:
   - Lee la sección `## Acceptance criteria`
   - Cambia `[ ]` por `[x]` para criterios que pasaron
   - Deja `[ ]` para criterios que fallaron
   - Usa `Edit` para actualizar el archivo

2. **Generar reporte final**:

```
📋 REPORTE DE VERIFICACIÓN — SPEC [NN-slug]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ APROBADOS (N):
  - [x] Criterio 1
  - [x] Criterio 2

❌ FALLIDOS (N):
  - [ ] Criterio 3
    Razón: [detalle del error]
    Archivo: [path:linea]

⚠️ NO VERIFICABLES (N):
  - [ ] Criterio 4
    Razón: Requiere verificación manual

📊 RESUMEN:
  Total: N criterios
  Aprobados: N (XX%)
  Fallidos: N (XX%)
  No verificables: N (XX%)

🔗 COMANDOS ÚTILES:
  npx tsc --noEmit     → Verificar tipos
  npm run lint         → Verificar lint
  npm run build        → Verificar build
  npm run dev          → Iniciar servidor de desarrollo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Anti-patterns a evitar

- ❌ No asumas que un criterio pasa sin verificarlo
- ❌ No marques `[x]` si hay dudas
- ❌ No ignores criterios "no verificables" — documéntalos
- ❌ No modifiques el spec más allá de marcar los checks
- ❌ No ejecutes `npm run dev` sin verificar que el directorio es correcto

## Reglas de comportamiento

- Tu trabajo es **verificar**, no **implementar**
- Si encuentras un bug, repórtalo pero no lo corrijas
- Si un criterio es ambiguo, márcalo como "no verificable" y explica por qué
- Siempre genera el reporte final
- Los screenshots se guardan en `.playwright-mcp/`, nunca en otras carpetas

## Arguments

`$ARGUMENTS` es el **nombre o número del spec** a verificar. Si está vacío, lista los specs disponibles y pide al usuario que especifique.
