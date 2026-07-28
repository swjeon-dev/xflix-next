import type { Metadata } from 'next'

import './globals.css'

import { apiValidCheck } from '@/shared'
import { GlobalModalContainer, ModalProvider } from '@/application/providers'
import { AppHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

export const metadata: Metadata = {
  title: { default: 'XFlix', template: '%s | XFlix' },
  description: '영화·TV 탐색 서비스',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await apiValidCheck()

  if (auth.error) {
    throw new Error('API_AUTH')
  }

  return (
    <html lang='ko'>
      <body className='min-h-screen bg-black text-white'>
        <ModalProvider>
          <div className='min-h-screen bg-black'>
            <AppHeader />
            <main>{children}</main>
            <Footer />
            {/* <ScrollRestoration /> */}
          </div>
          <GlobalModalContainer />
        </ModalProvider>
      </body>
    </html>
  )
}
