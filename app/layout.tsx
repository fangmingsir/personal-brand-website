import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: {
    default: '个人品牌网站',
    template: '%s | 个人品牌网站',
  },
  description: '展示个人经历、项目作品和技术博客',
  keywords: ['个人网站', '作品集', '博客', '开发者'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: '个人品牌网站',
    title: '个人品牌网站',
    description: '展示个人经历、项目作品和技术博客',
  },
  twitter: {
    card: 'summary_large_image',
    title: '个人品牌网站',
    description: '展示个人经历、项目作品和技术博客',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
