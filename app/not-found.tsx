import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">页面未找到</p>
        <p className="mt-2 text-muted-foreground">
          抱歉，您访问的页面不存在
        </p>
        <Button asChild className="mt-8">
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </div>
  )
}
