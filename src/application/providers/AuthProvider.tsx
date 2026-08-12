'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/shared/api/supabase/client'
import { AuthContext } from '@/features/auth'

function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode
  initialUser?: User | null
}) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [loading, setLoading] = useState(false)

  const supabase = useMemo(() => createClient(), [])

  const refreshUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser()
    const nextUser = data.user ?? null
    setUser(nextUser)
    setLoading(false)
    return nextUser
  }, [supabase])

  const clearUser = useCallback(() => {
    setUser(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const value = useMemo(
    () => ({ user, isLoggedIn: !!user, loading, refreshUser, clearUser }),
    [user, loading, refreshUser, clearUser],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
