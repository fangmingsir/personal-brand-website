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
import Image from 'next/image'

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const statusLabels = {
    in_progress: '进行中',
    completed: '已完成',
    maintenance: '维护中',
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">项目管理</h1>
        <Button asChild>
          <Link href="/admin/projects/new">添加项目</Link>
        </Button>
      </div>

      {!projects || projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            暂无项目，点击上方按钮添加第一个项目
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              {project.cover_image_url && (
                <div className="relative aspect-video w-full bg-muted">
                  <Image
                    src={project.cover_image_url}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {statusLabels[project.status]}
                  </span>
                  {project.is_featured && (
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                      精选
                    </span>
                  )}
                </div>
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      编辑
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/projects/${project.slug}`} target="_blank">
                      预览
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
