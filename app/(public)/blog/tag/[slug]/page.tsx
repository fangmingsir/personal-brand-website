import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PostCard } from '@/components/blog/PostCard'
import { Tag } from '@/types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: tag } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tag) {
    return {
      title: '标签未找到',
    }
  }

  const typedTag = tag as Tag

  return {
    title: `#${typedTag.name} - 标签`,
    description: `查看带有「${typedTag.name}」标签的全部文章`,
  }
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // 获取标签信息
  const { data: tag } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tag) {
    notFound()
  }

  // 先取该标签关联的文章 id 列表
  const { data: taggedPosts } = await supabase
    .from('post_tags')
    .select('post_id')
    .eq('tag_id', tag.id)

  const postIds = taggedPosts?.map((pt) => pt.post_id) || []

  // 再查这些文章的完整数据（标签列表保持完整）
  const { data: posts } = postIds.length
    ? await supabase
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
        .in('id', postIds)
        .order('published_at', { ascending: false })
    : { data: [] }

  // 转换数据结构
  const postsWithDetails =
    posts?.map((post) => ({
      ...post,
      tags: post.post_tags?.map((pt: any) => pt.tags) || [],
    })) || []

  return (
    <div className="container py-12">
      <div className="mb-12">
        <p className="mb-2 text-sm font-medium text-primary">标签</p>
        <h1 className="mb-4 text-4xl font-bold" style={{ color: tag.color }}>
          #{tag.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          共 {postsWithDetails.length} 篇文章
        </p>
      </div>

      {postsWithDetails.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          该标签下暂无文章
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
