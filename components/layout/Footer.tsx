import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Your Name</h3>
            <p className="text-sm text-muted-foreground">
              全栈开发者，专注于现代 Web 技术
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">导航</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-foreground"
                >
                  项目
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  博客
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">分类</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog/category/tech"
                  className="text-muted-foreground hover:text-foreground"
                >
                  技术
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/tutorial"
                  className="text-muted-foreground hover:text-foreground"
                >
                  教程
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/thoughts"
                  className="text-muted-foreground hover:text-foreground"
                >
                  思考
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">社交媒体</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
