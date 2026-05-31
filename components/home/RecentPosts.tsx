import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/blog/PostCard'

export async function RecentPosts() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:profiles(*),
      category:categories(*),
      post_tags(tags(*))
    `
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  if (!posts || posts.length === 0) {
    return null
  }

  // 转换数据结构
  const postsWithDetails = posts.map((post) => ({
    ...post,
    tags: post.post_tags?.map((pt: any) => pt.tags) || [],
  }))

  return (
    <section className="container py-20">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">最新文章</h2>
          <p className="text-lg text-muted-foreground">
            分享我的技术见解和经验
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/blog">查看全部</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {postsWithDetails.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
