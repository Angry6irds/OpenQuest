import { useState } from 'react'
import { solicitarRecuperacionPassword } from '../hooks/usePersistencia'

function RecuperarPassword({ onVolverLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    const resultado = await solicitarRecuperacionPassword(email)

    setLoading(false)

    if (resultado.error) {
      setError(resultado.error)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card login-card">
        <div className="auth-header">
          <h1>🎮 OpenQuest</h1>
          <p className="auth-subtitle">Recuperar Contraseña</p>
        </div>

        {!success ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
              Ingresa el correo con el que te registraste y te enviaremos un enlace para cambiar tu contraseña.
            </p>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
              />
            </div>

            {error && (
              <div className="auth-error">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Enviando enlace...' : '📩 Enviar enlace'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--success)' }}>¡Enlace enviado!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Revisa tu bandeja de entrada (o la carpeta de Spam) y haz clic en el enlace para cambiar tu contraseña.
            </p>
          </div>
        )}

        <div className="auth-footer">
          <p>
            <button className="auth-link" onClick={onVolverLogin}>
              ⬅️ Volver a Inicio de sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecuperarPassword
