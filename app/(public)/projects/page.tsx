import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/projects/ProjectCard'

export default async function ProjectsPage() {
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
    .order('sort_order', { ascending: true })

  // 转换数据结构
  const projectsWithTechStacks =
    projects?.map((project) => ({
      ...project,
      tech_stacks:
        project.project_tech_stacks?.map((pts: any) => pts.tech_stacks) || [],
    })) || []

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">我的项目</h1>
        <p className="text-lg text-muted-foreground">
          这里展示了我参与开发的项目作品
        </p>
      </div>

      {projectsWithTechStacks.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          暂无项目
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsWithTechStacks.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
