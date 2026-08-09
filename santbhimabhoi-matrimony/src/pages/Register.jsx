import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_ROUTE } from '../constants/routes'
import { registerUser } from '../slice/Registration'
import { getFieldErrors, logSchemaValidationError, registrationSchema } from '../schemas/auth'

const initialForm = {
  full_name: '',
  email: '',
  password: '',
  sex: '',
  age: '',
  mother_full_name: '',
  father_full_name: '',
  education: '',
  address: '',
  is_job: 'no',
}

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.registration)
  const [form, setForm] = useState(initialForm)
  const [image, setImage] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validation = registrationSchema.safeParse({ ...form, image })
    if (!validation.success) {
      logSchemaValidationError('Registration', validation.error)
      setFieldErrors(getFieldErrors(validation.error))
      return
    }

    setFieldErrors({})

    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (value !== '') payload.append(key, value)
    })
    payload.append('image', image)

    const result = await dispatch(registerUser(payload))
    if (registerUser.fulfilled.match(result)) {
      navigate(LOGIN_ROUTE)
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card register-card">
        <p className="eyebrow">Create profile</p>
        <h2>Register</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Full name</span>
            <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Enter your full name" required aria-invalid={Boolean(fieldErrors.full_name)} />
            {fieldErrors.full_name ? <small role="alert">{fieldErrors.full_name}</small> : null}
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required aria-invalid={Boolean(fieldErrors.email)} />
            {fieldErrors.email ? <small role="alert">{fieldErrors.email}</small> : null}
          </label>

          <label>
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" required aria-invalid={Boolean(fieldErrors.password)} />
            {fieldErrors.password ? <small role="alert">{fieldErrors.password}</small> : null}
          </label>

          <label>
            <span>Profile type</span>
            <select name="sex" value={form.sex} onChange={handleChange} required aria-invalid={Boolean(fieldErrors.sex)}>
              <option value="" disabled>Select profile type</option>
              <option value="Female">Bride</option>
              <option value="Male">Groom</option>
              <option value="Widow">Widow</option>
            </select>
            {fieldErrors.sex ? <small role="alert">{fieldErrors.sex}</small> : null}
          </label>

          <label>
            <span>Age</span>
            <input type="number" name="age" value={form.age} onChange={handleChange} min="18" max="100" required aria-invalid={Boolean(fieldErrors.age)} />
            {fieldErrors.age ? <small role="alert">{fieldErrors.age}</small> : null}
          </label>

          <label>
            <span>Father's full name</span>
            <input name="father_full_name" value={form.father_full_name} onChange={handleChange} required aria-invalid={Boolean(fieldErrors.father_full_name)} />
            {fieldErrors.father_full_name ? <small role="alert">{fieldErrors.father_full_name}</small> : null}
          </label>

          <label>
            <span>Mother's full name</span>
            <input name="mother_full_name" value={form.mother_full_name} onChange={handleChange} required aria-invalid={Boolean(fieldErrors.mother_full_name)} />
            {fieldErrors.mother_full_name ? <small role="alert">{fieldErrors.mother_full_name}</small> : null}
          </label>

          <label>
            <span>Profile photo</span>
            <input type="file" accept="image/*" onChange={(event) => { setImage(event.target.files?.[0] ?? null); setFieldErrors((current) => ({ ...current, image: undefined })) }} required aria-invalid={Boolean(fieldErrors.image)} />
            {fieldErrors.image ? <small role="alert">{fieldErrors.image}</small> : null}
          </label>

          <label>
            <span>Education (optional)</span>
            <input name="education" value={form.education} onChange={handleChange} />
          </label>

          <label>
            <span>Address (optional)</span>
            <input name="address" value={form.address} onChange={handleChange} />
          </label>

          <label>
            <span>Currently employed?</span>
            <select name="is_job" value={form.is_job} onChange={handleChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>

          {error ? <p role="alert">{error}</p> : null}
          <button type="submit" className="primary-btn full-width" disabled={loading}>
            {loading ? 'Creating profile...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to={LOGIN_ROUTE}>Login</Link>
        </p>
      </div>
    </section>
  )
}
