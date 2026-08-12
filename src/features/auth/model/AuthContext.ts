'use client'

import { createContext } from 'react'
import type { AuthContextProps } from './auth.types'

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  loading: true,
  refreshUser: async () => null,
  clearUser: () => {},
})

export default AuthContext
