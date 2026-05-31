import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer'
import { Button } from '@/components/ui/button'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!project) {
    return {
      title: '项目未找到',
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.cover_image_url ? [project.cover_image_url] : [],
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const supabase = await createClient()

  // 获取项目详情
  const { data: project } = await supabase
    .from('projects')
    .select(
      `
      *,
      project_tech_stacks (
        tech_stacks (*)
      ),
      project_images (*)
    `
    )
    .eq('slug', params.slug)
    .single()

  if (!project) {
    notFound()
  }

  // 增加浏览量
  await supabase.rpc('increment_project_view_count', { project_id: project.id })

  // 转换数据结构
  const techStacks =
    project.project_tech_stacks?.map((pts: any) => pts.tech_stacks) || []
  const images = project.project_images || []

  const statusLabels = {
    in_progress: '进行中',
    completed: '已完成',
    maintenance: '维护中',
  }

  return (
    <article className="container py-12">
      <div className="mx-auto max-w-5xl">
        {/* 项目头部 */}
        <header className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
              {statusLabels[project.status]}
            </span>
            {project.role && (
              <span className="text-sm text-muted-foreground">
                角色：{project.role}
              </span>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            {project.title}
          </h1>

          <p className="mb-6 text-xl text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.demo_url && (
              <Button asChild>
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                  在线演示
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button asChild variant="outline">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  查看源码
                </a>
              </Button>
            )}
          </div>
        </header>

        {/* 封面图 */}
        {project.cover_image_url && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 技术栈 */}
        {techStacks.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">技术栈</h2>
            <div className="flex flex-wrap gap-2">
              {techStacks.map((tech: any) => (
                <span
                  key={tech.id}
                  className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium"
                  style={{ color: tech.color || undefined }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 项目亮点 */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">项目亮点</h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 项目详情 */}
        {project.content && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">项目详情</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownRenderer content={project.content} />
            </div>
          </div>
        )}

        {/* 项目截图 */}
        {images.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">项目截图</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {images.map((image: any) => (
                <div
                  key={image.id}
                  className="relative aspect-video overflow-hidden rounded-lg"
                >
                  <Image
                    src={image.image_url}
                    alt={image.alt_text || project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 返回按钮 */}
        <div className="mt-12">
          <Button asChild variant="outline">
            <Link href="/projects">← 返回项目列表</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
