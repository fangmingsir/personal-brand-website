import { Database } from './database.types'

// 表类型
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Skill = Database['public']['Tables']['skills']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Tag = Database['public']['Tables']['tags']['Row']
export type TechStack = Database['public']['Tables']['tech_stacks']['Row']
export type Media = Database['public']['Tables']['media']['Row']

// 插入类型
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type SkillInsert = Database['public']['Tables']['skills']['Insert']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type PostInsert = Database['public']['Tables']['posts']['Insert']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type TagInsert = Database['public']['Tables']['tags']['Insert']
export type TechStackInsert = Database['public']['Tables']['tech_stacks']['Insert']
export type MediaInsert = Database['public']['Tables']['media']['Insert']

// 更新类型
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type SkillUpdate = Database['public']['Tables']['skills']['Update']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']
export type PostUpdate = Database['public']['Tables']['posts']['Update']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']
export type TagUpdate = Database['public']['Tables']['tags']['Update']
export type TechStackUpdate = Database['public']['Tables']['tech_stacks']['Update']
export type MediaUpdate = Database['public']['Tables']['media']['Update']

// 扩展类型
export type ProjectWithTechStacks = Project & {
  tech_stacks: TechStack[]
}

export type PostWithDetails = Post & {
  author: Profile
  category: Category | null
  tags: Tag[]
}

export type PostWithAuthor = Post & {
  author: Profile
}

// 用户角色
export type UserRole = 'user' | 'admin'

// 项目状态
export type ProjectStatus = 'in_progress' | 'completed' | 'maintenance'

// 文章状态
export type PostStatus = 'draft' | 'published'

// 技能分类
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'soft'

// 技能熟练度
export type SkillProficiency = 'expert' | 'proficient' | 'familiar'
