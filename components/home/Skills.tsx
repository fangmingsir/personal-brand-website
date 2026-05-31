import { createClient } from '@/lib/supabase/server'
import { SkillCard } from './SkillCard'

export async function Skills() {
  const supabase = await createClient()

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true })

  if (!skills || skills.length === 0) {
    return null
  }

  const categories = [
    { key: 'frontend', label: '前端开发' },
    { key: 'backend', label: '后端开发' },
    { key: 'database', label: '数据库' },
    { key: 'tools', label: '工具与平台' },
    { key: 'soft', label: '软技能' },
  ]

  return (
    <section className="container py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">技能专长</h2>
        <p className="text-lg text-muted-foreground">
          我掌握的技术栈和工具
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => {
          const categorySkills = skills.filter(
            (skill) => skill.category === category.key
          )

          if (categorySkills.length === 0) return null

          return (
            <div key={category.key}>
              <h3 className="mb-6 text-xl font-semibold">{category.label}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {categorySkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
