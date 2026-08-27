import './globals.css'
import type { Metadata, Viewport } from 'next'

import { cookies } from 'next/headers'
import { apiValidCheck } from '@/shared'
import { createClient } from '@/shared/api/supabase/server'
import {
  GlobalModalContainer,
  ModalProvider,
  AuthProvider,
} from '@/application/providers'
import { AppHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

export const metadata: Metadata = {
  title: { default: 'XFlix', template: '%s | XFlix' },
  description: '영화·TV 탐색 서비스',
}

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { error } = await apiValidCheck()

  if (error) {
    throw new Error(error)
  }

  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang='ko'>
      <body className='min-h-screen bg-black text-white'>
        <AuthProvider initialUser={user}>
          <ModalProvider>
            <div className='min-h-screen bg-black'>
              <AppHeader />
              <main>{children}</main>
              <Footer />
              {/* <ScrollRestoration /> */}
            </div>
            <GlobalModalContainer />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
