import { useState, useEffect } from 'react'

const CLAVE_GUARDADO = 'openquest_guardado_v1'

const estadoInicial = {
  jugador: {
    nombre: 'Explorador',
    nivel: 1,
    xp: 0,
    xpParaSiguienteNivel: 50,
    moneda: 100,
    racha: 0,
    insignias: [],
    perfil: 'moderado',
    equipo: {
      arma: 'palo_madera',
      armadura: 'tunica_rota',
      accesorio: null
    },
    apariencia: {
      piel: '#f5c6a1',
      cabello: '#4a3728',
      ropa: '#8b7355'
    }
  },
  finanzas: {
    saldo: 50,
    ahorroTotal: 0,
    inversionTotal: 0,
    gastosTotales: 0,
    ahorrosEnApartados: 0
  },
  misiones: {
    nivelDesbloqueado: 1,
    misionesCompletadas: [],
    misionesActivas: [1, 2, 3] // IDs de misiones disponibles
  },
  mejoras: [],
  ultimoAcceso: null
}

export function usePersistencia() {
  const [estado, setEstado] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_GUARDADO)
      if (guardado) {
        const parsed = JSON.parse(guardado)
        if (!parsed.jugador.equipo) {
          parsed.jugador.equipo = {
            arma: 'palo_madera',
            armadura: 'tunica_rota',
            accesorio: null
          }
        }
        if (!parsed.jugador.apariencia) {
          parsed.jugador.apariencia = {
            piel: '#f5c6a1',
            cabello: '#4a3728',
            ropa: '#8b7355'
          }
        }
        return parsed
      }
    } catch (e) {
      console.error('Error al cargar guardado:', e)
    }
    return estadoInicial
  })

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(estado))
    } catch (e) {
      console.error('Error al guardar:', e)
    }
  }, [estado])

  const actualizarJugador = (nuevoJugador) => {
    setEstado(prev => ({
      ...prev,
      jugador: { ...prev.jugador, ...nuevoJugador }
    }))
  }

  const actualizarFinanzas = (nuevasFinanzas) => {
    setEstado(prev => ({
      ...prev,
      finanzas: { ...prev.finanzas, ...nuevasFinanzas }
    }))
  }

  const actualizarMisiones = (nuevasMisiones) => {
    setEstado(prev => ({
      ...prev,
      misiones: { ...prev.misiones, ...nuevasMisiones }
    }))
  }

  const agregarMejora = (mejora) => {
    setEstado(prev => ({
      ...prev,
      mejoras: [...prev.mejoras, mejora]
    }))
  }

  const gastarMonedas = (cantidad) => {
    if (estado.jugador.moneda >= cantidad) {
      actualizarJugador({ moneda: estado.jugador.moneda - cantidad })
      return true
    }
    return false
  }

  const resetearProgreso = () => {
    localStorage.removeItem(CLAVE_GUARDADO)
    setEstado(estadoInicial)
  }

  return {
    estado,
    actualizarJugador,
    actualizarFinanzas,
    actualizarMisiones,
    agregarMejora,
    gastarMonedas,
    resetearProgreso
  }
}
