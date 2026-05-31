import { Hero } from '@/components/home/Hero'
import { Skills } from '@/components/home/Skills'
import { Stats } from '@/components/home/Stats'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { RecentPosts } from '@/components/home/RecentPosts'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Skills />
      <Stats />
      <FeaturedProjects />
      <RecentPosts />
    </div>
  )
}
