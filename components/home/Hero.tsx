import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary/50">
          {/* 头像占位符 */}
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-primary-foreground">
            YN
          </div>
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          你好，我是{' '}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
           jinbo
          </span>
        </h1>

        <p className="mb-2 text-xl text-muted-foreground sm:text-2xl">
          全栈开发者 · 技术爱好者
        </p>

        <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
          专注于现代 Web 技术，热衷于构建优雅高效的应用程序。
          擅长 React、Next.js、TypeScript 等前端技术，
          以及 Node.js、PostgreSQL 等后端技术。
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projects">查看项目</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">阅读博客</Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaGithub className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaLinkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaTwitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="mailto:your@email.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaEnvelope className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </section>
  )
}
