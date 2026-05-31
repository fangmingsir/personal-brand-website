import { createClient } from '@/lib/supabase/server'
import { PostCard } from '@/components/blog/PostCard'

export default async function BlogPage() {
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

  // 转换数据结构
  const postsWithDetails =
    posts?.map((post) => ({
      ...post,
      tags: post.post_tags?.map((pt: any) => pt.tags) || [],
    })) || []

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">博客文章</h1>
        <p className="text-lg text-muted-foreground">
          分享我的技术见解、学习笔记和项目经验
        </p>
      </div>

      {postsWithDetails.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          暂无文章
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {postsWithDetails.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
