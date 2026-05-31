import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 获取用户资料
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* 侧边栏 */}
      <aside className="w-64 border-r bg-muted/50">
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-bold">管理后台</h2>
        </div>
        <nav className="space-y-1 p-4">
          <a
            href="/admin"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            仪表盘
          </a>
          <a
            href="/admin/posts"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            文章管理
          </a>
          <a
            href="/admin/projects"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            项目管理
          </a>
          <a
            href="/admin/media"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            媒体库
          </a>
          <a
            href="/admin/settings"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            设置
          </a>
        </nav>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-xl font-semibold">管理后台</h1>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            返回网站
          </Link>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
