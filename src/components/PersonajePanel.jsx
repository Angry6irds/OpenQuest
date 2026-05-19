import { useState } from 'react'
import Personaje from './Personaje'
import { ARMAS, obtenerSiguienteEvolucion, puedeEvolucionar } from '../data/armas'

function PersonajePanel({ jugador,setVistaActual }) {
  const [mostrarPanel, setMostrarPanel] = useState(false)
  
  const armaActual = ARMAS.find(a => a.id === jugador.equipo?.arma) || ARMAS[0]
  const siguienteEvolucion = obtenerSiguienteEvolucion(armaActual.id)
  const puedeSubir = puedeEvolucionar(armaActual.id, jugador.nivel)

  const evolucionar = () => {
    if (puedeSubir && siguienteEvolucion) {
      setVistaActual('tienda')
    }
  }

  const getRarityColor = (rarity) => {
    const colores = {
      comun: '#9d9d9d',
      poco_comun: '#1eff00',
      epico: '#a335ee',
      legendario: '#ff8000'
    }
    return colores[rarity] || '#fff'
  }

  return (
    <div className="personaje-panel">
      <button 
        className="personaje-toggle"
        onClick={() => setMostrarPanel(!mostrarPanel)}
      >
        <Personaje 
          equipo={jugador.equipo} 
          apariencia={jugador.apariencia} 
          nivel={jugador.nivel}
          tamanho="chico"
        />
        <span className="personaje-level">{jugador.nivel}</span>
      </button>

      {mostrarPanel && (
        <div className="personaje-modal">
          <div className="personaje-header">
            <h3>🎮 Tu Héroe</h3>
            <button className="close-btn" onClick={() => setMostrarPanel(false)}>✕</button>
          </div>

          <div className="personaje-display">
            <Personaje 
              equipo={jugador.equipo} 
              apariencia={jugador.apariencia} 
              nivel={jugador.nivel}
              tamanho="grande"
            />
          </div>

          <div className="personaje-stats">
            <div className="stat">
              <span className="stat-label">Nivel</span>
              <span className="stat-value">{jugador.nivel}</span>
            </div>
            <div className="stat">
              <span className="stat-label">XP</span>
              <span className="stat-value">{jugador.xp}/{jugador.xpParaSiguienteNivel}</span>
            </div>
          </div>

          <div className="personaje-vitals" style={{marginTop: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)'}}>
            <h4 style={{marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Estado Vital</h4>
            <div className="vital-bar">
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem'}}>
                <span>⚡ Energía</span>
                <span>{jugador.energia || 100}/100</span>
              </div>
              <div style={{height: '8px', background: 'var(--bg-dark)', borderRadius: '4px', overflow: 'hidden'}}>
                <div style={{height: '100%', background: 'var(--success)', width: `${jugador.energia || 100}%`, transition: 'width 0.3s'}} />
              </div>
            </div>
            <div className="vital-bar">
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem'}}>
                <span>😊 Felicidad</span>
                <span>{jugador.felicidad || 100}/100</span>
              </div>
              <div style={{height: '8px', background: 'var(--bg-dark)', borderRadius: '4px', overflow: 'hidden'}}>
                <div style={{height: '100%', background: '#F59E0B', width: `${jugador.felicidad || 100}%`, transition: 'width 0.3s'}} />
              </div>
            </div>
            <div className="vital-bar">
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem'}}>
                <span>😴 Cansancio</span>
                <span>{jugador.cansancio || 0}/100</span>
              </div>
              <div style={{height: '8px', background: 'var(--bg-dark)', borderRadius: '4px', overflow: 'hidden'}}>
                <div style={{height: '100%', background: 'var(--primary)', width: `${jugador.cansancio || 0}%`, transition: 'width 0.3s'}} />
              </div>
            </div>
          </div>

          <div className="equipment-section">
            <h4>⚔️ Arma Actual</h4>
            <div className="arma-card" style={{ borderColor: getRarityColor(armaActual.rarity) }}>
              <div className="arma-info">
                <span className="arma-nombre" style={{ color: getRarityColor(armaActual.rarity) }}>
                  {armaActual.nombre}
                </span>
                <span className="arma-dano">Daño: {armaActual.dano}</span>
                <span className="arma-rarity">{armaActual.rarity.toUpperCase()}</span>
              </div>
            </div>

            {siguienteEvolucion && (
              <div className="evolucion-section">
                <h4>⬆️ Siguiente Evolución</h4>
                <div 
                  className="arma-card siguiente" 
                  style={{ borderColor: puedeSubir ? getRarityColor(siguienteEvolucion.rarity) : '#444' }}
                >
                  <div className="arma-info">
                    <span className="arma-nombre">
                      {siguienteEvolucion.nombre}
                    </span>
                    <span className="arma-dano">Daño: {siguienteEvolucion.dano}</span>
                    <span className="arma-rarity">{siguienteEvolucion.rarity.toUpperCase()}</span>
                    <span className="arma-requiere">
                      Requiere nivel {siguienteEvolucion.nivelRequerido}
                    </span>
                  </div>
                  {puedeSubir ? (
                    <button className="evolucionar-btn" onClick={evolucionar}>
                      💫 Evolucionar
                    </button>
                  ) : (
                    <span className="bloqueado">
                      🔒 Desbloquea en nivel {siguienteEvolucion.nivelRequerido}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <p className="arma-desc">{armaActual.descripcion}</p>
        </div>
      )}
    </div>
  )
}

export default PersonajePanel