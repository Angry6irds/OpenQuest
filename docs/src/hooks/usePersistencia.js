import { useState, useEffect } from 'react'

const CLAVE_GUARDADO = 'openquest_guardado_v1'
const CLAVE_USUARIOS = 'openquest_usuarios'
const CLAVE_SESION = 'openquest_sesion_actual'

const estadoInicial = {
  jugador: {
    nombre: 'Explorador',
    nivel: 1,
    xp: 0,
<<<<<<< HEAD
    xpParaSiguienteNivel: 100,
    moneda: 0,
=======
    xpParaSiguienteNivel: 50,
    moneda: 100,
>>>>>>> origin/main
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
<<<<<<< HEAD
    saldo: 200,
=======
    saldo: 50,
>>>>>>> origin/main
    ahorroTotal: 0,
    inversionTotal: 0,
    gastosTotales: 0,
    ahorrosEnApartados: 0
  },
  misiones: {
    nivelDesbloqueado: 1,
    misionesCompletadas: [],
    misionesActivas: [1, 2, 3]
  },
  mejoras: [],
  ultimoAcceso: null
}

function hashSimple(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return hash.toString(36)
}

function obtenerUsuarios() {
  try {
    const data = localStorage.getItem(CLAVE_USUARIOS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
}

export function registrarUsuario(nombre, password, umamusume) {
  const usuarios = obtenerUsuarios()
  const username = nombre.trim().replace(/\s+/g, '') + '_' + (umamusume || 'Torena')

  if (usuarios.find(u => u.username === username)) {
    return { error: 'Este nombre de usuario ya existe. Intenta con otro nombre.' }
  }

  const nuevoUsuario = {
    username,
    passwordHash: hashSimple(password),
    nombre,
    umamusume: umamusume || 'Torena',
    createdAt: new Date().toISOString()
  }

  usuarios.push(nuevoUsuario)
  guardarUsuarios(usuarios)
  return { success: true, username }
}

export function iniciarSesion(username, password) {
  const usuarios = obtenerUsuarios()
  const usuario = usuarios.find(u => u.username === username)

  if (!usuario) {
    return { error: 'Usuario no encontrado.' }
  }

  if (usuario.passwordHash !== hashSimple(password)) {
    return { error: 'Contraseña incorrecta.' }
  }

  localStorage.setItem(CLAVE_SESION, JSON.stringify({ username, nombre: usuario.nombre }))
  return { success: true, usuario }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
  localStorage.removeItem(CLAVE_GUARDADO)
}

export function obtenerSesion() {
  try {
    const data = localStorage.getItem(CLAVE_SESION)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function hayUsuariosRegistrados() {
  return obtenerUsuarios().length > 0
}

export function usePersistencia() {
  const [estado, setEstado] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_GUARDADO)
      if (guardado) {
        const parsed = JSON.parse(guardado)
<<<<<<< HEAD
        const sesion = obtenerSesion()
        if (sesion) {
          parsed.jugador.nombre = sesion.nombre
=======
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
>>>>>>> origin/main
        }
        return parsed
      }
    } catch (e) {
      console.error('Error al cargar guardado:', e)
    }
    const inicial = { ...estadoInicial }
    const sesion = obtenerSesion()
    if (sesion) {
      inicial.jugador.nombre = sesion.nombre
    }
    return inicial
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

  const agregarMonedas = (cantidad) => {
    actualizarJugador({ moneda: estado.jugador.moneda + cantidad })
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
    agregarMonedas,
    resetearProgreso
  }
}