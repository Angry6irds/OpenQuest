# OpenQuest - Tu aventura financiera

Un juego de RPG financiero donde gestionas tu dinero mientras completas misiones, evolucionas tu personaje y aprendes sobre finanzas personales.

## Estado del proyecto

- **Repositorio**: https://github.com/Angry6irds/OpenQuest
- **GitHub Pages**: https://angry6irds.github.io/OpenQuest/
- **Estado**: Desplegado y funcionando

## Estructura del proyecto

```
OpenQuest/
├── docs/                    # Build para GitHub Pages
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Misiones.jsx
│   │   ├── Cuentas.jsx
│   │   ├── Ahorro.jsx
│   │   ├── Inversion.jsx
│   │   ├── Tienda.jsx
│   │   ├── MiniJuegos.jsx
│   │   ├── Login.jsx
│   │   ├── Registro.jsx
│   │   ├── Personaje.jsx
│   │   └── PersonajePanel.jsx
│   ├── hooks/
│   │   └── usePersistencia.jsx
│   ├── data/
│   │   ├── misiones.js
│   │   └── armas.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html              # Desarrollo (no usado en producción)
```

## Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview local
npm run preview
```

## Cambios realizados durante la sesión

### 1. Estructura inicial
- El proyecto tenía `package.json` en `docs/` en lugar de la raíz
- Los archivos fuente (`src/`) estaban en `docs/src/`

### 2. Conflictos de merge resueltos
Se resolvieron conflictos de merge (marcadores `<<<<<<< HEAD`, `=======`, `>>>>>>> origin/main`) en:
- `src/App.jsx` - imports duplicados y lógica de XP
- `src/hooks/usePersistencia.jsx` - estado inicial y configuración de sesión

### 3. Errores de require() corregidos
- `src/components/Login.jsx` usaba `require()` que no funciona con ES modules
- `src/components/Registro.jsx` lo mismo
- Ambos corregidos a imports estáticos

### 4. Extensión de archivo corregida
- `usePersistencia.js` rename a `.jsx` para que Vite lo procese correctamente

### 5. GitHub Pages配置
- `vite.config.js` configurado con:
  - `base: './'` para rutas relativas
  - `build.outDir: 'docs'` para buildear directamente a `docs/`

### 6. HTML corregido
- Eliminado el favicon que no existía (`/vite.svg`)
- index.html en raíz eliminado para evitar conflictos

### 7. CSS agregado
- Estilos del personaje-panel (modal, animaciones) agregados a `src/App.css`

## Configuración de GitHub Pages

1. **Settings > Pages**
2. **Source**: "Deploy from a branch"
3. **Branch**: `main`
4. **Folder**: `/docs`

## Tecnologías

- **React 18.3.1**
- **Vite 6.0.1**
- **Sin backend** (todo en localStorage)

## Características

- Sistema de misiones con recompensas XP y monedas
- Gestión de cuentas y ahorros
- Inversión financiera
- Tienda con mejoras
- Minijuegos (Quiz, Memory, Presupuesto)
- Personalización de personaje
- Persistencia local

## Licencia

MIT