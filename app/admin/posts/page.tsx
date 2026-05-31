import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function AdminPostsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select(
      `
      *,
      category:categories(name)
    `
    )
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">文章管理</h1>
        <Button asChild>
          <Link href="/admin/posts/new">创建文章</Link>
        </Button>
      </div>

      {!posts || posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            暂无文章，点击上方按钮创建第一篇文章
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{post.title}</CardTitle>
                    <CardDescription>
                      {post.excerpt || '暂无摘要'}
                    </CardDescription>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {post.status === 'published' ? '已发布' : '草稿'}
                      </span>
                      {post.category && <span>{post.category.name}</span>}
                      <span>{formatDate(post.created_at)}</span>
                      <span>{post.view_count} 次浏览</span>
                      <span>{post.like_count} 个赞</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/posts/${post.id}/edit`}>编辑</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        预览
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
