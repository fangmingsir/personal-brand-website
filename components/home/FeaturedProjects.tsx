import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/projects/ProjectCard'

export async function FeaturedProjects() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select(
      `
      *,
      project_tech_stacks (
        tech_stacks (*)
      )
    `
    )
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(3)

  if (!projects || projects.length === 0) {
    return null
  }

  // 转换数据结构
  const projectsWithTechStacks = projects.map((project) => ({
    ...project,
    tech_stacks:
      project.project_tech_stacks?.map((pts: any) => pts.tech_stacks) || [],
  }))

  return (
    <section className="container py-20">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">精选项目</h2>
          <p className="text-lg text-muted-foreground">
            我最引以为豪的作品
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/projects">查看全部</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectsWithTechStacks.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
