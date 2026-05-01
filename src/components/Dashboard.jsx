import { useState, useEffect } from 'react'

function Dashboard({ jugador, setVistaActual }) {
  const [saldo, setSaldo] = useState(1000)
  const [ahorroTotal, setAhorroTotal] = useState(500)
  const [inversionTotal, setInversionTotal] = useState(0)

  const porcentajeBarraSalud = (jugador.xp / jugador.xpParaSiguienteNivel) * 100

  const movimientos = [
    { id: 1, tipo: 'ingreso', descripcion: 'Recompensa: Primera misión', monto: 50, fecha: 'Hoy' },
    { id: 2, tipo: 'ahorro', descripcion: 'Apartado: Fondo Emergencia', monto: -200, fecha: 'Ayer' },
    { id: 3, tipo: 'gasto', descripcion: 'Compra en supermercado', monto: -85, fecha: 'Ayer' },
  ]

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
        <div className="card monedas">
          <h3>🪙 Monedas</h3>
          <p className="amount">{jugador.moneda}</p>
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
      {jugador.insignias.length > 0 && (
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

      {/* Acciones Rápidas */}
      <section className="quick-actions">
        <h3>⚡ Acciones Rápidas</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setVistaActual('ahorro')}>
            💵 Depositar
          </button>
          <button className="action-btn" onClick={() => setVistaActual('misiones')}>
            📋 Ver Misiones
          </button>
          <button className="action-btn" onClick={() => setVistaActual('inversion')}>
            📊 Invertir
          </button>
        </div>
      </section>

      {/* Movimientos Recientes */}
      <section className="recent-movements">
        <h3>📜 Movimientos Recientes</h3>
        <ul className="movements-list">
          {movimientos.map(mov => (
            <li key={mov.id} className={`movement ${mov.tipo}`}>
              <div className="movement-info">
                <span className="description">{mov.descripcion}</span>
                <span className="date">{mov.fecha}</span>
              </div>
              <span className={`amount ${mov.tipo}`}>
                {mov.tipo === 'ingreso' ? '+' : ''}${mov.monto}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Dashboard
