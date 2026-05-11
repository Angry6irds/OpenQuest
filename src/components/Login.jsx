import { useState, useEffect } from 'react'
import { iniciarSesion } from '../hooks/usePersistencia'

function Login({ onLoginExitoso, onIrRegistro }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hayUsuarios, setHayUsuarios] = useState(false)

  useEffect(() => {
    // Ya no podemos saber sincrónicamente si hay usuarios, asumimos que sí
    // para no mostrar el mensaje de "primer usuario" por defecto.
    setHayUsuarios(true)
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const resultado = await iniciarSesion(formData.username, formData.password)

    setLoading(false)

    if (resultado.error) {
      setError(resultado.error)
    } else {
      onLoginExitoso(resultado.usuario)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card login-card">
        <div className="auth-header">
          <h1>🎮 OpenQuest</h1>
          <p className="auth-subtitle">Inicia sesión para continuar</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario o Correo electrónico</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ej: Alex_SpecialWeek o tu@correo.com"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Iniciando...' : '🔑 Iniciar sesión'}
          </button>
        </form>

        {!hayUsuarios && (
          <div className="first-user-message">
            <p>🎉 ¡Bienvenido a OpenQuest!</p>
            <p>Parece que eres el primer usuario. Crea tu cuenta para comenzar.</p>
          </div>
        )}

        <div className="auth-footer">
          <p>
            ¿No tienes cuenta?{' '}
            <button className="auth-link" onClick={onIrRegistro}>
              Crear cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
