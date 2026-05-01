import { useState, useEffect } from 'react'

const PREGUNTAS_QUIZ = [
  {
    pregunta: '¿Qué es un fondo de emergencia?',
    opciones: [
      'Dinero para invertir en bolsa',
      'Ahorro para cubrir 3-6 meses de gastos',
      'Dinero para vacaciones'
    ],
    correcta: 1
  },
  {
    pregunta: '¿Qué es el interés compuesto?',
    opciones: [
      'Interés solo sobre el capital inicial',
      'Interés sobre capital + intereses acumulados',
      'Una tarifa bancaria'
    ],
    correcta: 1
  },
  {
    pregunta: '¿Qué es la inflación?',
    opciones: [
      'Aumento general de precios en el tiempo',
      'Disminución de precios',
      'Una inversión de alto riesgo'
    ],
    correcta: 0
  },
  {
    pregunta: '¿Qué es un ETF?',
    opciones: [
      'Un tipo de tarjeta de crédito',
      'Fondo cotizado que sigue un índice',
      'Un préstamo bancario'
    ],
    correcta: 1
  },
  {
    pregunta: '¿Qué es la diversificación?',
    opciones: [
      'Invertir todo en una sola acción',
      'Distribuir inversiones para reducir riesgo',
      'Ahorrar solo en efectivo'
    ],
    correcta: 1
  }
]

const GASTOS_PRESUPUESTO = [
  { nombre: 'Alquiler', tipo: 'necesidad' },
  { nombre: 'Videojuegos', tipo: 'deseo' },
  { nombre: 'Comida supermercado', tipo: 'necesidad' },
  { nombre: 'Cena restaurante lujo', tipo: 'deseo' },
  { nombre: 'Medicamentos', tipo: 'necesidad' },
  { nombre: 'Suscripción streaming', tipo: 'deseo' },
  { nombre: 'Transporte trabajo', tipo: 'necesidad' },
  { nombre: 'Ropa de marca cara', tipo: 'deseo' },
  { nombre: 'Servicios básicos', tipo: 'necesidad' },
  { nombre: 'Salidas bar', tipo: 'deseo' }
]

function MiniJuegos({ jugador, agregarMonedas }) {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null)

  const juegos = [
    {
      id: 'quiz',
      nombre: '🧠 Quiz Financiero',
      descripcion: 'Responde preguntas de educación financiera',
      recompensa: '$10 por respuesta correcta',
      color: 'quiz'
    },
    {
      id: 'memory',
      nombre: '🃏 Memory de Monedas',
      descripcion: 'Encuentra los pares de cartas',
      recompensa: '$20 si completas en 20 movimientos o menos',
      color: 'memory'
    },
    {
      id: 'presupuesto',
      nombre: '⏱️ Presupuesto Challenge',
      descripcion: 'Clasifica gastos en Necesidad o Deseo',
      recompensa: '$5 por clasificación correcta',
      color: 'presupuesto'
    }
  ]

  if (juegoSeleccionado === 'quiz') {
    return <QuizFinanciero onVolver={() => setJuegoSeleccionado(null)} agregarMonedas={agregarMonedas} />
  }
  if (juegoSeleccionado === 'memory') {
    return <MemoryMonedas onVolver={() => setJuegoSeleccionado(null)} agregarMonedas={agregarMonedas} />
  }
  if (juegoSeleccionado === 'presupuesto') {
    return <PresupuestoChallenge onVolver={() => setJuegoSeleccionado(null)} agregarMonedas={agregarMonedas} />
  }

  return (
    <div className="minijuegos">
      <header className="minijuegos-header">
        <h2>🎮 Minijuegos</h2>
        <p className="subtitle">Gana monedas divirtiéndote</p>
        <div className="monedas-disponibles">
          <span className="moneda-icon">🪙</span>
          <span className="moneda-cantidad">{jugador.moneda}</span>
        </div>
      </header>

      <div className="juegos-grid">
        {juegos.map(juego => (
          <div key={juego.id} className={`juego-card ${juego.color}`}>
            <h3>{juego.nombre}</h3>
            <p>{juego.descripcion}</p>
            <p className="recompensa-info">💰 {juego.recompensa}</p>
            <button
              className="jugar-btn"
              onClick={() => setJuegoSeleccionado(juego.id)}
            >
              🎮 Jugar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuizFinanciero({ onVolver, agregarMonedas }) {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0)
  const [finalizado, setFinalizado] = useState(false)
  const [seleccionada, setSeleccionada] = useState(null)
  const [mostrandoResultado, setMostrandoResultado] = useState(false)

  const handleRespuesta = (indice) => {
    if (mostrandoResultado) return
    setSeleccionada(indice)
    setMostrandoResultado(true)

    const esCorrecta = indice === PREGUNTAS_QUIZ[preguntaActual].correcta
    if (esCorrecta) {
      setRespuestasCorrectas(prev => prev + 1)
      agregarMonedas(10)
    }

    setTimeout(() => {
      if (preguntaActual < PREGUNTAS_QUIZ.length - 1) {
        setPreguntaActual(prev => prev + 1)
        setSeleccionada(null)
        setMostrandoResultado(false)
      } else {
        setFinalizado(true)
      }
    }, 1500)
  }

  const reiniciar = () => {
    setPreguntaActual(0)
    setRespuestasCorrectas(0)
    setFinalizado(false)
    setSeleccionada(null)
    setMostrandoResultado(false)
  }

  if (finalizado) {
    return (
      <div className="minijuegos">
        <div className="resultado-card quiz">
          <h2>🎉 Quiz Completado!</h2>
          <p className="resultado-texto">
            Respondiste correctamente {respuestasCorrectas} de {PREGUNTAS_QUIZ.length} preguntas
          </p>
          <p className="recompensa-ganada">
            💰 Ganaste: ${respuestasCorrectas * 10}
          </p>
          <div className="resultado-actions">
            <button className="jugar-btn" onClick={reiniciar}>🔄 Jugar de nuevo</button>
            <button className="volver-btn" onClick={onVolver}>⬅️ Volver</button>
          </div>
        </div>
      </div>
    )
  }

  const pregunta = PREGUNTAS_QUIZ[preguntaActual]

  return (
    <div className="minijuegos">
      <div className="quiz-container">
        <div className="quiz-header">
          <button className="volver-btn-small" onClick={onVolver}>⬅️ Volver</button>
          <span className="quiz-progreso">
            Pregunta {preguntaActual + 1} de {PREGUNTAS_QUIZ.length}
          </span>
        </div>

        <div className="quiz-pregunta">
          <h3>{pregunta.pregunta}</h3>
        </div>

        <div className="quiz-opciones">
          {pregunta.opciones.map((opcion, idx) => {
            let clase = 'quiz-opcion'
            if (mostrandoResultado) {
              if (idx === pregunta.correcta) clase += ' correcta'
              if (idx === seleccionada && idx !== pregunta.correcta) clase += ' incorrecta'
            }
            return (
              <button
                key={idx}
                className={clase}
                onClick={() => handleRespuesta(idx)}
                disabled={mostrandoResultado}
              >
                {opcion}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MemoryMonedas({ onVolver, agregarMonedas }) {
  const [cartas, setCartas] = useState([])
  const [volteadas, setVolteadas] = useState([])
  const [encontrados, setEncontrados] = useState([])
  const [movimientos, setMovimientos] = useState(0)
  const [finalizado, setFinalizado] = useState(false)

  useEffect(() => {
    const iconos = ['🪙', '💰', '💎', '🏦', '📈', '💳', '🎯', '🏆']
    const pares = [...iconos, ...iconos]
    const barajadas = pares.sort(() => Math.random() - 0.5)
    setCartas(barajadas.map((icono, idx) => ({ id: idx, icono })))
  }, [])

  useEffect(() => {
    if (volteadas.length === 2) {
      const [idx1, idx2] = volteadas
      if (cartas[idx1]?.icono === cartas[idx2]?.icono) {
        setEncontrados(prev => [...prev, cartas[idx1].icono])
        setVolteadas([])
      } else {
        setTimeout(() => setVolteadas([]), 1000)
      }
      setMovimientos(prev => prev + 1)
    }
  }, [volteadas, cartas])

  useEffect(() => {
    if (encontrados.length === 8 && encontrados.length > 0) {
      setTimeout(() => {
        const recompensa = movimientos <= 20 ? 20 : movimientos <= 30 ? 10 : 5
        agregarMonedas(recompensa)
        setFinalizado(true)
      }, 500)
    }
  }, [encontrados, movimientos, agregarMonedas])

  const voltearCarta = (idx) => {
    if (volteadas.length >= 2 || volteadas.includes(idx) || encontrados.includes(cartas[idx]?.icono)) {
      return
    }
    setVolteadas(prev => [...prev, idx])
  }

  const reiniciar = () => {
    const iconos = ['🪙', '💰', '💎', '🏦', '📈', '💳', '🎯', '🏆']
    const pares = [...iconos, ...iconos]
    const barajadas = pares.sort(() => Math.random() - 0.5)
    setCartas(barajadas.map((icono, idx) => ({ id: idx, icono })))
    setVolteadas([])
    setEncontrados([])
    setMovimientos(0)
    setFinalizado(false)
  }

  if (finalizado) {
    const recompensa = movimientos <= 20 ? 20 : movimientos <= 30 ? 10 : 5
    return (
      <div className="minijuegos">
        <div className="resultado-card memory">
          <h2>🎉 ¡Memoria Completa!</h2>
          <p className="resultado-texto">
            Completaste en {movimientos} movimientos
          </p>
          <p className="recompensa-ganada">
            💰 Ganaste: ${recompensa}
          </p>
          <div className="resultado-actions">
            <button className="jugar-btn" onClick={reiniciar}>🔄 Jugar de nuevo</button>
            <button className="volver-btn" onClick={onVolver}>⬅️ Volver</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="minijuegos">
      <div className="memory-container">
        <div className="memory-header">
          <button className="volver-btn-small" onClick={onVolver}>⬅️ Volver</button>
          <div className="memory-stats">
            <span>Movimientos: {movimientos}</span>
            <span>Pares: {encontrados.length}/8</span>
          </div>
        </div>

        <div className="memory-grid">
          {cartas.map((carta, idx) => (
            <button
              key={carta.id}
              className={`memory-card ${volteadas.includes(idx) || encontrados.includes(carta.icono) ? 'volteada' : ''}`}
              onClick={() => voltearCarta(idx)}
              disabled={volteadas.length >= 2 || volteadas.includes(idx) || encontrados.includes(carta.icono)}
            >
              {volteadas.includes(idx) || encontrados.includes(carta.icono) ? carta.icono : '❓'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PresupuestoChallenge({ onVolver, agregarMonedas }) {
  const [gastoActual, setGastoActual] = useState(0)
  const [correctos, setCorrectos] = useState(0)
  const [finalizado, setFinalizado] = useState(false)
  const [tiempo, setTiempo] = useState(30)
  const [jugando, setJugando] = useState(false)

  useEffect(() => {
    let intervalo
    if (jugando && tiempo > 0 && !finalizado) {
      intervalo = setInterval(() => {
        setTiempo(prev => prev - 1)
      }, 1000)
    } else if (tiempo === 0 && jugando) {
      setFinalizado(true)
      const recompensa = correctos * 5 + (correctos >= 9 ? 10 : 0)
      agregarMonedas(recompensa)
    }
    return () => clearInterval(intervalo)
  }, [jugando, tiempo, finalizado, correctos, agregarMonedas])

  const iniciarJuego = () => {
    setJugando(true)
    setGastoActual(0)
    setCorrectos(0)
    setTiempo(30)
  }

  const clasificar = (tipo) => {
    const esCorrecto = GASTOS_PRESUPUESTO[gastoActual].tipo === tipo
    if (esCorrecto) {
      setCorrectos(prev => prev + 1)
      agregarMonedas(5)
    }

    if (gastoActual < GASTOS_PRESUPUESTO.length - 1) {
      setGastoActual(prev => prev + 1)
    } else {
      setFinalizado(true)
      const bonus = correctos + (esCorrecto ? 1 : 0) >= 9 ? 10 : 0
      if (bonus > 0) agregarMonedas(bonus)
    }
  }

  const reiniciar = () => {
    setJugando(false)
    setGastoActual(0)
    setCorrectos(0)
    setTiempo(30)
    setFinalizado(false)
  }

  if (!jugando && !finalizado) {
    return (
      <div className="minijuegos">
        <div className="presupuesto-start">
          <h2>⏱️ Presupuesto Challenge</h2>
          <p>Clasifica 10 gastos en <strong>Necesidad</strong> o <strong>Deseo</strong></p>
          <p>Tienes <strong>30 segundos</strong></p>
          <ul className="presupuesto-reglas">
            <li>💰 +$5 por clasificación correcta</li>
            <li>🎯 Bonus +$10 si aciertas 9 o más</li>
          </ul>
          <button className="jugar-btn" onClick={iniciarJuego}>🎮 Comenzar</button>
          <button className="volver-btn" onClick={onVolver}>⬅️ Volver</button>
        </div>
      </div>
    )
  }

  if (finalizado) {
    const bonus = correctos >= 9 ? 10 : 0
    return (
      <div className="minijuegos">
        <div className="resultado-card presupuesto">
          <h2>🎉 Tiempo Terminado!</h2>
          <p className="resultado-texto">
            Clasificaste correctamente {correctos} de {GASTOS_PRESUPUESTO.length} gastos
          </p>
          <p className="recompensa-ganada">
            💰 Ganaste: ${correctos * 5 + bonus}
          </p>
          <div className="resultado-actions">
            <button className="jugar-btn" onClick={reiniciar}>🔄 Jugar de nuevo</button>
            <button className="volver-btn" onClick={onVolver}>⬅️ Volver</button>
          </div>
        </div>
      </div>
    )
  }

  const gasto = GASTOS_PRESUPUESTO[gastoActual]

  return (
    <div className="minijuegos">
      <div className="presupuesto-container">
        <div className="presupuesto-header">
          <button className="volver-btn-small" onClick={onVolver}>⬅️ Salir</button>
          <div className="presupuesto-stats">
            <span className={`tiempo ${tiempo <= 10 ? 'peligro' : ''}`}>⏱️ {tiempo}s</span>
            <span>Correctos: {correctos}</span>
            <span>{gastoActual + 1}/{GASTOS_PRESUPUESTO.length}</span>
          </div>
        </div>

        <div className="presupuesto-gasto">
          <h3>{gasto.nombre}</h3>
        </div>

        <div className="presupuesto-opciones">
          <button
            className="presupuesto-btn necesidad"
            onClick={() => clasificar('necesidad')}
          >
            🏠 Necesidad
          </button>
          <button
            className="presupuesto-btn deseo"
            onClick={() => clasificar('deseo')}
          >
            🎮 Deseo
          </button>
        </div>
      </div>
    </div>
  )
}

export default MiniJuegos
