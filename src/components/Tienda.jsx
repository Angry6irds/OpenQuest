import { useState } from 'react'
import { MEJORAS } from '../data/misiones'

function Tienda({ jugador, comprarMejora }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')

  const mejorasDisponibles = MEJORAS.filter(mejora => {
    if (categoriaSeleccionada === 'todas') return true
    return mejora.tipo === categoriaSeleccionada
  })

  const tieneMejora = (mejoraId) => {
    return jugador.mejoras?.find(m => m.id === mejoraId)
  }

  const puedeComprar = (mejora) => {
    return jugador.moneda >= mejora.costo && !tieneMejora(mejora.id)
  }

  return (
    <div className="tienda">
      <header className="tienda-header">
        <h2>🛒 Tienda de Mejoras</h2>
        <p className="subtitle">Mejorá tu experiencia financiera</p>
        <div className="monedas-disponibles">
          <span className="moneda-icon">🪙</span>
          <span className="moneda-cantidad">{jugador.moneda}</span>
        </div>
      </header>

      {/* Filtros por categoría */}
      <div className="filtro-tienda">
        <button
          className={`filtro-btn ${categoriaSeleccionada === 'todas' ? 'activo' : ''}`}
          onClick={() => setCategoriaSeleccionada('todas')}
        >
          Todas
        </button>
        <button
          className={`filtro-btn ${categoriaSeleccionada === 'pasiva' ? 'activo' : ''}`}
          onClick={() => setCategoriaSeleccionada('pasiva')}
        >
          💎 Pasivas
        </button>
        <button
          className={`filtro-btn ${categoriaSeleccionada === 'activa' ? 'activo' : ''}`}
          onClick={() => setCategoriaSeleccionada('activa')}
        >
          ⚡ Activas
        </button>
        <button
          className={`filtro-btn ${categoriaSeleccionada === 'temporal' ? 'activo' : ''}`}
          onClick={() => setCategoriaSeleccionada('temporal')}
        >
          ⏱️ Temporales
        </button>
        <button
          className={`filtro-btn ${categoriaSeleccionada === 'consumible' ? 'activo' : ''}`}
          onClick={() => setCategoriaSeleccionada('consumible')}
        >
          🧪 Consumibles
        </button>
      </div>

      {/* Lista de mejoras */}
      <div className="mejoras-grid">
        {mejorasDisponibles.map(mejora => {
          const comprada = tieneMejora(mejora.id)
          const puedeComprarEsta = puedeComprar(mejora)

          return (
            <div
              key={mejora.id}
              className={`mejora-card ${mejora.tipo} ${comprada ? 'comprada' : ''}`}
            >
              <div className="mejora-header">
                <span className="mejora-icono">
                  {mejora.tipo === 'pasiva' ? '💎' :
                   mejora.tipo === 'activa' ? '⚡' :
                   mejora.tipo === 'temporal' ? '⏱️' : '🧪'}
                </span>
                <h4>{mejora.nombre}</h4>
              </div>
              <p className="mejora-desc">{mejora.descripcion}</p>
              <div className="mejora-beneficio">
                <span className="beneficio-label">Beneficio:</span>
                <span className="beneficio-valor">
                  {Object.entries(mejora.beneficio).map(([key, value]) => (
                    <span key={key}>
                      {key}: {typeof value === 'number' ? `${(value * 100).toFixed(0)}%` : '✓'}
                    </span>
                  ))}
                </span>
              </div>
              <div className="mejora-footer">
                {comprada ? (
                  <span className="comprada-tag">✓ Comprada</span>
                ) : (
                  <>
                    <span className={`mejora-costo ${puedeComprarEsta ? 'puede' : 'no-puede'}`}>
                      🪙 {mejora.costo}
                    </span>
                    <button
                      className={`comprar-btn ${puedeComprarEsta ? 'habilitado' : 'deshabilitado'}`}
                      onClick={() => puedeComprarEsta && comprarMejora(mejora.id)}
                      disabled={!puedeComprarEsta}
                    >
                      Comprar
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mejoras compradas */}
      {jugador.mejoras?.length > 0 && (
        <section className="mejoras-compradas">
          <h3>🎒 Tus Mejoras Activas</h3>
          <div className="mejoras-activas-list">
            {jugador.mejoras.map((mejora, idx) => (
              <div key={idx} className="mejora-activa-item">
                <span className="mejora-activa-icono">✓</span>
                <span className="mejora-activa-nombre">{mejora.nombre}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info de gastos */}
      <section className="gastos-info">
        <h3>💸 Tus Gastos Totales</h3>
        <p className="gastos-monto">${jugador.finanzas?.gastosTotales || 0}</p>
        <p className="gastos-help">
          Registrá gastos en la sección Cuentas para completar misiones y ganar cashback
        </p>
      </section>
    </div>
  )
}

export default Tienda
