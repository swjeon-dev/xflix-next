import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { createClient } from '@/shared/api/supabase/server'
import { getSafeNextPath } from '@/shared/lib'
import { LoginRequiredView } from '@/widgets/login-required'

export const metadata: Metadata = {
  title: '로그인 필요',
}

interface LoginRequiredPageProps {
  searchParams: Promise<{ next?: string }>
}

export default async function LoginRequiredPage({
  searchParams,
}: LoginRequiredPageProps) {
  const { next: rawNext } = await searchParams
  const next = getSafeNextPath(rawNext)

  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(next)
  }

  return <LoginRequiredView />
}
