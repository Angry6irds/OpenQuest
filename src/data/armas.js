export const ARMAS = [
  {
    id: 'palo_madera',
    nombre: 'Palo de Madera',
    nivelRequerido: 1,
    dano: 1,
    evolucionDe: null,
    descripcion: 'Un simple palo de madera. Mejor que nada.',
    rarity: 'comun',
    colores: { paleta: 'marron' }
  },
  {
    id: 'baston_robusto',
    nombre: 'Bastón Robusto',
    nivelRequerido: 3,
    dano: 2,
    evolucionDe: 'palo_madera',
    descripcion: 'Un bastón más resistente. Algo es algo.',
    rarity: 'comun',
    colores: { paleta: 'madera_oscura' }
  },
  {
    id: 'espada_romana',
    nombre: 'Espada del Aventurero',
    nivelRequerido: 5,
    dano: 3,
    evolucionDe: 'baston_robusto',
    descripcion: 'Una espada básica forjada por herreros locales.',
    rarity: 'poco_comun',
    colores: { paleta: 'hierro' }
  },
  {
    id: 'lamina_legendaria',
    name: 'Lámina de Llamas',
    nivelRequerido: 8,
    dano: 5,
    evolucionDe: 'espada_romana',
    descripcion: 'Una espada envuelta en llamas eternas.',
    rarity: 'epico',
    colores: { paleta: 'fuego' }
  },
  {
    id: 'excalibur',
    nombre: 'Excalibur',
    nivelRequerido: 10,
    dano: 10,
    evolucionDe: 'lamina_legendaria',
    descripcion: 'La espada legendaria de los reyes.',
    rarity: 'legendario',
    colores: { paleta: 'oro' }
  }
]

export const EVOLUCION_ARMA = {
  'palo_madera': 'baston_robusto',
  'baston_robusto': 'espada_romana',
  'espada_romana': 'lamina_legendaria',
  'lamina_legendaria': 'excalibur'
}

export const obtenerSiguienteEvolucion = (armaIdActual) => {
  return ARMAS.find(a => a.id === EVOLUCION_ARMA[armaIdActual]) || null
}

export const puedeEvolucionar = (armaActual, nivel) => {
  const siguiente = obtenerSiguienteEvolucion(armaActual)
  return siguiente && nivel >= siguiente.nivelRequerido
}