import { z } from 'zod'

const requiredText = (label) => z.string().trim().min(1, `${label} is required`)

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const registrationSchema = z.object({
  full_name: requiredText('Full name'),
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  sex: z.enum(['Female', 'Male', 'Widow'], { message: 'Select a profile type' }),
  age: z.coerce.number().int().min(18, 'You must be at least 18 years old').max(100, 'Enter a valid age'),
  mother_full_name: requiredText("Mother's full name"),
  father_full_name: requiredText("Father's full name"),
  education: z.string(),
  address: z.string(),
  is_job: z.enum(['yes', 'no']),
  image: z.any().refine((file) => file instanceof File, 'A profile photo is required'),
})

export function getFieldErrors(error) {
  return error.issues.reduce((errors, issue) => {
    const field = issue.path[0]
    if (field && !errors[field]) errors[field] = issue.message
    return errors
  }, {})
}

export function logSchemaValidationError(formName, error) {
  console.error(`[${formName}] schema validation failed`, error.issues)
}
