'use client'
import { useContext } from 'react'

import type { AuthContextProps } from './auth.types'
import AuthContext from './AuthContext'

function useAuth() {
  const context = useContext<AuthContextProps>(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export default useAuth
