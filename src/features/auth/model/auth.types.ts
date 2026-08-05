type AuthType = 'login' | 'join'
type ValidationErrorId = 'email' | 'name' | 'password' | 'password-confirm'

type ValidationError = {
  id: ValidationErrorId
  message: string
} | null
export type { ValidationErrorId, ValidationError, AuthType }
