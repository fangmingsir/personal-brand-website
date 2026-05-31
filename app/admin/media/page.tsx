import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminMediaPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">媒体库</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>媒体管理</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            媒体库功能开发中...
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            您可以使用 Supabase Storage 直接上传和管理文件
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
