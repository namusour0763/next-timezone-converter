import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Timezone Converter',
  description: 'Convert time between JST, UTC, and PDT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}