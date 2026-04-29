import { useState } from 'react'

function Inversion({ jugador, actualizarFinanzas }) {
  const [desbloqueado, setDesbloqueado] = useState(jugador.nivel >= 3)
  const [inversiones, setInversiones] = useState([])

  const productos = [
    {
      id: 1,
      nombre: 'ETF S&P 500',
      descripcion: 'Una canasta con las 500 empresas más grandes de EE.UU.',
      riesgo: 'moderado',
      rendimientoEsperado: '8-10% anual',
      icono: '📊',
      minimo: 100
    },
    {
      id: 2,
      nombre: 'Robo-advisor Moderado',
      descripcion: 'Un algoritmo que gestiona tus inversiones automáticamente.',
      riesgo: 'moderado',
      rendimientoEsperado: '6-8% anual',
      icono: '🤖',
      minimo: 50
    },
    {
      id: 3,
      nombre: 'Cuenta Remunerada',
      descripcion: 'Tu dinero disponible 24/7 mientras genera rendimiento.',
      riesgo: 'bajo',
      rendimientoEsperado: '12% anual',
      icono: '💰',
      minimo: 1
    }
  ]

  const invertir = (producto, monto) => {
    if ((jugador.finanzas?.saldo || 0) >= monto) {
      setInversiones(prev => [...prev, {
        ...producto,
        invertido: monto,
        fecha: new Date().toLocaleDateString()
      }])
      if (actualizarFinanzas) {
        actualizarFinanzas({
          saldo: (jugador.finanzas?.saldo || 0) - monto,
          inversionTotal: (jugador.finanzas?.inversionTotal || 0) + monto
        })
      }
    }
  }

  if (!desbloqueado) {
    return (
      <div className="inversion-bloqueada">
        <div className="bloqueo-content">
          <span className="bloqueo-icono">🔒</span>
          <h2>Zona de Inversión Bloqueada</h2>
          <p>
            Para acceder a las ligas mayores, necesitás llegar al nivel 3.
          </p>
          <div className="requisitos">
            <h3>Requisitos para desbloquear:</h3>
            <ul>
              <li>✅ Completá misiones de ahorro</li>
              <li>✅ Descubrí tu perfil de inversor</li>
              <li>⏳ Alcanzá el nivel 3</li>
            </ul>
          </div>
          <p className="nivel-actual">
            Tu nivel actual: {jugador.nivel}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="inversion">
      <header className="inversion-header">
        <h2>📈 Zona de Inversión</h2>
        <p className="subtitle">Hacé crecer tu dinero en las ligas mayores</p>
      </header>

      {/* Perfil del inversor */}
      <section className="perfil-inversor">
        <div className="perfil-card">
          <span className="perfil-icono">🎭</span>
          <div>
            <h4>Tu Perfil: {jugador.perfil?.toUpperCase() || 'MODERADO'}</h4>
            <p>
              {jugador.perfil === 'conservador' && 'Preferís seguridad sobre riesgos. Rendimientos estables pero más bajos.'}
              {jugador.perfil === 'moderado' && 'Equilibrás riesgo y recompensa. Buscás crecimiento con cierta estabilidad.'}
              {jugador.perfil === 'agresivo' && 'Aceptás volatilidad a cambio de mayores rendimientos potenciales.'}
              {!jugador.perfil && 'Completá la misión de perfil de inversor para descubrir tu estilo.'}
            </p>
          </div>
        </div>
      </section>

      {/* Productos disponibles */}
      <section className="productos-grid">
        <h3>Productos Disponibles</h3>
        {productos.map(producto => (
          <div key={producto.id} className={`producto-card ${producto.riesgo}`}>
            <div className="producto-header">
              <span className="producto-icono">{producto.icono}</span>
              <h4>{producto.nombre}</h4>
            </div>
            <p className="producto-desc">{producto.descripcion}</p>
            <div className="producto-stats">
              <div className="stat">
                <span className="stat-label">Riesgo:</span>
                <span className={`stat-valor ${producto.riesgo}`}>{producto.riesgo}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Rendimiento:</span>
                <span className="stat-valor">{producto.rendimientoEsperado}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Mínimo:</span>
                <span className="stat-valor">${producto.minimo}</span>
              </div>
            </div>
            <div className="producto-invertir">
              <input
                type="number"
                placeholder={`Mínimo $${producto.minimo}`}
                min={producto.minimo}
                className="monto-inversion-input"
                id={`monto-${producto.id}`}
              />
              <button
                className="invertir-btn"
                onClick={() => {
                  const input = document.getElementById(`monto-${producto.id}`)
                  const monto = parseInt(input.value) || producto.minimo
                  invertir(producto, Math.max(monto, producto.minimo))
                }}
              >
                Invertir
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Mis inversiones */}
      {inversiones.length > 0 && (
        <section className="mis-inversiones">
          <h3>Mis Inversiones</h3>
          <p className="inversion-total">
            Total invertido: <strong>${inversiones.reduce((acc, inv) => acc + inv.invertido, 0)}</strong>
          </p>
          <div className="inversiones-list">
            {inversiones.map((inv, idx) => (
              <div key={idx} className="inversion-item">
                <span className="inversion-icono">{inv.icono}</span>
                <div className="inversion-info">
                  <strong>{inv.nombre}</strong>
                  <p>Invertido el {inv.fecha}</p>
                </div>
                <span className="inversion-monto">${inv.invertido}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info de inversiones totales */}
      <section className="inversion-resumen">
        <h3>📊 Resumen</h3>
        <p className="resumen-monto">
          Total en inversiones: <strong>${jugador.finanzas?.inversionTotal || 0}</strong>
        </p>
      </section>
    </div>
  )
}

export default Inversion
