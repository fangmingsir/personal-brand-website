import Link from 'next/link'
import Image from 'next/image'
import { ProjectWithTechStacks } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectCardProps {
  project: ProjectWithTechStacks
}

const statusLabels = {
  in_progress: '进行中',
  completed: '已完成',
  maintenance: '维护中',
}

const statusColors = {
  in_progress: 'bg-blue-500',
  completed: 'bg-green-500',
  maintenance: 'bg-yellow-500',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      {project.cover_image_url && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      )}

      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <span
            className={`rounded-full px-2 py-1 text-xs text-white ${
              statusColors[project.status]
            }`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.tech_stacks?.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="rounded-md bg-secondary px-2 py-1 text-xs"
              style={{ color: tech.color || undefined }}
            >
              {tech.name}
            </span>
          ))}
          {project.tech_stacks && project.tech_stacks.length > 4 && (
            <span className="rounded-md bg-secondary px-2 py-1 text-xs">
              +{project.tech_stacks.length - 4}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1" variant="outline" size="sm">
          <Link href={`/projects/${project.slug}`}>查看详情</Link>
        </Button>
        {project.github_url && (
          <Button asChild variant="ghost" size="sm">
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-4 w-4" />
            </a>
          </Button>
        )}
        {project.demo_url && (
          <Button asChild variant="ghost" size="sm">
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
