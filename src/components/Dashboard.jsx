import { useState, useEffect } from 'react'

const PREGUNTAS_ENCUESTA = [
  { pregunta: '¿Qué es OpenBank?', opciones: ['Banco digital', 'Red social', 'Videojuego'], respuesta: 'Banco digital' },
  { pregunta: '¿Qué es Umamusume?', opciones: ['Caballo parlante', 'App de banco', 'Videojuego de caballos'], respuesta: 'Videojuego de caballos' },
  { pregunta: 'OpenBank ofrece:', opciones: ['Cuentas sin comisiones', 'Solo préstamos', 'Solo inversiones'], respuesta: 'Cuentas sin comisiones' },
  { pregunta: 'Umamusume es de:', opciones: ['Cygames', 'Nintendo', 'Sony'], respuesta: 'Cygames' },
  { pregunta: 'En OpenBank puedes:', opciones: ['Invertir', 'Solo gastar', 'Nada'], respuesta: 'Invertir' },
  { pregunta: 'El ahorro te ayuda a:', opciones: ['Gastar más', 'Lograr metas', 'Perder dinero'], respuesta: 'Lograr metas' },
  { pregunta: 'El interés compuesto:', opciones: ['Te hace pobre', 'Multiplica ganancias', 'No existe'], respuesta: 'Multiplica ganancias' },
  { pregunta: 'Un fondo de emergencia:', opciones: ['Gastar libre', 'Salvaguarda para crisis', 'Inversión risky'], respuesta: 'Salvaguarda para crisis' },
]

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function Dashboard({ jugador, setVistaActual, completarMision }) {
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
    const preguntas = shuffleArray(PREGUNTAS_ENCUESTA).slice(0, 5)
    setPreguntasEncuesta(preguntas)
    setPreguntaIdx(0)
    setRespuestasCorrectas(0)
    setModalActual('encuesta')
  }

  const responderEncuesta = (respuesta) => {
    if (respuesta === preguntasEncuesta[preguntaIdx].respuesta) {
      setRespuestasCorrectas(r => r + 1)
    }
    if (preguntaIdx < 4) {
      setPreguntaIdx(p => p + 1)
    } else {
      if (respuestasCorrectas + 1 >= 3) {
        setMisionesCompletadas(prev => [...prev, 1])
        setSaldo(saldo + 50)
        if (completarMision) completarMision(1, 1)
      } else {
        setErrorMsg('Necesitas al menos 3 correctas para completar!')
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
    if (saldo < 25) {
      setErrorMsg('Necesitas al menos $25 de saldo!')
      return
    }
    setMisionesCompletadas(prev => [...prev, 4])
    setSaldo(saldo - 25)
    setAhorroTotal(ahorroTotal + 25)
    if (completarMision) completarMision(4, 1)
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

      {/* Misiones Nivel 1 - Para Principiantes */}
      <section className="quick-actions">
        <h3>🎯 Misiones - Nivel 1</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Completá estas misiones para ganar saldo y experiencia
        </p>
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
        {todasCompletadas && (
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
            <h3>Encuesta ({preguntaIdx + 1}/5)</h3>
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
