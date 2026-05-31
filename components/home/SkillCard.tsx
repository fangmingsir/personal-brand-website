'use client'

import { Skill } from '@/types'
import { Card, CardContent } from '@/components/ui/card'

interface SkillCardProps {
  skill: Skill
}

const proficiencyColors = {
  expert: 'bg-green-500',
  proficient: 'bg-blue-500',
  familiar: 'bg-yellow-500',
}

const proficiencyLabels = {
  expert: '精通',
  proficient: '熟悉',
  familiar: '了解',
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex flex-col items-center p-6">
        <div className="mb-3 text-4xl">{skill.icon_url || '🔧'}</div>
        <h4 className="mb-2 text-center font-semibold">{skill.name}</h4>
        <span
          className={`rounded-full px-2 py-1 text-xs text-white ${
            proficiencyColors[skill.proficiency]
          }`}
        >
          {proficiencyLabels[skill.proficiency]}
        </span>
        {skill.description && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {skill.description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
