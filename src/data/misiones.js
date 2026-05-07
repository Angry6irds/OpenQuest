export const NIVELES_MISIONES = {
  1: {
    titulo: '🌟 Nivel Principiante',
    descripcion: 'Aprende los basics de OpenBank',
    xpParaDesbloquear: 50,
    requisitoDesbloqueo: { nivel: 1, misionesCompletadas: 0 },
    misiones: [
      {
        id: 1,
        titulo: 'Primera Encuesta',
        descripcion: 'Responde 5 preguntas sobre OpenBank',
        recompensaXP: 30,
        recompensaMonedas: 10,
        categoria: 'educacion',
        dificultad: 'facil',
        requisito: { tipo: 'encuesta', cantidad: 1 }
      },
      {
        id: 2,
        titulo: 'Referir Amigo',
        descripcion: 'Invita a un amigo a usar OpenBank',
        recompensaXP: 25,
        recompensaMonedas: 8,
        categoria: 'referido',
        dificultad: 'facil',
        requisito: { tipo: 'referido', cantidad: 1 }
      },
      {
        id: 3,
        titulo: 'Ver Tutorial',
        descripcion: 'Aprende a usar la app',
        recompensaXP: 20,
        recompensaMonedas: 5,
        categoria: 'educacion',
        dificultad: 'facil',
        requisito: { tipo: 'tutorial', cantidad: 1 }
      },
      {
        id: 4,
        titulo: 'Ahorro Inicial',
        descripcion: 'Ahorra tus primeros $25',
        recompensaXP: 35,
        recompensaMonedas: 12,
        categoria: 'ahorro',
        dificultad: 'facil',
        requisito: { tipo: 'ahorro', cantidad: 25 }
      }
    ]
  },
  2: {
    titulo: '🏃 Nivel Corredor',
    descripcion: 'Conviertete en un ahorrador activo',
    xpParaDesbloquear: 150,
    requisitoDesbloqueo: { nivel: 2, misionesCompletadas: 4 },
    misiones: [
      {
        id: 5,
        titulo: 'Umamusume: Crea tu cuenta',
        descripcion: 'Registrate en OpenBank y obten tu tarjeta virtual',
        recompensaXP: 50,
        recompensaMonedas: 15,
        categoria: 'cuenta',
        dificultad: 'facil',
        requisito: { tipo: 'crearCuenta', cantidad: 1 }
      },
      {
        id: 6,
        titulo: 'Meta de Ahorro',
        descripcion: 'Alcanza $100 en ahorro',
        recompensaXP: 60,
        recompensaMonedas: 20,
        categoria: 'ahorro',
        dificultad: 'medio',
        requisito: { tipo: 'ahorro', cantidad: 100 }
      },
      {
        id: 7,
        titulo: 'Trivia Umamusume',
        descripcion: 'Responde correctamente 3 preguntas sobre caballos de carreras',
        recompensaXP: 45,
        recompensaMonedas: 12,
        categoria: 'educacion',
        dificultad: 'medio',
        requisito: { tipo: 'trivia', cantidad: 3 }
      },
      {
        id: 8,
        titulo: 'PrimerDeposito',
        descripcion: 'Deposita $50 en tu cuenta',
        recompensaXP: 40,
        recompensaMonedas: 10,
        categoria: 'deposito',
        dificultad: 'facil',
        requisito: { tipo: 'deposito', cantidad: 50 }
      }
    ]
  },
  3: {
    titulo: '🐴 Nivel Jockey',
    descripcion: 'Domina las finanzas como un jockey',
    xpParaDesbloquear: 400,
    requisitoDesbloqueo: { nivel: 3, misionesCompletadas: 8 },
    misiones: [
      {
        id: 9,
        titulo: 'Fondo de Emergencia',
        descripcion: 'Ahorra $500 para emergencias',
        recompensaXP: 100,
        recompensaMonedas: 30,
        categoria: 'ahorro',
        dificultad: 'medio',
        requisito: { tipo: 'ahorro', cantidad: 500 }
      },
      {
        id: 10,
        titulo: 'Umamusume: Apostar Sabio',
        descripcion: 'Conoce los tipos de apuestas en carreras',
        recompensaXP: 80,
        recompensaMonedas: 25,
        categoria: 'educacion',
        dificultad: 'medio',
        requisito: { tipo: 'trivia', cantidad: 5 }
      },
      {
        id: 11,
        titulo: 'Multiples Referidos',
        descripcion: 'Referi a 3 amigos',
        recompensaXP: 90,
        recompensaMonedas: 28,
        categoria: 'referido',
        dificultad: 'medio',
        requisito: { tipo: 'referido', cantidad: 3 }
      },
      {
        id: 12,
        titulo: 'Gastos Controlados',
        descripcion: 'Mantene tus gastos debajo de $100',
        recompensaXP: 70,
        recompensaMonedas: 20,
        categoria: 'control',
        dificultad: 'medio',
        requisito: { tipo: 'controlGastos', cantidad: 100 }
      }
    ]
  },
  4: {
    titulo: '🏇 Nivel Montador',
    descripcion: 'Es hora de invertir',
    xpParaDesbloquear: 1000,
    requisitoDesbloqueo: { nivel: 4, misionesCompletadas: 12 },
    misiones: [
      {
        id: 13,
        titulo: 'Primera Inversion',
        descripcion: 'Invierte $100 en un fondo',
        recompensaXP: 150,
        recompensaMonedas: 40,
        categoria: 'inversion',
        dificultad: 'dificil',
        requisito: { tipo: 'inversion', cantidad: 100 }
      },
      {
        id: 14,
        titulo: 'Diversificacion',
        descripcion: 'Abre 2 cuentas distintas',
        recompensaXP: 120,
        recompensaMonedas: 35,
        categoria: 'cuenta',
        dificultad: 'dificil',
        requisito: { tipo: 'multiplesCuentas', cantidad: 2 }
      },
      {
        id: 15,
        titulo: 'Umamusume: Master',
        descripcion: 'Responde 7 preguntas sobre Umamusume',
        recompensaXP: 130,
        recompensaMonedas: 38,
        categoria: 'educacion',
        dificultad: 'dificil',
        requisito: { tipo: 'trivia', cantidad: 7 }
      },
      {
        id: 16,
        titulo: 'Ahorro Milagroso',
        descripcion: 'Llega a $1000 en ahorro',
        recompensaXP: 140,
        recompensaMonedas: 42,
        categoria: 'ahorro',
        dificultad: 'dificil',
        requisito: { tipo: 'ahorro', cantidad: 1000 }
      }
    ]
  },
  5: {
    titulo: '👑 Nivel Champion',
    descripcion: 'Conquista las inversiones',
    xpParaDesbloquear: 2500,
    requisitoDesbloqueo: { nivel: 5, MisionesCompletadas: 16 },
    misiones: [
      {
        id: 17,
        titulo: 'Inversion Major',
        descripcion: 'Invierte $500 en ETF',
        recompensaXP: 200,
        recompensaMonedas: 50,
        categoria: 'inversion',
        dificultad: 'muy_dificil',
        requisito: { tipo: 'inversion', cantidad: 500 }
      },
      {
        id: 18,
        titulo: 'Racha de Ahorro',
        descripcion: 'Ahorra por 7 dias consecutivos',
        recompensaXP: 180,
        recompensaMonedas: 45,
        categoria: 'racha',
        dificultad: 'muy_dificil',
        requisito: { tipo: 'racha', cantidad: 7 }
      },
      {
        id: 19,
        titulo: 'Umamusume: Derby Winner',
        descripcion: 'Completa el quiz avanzado de caballos',
        recompensaXP: 220,
        recompensaMonedas: 55,
        categoria: 'educacion',
        dificultad: 'muy_dificil',
        requisito: { tipo: 'trivia', cantidad: 10 }
      },
      {
        id: 20,
        titulo: 'Patrimonio',
        descripcion: 'Alcanza $2000 en patrimonio total',
        recompensaXP: 250,
        recompensaMonedas: 60,
        categoria: 'patrimonio',
        dificultad: 'extremo',
        requisito: { tipo: 'patrimonio', cantidad: 2000 }
      }
    ]
  }
}

export const XP_PARA_SIGUIENTE_NIVEL = {
  1: 50,
  2: 100,
  3: 250,
  4: 600,
  5: 1500,
  6: 3500,
  7: 8000,
  8: 18000,
  9: 40000,
  10: 90000
}

export const INSIGNIAS = [
  { id: 'pionero', nombre: 'Pionero', descripcion: 'Completaste tu primera mision', requisito: 1 },
  { id: 'primer_paso', nombre: 'Primer Paso', descripcion: 'Completaste nivel 1', requisito: 4 },
  { id: 'ahorrador_100', nombre: 'Ahorrador 100', descripcion: 'Ahorraste $100', requisito: 100 },
  { id: 'inversor', nombre: 'Inversor', descripcion: 'Hiciste tu primera inversion', requisito: 1 },
  { id: 'referidor', nombre: 'Referidor', descripcion: 'Referiste 3 amigos', requisito: 3 },
  { id: 'racha_7', nombre: 'Racha 7', descripcion: '7 dias de ahorro', requisito: 7 },
  { id: 'champion', nombre: 'Champion', descripcion: 'Llegaste al nivel 5', requisito: 5 }
]

export const MEJORAS = [
  { id: 'cashback', nombre: 'Cashback Premium', descripcion: '2% de cashback en compras', costo: 150, tipo: 'pasiva', beneficio: { cashback: 0.02 } },
  { id: 'ahorro_auto', nombre: 'Ahorro Automatico', descripcion: 'Ahorra 5% automatico', costo: 100, tipo: 'activa', beneficio: { ahorroAutomatico: 0.05 } },
  { id: 'xp_boost', nombre: 'XP Boost', descripcion: '+25% XP por 7 dias', costo: 80, tipo: 'temporal', duracion: 7, beneficio: { xpBoost: 0.25 } },
  { id: 'multiplicador', nombre: 'Multiplicador', descripcion: 'x2 ingresos de misiones', costo: 200, tipo: 'pasiva', beneficio: { multiplicador: 2 } },
  { id: 'seguro', nombre: 'Seguro', descripcion: 'Protege tu racha una vez', costo: 50, tipo: 'consumible', beneficio: { protegerRacha: true } }
]