import { useState } from 'react'

const UMAMUSUME_OPTIONS = [
  { value: '', label: 'Ninguna / No tengo favorita' },
  { value: 'SpecialWeek', label: 'Special Week' },
  { value: 'SilenceSuzuka', label: 'Silence Suzuka' },
  { value: 'TokaiTeio', label: 'Tokai Teio' },
  { value: 'OguriCap', label: 'Oguri Cap' },
  { value: 'GoldShip', label: 'Gold Ship' },
  { value: 'Vodka', label: 'Vodka' },
  { value: 'DaiwaScarlet', label: 'Daiwa Scarlet' },
  { value: 'MejiroMcQueen', label: 'Mejiro McQueen' },
  { value: 'RiceShower', label: 'Rice Shower' },
  { value: 'BitToken', label: 'Bit Token' },
  { value: 'TwinTurbo', label: 'Twin Turbo' }
]

function Registro({ onRegistroExitoso, onVolverLogin }) {
  const [formData, setFormData] = useState({
    nombre: '',
    password: '',
    passwordConfirm: '',
    umamusume: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

    if (formData.nombre.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.')
      return
    }

    if (formData.password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)

    const { registrarUsuario } = await import('../hooks/usePersistencia')
    const resultado = registrarUsuario(formData.nombre, formData.password, formData.umamusume)

    setLoading(false)

    if (resultado.error) {
      setError(resultado.error)
    } else {
      onRegistroExitoso(resultado.username)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card registro-card">
        <div className="auth-header">
          <h1>🎮 OpenQuest</h1>
          <p className="auth-subtitle">Crea tu cuenta para comenzar</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre real"
              required
              minLength={3}
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
              placeholder="Mínimo 4 caracteres"
              required
              minLength={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Verificar contraseña</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="umamusume">Umamusume favorita (opcional)</label>
            <select
              id="umamusume"
              name="umamusume"
              value={formData.umamusume}
              onChange={handleChange}
            >
              {UMAMUSUME_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <small className="form-help">
              Tu nombre de usuario será: {formData.nombre.trim().replace(/\s+/g, '') || 'Nombre'}_{formData.umamusume || 'Torena'}
            </small>
          </div>

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creando cuenta...' : '🚀 Crear cuenta'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta?{' '}
            <button className="auth-link" onClick={onVolverLogin}>
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registro
