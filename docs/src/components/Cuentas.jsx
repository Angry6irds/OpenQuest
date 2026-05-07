import { useState } from 'react'

function Cuentas({ jugador, registrarGasto }) {
  const [mostrarFormularioGasto, setMostrarFormularioGasto] = useState(false)
  const [nuevoGasto, setNuevoGasto] = useState({ descripcion: '', monto: '' })

  const [cuentas] = useState([
    { id: 1, nombre: 'Cuenta Principal', tipo: 'debito', saldo: jugador.finanzas?.saldo || 1000, remunerada: true, rendimiento: '12% anual' },
    { id: 2, nombre: 'Gastos Diarios', tipo: 'debito', saldo: 150, remunerada: true, rendimiento: '12% anual' },
  ])

  const [tarjetas, setTarjetas] = useState([
    { id: 1, nombre: 'Tarjeta Virtual', tipo: 'virtual', activa: true, ultimo4: '4532' },
    { id: 2, nombre: 'Tarjeta Física', tipo: 'fisica', activa: true, ultimo4: '8921' },
  ])

  const [gastosRapidos, setGastosRapidos] = useState([
    { id: 1, descripcion: '🍔 Comida rápida', monto: 15 },
    { id: 2, descripcion: '☕ Café', monto: 5 },
    { id: 3, descripcion: '🛒 Supermercado', monto: 50 },
    { id: 4, descripcion: '🎬 Entretenimiento', monto: 25 },
    { id: 5, descripcion: '⛽ Combustible', monto: 40 },
  ])

  const toggleTarjeta = (id) => {
    setTarjetas(prev => prev.map(t =>
      t.id === id ? { ...t, activa: !t.activa } : t
    ))
  }

  const registrarGastoRapido = (gasto) => {
    registrarGasto(gasto.monto, gasto.descripcion)
  }

  const handleSubmitGasto = (e) => {
    e.preventDefault()
    if (nuevoGasto.descripcion && nuevoGasto.monto) {
      registrarGasto(Number(nuevoGasto.monto), nuevoGasto.descripcion)
      setNuevoGasto({ descripcion: '', monto: '' })
      setMostrarFormularioGasto(false)
    }
  }

  return (
    <div className="cuentas">
      <header className="cuentas-header">
        <h2>💳 Gestión de Cuentas y Tarjetas</h2>
        <p className="subtitle">Controla tus gastos diarios y tarjetas</p>
      </header>

      {/* Registro de gastos */}
      <section className="registro-gastos-section">
        <h3>💸 Registrar Gasto</h3>
        <div className="gastos-rapidos-grid">
          {gastosRapidos.map(gasto => (
            <button
              key={gasto.id}
              className="gasto-rapido-btn"
              onClick={() => registrarGastoRapido(gasto)}
            >
              <span className="gasto-icono">{gasto.descripcion.split(' ')[0]}</span>
              <span className="gasto-desc">{gasto.descripcion.split(' ').slice(1).join(' ')}</span>
              <span className="gasto-monto">-${gasto.monto}</span>
            </button>
          ))}
        </div>

        {!mostrarFormularioGasto ? (
          <button
            className="crear-apartado-btn"
            onClick={() => setMostrarFormularioGasto(true)}
          >
            ➕ Otro gasto
          </button>
        ) : (
          <form className="formulario-gasto" onSubmit={handleSubmitGasto}>
            <h4>Registrar gasto personalizado</h4>
            <input
              type="text"
              placeholder="Descripción (ej: Compra en tienda)"
              value={nuevoGasto.descripcion}
              onChange={(e) => setNuevoGasto(prev => ({ ...prev, descripcion: e.target.value }))}
              required
            />
            <input
              type="number"
              placeholder="Monto"
              value={nuevoGasto.monto}
              onChange={(e) => setNuevoGasto(prev => ({ ...prev, monto: e.target.value }))}
              required
            />
            <div className="form-actions">
              <button type="submit" className="guardar-btn">Registrar</button>
              <button
                type="button"
                className="cancelar-btn"
                onClick={() => setMostrarFormularioGasto(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Total gastos */}
        <div className="total-gastos-card">
          <span className="total-gastos-label">Gastos totales acumulados:</span>
          <span className="total-gastos-monto">${jugador.finanzas?.gastosTotales || 0}</span>
        </div>
      </section>

      {/* Cuentas de Débito */}
      <section className="cuentas-section">
        <h3>📊 Tus Cuentas</h3>
        <div className="cuentas-grid">
          {cuentas.map(cuenta => (
            <div key={cuenta.id} className="cuenta-card">
              <div className="cuenta-header">
                <span className="cuenta-icon">🏦</span>
                <span className={`tipo-badge ${cuenta.tipo}`}>{cuenta.tipo}</span>
              </div>
              <h4>{cuenta.nombre}</h4>
              <p className="saldo">${cuenta.saldo.toLocaleString()}</p>
              {cuenta.remunerada && (
                <div className="beneficio">
                  <span className="beneficio-icon">✨</span>
                  <span>{cuenta.rendimiento} de rendimiento</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tarjetas */}
      <section className="tarjetas-section">
        <h3>💳 Tus Tarjetas</h3>
        <div className="tarjetas-grid">
          {tarjetas.map(tarjeta => (
            <div key={tarjeta.id} className={`tarjeta-card ${!tarjeta.activa ? 'inactiva' : ''}`}>
              <div className="tarjeta-chip">💳</div>
              <div className="tarjeta-info">
                <span className="tarjeta-nombre">{tarjeta.nombre}</span>
                <span className="tarjeta-numero">**** **** **** {tarjeta.ultimo4}</span>
              </div>
              <div className="tarjeta-actions">
                <button
                  className={`toggle-btn ${tarjeta.activa ? 'activa' : ''}`}
                  onClick={() => toggleTarjeta(tarjeta.id)}
                >
                  {tarjeta.activa ? '🔒 Bloquear' : '🔓 Desbloquear'}
                </button>
                <button className="action-btn-secondary">
                  💡 Pagar con celular
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apartados / Subcuentas */}
      <section className="apartados-section">
        <h3>🔒 Apartados (Bóvedas Virtuales)</h3>
        <div className="apartados-info">
          <p>Separá tu dinero por objetivos y evitá gastar por impulso.</p>
          <p className="apartados-total">
            Total ahorrado en apartados: <strong>${jugador.finanzas?.ahorrosEnApartados || 0}</strong>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Cuentas
