export const NIVELES_MISIONES = {
  1: {
    titulo: '🌟 Nivel Principiante',
    descripcion: 'Tus primeros pasos en el mundo financiero',
    misiones: [
      {
        id: 1,
        titulo: '🎯 Armar mi fondo de emergencia',
        descripcion: 'Tu primer paso hacia la libertad financiera. Ahorrá $100 en tu fondo de emergencia.',
        recompensaXP: 100,
        recompensaMonedas: 25,
        categoria: 'ahorro',
        dificultad: 'principiante',
        requisito: { tipo: 'ahorro', cantidad: 100 },
        progreso: { actual: 0, meta: 100 },
        completada: false
      },
      {
        id: 2,
        titulo: '📚 Aprender sobre interés compuesto',
        descripcion: 'Completá el minijuego educativo sobre la bola de nieve financiera.',
        recompensaXP: 50,
        recompensaMonedas: 10,
        categoria: 'educacion',
        dificultad: 'principiante',
        requisito: { tipo: 'minijuego', minijuego: 'interes_compuesto' },
        progreso: { actual: 0, meta: 1 },
        completada: false
      },
      {
        id: 3,
        titulo: '💳 Configurar mi primera tarjeta',
        descripcion: 'Activa tu tarjeta virtual y hacé tu primera compra segura.',
        recompensaXP: 75,
        recompensaMonedas: 15,
        categoria: 'cuentas',
        dificultad: 'principiante',
        requisito: { tipo: 'gasto', cantidad: 50 },
        progreso: { actual: 0, meta: 50 },
        completada: false
      },
      {
        id: 4,
        titulo: '💰 Primer depósito',
        descripcion: 'Realizá tu primer depósito de al menos $200 en tu cuenta.',
        recompensaXP: 60,
        recompensaMonedas: 12,
        categoria: 'ahorro',
        dificultad: 'principiante',
        requisito: { tipo: 'deposito', cantidad: 200 },
        progreso: { actual: 0, meta: 200 },
        completada: false
      }
    ],
    requisitoDesbloqueo: { nivel: 1 }
  },
  2: {
    titulo: '⚔️ Nivel Aventurero',
    descripcion: 'Comenzás a dominar las finanzas',
    misiones: [
      {
        id: 5,
        titulo: '🎯 Establecer una meta de ahorro',
        descripcion: 'Creá un apartado con un objetivo claro de $1000.',
        recompensaXP: 150,
        recompensaMonedas: 30,
        categoria: 'ahorro',
        dificultad: 'intermedio',
        requisito: { tipo: 'apartado', cantidad: 1000 },
        progreso: { actual: 0, meta: 1000 },
        completada: false
      },
      {
        id: 6,
        titulo: '🛒 Controlar gastos hormiga',
        descripcion: 'Reducí tus gastos hormiga a menos de $50 en una semana.',
        recompensaXP: 100,
        recompensaMonedas: 20,
        categoria: 'gastos',
        dificultad: 'intermedio',
        requisito: { tipo: 'gastoHormiga', maximo: 50 },
        progreso: { actual: 0, meta: 50 },
        completada: false
      },
      {
        id: 7,
        titulo: '📊 Descubrir mi perfil de inversor',
        descripcion: 'Completá el test y descubrí si sos conservador, moderado o agresivo.',
        recompensaXP: 80,
        recompensaMonedas: 20,
        categoria: 'inversion',
        dificultad: 'intermedio',
        requisito: { tipo: 'test', test: 'perfil_inversor' },
        progreso: { actual: 0, meta: 1 },
        completada: false
      },
      {
        id: 8,
        titulo: '💵 Ahorro automático',
        descripcion: 'Activá el redondeo automático de compras.',
        recompensaXP: 70,
        recompensaMonedas: 15,
        categoria: 'ahorro',
        dificultad: 'intermedio',
        requisito: { tipo: 'activar', feature: 'redondeo' },
        progreso: { actual: 0, meta: 1 },
        completada: false
      }
    ],
    requisitoDesbloqueo: { misionesCompletadas: 3, nivel: 1 }
  },
  3: {
    titulo: '🏆 Nivel Experto',
    descripcion: 'Las ligas mayores te esperan',
    misiones: [
      {
        id: 9,
        titulo: '📈 Primera inversión',
        descripcion: 'Invertí al menos $100 en un ETF o Robo-advisor.',
        recompensaXP: 200,
        recompensaMonedas: 50,
        categoria: 'inversion',
        dificultad: 'avanzado',
        requisito: { tipo: 'inversion', cantidad: 100 },
        progreso: { actual: 0, meta: 100 },
        completada: false
      },
      {
        id: 10,
        titulo: '🛡️ Fondo de emergencia completo',
        descripcion: 'Alcanzá $3000 en tu fondo de emergencia (3 meses de gastos).',
        recompensaXP: 300,
        recompensaMonedas: 75,
        categoria: 'ahorro',
        dificultad: 'avanzado',
        requisito: { tipo: 'ahorro', cantidad: 3000 },
        progreso: { actual: 0, meta: 3000 },
        completada: false
      },
      {
        id: 11,
        titulo: '🎮 Completar todos los minijuegos',
        descripcion: 'Dominá los 5 minijuegos educativos.',
        recompensaXP: 150,
        recompensaMonedas: 40,
        categoria: 'educacion',
        dificultad: 'avanzado',
        requisito: { tipo: 'minijuego', minijuego: 'todos', cantidad: 5 },
        progreso: { actual: 0, meta: 5 },
        completada: false
      },
      {
        id: 12,
        titulo: '💎 Diversificación maestra',
        descripcion: 'Tené inversiones en al menos 3 productos diferentes.',
        recompensaXP: 250,
        recompensaMonedas: 60,
        categoria: 'inversion',
        dificultad: 'avanzado',
        requisito: { tipo: 'diversificacion', cantidad: 3 },
        progreso: { actual: 0, meta: 3 },
        completada: false
      }
    ],
    requisitoDesbloqueo: { misionesCompletadas: 6, nivel: 2 }
  },
  4: {
    titulo: '👑 Nivel Leyenda',
    descripcion: 'Maestro de las finanzas',
    misiones: [
      {
        id: 13,
        titulo: '🏦 Independencia financiera',
        descripcion: 'Alcanzá $10,000 en patrimonio total (ahorro + inversión).',
        recompensaXP: 500,
        recompensaMonedas: 150,
        categoria: 'ahorro',
        dificultad: 'experto',
        requisito: { tipo: 'patrimonio', cantidad: 10000 },
        progreso: { actual: 0, meta: 10000 },
        completada: false
      },
      {
        id: 14,
        titulo: '🔥 Racha de 30 días',
        descripcion: 'Mantené una racha de 30 días consecutivos de ahorro.',
        recompensaXP: 400,
        recompensaMonedas: 100,
        categoria: 'racha',
        dificultad: 'experto',
        requisito: { tipo: 'racha', dias: 30 },
        progreso: { actual: 0, meta: 30 },
        completada: false
      },
      {
        id: 15,
        titulo: '🎓 Mentor financiero',
        descripcion: 'Completá todas las misiones de niveles anteriores.',
        recompensaXP: 600,
        recompensaMonedas: 200,
        categoria: 'logro',
        dificultad: 'experto',
        requisito: { tipo: 'todasMisiones', cantidad: 12 },
        progreso: { actual: 0, meta: 12 },
        completada: false
      }
    ],
    requisitoDesbloqueo: { misionesCompletadas: 10, nivel: 3 }
  }
}

export const INSIGNIAS = [
  { id: 'pionero', nombre: '🏆 Pionero', descripcion: 'Completó su primera misión', requisito: { misionesCompletadas: 1 } },
  { id: 'ahorrador', nombre: '💰 Ahorrador', descripcion: 'Ahorró $500 en fondo de emergencia', requisito: { ahorro: 500 } },
  { id: 'inversor', nombre: '📈 Inversor', descripcion: 'Hizo su primera inversión', requisito: { inversion: 1 } },
  { id: 'racha7', nombre: '🔥 Racha de 7 días', descripcion: 'Mantuvo 7 días consecutivos', requisito: { racha: 7 } },
  { id: 'racha30', nombre: '🔥🔥 Racha de 30 días', descripcion: 'Mantuvo 30 días consecutivos', requisito: { racha: 30 } },
  { id: 'maestro', nombre: '🎓 Maestro Financiero', descripcion: 'Completó todas las misiones', requisito: { misionesCompletadas: 15 } },
  { id: 'millonario', nombre: '💎 Millonario', descripcion: 'Alcanzó $10,000 de patrimonio', requisito: { patrimonio: 10000 } }
]

export const MEJORAS = [
  {
    id: 'cashback',
    nombre: '💳 Cashback Premium',
    descripcion: 'Obtené 2% de cashback en todas tus compras',
    costo: 200,
    tipo: 'pasiva',
    beneficio: { cashback: 0.02 }
  },
  {
    id: 'rendimiento_plus',
    nombre: '📈 Rendimiento Plus',
    descripcion: '+2% de rendimiento en tu cuenta remunerada',
    costo: 300,
    tipo: 'pasiva',
    beneficio: { rendimientoExtra: 0.02 }
  },
  {
    id: 'ahorro_auto',
    nombre: '🤖 Ahorro Automático',
    descripcion: 'Ahorra 5% de cada depósito automáticamente',
    costo: 150,
    tipo: 'activa',
    beneficio: { ahorroAutomatico: 0.05 }
  },
  {
    id: 'xp_boost',
    nombre: '⚡ XP Boost',
    descripcion: '+25% de XP por todas las misiones (7 días)',
    costo: 100,
    tipo: 'temporal',
    duracion: 7,
    beneficio: { xpBoost: 0.25 }
  },
  {
    id: 'seguro',
    nombre: '🛡️ Seguro de Protección',
    descripcion: 'Protege tu racha si fallas un día',
    costo: 50,
    tipo: 'consumible',
    beneficio: { protegerRacha: true }
  }
]
