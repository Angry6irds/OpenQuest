import { useState } from 'react'
import { actualizarPassword } from '../hooks/usePersistencia'

function NuevaPassword({ onPasswordActualizada }) {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.')
      return
    }

    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)

    const resultado = await actualizarPassword(password)

    setLoading(false)

    if (resultado.error) {
      setError(resultado.error)
    } else {
      window.history.replaceState(null, '', window.location.pathname)
      onPasswordActualizada()
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card login-card">
        <div className="auth-header">
          <h1>🎮 OpenQuest</h1>
          <p className="auth-subtitle">Ingresa tu nueva contraseña</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Nueva contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 4 caracteres"
              required
              minLength={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirmar nueva contraseña</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Actualizando...' : '💾 Guardar y Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NuevaPassword
