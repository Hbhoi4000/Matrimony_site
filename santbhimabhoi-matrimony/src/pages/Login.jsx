import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HOME_ROUTE, REGISTER_ROUTE } from '../constants/routes'
import { loginUser } from '../slice/loging'
import { getFieldErrors, loginSchema, logSchemaValidationError } from '../schemas/auth'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.login)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validation = loginSchema.safeParse(credentials)
    if (!validation.success) {
      logSchemaValidationError('Login', validation.error)
      setFieldErrors(getFieldErrors(validation.error))
      return
    }

    setFieldErrors({})
    const result = await dispatch(loginUser(credentials))

    if (loginUser.fulfilled.match(result)) {
      navigate(HOME_ROUTE)
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Login</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email ? <small role="alert">{fieldErrors.email}</small> : null}
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              aria-invalid={Boolean(fieldErrors.password)}
            />
            {fieldErrors.password ? <small role="alert">{fieldErrors.password}</small> : null}
          </label>

          {error ? <p role="alert">{error}</p> : null}
          <button type="submit" className="primary-btn full-width" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          New member? <Link to={REGISTER_ROUTE}>Register</Link>
        </p>
      </div>
    </section>
  )
}
