import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PostCard } from '@/components/blog/PostCard'
import { Category } from '@/types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    return {
      title: '分类未找到',
    }
  }

  const typedCategory = category as Category

  return {
    title: `${typedCategory.name} - 博客分类`,
    description: typedCategory.description || `查看「${typedCategory.name}」分类下的全部文章`,
  }
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // 获取分类信息
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    notFound()
  }

  // 获取该分类下的已发布文章
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
    .eq('category_id', category.id)
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
        <p className="mb-2 text-sm font-medium text-primary">博客分类</p>
        <h1 className="mb-4 text-4xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>

      {postsWithDetails.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          该分类下暂无文章
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
