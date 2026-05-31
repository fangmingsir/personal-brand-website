import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default async function AdminSettingsPage() {
  const user = await getCurrentUser()

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">设置</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">姓名</Label>
              <Input
                id="full_name"
                defaultValue={user?.full_name || ''}
                placeholder="输入您的姓名"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_title">职位</Label>
              <Input
                id="job_title"
                defaultValue={user?.job_title || ''}
                placeholder="例如：全栈开发者"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">个人简介</Label>
              <Textarea
                id="bio"
                defaultValue={user?.bio || ''}
                placeholder="介绍一下您自己"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">位置</Label>
              <Input
                id="location"
                defaultValue={user?.location || ''}
                placeholder="例如：北京，中国"
              />
            </div>

            <Button>保存更改</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>社交媒体链接</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub</Label>
              <Input
                id="github_url"
                defaultValue={user?.github_url || ''}
                placeholder="https://github.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn</Label>
              <Input
                id="linkedin_url"
                defaultValue={user?.linkedin_url || ''}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter</Label>
              <Input
                id="twitter_url"
                defaultValue={user?.twitter_url || ''}
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">个人网站</Label>
              <Input
                id="website"
                defaultValue={user?.website || ''}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <Button>保存更改</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
