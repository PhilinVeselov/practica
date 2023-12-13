import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Регистрация',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <script src='./register.js'></script>
    </html>
  )
}
