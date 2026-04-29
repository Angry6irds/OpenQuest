import { useState } from 'react'

function Misiones({ jugador, niveles, completarMision }) {
  const [nivelSeleccionado, setNivelSeleccionado] = useState(1)
  const [filtro, setFiltro] = useState('todas')

  const nivelActual = niveles[nivelSeleccionado]
  const nivelSiguiente = niveles[nivelSeleccionado + 1]
  const misionesCompletadasTotal = jugador.misiones?.misionesCompletadas?.length || 0

  const puedeAccederNivel = (nivel) => {
    if (nivel === 1) return true
    const nivelAnterior = niveles[nivel - 1]
    const misionesNecesarias = nivelAnterior?.requisitoDesbloqueo?.misionesCompletadas || 0
    return misionesCompletadasTotal >= misionesNecesarias && jugador.nivel >= nivel
  }

  const calcularProgresoMision = (mision) => {
    const finanzas = jugador.finanzas || {}

    switch(mision.requisito.tipo) {
      case 'ahorro':
        return {
          actual: finanzas.ahorroTotal || 0,
          meta: mision.requisito.cantidad,
          completado: (finanzas.ahorroTotal || 0) >= mision.requisito.cantidad
        }
      case 'gasto':
        return {
          actual: finanzas.gastosTotales || 0,
          meta: mision.requisito.cantidad,
          completado: (finanzas.gastosTotales || 0) >= mision.requisito.cantidad
        }
      case 'deposito':
        return {
          actual: finanzas.saldo || 0,
          meta: mision.requisito.cantidad,
          completado: (finanzas.saldo || 0) >= mision.requisito.cantidad
        }
      case 'apartado':
        return {
          actual: finanzas.ahorrosEnApartados || 0,
          meta: mision.requisito.cantidad,
          completado: (finanzas.ahorrosEnApartados || 0) >= mision.requisito.cantidad
        }
      case 'inversion':
        return {
          actual: finanzas.inversionTotal || 0,
          meta: mision.requisito.cantidad,
          completado: (finanzas.inversionTotal || 0) >= mision.requisito.cantidad
        }
      case 'patrimonio':
        const patrimonio = (finanzas.ahorroTotal || 0) + (finanzas.inversionTotal || 0)
        return {
          actual: patrimonio,
          meta: mision.requisito.cantidad,
          completado: patrimonio >= mision.requisito.cantidad
        }
      case 'racha':
        return {
          actual: jugador.racha || 0,
          meta: mision.requisito.dias,
          completado: (jugador.racha || 0) >= mision.requisito.dias
        }
      case 'minijuego':
      case 'test':
      case 'activar':
        // Estos se completan manualmente
        return {
          actual: 0,
          meta: 1,
          completado: false
        }
      default:
        return { actual: 0, meta: 1, completado: false }
    }
  }

  const misionesFiltradas = nivelActual.misiones.filter(m => {
    if (filtro === 'todas') return true
    if (filtro === 'completadas') return jugador.misiones?.misionesCompletadas?.includes(m.id)
    if (filtro === 'pendientes') return !jugador.misiones?.misionesCompletadas?.includes(m.id)
    if (filtro === 'disponibles') {
      const progreso = calcularProgresoMision(m)
      return !jugador.misiones?.misionesCompletadas?.includes(m.id) && progreso.actual > 0
    }
    return m.categoria === filtro
  })

  return (
    <div className="misiones">
      <header className="misiones-header">
        <h2>⚔️ Centro de Misiones y Recompensas</h2>
        <p className="subtitle">Completá retos financieros y ganá recompensas</p>
      </header>

      {/* Selector de niveles */}
      <div className="niveles-selector">
        {Object.values(niveles).map(nivel => {
          const accesible = puedeAccederNivel(nivel.requisitoDesbloqueo.nivel)
          const esEsteNivel = nivelSeleccionado === nivel.requisitoDesbloqueo.nivel

          return (
            <button
              key={nivel.requisitoDesbloqueo.nivel}
              className={`nivel-btn ${esEsteNivel ? 'activo' : ''} ${!accesible ? 'bloqueado' : ''}`}
              onClick={() => accesible && setNivelSeleccionado(nivel.requisitoDesbloqueo.nivel)}
              disabled={!accesible}
            >
              <span className="nivel-icono">{accesible ? '🔓' : '🔒'}</span>
              <span className="nivel-nombre">{nivel.titulo.split(' ')[2]}</span>
            </button>
          )
        })}
      </div>

      {/* Info del nivel */}
      <div className="nivel-info-card">
        <h3>{nivelActual.titulo}</h3>
        <p>{nivelActual.descripcion}</p>
        {nivelSiguiente && (
          <p className="nivel-requisito">
            Para desbloquear el siguiente nivel: completá {nivelSiguiente.requisitoDesbloqueo.misionesCompletadas} misiones
          </p>
        )}
      </div>

      {/* Filtros */}
      <div className="filtro-misiones">
        <button
          className={`filtro-btn ${filtro === 'todas' ? 'activo' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        <button
          className={`filtro-btn ${filtro === 'disponibles' ? 'activo' : ''}`}
          onClick={() => setFiltro('disponibles')}
        >
          En Progreso
        </button>
        <button
          className={`filtro-btn ${filtro === 'pendientes' ? 'activo' : ''}`}
          onClick={() => setFiltro('pendientes')}
        >
          Pendientes
        </button>
        <button
          className={`filtro-btn ${filtro === 'completadas' ? 'activo' : ''}`}
          onClick={() => setFiltro('completadas')}
        >
          Completadas
        </button>
      </div>

      {/* Lista de misiones */}
      <div className="misiones-list">
        {misionesFiltradas.map(mision => {
          const completada = jugador.misiones?.misionesCompletadas?.includes(mision.id)
          const progreso = calcularProgresoMision(mision)
          const porcentajeProgreso = (progreso.actual / progreso.meta) * 100
          const puedeCompletar = progreso.completado && !completada

          return (
            <div
              key={mision.id}
              className={`mision-card ${mision.dificultad} ${completada ? 'completada' : ''} ${!completada && !puedeCompletar ? 'bloqueada' : ''}`}
            >
              <div className="mision-content">
                <h3>{mision.titulo}</h3>
                <p>{mision.descripcion}</p>

                {/* Barra de progreso */}
                {!completada && (
                  <div className="progreso-mision">
                    <div className="progreso-barra-mision">
                      <div
                        className={`progreso-fill-mision ${puedeCompletar ? 'listo' : ''}`}
                        style={{ width: `${Math.min(porcentajeProgreso, 100)}%` }}
                      />
                    </div>
                    <p className="progreso-texto">
                      ${progreso.actual} / ${mision.requisito.tipo === 'racha' ? `${mision.requisito.dias} días` : `$${mision.requisito.cantidad}`}
                      {puedeCompletar && <span className="listo-tag"> ✅ Listo para completar</span>}
                    </p>
                  </div>
                )}

                <div className="mision-details">
                  <span className={`badge-dificultad ${mision.dificultad}`}>
                    {mision.dificultad}
                  </span>
                  <span className="categoria">📁 {mision.categoria}</span>
                </div>
              </div>

              <div className="mision-rewards">
                <div className="rewards">
                  <span className="xp">✨ +{mision.recompensaXP} XP</span>
                  <span className="coins">🪙 +{mision.recompensaMonedas}</span>
                </div>
                {!completada ? (
                  <button
                    className={`completar-btn ${puedeCompletar ? 'habilitado' : 'deshabilitado'}`}
                    onClick={() => puedeCompletar && completarMision(mision.id, nivelSeleccionado)}
                    disabled={!puedeCompletar}
                  >
                    ✅ Completar
                  </button>
                ) : (
                  <span className="completada-tag">✓ Completada</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progreso total */}
      <div className="progreso-total">
        <h3>📊 Tu Progreso Global</h3>
        <p>
          {misionesCompletadasTotal} de {Object.values(niveles).reduce((acc, n) => acc + n.misiones.length, 0)} misiones completadas
        </p>
        <div className="progreso-barra">
          <div
            className="progreso-fill"
            style={{
              width: `${(misionesCompletadasTotal / Object.values(niveles).reduce((acc, n) => acc + n.misiones.length, 0)) * 100}%`
            }}
          />
        </div>
        <p className="nivel-actual-info">
          Nivel actual: {jugador.nivel} | Siguiente nivel en: {Object.values(niveles)[jugador.nivel]?.requisitoDesbloqueo.misionesCompletadas - misionesCompletadasTotal || 0} misiones
        </p>
      </div>
    </div>
  )
}

export default Misiones
