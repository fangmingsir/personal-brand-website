import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer'
import { formatDate } from '@/lib/utils'
import { FaEye, FaHeart, FaClock } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  const typedPost = post as Post

  return {
    title: typedPost.seo_title || typedPost.title,
    description: typedPost.seo_description || typedPost.excerpt,
    keywords: typedPost.seo_keywords,
    openGraph: {
      title: typedPost.title,
      description: typedPost.excerpt || '',
      images: typedPost.cover_image_url ? [typedPost.cover_image_url] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // 获取文章详情
  const { data: post } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:profiles(*),
      category:categories(*),
      post_tags(tags(*))
    `
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    notFound()
  }

  // 增加浏览量
  await supabase.rpc('increment_post_view_count', { post_id: post.id })

  // 转换标签数据
  const tags = post.post_tags?.map((pt: any) => pt.tags) || []

  return (
    <article className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* 文章头部 */}
        <header className="mb-8">
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="mb-4 inline-block rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
            >
              {post.category.name}
            </Link>
          )}

          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{post.title}</h1>

          {post.excerpt && (
            <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {post.author.avatar_url && (
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.full_name || ''}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{post.author.full_name}</span>
            </div>
            <span>·</span>
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(post.published_at || post.created_at)}
            </time>
            <span>·</span>
            <span className="flex items-center gap-1">
              <FaClock className="h-3 w-3" />
              {post.reading_time || 5}分钟阅读
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <FaEye className="h-3 w-3" />
              {post.view_count}次浏览
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <FaHeart className="h-3 w-3" />
              {post.like_count}个赞
            </span>
          </div>
        </header>

        {/* 封面图 */}
        {post.cover_image_url && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 文章内容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* 标签 */}
        {tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag: any) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                className="rounded-md bg-secondary px-3 py-1 text-sm hover:bg-secondary/80"
                style={{ color: tag.color }}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
