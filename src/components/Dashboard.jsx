import { useState, useEffect } from 'react'

export const PREGUNTAS_ENCUESTA = [
  { pregunta: '¿Qué es OpenBank?', opciones: ['Banco digital', 'Red social', 'Videojuego'], respuesta: 'Banco digital' },
  { pregunta: '¿OpenBank ofrece?', opciones: ['Cuentas sin comisiones', 'Solo préstamos', 'Solo inversiones'], respuesta: 'Cuentas sin comisiones' },
  { pregunta: 'En OpenBank puedes:', opciones: ['Invertir', 'Solo gastar', 'Nada'], respuesta: 'Invertir' },
  { pregunta: 'El ahorro te ayuda a:', opciones: ['Gastar más', 'Lograr metas', 'Perder dinero'], respuesta: 'Lograr metas' },
  { pregunta: 'El interés compuesto:', opciones: ['Te hace pobre', 'Multiplica ganancias', 'No existe'], respuesta: 'Multiplica ganancias' },
  { pregunta: 'Un fondo de emergencia:', opciones: ['Gastar libre', 'Salvaguarda para crisis', 'Inversión risky'], respuesta: 'Salvaguarda para crisis' },
  { pregunta: '¿Quién es la protagonista de Uma Musume?', opciones: ['Special Week', 'Silence Suzuka', 'Tokai Teio'], respuesta: 'Special Week' },
  { pregunta: '¿Cómo se llama la academia?', opciones: ['Akikawa', 'Tracen Academy', 'Hari'], respuesta: 'Tracen Academy' },
  { pregunta: '¿Cuál es el evento más importante?', opciones: ['Derby', 'Tenno Sho', 'Koshien'], respuesta: 'Derby' },
  { pregunta: '¿Quién creó Umamusume?', opciones: ['Cygames', 'Square Enix', 'Bandai'], respuesta: 'Cygames' },
  { pregunta: '¿Qué tipo de cuenta ofrece OpenBank?', opciones: ['Solo信用卡', 'Débito remunerada', 'Prepago'], respuesta: 'Débito remunerada' },
  { pregunta: '¿Qué son los apartados?', opciones: ['Bóvedas virtuales', 'Préstamos', 'Inversiones'], respuesta: 'Bóvedas virtuales' },
  { pregunta: '¿Qué es un ETF?', opciones: ['Crypto', 'Fondo cotizado', 'Bono'], respuesta: 'Fondo cotizado' },
  { pregunta: '¿Qué es un Robo-advisor?', opciones: ['Robot físico', 'Asesor automático', 'App de banco'], respuesta: 'Asesor automático' },
  { pregunta: '¿De qué trata Uma Musume?', opciones: ['Caballos parlantes', 'Jockeys humanos', 'Carreras de autos'], respuesta: 'Caballos parlantes' }
]

export const PREGUNTAS_TRIVIA_NIVEL2 = [
  { pregunta: '¿De qué color es el cabello de Special Week?', opciones: ['Rosa', 'Rubio', 'Negro'], respuesta: 'Rosa' },
  { pregunta: '¿Cuándo es el cumpleaños de Special Week?', opciones: ['Mayo 1', 'Mayo 2', 'Mayo 3'], respuesta: 'Mayo 2' },
  { pregunta: '¿En qué división estudia Special Week?', opciones: ['Junior', 'Senior', 'Master'], respuesta: 'Junior' },
  { pregunta: '¿Quién es la mejor amiga de Special Week?', opciones: ['Silence Suzuka', 'Oguri Cap', 'Seiun Sky'], respuesta: 'Silence Suzuka' },
  { pregunta: '¿De dónde es originaria Special Week?', opciones: ['Hokkaido', 'Kyoto', 'Tokyo'], respuesta: 'Hokkaido' },
  { pregunta: '¿Cuántas carreras G1 ganó Special Week?', opciones: ['2', '4', '6'], respuesta: '4' },
  { pregunta: '¿Cómo se llama la escuela de caballos?', opciones: ['Tracen', 'Akikawa', 'Umacollege'], respuesta: 'Tracen' },
  { pregunta: '¿Qué son las "Memorias"?', opciones: ['Carreras pasadas', 'Amigos', 'Logros'], respuesta: 'Carreras pasadas' }
]

export const PREGUNTAS_TRIVIA_NIVEL3 = [
  { pregunta: '¿Qué significa "Uma Musume"?', opciones: ['Caballo niña', 'Joven caballo', 'Hija del caballo'], respuesta: 'Hija del caballo' },
  { pregunta: '¿Cuál es el objetivo de Special Week?', opciones: ['Ganar el Derby', 'Ser famosa', 'Divertirse'], respuesta: 'Ganar el Derby' },
  { pregunta: '¿En qué año debutó el anime?', opciones: ['2016', '2018', '2020'], respuesta: '2018' },
  { pregunta: '¿Cuántas temporadas tiene el anime?', opciones: ['1', '2', '3'], respuesta: '3' },
  { pregunta: '¿Quién es Team Spica?', opciones: ['Equipo de Special Week', 'Equipo de Tokai Teio', 'Equipo de Gold Ship'], respuesta: 'Equipo de Special Week' },
  { pregunta: '¿Qué es el Derby?', opciones: ['Carrera de caballos', 'Película', 'Videojuego'], respuesta: 'Carrera de caballos' },
  { pregunta: '¿Cuántas carreras G1 ganar en una vida es el Triple Crown?', opciones: ['2', '3', '4'], respuesta: '3' },
  { pregunta: '¿Qué es una Uma Musume?', opciones: ['Caballo parlante', 'Jockey', 'Entrenador'], respuesta: 'Caballo parlante' }
]

export const PREGUNTAS_TRIVIA_NIVEL4 = [
  { pregunta: '¿Cuántas G1 ganó Silence Suzuka?', opciones: ['0', '1', '2'], respuesta: '1' },
  { pregunta: '¿Qué personaje es "Front-Runner"?', opciones: ['Special Week', 'Silence Suzuka', 'Tokai Teio'], respuesta: 'Silence Suzuka' },
  { pregunta: '¿Cuál es el equipo de la Generación Dorada?', opciones: ['Spica', 'Sirius', 'Both'], respuesta: 'Both' },
  { pregunta: '¿Qué color es Silence Suzuka?', opciones: ['Naranja', 'Verde', 'Rosa'], respuesta: 'Naranja' },
  { pregunta: '¿Cuántos G1 ganó Grass Wonder?', opciones: ['3', '4', '5'], respuesta: '5' },
  { pregunta: '¿Qué es el Tenno Sho?', opciones: ['Carrera de otoño', 'Carrera de primavera', 'Derby'], respuesta: 'Carrera de otoño' },
  { pregunta: '¿Quién es el oponente principal de Special Week?', opciones: ['Seiun Sky', 'Tokai Teio', 'Grass Wonder'], respuesta: 'Seiun Sky' },
  { pregunta: '¿Qué significa "Winning"?', opciones: ['Ganar', 'Perder', 'Empatar'], respuesta: 'Ganar' }
]

export const PREGUNTAS_TRIVIA_NIVEL5 = [
  { pregunta: '¿Cuántos G1 ganó en total Special Week?', opciones: ['2', '4', '6'], respuesta: '4' },
  { pregunta: '¿Qué es el Kikuka Sho?', opciones: ['Triple Crown', 'Derby de otoño', 'Copa de Japón'], respuesta: 'Derby de otoño' },
  { pregunta: '¿Qué equipo forma Gold Ship?', opciones: ['Spica', 'Sirius', 'Gold'], respuesta: 'Spica' },
  { pregunta: '¿Cuántas temporadas tiene el juego?', opciones: ['1', '2', '3'], respuesta: '3' },
  { pregunta: '¿Qué es una Support Card?', opciones: ['Entrenador', 'Amigo', 'Mentor'], respuesta: 'Entrenador' },
  { pregunta: '¿Cuántas carreras de la Generación Dorada son?', opciones: ['3', '4', '5'], respuesta: '5' },
  { pregunta: '¿Qué edad tiene Special Week en el anime?', opciones: ['15', '16', '17'], respuesta: '16' },
  { pregunta: '¿Cuántos clover tiene el uniforme de Special Week?', opciones: ['2', '3', '4'], respuesta: '4' }
]

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function Dashboard({ jugador, setVistaActual, completarMision, actualizarFinanzas, nivelActual = 1 }) {
  const [saldo, setSaldo] = useState(50)
  const [ahorroTotal, setAhorroTotal] = useState(0)
  const [inversionTotal, setInversionTotal] = useState(0)
  const [misionesCompletadas, setMisionesCompletadas] = useState([])
  const [modalActual, setModalActual] = useState(null)
  const [preguntaIdx, setPreguntaIdx] = useState(0)
  const [preguntasEncuesta, setPreguntasEncuesta] = useState([])
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0)
  const [nombreReferido, setNombreReferido] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (jugador.finanzas) {
      setSaldo(jugador.finanzas.saldo)
      setAhorroTotal(jugador.finanzas.ahorroTotal)
      setInversionTotal(jugador.finanzas.inversionTotal)
    }
    if (jugador.misiones?.misionesCompletadas) {
      setMisionesCompletadas(jugador.misiones.misionesCompletadas)
    }
  }, [jugador.finanzas, jugador.misiones])

  const puedenCompleterMision1 = !misionesCompletadas.includes(1)
  const puedenCompleterMision2 = !misionesCompletadas.includes(2)
  const puedenCompleterMision3 = !misionesCompletadas.includes(3)
  const puedenCompleterMision4 = !misionesCompletadas.includes(4) && misionesCompletadas.length >= 3

  const porcentajeBarraSalud = (jugador.xp / jugador.xpParaSiguienteNivel) * 100

  const abrirEncuesta = () => {
    if (!puedenCompleterMision1) return
    const preguntas = shuffleArray(PREGUNTAS_ENCUESTA).slice(0, 10)
    setPreguntasEncuesta(preguntas)
    setPreguntaIdx(0)
    setRespuestasCorrectas(0)
    setModalActual('encuesta')
  }

  const responderEncuesta = (respuesta) => {
    if (respuesta === preguntasEncuesta[preguntaIdx].respuesta) {
      setRespuestasCorrectas(r => r + 1)
    }
    if (preguntaIdx < 9) {
      setPreguntaIdx(p => p + 1)
    } else {
      if (respuestasCorrectas + 1 >= 5) {
        setMisionesCompletadas(prev => [...prev, 1])
        setSaldo(saldo + 50)
        if (completarMision) completarMision(1, 1)
      } else {
        setErrorMsg('Necesitas 5 correctas para completar!')
      }
      setTimeout(() => setModalActual(null), 1500)
    }
  }

  const abrirReferido = () => {
    if (!puedenCompleterMision2) return
    setNombreReferido('')
    setModalActual('referido')
  }

  const confirmarReferido = () => {
    if (nombreReferido.length < 2) {
      setErrorMsg('Escribe el nombre de tu amigo!')
      return
    }
    setMisionesCompletadas(prev => [...prev, 2])
    setSaldo(saldo + 30)
    setModalActual(null)
    if (completarMision) completarMision(2, 1)
  }

  const abrirTutorial = () => {
    if (!puedenCompleterMision3) return
    setModalActual('tutorial')
  }

  const confirmarTutorial = () => {
    setMisionesCompletadas(prev => [...prev, 3])
    setModalActual(null)
    if (completarMision) completarMision(3, 1)
  }

  const abrirAhorrar = () => {
    if (!puedenCompleterMision4) return
    if ((jugador.finanzas?.saldo || 0) < 25) {
      setErrorMsg('Necesitas al menos $25 de saldo!')
      return
    }
    handleActualizarFinanzas({
      saldo: (jugador.finanzas?.saldo || 0) - 25,
      ahorroTotal: (jugador.finanzas?.ahorroTotal || 0) + 25
    })
    setMisionesCompletadas(prev => [...prev, 4])
    if (completarMision) completarMision(4, 1)
  }

  const handleActualizarFinanzas = (nuevasFinanzas) => {
    if (actualizarFinanzas && typeof actualizarFinanzas === 'function') {
      actualizarFinanzas(nuevasFinanzas)
    }
  }

  const cerrarModal = () => {
    setModalActual(null)
    setErrorMsg('')
  }

  const todasCompletadas = misionesCompletadas.length >= 4

  return (
    <div className="dashboard">
      {/* Barra de Salud Financiera */}
      <section className="health-bar-section">
        <h2>💪 Barra de Salud Financiera</h2>
        <div className="health-bar-container">
          <div
            className="health-bar-fill"
            style={{ width: `${porcentajeBarraSalud}%` }}
          >
            <span className="health-text">
              {jugador.xp} / {jugador.xpParaSiguienteNivel} XP
            </span>
          </div>
        </div>
        <p className="level-info">Nivel {jugador.nivel} - {jugador.nombre}</p>
      </section>

      {/* Resumen de Patrimonio */}
      <section className="summary-cards">
        <div className="card saldo">
          <h3>💰 Saldo Total</h3>
          <p className="amount">${saldo.toLocaleString()}</p>
        </div>
        <div className="card ahorro">
          <h3>🏦 Ahorro</h3>
          <p className="amount">${ahorroTotal.toLocaleString()}</p>
        </div>
        <div className="card inversion">
          <h3>📈 Inversión</h3>
          <p className="amount">${inversionTotal.toLocaleString()}</p>
        </div>
      </section>

      {/* Insignias */}
      {jugador.insignias?.length > 0 && (
        <section className="badges-section">
          <h3>🏅 Tus Insignias</h3>
          <div className="badges-grid">
            {jugador.insignias.map((insignia, idx) => (
              <div key={idx} className="badge" title={insignia.descripcion}>
                {insignia.icono}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Misiones del nivel actual */}
      <section className="quick-actions">
        <h3>🎯 Misiones - Nivel {nivelActual}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Completá estas misiones para ganar saldo y experiencia
        </p>
        
        {nivelActual === 1 && (
          <div className="action-buttons" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
            <button className="action-btn" onClick={abrirEncuesta} disabled={!puedenCompleterMision1}>
              📝 Hacer encuesta<br/>
              <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>+50 saldo, +10 🪙</small>
            </button>
            <button className="action-btn" onClick={abrirReferido} disabled={!puedenCompleterMision2}>
              👤 Referir amigo<br/>
              <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>+30 saldo, +8 🪙</small>
            </button>
            <button className="action-btn" onClick={abrirTutorial} disabled={!puedenCompleterMision3}>
              📺 Ver tutorial<br/>
              <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>+30 XP, +5 🪙</small>
            </button>
            <button className="action-btn" onClick={abrirAhorrar} disabled={!puedenCompleterMision4}>
              🏦 Ahorrar $25<br/>
              <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>+60 XP, +12 🪙</small>
            </button>
          </div>
        )}

        {nivelActual >= 2 && (
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              💡 Ve a la pestaña "Misiones" para completar las misiones del Nivel {nivelActual}
            </p>
            <button className="action-btn" onClick={() => setVistaActual('misiones')}>
              📋 Ir a Misiones
            </button>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>📚 Misiones del Nivel {nivelActual}:</h4>
              {nivelActual === 2 && (
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem' }}>
                  <li>Meta de Ahorro: $100</li>
                  <li>Trivia Umamusume: 3 preguntas</li>
                  <li>Deposito: $50</li>
                </ul>
              )}
              {nivelActual === 3 && (
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem' }}>
                  <li>Fondo de Emergencia: $500</li>
                  <li>Trivia Umamusume: 5 preguntas</li>
                  <li>Multiples Referidos: 3 amigos</li>
                </ul>
              )}
              {nivelActual === 4 && (
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem' }}>
                  <li>Primera Inversion: $100</li>
                  <li>Trivia Umamusume: 7 preguntas</li>
                  <li>Ahorro Milagroso: $1000</li>
                </ul>
              )}
              {nivelActual === 5 && (
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem' }}>
                  <li>Inversion Major: $500</li>
                  <li>Racha de Ahorro: 7 dias</li>
                  <li>Patrimonio: $2000</li>
                </ul>
              )}
              {nivelActual >= 6 && (
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem' }}>
                  <li>💎 ¡Has alcanzado el nivel máximo!</li>
                  <li>Continúa completando misiones y mejorando</li>
                </ul>
              )}
            </div>
          </div>
        )}
        
        {todasCompletadas && nivelActual === 1 && (
          <p style={{ color: 'var(--success)', textAlign: 'center', marginTop: '0.5rem' }}>
            ✅ ¡Todas las misiones de Nivel 1 completadas!
          </p>
        )}
      </section>

      {/* Acciones Rápidas */}
      <section className="quick-actions">
        <h3>⚡ Acciones Rápidas</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setVistaActual('misiones')}>
            📋 Ver Misiones
          </button>
          <button className="action-btn" onClick={() => setVistaActual('tienda')}>
            🛒 Tienda
          </button>
        </div>
      </section>

      {/* Error message */}
      {errorMsg && (
        <p style={{ color: 'var(--danger)', textAlign: 'center', marginTop: '0.5rem' }}>{errorMsg}</p>
      )}

      {/* Modal de Misión */}
      {modalActual === 'encuesta' && preguntasEncuesta.length > 0 && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="pregunta-modal" onClick={e => e.stopPropagation()}>
            <h3>Encuesta ({preguntaIdx + 1}/10)</h3>
            <p className="pregunta-texto">{preguntasEncuesta[preguntaIdx].pregunta}</p>
            <div className="pregunta-opciones">
              {preguntasEncuesta[preguntaIdx].opciones.map(opcion => (
                <button key={opcion} className="opcion-btn" onClick={() => responderEncuesta(opcion)}>
                  {opcion}
                </button>
              ))}
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              correctas: {respuestasCorrectas}
            </p>
          </div>
        </div>
      )}

      {modalActual === 'referido' && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="pregunta-modal" onClick={e => e.stopPropagation()}>
            <h3>👤 Referir un amigo</h3>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Ingresa el nombre de tu amigo para obtener la recompensa
            </p>
            <input
              type="text"
              value={nombreReferido}
              onChange={e => setNombreReferido(e.target.value)}
              placeholder="Nombre del amigo"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-dark)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
            <button className="opcion-btn" onClick={confirmarReferido} style={{ width: '100%' }}>
              Confirmar
            </button>
          </div>
        </div>
      )}

      {modalActual === 'tutorial' && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="pregunta-modal" onClick={e => e.stopPropagation()}>
            <h3>📺 Tutorial</h3>
            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Bienvenido a OpenQuest!</strong></p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Aprende a manejar tus finanzas:
              </p>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem' }}>
                <li>💰 <strong>Saldo:</strong> Tu dinero disponible para usar</li>
                <li>🏦 <strong>Ahorro:</strong> Money guardado para emergencias</li>
                <li>📈 <strong>Inversión:</strong> Para hacer crecer tu plata</li>
                <li>🎯 <strong>Misiones:</strong> Completalas para ganarsaldo y XP</li>
                <li>🛒 <strong>Tienda:</strong> Compramejoras con tus 🪙</li>
              </ul>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '1rem' }}>
                Video completo en: youtube.com/@openquest
              </p>
            </div>
            <button className="opcion-btn" onClick={confirmarTutorial} style={{ width: '100%' }}>
              ¡Entendido!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
