import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'XFlix', template: '%s | XFlix' },
  description: '영화·TV 탐색 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-black text-white'>{children}</body>
    </html>
  )
}
