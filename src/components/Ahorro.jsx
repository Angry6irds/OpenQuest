import { useState } from 'react'

function Ahorro({ jugador, registrarDeposito, actualizarFinanzas }) {
  const [apartados, setApartados] = useState([
    { id: 1, nombre: 'Fondo de Emergencia', meta: 5000, actual: jugador.finanzas?.ahorrosEnApartados || 500, icono: '🛡️' },
    { id: 2, nombre: 'Viaje soñado', meta: 3000, actual: 800, icono: '✈️' },
  ])

  const [nuevoApartado, setNuevoApartado] = useState({ nombre: '', meta: '' })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [montoDeposito, setMontoDeposito] = useState('')

  const crearApartado = (e) => {
    e.preventDefault()
    if (nuevoApartado.nombre && nuevoApartado.meta) {
      setApartados(prev => [...prev, {
        id: Date.now(),
        nombre: nuevoApartado.nombre,
        meta: Number(nuevoApartado.meta),
        actual: 0,
        icono: '🎯'
      }])
      setNuevoApartado({ nombre: '', meta: '' })
      setMostrarFormulario(false)
    }
  }

  const depositarEnApartado = (id, cantidad) => {
    const apartado = apartados.find(a => a.id === id)
    if (jugador.finanzas?.saldo >= cantidad) {
      setApartados(prev => prev.map(a =>
        a.id === id ? { ...a, actual: Math.min(a.actual + cantidad, a.meta) } : a
      ))
      actualizarFinanzas({
        saldo: (jugador.finanzas?.saldo || 0) - cantidad,
        ahorrosEnApartados: (jugador.finanzas?.ahorrosEnApartados || 0) + cantidad,
        ahorroTotal: (jugador.finanzas?.ahorroTotal || 0) + cantidad
      })
    }
  }

  const handleDepositoGeneral = (e) => {
    e.preventDefault()
    if (montoDeposito && Number(montoDeposito) > 0) {
      registrarDeposito(Number(montoDeposito))
      setMontoDeposito('')
    }
  }

  return (
    <div className="ahorro">
      <header className="ahorro-header">
        <h2>🏦 Bóveda de Ahorro</h2>
        <p className="subtitle">Tus metas financieras comienzan aquí</p>
      </header>

      {/* Depositar dinero */}
      <section className="depositar-section">
        <h3>💵 Depositar Dinero</h3>
        <form className="formulario-deposito" onSubmit={handleDepositoGeneral}>
          <input
            type="number"
            placeholder="Monto a depositar"
            value={montoDeposito}
            onChange={(e) => setMontoDeposito(e.target.value)}
            min="1"
          />
          <button type="submit" className="depositar-btn-principal">
            Depositar
          </button>
        </form>
        <p className="saldo-disponible">
          Saldo disponible: <strong>${jugador.finanzas?.saldo || 0}</strong>
        </p>
      </section>

      {/* Info educativa */}
      <section className="edu-card">
        <div className="edu-icon">💡</div>
        <div className="edu-content">
          <h4>El Fondo de Emergencia es tu Kit de Supervivencia</h4>
          <p>
            Guardá entre 6 y 9 meses de gastos para imprevistos. Es tu primera línea
            de defensa financiera.
          </p>
        </div>
      </section>

      {/* Apartados existentes */}
      <section className="apartados-grid">
        {apartados.map(apartado => {
          const porcentaje = (apartado.actual / apartado.meta) * 100
          return (
            <div key={apartado.id} className="apartado-card">
              <div className="apartado-header">
                <span className="apartado-icono">{apartado.icono}</span>
                <h4>{apartado.nombre}</h4>
              </div>
              <div className="apartado-progreso">
                <div className="apartado-barra">
                  <div
                    className="apartado-fill"
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
                <p className="apartado-monto">
                  ${apartado.actual.toLocaleString()} / ${apartado.meta.toLocaleString()}
                </p>
              </div>
              <div className="apartado-actions">
                <button
                  className="depositar-btn"
                  onClick={() => depositarEnApartado(apartado.id, 100)}
                >
                  💵 +$100
                </button>
                <button
                  className="depositar-btn"
                  onClick={() => depositarEnApartado(apartado.id, 500)}
                >
                  💰 +$500
                </button>
              </div>
            </div>
          )
        })}
      </section>

      {/* Crear nuevo apartado */}
      <section className="nuevo-apartado-section">
        {!mostrarFormulario ? (
          <button
            className="crear-btn"
            onClick={() => setMostrarFormulario(true)}
          >
            ➕ Crear nuevo apartado
          </button>
        ) : (
          <form className="formulario-apartado" onSubmit={crearApartado}>
            <h4>Crear nueva meta de ahorro</h4>
            <input
              type="text"
              placeholder="Nombre de la meta (ej: Auto nuevo)"
              value={nuevoApartado.nombre}
              onChange={(e) => setNuevoApartado(prev => ({ ...prev, nombre: e.target.value }))}
              required
            />
            <input
              type="number"
              placeholder="Monto objetivo"
              value={nuevoApartado.meta}
              onChange={(e) => setNuevoApartado(prev => ({ ...prev, meta: e.target.value }))}
              required
            />
            <div className="form-actions">
              <button type="submit" className="guardar-btn">Guardar</button>
              <button
                type="button"
                className="cancelar-btn"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Ahorro automático */}
      <section className="ahorro-automatico">
        <h3>🔄 Ahorro Automático</h3>
        <div className="opcion-ahorro">
          <input type="checkbox" id="redondeo" defaultChecked={jugador.mejoras?.find(m => m.id === 'ahorro_auto')} />
          <label htmlFor="redondeo">
            <span className="opcion-icono">🔵</span>
            <div>
              <strong>Redondeo de compras</strong>
              <p>Redondeamos tus compras al entero más cercano y la diferencia va a tu apartado.</p>
            </div>
          </label>
        </div>
        <div className="opcion-ahorro">
          <input type="checkbox" id="diario" />
          <label htmlFor="diario">
            <span className="opcion-icono">📅</span>
            <div>
              <strong>Ahorro diario automático</strong>
              <p>Transferí una cantidad fija todos los días automáticamente.</p>
            </div>
          </label>
        </div>
      </section>

      {/* Resumen */}
      <section className="resumen-ahorro">
        <h3>📊 Resumen de Ahorro</h3>
        <div className="resumen-stats">
          <div className="stat-card">
            <span className="stat-label">Total ahorrado</span>
            <span className="stat-valor">${jugador.finanzas?.ahorroTotal || 0}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">En apartados</span>
            <span className="stat-valor">${jugador.finanzas?.ahorrosEnApartados || 0}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Meta total</span>
            <span className="stat-valor">${apartados.reduce((acc, a) => acc + a.meta, 0)}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Ahorro
