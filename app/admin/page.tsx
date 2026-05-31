import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaFileAlt, FaFolder, FaEye, FaHeart } from 'react-icons/fa'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 获取统计数据
  const [
    { count: postsCount },
    { count: projectsCount },
    { data: totalViews },
    { data: totalLikes },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('view_count'),
    supabase.from('posts').select('like_count'),
  ])

  const totalPostViews =
    totalViews?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0
  const totalPostLikes =
    totalLikes?.reduce((sum, post) => sum + (post.like_count || 0), 0) || 0

  const stats = [
    {
      title: '文章总数',
      value: postsCount || 0,
      icon: FaFileAlt,
      color: 'text-blue-500',
    },
    {
      title: '项目总数',
      value: projectsCount || 0,
      icon: FaFolder,
      color: 'text-green-500',
    },
    {
      title: '总浏览量',
      value: totalPostViews,
      icon: FaEye,
      color: 'text-purple-500',
    },
    {
      title: '总点赞数',
      value: totalPostLikes,
      icon: FaHeart,
      color: 'text-red-500',
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">仪表盘</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">快速操作</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>
                <a href="/admin/posts/new">创建新文章</a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                开始撰写一篇新的博客文章
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>
                <a href="/admin/projects/new">添加新项目</a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                添加一个新的项目作品
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
