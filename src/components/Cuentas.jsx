import { useState } from 'react'

function Cuentas({ jugador, comprarComida }) {
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

  const [comidasRapidas] = useState([
    { id: 1, descripcion: '🍎 Manzana', monto: 5, energia: 10 },
    { id: 2, descripcion: '☕ Café', monto: 5, energia: 15 },
    { id: 3, descripcion: '🥪 Sandwich', monto: 10, energia: 25 },
    { id: 4, descripcion: '🍔 Comida rápida', monto: 15, energia: 40 },
    { id: 5, descripcion: '🍱 Menú saludable', monto: 25, energia: 70 },
  ])

  const toggleTarjeta = (id) => {
    setTarjetas(prev => prev.map(t =>
      t.id === id ? { ...t, activa: !t.activa } : t
    ))
  }

  const registrarComidaRapida = (comida) => {
    comprarComida(comida.monto, comida.descripcion, comida.energia)
  }

  const handleSubmitGasto = (e) => {
    e.preventDefault()
    if (nuevoGasto.descripcion && nuevoGasto.monto) {
      comprarComida(Number(nuevoGasto.monto), nuevoGasto.descripcion, Number(nuevoGasto.monto) * 2) // Default energy logic for custom
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
        <h3>🍖 Comprar Comida (Recuperar Energía)</h3>
        <p className="subtitle" style={{marginBottom: '1rem'}}>Elige qué quieres darle a tu héroe para que recupere energías y pueda jugar minijuegos.</p>
        <div className="gastos-rapidos-grid">
          {comidasRapidas.map(comida => (
            <button
              key={comida.id}
              className="gasto-rapido-btn"
              onClick={() => registrarComidaRapida(comida)}
            >
              <span className="gasto-icono">{comida.descripcion.split(' ')[0]}</span>
              <span className="gasto-desc">{comida.descripcion.split(' ').slice(1).join(' ')}</span>
              <span className="gasto-monto">-${comida.monto} <br/><span style={{fontSize: '0.8rem', color: 'var(--success)'}}>+{comida.energia}⚡</span></span>
            </button>
          ))}
        </div>

        {!mostrarFormularioGasto ? (
          <button
            className="crear-apartado-btn"
            onClick={() => setMostrarFormularioGasto(true)}
          >
            ➕ Otra comida
          </button>
        ) : (
          <form className="formulario-gasto" onSubmit={handleSubmitGasto}>
            <h4>Comprar algo diferente</h4>
            <input
              type="text"
              placeholder="Descripción (ej: Batido)"
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
