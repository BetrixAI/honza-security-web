import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SecurityShield - Platforma pro Security Awareness',
  description: 'Moderní platforma pro vzdělávání v oblasti kybernetické bezpečnosti. Zakupte si exkluzivní vzdělávací videa pro vaši firmu.',
  keywords: 'security awareness, kybernetická bezpečnost, vzdělávací videa, firemní školení',
  authors: [{ name: 'SecurityShield Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className="dark">
      <head>
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js"></script>
      </head>
      <body className={`${inter.className} text-white antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
} 