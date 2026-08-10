'use client'

import { createContext } from 'react'
import { AuthContextProps } from './auth.types'

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  loading: true,
  refreshUser: async () => {},
})

export default AuthContext
