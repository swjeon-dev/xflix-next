import type { User } from '@supabase/supabase-js'

type AuthType = 'login' | 'join'
type ValidationErrorId = 'email' | 'name' | 'password' | 'password-confirm'

type ValidationError = {
  id: ValidationErrorId
  message: string
} | null

interface AuthContextProps {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
  refreshUser: () => Promise<User | null>
  clearUser: () => void
}

export type { ValidationErrorId, ValidationError, AuthType, AuthContextProps }
