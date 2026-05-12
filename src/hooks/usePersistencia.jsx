import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const estadoInicial = {
  jugador: {
    nombre: 'Explorador',
    nivel: 1,
    xp: 0,
    xpParaSiguienteNivel: 100,
    moneda: 0,
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
    saldo: 200,
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

export async function registrarUsuario(nombre, email, password, umamusume) {
  const username = nombre.trim().replace(/\s+/g, '') + '_' + (umamusume || 'Torena')
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, nombre, umamusume }
    }
  })

  if (error) {
    let msg = error.message
    if (msg.includes('already registered')) msg = 'Este correo electrónico ya está registrado.'
    return { error: msg }
  }

  // Crear perfil en la base de datos
  const inicial = { ...estadoInicial }
  inicial.jugador.nombre = nombre
  const { error: dbError } = await supabase.from('perfiles').insert({
    id: data.user.id,
    estado: inicial
  })

  if (dbError) {
    console.error('Error al crear perfil:', dbError)
    // No bloqueamos el registro, pero el perfil se creará cuando inicie sesión si falla
  }

  return { success: true, username }
}

export async function iniciarSesion(identificador, password) {
  if (!identificador.includes('@')) {
    return { error: 'Por favor, inicia sesión usando tu correo electrónico.' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: identificador,
    password
  })

  if (error) {
    let msg = error.message
    if (msg.includes('Invalid login')) msg = 'Correo o contraseña incorrectos.'
    return { error: msg }
  }

  return { success: true, usuario: data.user.user_metadata }
}

export async function cerrarSesion() {
  await supabase.auth.signOut()
}

export async function solicitarRecuperacionPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname,
  })
  if (error) return { error: error.message }
  return { success: true }
}

export async function actualizarPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: error.message }
  return { success: true }
}

export function usePersistencia() {
  const [estado, setEstado] = useState(estadoInicial)
  const [cargandoDatos, setCargandoDatos] = useState(true)

  useEffect(() => {
    async function cargarDatos() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setCargandoDatos(false)
        return
      }

      const { data, error } = await supabase
        .from('perfiles')
        .select('estado')
        .eq('id', session.user.id)
        .single()

      if (data && data.estado) {
        setEstado(prev => ({ ...prev, ...data.estado }))
      } else if (error && error.code === 'PGRST116') {
        // No existe el perfil, lo creamos
        const inicial = { ...estadoInicial }
        inicial.jugador.nombre = session.user.user_metadata.nombre || 'Explorador'
        await supabase.from('perfiles').insert({
          id: session.user.id,
          estado: inicial
        })
        setEstado(inicial)
      }
      setCargandoDatos(false)
    }

    cargarDatos()

    // Suscribirse a cambios de sesión por si recarga
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        cargarDatos()
      } else if (event === 'SIGNED_OUT') {
        setEstado(estadoInicial)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (cargandoDatos) return

    const guardar = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        await supabase.from('perfiles').upsert({
          id: session.user.id,
          estado: estado
        })
      }
    }

    // Usamos un debounce de 1 segundo para no hacer peticiones a la BD en cada clic
    const timeoutId = setTimeout(() => {
      guardar()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [estado, cargandoDatos])

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

  return {
    estado,
    cargandoDatos,
    actualizarJugador,
    actualizarFinanzas,
    actualizarMisiones,
    agregarMejora,
    gastarMonedas,
    agregarMonedas
  }
}