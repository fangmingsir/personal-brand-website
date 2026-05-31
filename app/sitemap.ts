import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const supabase = await createClient()

  // 获取所有已发布的文章
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('status', 'published')
    .order('updated_at', { ascending: false })

  // 获取所有项目
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })

  // 获取所有分类
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })

  const postUrls =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || []

  const projectUrls =
    projects?.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })) || []

  const categoryUrls =
    categories?.map((category) => ({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastModified: new Date(category.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
    ...projectUrls,
    ...categoryUrls,
  ]
}
