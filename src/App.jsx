import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Misiones from './components/Misiones'
import Cuentas from './components/Cuentas'
import Ahorro from './components/Ahorro'
import Inversion from './components/Inversion'
import Tienda from './components/Tienda'
import MiniJuegos from './components/MiniJuegos'
import Login from './components/Login'
import Registro from './components/Registro'
import RecuperarPassword from './components/RecuperarPassword'
import NuevaPassword from './components/NuevaPassword'
import PersonajePanel from './components/PersonajePanel'
import { usePersistencia, cerrarSesion } from './hooks/usePersistencia.jsx'
import { supabase } from './supabaseClient'
import { NIVELES_MISIONES, INSIGNIAS, MEJORAS } from './data/misiones'
import './App.css'

function App() {
  const [vistaActual, setVistaActual] = useState('dashboard')
  const [vistaAutenticacion, setVistaAutenticacion] = useState('cargando')
  const {
    estado,
    cargandoDatos,
    actualizarJugador,
    actualizarFinanzas,
    actualizarMisiones,
    agregarMejora,
    gastarMonedas,
    agregarMonedas
  } = usePersistencia()

  const [notificaciones, setNotificaciones] = useState([])

  useEffect(() => {
    // Si la URL contiene un token de recuperación, forzamos la vista
    if (window.location.hash.includes('type=recovery')) {
      setVistaAutenticacion('nueva-password')
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setVistaAutenticacion(prev => {
        // No sobreescribir si ya estamos en modo recuperación
        if (prev === 'nueva-password') return prev
        return session ? null : 'login'
      })
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setVistaAutenticacion('nueva-password')
      } else if (event === 'SIGNED_IN') {
        setVistaAutenticacion(prev => prev === 'nueva-password' ? prev : null)
      } else if (event === 'SIGNED_OUT') {
        setVistaAutenticacion('login')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    verificarInsignias()
  }, [estado.jugador.nivel, estado.misiones.misionesCompletadas, estado.finanzas])

  const agregarNotificacion = (mensaje, tipo = 'info') => {
    const id = Date.now() + Math.random()
    setNotificaciones(prev => [...prev, { id, mensaje, tipo }])
    setTimeout(() => {
      setNotificaciones(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  const verificarInsignias = () => {
    const nuevasInsignias = []
    INSIGNIAS.forEach(insignia => {
      if (!estado.jugador.insignias?.find(i => i.id === insignia.id)) {
        let obtenida = false
        if (insignia.requisito.misionesCompletadas &&
            estado.misiones.misionesCompletadas?.length >= insignia.requisito.misionesCompletadas) {
          obtenida = true
        }
        if (insignia.requisito.racha &&
            estado.jugador.racha >= insignia.requisito.racha) {
          obtenida = true
        }
        if (obtenida) {
          nuevasInsignias.push(insignia)
        }
      }
    })

    if (nuevasInsignias.length > 0) {
      actualizarJugador({ insignias: [...(estado.jugador.insignias || []), ...nuevasInsignias] })
      nuevasInsignias.forEach(insignia => {
        agregarNotificacion(`🏅 Nueva insignia: ${insignia.nombre}`, 'logro')
      })
    }
  }

  const agregarXP = (cantidad) => {
    const xpBoost = estado.mejoras?.find(m => m.id === 'xp_boost' && m.activo)
    const cantidadFinal = xpBoost ? Math.floor(cantidad * 1.25) : cantidad

    actualizarJugador({
      xp: estado.jugador.xp + cantidadFinal
    })

    const xpSiguienteNivel = Math.floor(50 * Math.pow(1.8, estado.jugador.nivel - 1))
    
    if (estado.jugador.xp + cantidadFinal >= xpSiguienteNivel) {
      const nuevoNivel = estado.jugador.nivel + 1
      const xpRestante = estado.jugador.xp + cantidadFinal - xpSiguienteNivel
      actualizarJugador({
        nivel: nuevoNivel,
        xp: xpRestante,
        moneda: estado.jugador.moneda + 50
      })
      agregarNotificacion(`✨ Subiste al nivel ${nuevoNivel}!`, 'nivel')
      verificarDesbloqueoNivel(nuevoNivel)
    }
  }

  const verificarDesbloqueoNivel = (nivel) => {
    if (NIVELES_MISIONES[nivel + 1]) {
      const nivelSiguiente = NIVELES_MISIONES[nivel + 1]
      if (estado.jugador.nivel >= nivelSiguiente.xpParaDesbloquear / 10) {
        actualizarMisiones({ nivelDesbloqueado: nivel + 1 })
        agregarNotificacion(`🔓 Nuevo nivel de misiones desbloqueado!`, 'desbloqueo')
      }
    }
  }

  const completarMision = (misionId, nivelId) => {
    const mision = NIVELES_MISIONES[nivelId].misiones.find(m => m.id === misionId)
    if (!mision || estado.misiones.misionesCompletadas?.includes(misionId)) return

    const finanzas = estado.finanzas
    let cumplio = false

    switch(mision.requisito.tipo) {
      case 'ahorro':
        cumplio = finanzas.ahorroTotal >= mision.requisito.cantidad
        break
      case 'gasto':
        cumplio = finanzas.gastosTotales >= mision.requisito.cantidad
        break
      case 'deposito':
        cumplio = finanzas.saldo >= mision.requisito.cantidad
        break
      case 'apartado':
        cumplio = finanzas.ahorrosEnApartados >= mision.requisito.cantidad
        break
      case 'inversion':
        cumplio = finanzas.inversionTotal >= mision.requisito.cantidad
        break
      case 'patrimonio':
        cumplio = (finanzas.ahorroTotal + finanzas.inversionTotal) >= mision.requisito.cantidad
        break
      case 'completarEncuesta':
      case 'referido':
      case 'verTutorial':
        cumplio = true
        break
      default:
        cumplio = true
    }

    if (!cumplio) {
      agregarNotificacion('⚠️ Aún no cumpliste los requisitos', 'error')
      return
    }

    const nuevasCompletadas = [...(estado.misiones.misionesCompletadas || []), misionId]
    actualizarMisiones({ misionesCompletadas: nuevasCompletadas })
    
    if (mision.requisito.tipo === 'completarEncuesta') {
      actualizarFinanzas({ saldo: estado.finanzas.saldo + 50 })
    } else if (mision.requisito.tipo === 'referido') {
      actualizarFinanzas({ saldo: estado.finanzas.saldo + 30 })
    }
    
    agregarXP(mision.recompensaXP)
    actualizarJugador({ moneda: estado.jugador.moneda + mision.recompensaMonedas })
    agregarNotificacion(`✅ Misión completada: +${mision.recompensaXP} XP, +${mision.recompensaMonedas} 🪙`, 'exito')

    if (nuevasCompletadas.length === 1) {
      const pionero = INSIGNIAS.find(i => i.id === 'pionero')
      if (!estado.jugador.insignias?.find(i => i.id === 'pionero')) {
        actualizarJugador({ insignias: [...(estado.jugador.insignias || []), pionero] })
        agregarNotificacion(`🏅 Nueva insignia: ${pionero.nombre}`, 'logro')
      }
    }
  }

  const comprarComida = (cantidad, descripcion, energiaRecuperada) => {
    if (estado.finanzas.saldo < cantidad) {
      agregarNotificacion('⚠️ No tienes suficiente saldo', 'error')
      return
    }

    actualizarFinanzas({
      saldo: estado.finanzas.saldo - cantidad,
      gastosTotales: estado.finanzas.gastosTotales + cantidad
    })

    const nuevaEnergia = Math.min(100, (estado.jugador.energia || 0) + energiaRecuperada)
    actualizarJugador({ energia: nuevaEnergia })

    agregarNotificacion(`🍖 Compraste ${descripcion}: +${energiaRecuperada}⚡`, 'exito')
  }

  const comprarEntretenimiento = (cantidad, descripcion, felicidadRecuperada) => {
    if (estado.finanzas.saldo < cantidad) {
      agregarNotificacion('⚠️ No tienes suficiente saldo', 'error')
      return
    }

    actualizarFinanzas({
      saldo: estado.finanzas.saldo - cantidad,
      gastosTotales: estado.finanzas.gastosTotales + cantidad
    })

    const nuevaFelicidad = Math.min(100, (estado.jugador.felicidad || 0) + felicidadRecuperada)
    actualizarJugador({ felicidad: nuevaFelicidad })

    agregarNotificacion(`🎪 Disfrutaste ${descripcion}: +${felicidadRecuperada}😊`, 'exito')
  }

  const registrarDeposito = (cantidad) => {
    const ahorroAuto = estado.mejoras?.find(m => m.id === 'ahorro_auto')
    const ahorroExtra = ahorroAuto ? Math.floor(cantidad * ahorroAuto.beneficio.ahorroAutomatico) : 0

    actualizarFinanzas({
      saldo: estado.finanzas.saldo + cantidad,
      ahorroTotal: estado.finanzas.ahorroTotal + ahorroExtra
    })
    agregarNotificacion(`💵 Depósito: $${cantidad}${ahorroExtra > 0 ? ` (+$${ahorroExtra} ahorrado)` : ''}`, 'exito')
  }

  const comprarMejora = (mejoraId) => {
    const mejora = MEJORAS.find(m => m.id === mejoraId)
    if (!mejora) return

    if (gastarMonedas(mejora.costo)) {
      agregarMejora({ ...mejora, compradoEn: Date.now() })
      agregarNotificacion(`🛒 Mejora comprada: ${mejora.nombre}`, 'exito')
      return true
    }
    agregarNotificacion('⚠️ No tienes suficientes monedas', 'error')
    return false
  }

  const handleLogout = () => {
    cerrarSesion()
    setVistaAutenticacion('login')
    setVistaActual('dashboard')
    agregarNotificacion('👋 Sesión cerrada', 'info')
  }

  const jugador = {
    ...estado.jugador,
    finanzas: estado.finanzas,
    misiones: estado.misiones,
    mejoras: estado.mejoras
  }

  const renderizarVista = () => {
    switch(vistaActual) {
      case 'dashboard':
        return <Dashboard jugador={jugador} setVistaActual={setVistaActual} completarMision={(mid, nid) => completarMision(mid, 1)} actualizarFinanzas={actualizarFinanzas} nivelActual={estado.jugador.nivel} handleLogout={handleLogout} />
      case 'misiones':
        return (
          <Misiones
            jugador={jugador}
            niveles={NIVELES_MISIONES}
            completarMision={completarMision}
            nivelActual={estado.jugador.nivel}
          />
        )
      case 'cuentas':
        return <Cuentas jugador={jugador} comprarComida={comprarComida} comprarEntretenimiento={comprarEntretenimiento} />
      case 'ahorro':
        return (
          <Ahorro
            jugador={jugador}
            registrarDeposito={registrarDeposito}
            actualizarFinanzas={actualizarFinanzas}
          />
        )
      case 'inversion':
        return <Inversion jugador={jugador} />
      case 'tienda':
        return (
          <Tienda
            jugador={jugador}
            comprarMejora={comprarMejora}
            gastarMonedas={gastarMonedas}
          />
        )
      case 'minijuegos':
        return (
          <MiniJuegos
            jugador={jugador}
            actualizarJugador={actualizarJugador}
            actualizarFinanzas={actualizarFinanzas}
            agregarNotificacion={agregarNotificacion}
          />
        )
      default:
        return <Dashboard jugador={jugador} setVistaActual={setVistaActual} completarMision={(mid, nid) => completarMision(mid, 1)} handleLogout={handleLogout} />
    }
  }

  if (vistaAutenticacion === 'cargando' || (vistaAutenticacion === null && cargandoDatos)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '3rem' }}>⚔️</div>
        <h2>Cargando aventura...</h2>
      </div>
    )
  }

  if (vistaAutenticacion === 'login') {
    return (
      <Login
        onLoginExitoso={() => setVistaAutenticacion(null)}
        onIrRegistro={() => setVistaAutenticacion('registro')}
        onIrRecuperar={() => setVistaAutenticacion('recuperar')}
      />
    )
  }

  if (vistaAutenticacion === 'recuperar') {
    return (
      <RecuperarPassword
        onVolverLogin={() => setVistaAutenticacion('login')}
      />
    )
  }

  if (vistaAutenticacion === 'nueva-password') {
    return (
      <NuevaPassword
        onPasswordActualizada={() => setVistaAutenticacion(null)}
      />
    )
  }

  if (vistaAutenticacion === 'registro') {
    return (
      <Registro
        onRegistroExitoso={() => setVistaAutenticacion(null)}
        onVolverLogin={() => setVistaAutenticacion('login')}
      />
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">🎯 OpenQuest</div>
        <div className="nav-links">
          <button
            className={`nav-btn ${vistaActual === 'dashboard' ? 'activa' : ''}`}
            onClick={() => setVistaActual('dashboard')}
          >
            📊 Inicio
          </button>
          <button
            className={`nav-btn ${vistaActual === 'misiones' ? 'activa' : ''}`}
            onClick={() => setVistaActual('misiones')}
          >
            ⚔️ Misiones
          </button>
          <button
            className={`nav-btn ${vistaActual === 'cuentas' ? 'activa' : ''}`}
            onClick={() => setVistaActual('cuentas')}
          >
            💳 Cuentas
          </button>
          <button
            className={`nav-btn ${vistaActual === 'ahorro' ? 'activa' : ''}`}
            onClick={() => setVistaActual('ahorro')}
          >
            🏦 Ahorro
          </button>
          <button
            className={`nav-btn ${vistaActual === 'inversion' ? 'activa' : ''}`}
            onClick={() => setVistaActual('inversion')}
          >
            📈 Inversión
          </button>
          <button
            className={`nav-btn ${vistaActual === 'minijuegos' ? 'activa' : ''}`}
            onClick={() => setVistaActual('minijuegos')}
          >
            🎮 Minijuegos
          </button>
          <button
            className={`nav-btn ${vistaActual === 'tienda' ? 'activa' : ''}`}
            onClick={() => setVistaActual('tienda')}
          >
            🛒 Tienda
          </button>
        </div>
        <div className="player-info">
          <PersonajePanel 
            jugador={jugador} 
            setVistaActual={setVistaActual}
          />
          <span className="level" style={{marginRight: '0.5rem', background: 'var(--success)', color: 'white'}}>⚡ {jugador.energia || 100}</span>
          <span className="level" style={{marginRight: '0.5rem', background: '#F59E0B', color: 'white'}}>😊 {jugador.felicidad || 100}</span>
          <span className="level">Nvl {jugador.nivel}</span>
          <span className="coins">🪙 {jugador.moneda}</span>
          <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
            🚪
          </button>
        </div>
      </nav>

      <div className="notificaciones">
        {notificaciones.map(notif => (
          <div key={notif.id} className={`notificacion ${notif.tipo}`}>
            {notif.mensaje}
          </div>
        ))}
      </div>

      <main className="main-content">
        {renderizarVista()}
      </main>
    </div>
  )
}

export default App