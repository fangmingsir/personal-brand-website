import { createClient } from '@/lib/supabase/server'
import { formatNumber } from '@/lib/utils'

export async function Stats() {
  const supabase = await createClient()

  // 获取统计数据
  const [
    { count: projectsCount },
    { count: postsCount },
    { data: totalViews },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published'),
    supabase.from('posts').select('view_count').eq('status', 'published'),
  ])

  const totalPostViews =
    totalViews?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0

  const stats = [
    {
      label: '项目数量',
      value: projectsCount || 0,
      suffix: '个',
    },
    {
      label: '博客文章',
      value: postsCount || 0,
      suffix: '篇',
    },
    {
      label: '文章阅读',
      value: formatNumber(totalPostViews),
      suffix: '次',
    },
    {
      label: '工作年限',
      value: 3,
      suffix: '年',
    },
  ]

  return (
    <section className="border-y bg-muted/50 py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold">
                {stat.value}
                <span className="text-2xl text-muted-foreground">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
