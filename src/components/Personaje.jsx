import { ARMAS } from '../data/armas'

const PALETAS = {
  marron: {
    cuerpo: '#8b6914',
    borde: '#5c4a0f',
    detalle: '#6b5412'
  },
  madera_oscura: {
    cuerpo: '#5c4a0f',
    borde: '#3d2f0a',
    detalle: '#4a3d0c'
  },
  hierro: {
    cuerpo: '#7a7a7a',
    borde: '#4a4a4a',
    detalle: '#5a5a5a'
  },
  fuego: {
    cuerpo: '#ff6b35',
    borde: '#8b0000',
    detalle: '#ffa500'
  },
  oro: {
    cuerpo: '#ffd700',
    borde: '#b8860b',
    detalle: '#fff8dc'
  },
  tunica_rota: {
    cuerpo: '#8b7355',
    borde: '#5c4a2f',
    detalle: '#a08060'
  },
  armadura_cuero: {
    cuerpo: '#8b4513',
    borde: '#5c2e0a',
    detalle: '#a0522d'
  }
}

function Personaje({ equipo, apariencia, nivel = 1, tamanho = 'normal' }) {
  const arma = ARMAS.find(a => a.id === equipo?.arma) || ARMAS[0]
  const coloresArma = PALETAS[arma.colores.paleta] || PALETAS.marron
  
  const tamanoSvg = tamanho === 'grande' ? 200 : tamanho === 'chico' ? 80 : 120

  return (
    <svg 
      width={tamanoSvg} 
      height={tamanoSvg} 
      viewBox="0 0 64 64" 
      style={{ imageRendering: 'pixelated' }}
    >
      <defs>
        <pattern id="pixelPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="#222" />
          <rect x="2" y="2" width="2" height="2" fill="#222" />
          <rect x="2" width="2" height="2" fill="#333" />
          <rect y="2" width="2" height="2" fill="#333" />
        </pattern>
      </defs>

      <rect width="64" height="64" fill="transparent" />

      <g className="cuerpo">
        <rect x="24" y="28" width="16" height="20" fill={apariencia?.ropa || '#8b7355'} />
        <rect x="24" y="28" width="2" height="20" fill="#6b5a45" />
        <rect x="38" y="28" width="2" height="20" fill="#a09070" />
      </g>

      <g className="piernas">
        <rect x="26" y="46" width="4" height="10" fill="#4a3728" />
        <rect x="34" y="46" width="4" height="10" fill="#5a4738" />
      </g>

      <g className="cabeza">
        <rect x="22" y="12" width="20" height="18" fill={apariencia?.piel || '#f5c6a1'} />
        <rect x="22" y="12" width="20" height="4" fill="#e0b090" />
        <rect x="26" y="18" width="4" height="4" fill="#222" />
        <rect x="34" y="18" width="4" height="4" fill="#222" />
        <rect x="26" y="19" width="1" height="2" fill="#fff" />
        <rect x="35" y="19" width="1" height="2" fill="#fff" />
        <rect x="28" y="26" width="8" height="2" fill="#cc8888" />
        <path 
          d="M20 14 L22 8 L24 12 L26 6 L28 12 L30 6 L32 12 L34 6 L36 12 L38 8 L40 14" 
          fill={apariencia?.cabello || '#4a3728'} 
        />
      </g>

      <g className="brazo-derecho">
        <rect x="16" y="28" width="6" height="16" fill={apariencia?.piel || '#f5c6a1'} />
        <rect x="14" y="38" width="8" height="8" fill={coloresArma.cuerpo} />
        <rect x="14" y="38" width="8" height="2" fill={coloresArma.borde} />
        <rect x="14" y="40" width="2" height="4" fill={coloresArma.borde} />
        <rect x="20" y="40" width="2" height="4" fill={coloresArma.borde} />
        {arma.id !== 'palo_madera' && (
          <>
            <rect x="12" y="32" width="2" height="14" fill={coloresArma.detalle} />
          </>
        )}
      </g>

      <g className="brazo-izquierdo">
        <rect x="42" y="28" width="6" height="16" fill={apariencia?.piel || '#f5c6a1'} />
        <rect x="42" y="36" width="4" height="4" fill={apariencia?.piel || '#f5c6a1'} />
      </g>

      {arma.id !== 'palo_madera' && (
        <g className="espada">
          <rect x="48" y="24" width="3" height="24" fill={coloresArma.cuerpo} />
          <rect x="48" y="24" width="1" height="24" fill={coloresArma.detalle} />
          <rect x="46" y="48" width="7" height="2" fill={coloresArma.borde} />
        </g>
      )}

      {arma.id === 'palo_madera' && (
        <g className="palo">
          <rect x="48" y="26" width="2" height="20" fill={PALETAS.marron.cuerpo} />
          <rect x="48" y="26" width="1" height="20" fill={PALETAS.marron.detalle} />
          <rect x="47" y="24" width="2" height="4" fill={PALETAS.marron.borde} />
        </g>
      )}

      {arma.id.includes('lamina') && (
        <g className="efecto-fuego">
          <ellipse cx="50" cy="22" rx="4" ry="6" fill="#ff6b35" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="0.5s" repeatCount="indefinite" />
            <animate attributeName="ry" values="6;4;6" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
      )}

      {arma.id === 'excalibur' && (
        <g className="efecto-brillo">
          <circle cx="32" cy="20" r="20" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  )
}

export default Personaje