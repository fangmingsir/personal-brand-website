import Link from 'next/link'
import Image from 'next/image'
import { PostWithDetails } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import { FaEye, FaHeart, FaClock } from 'react-icons/fa'

interface PostCardProps {
  post: PostWithDetails
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      {post.cover_image_url && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
      )}

      <CardHeader>
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="mb-2 w-fit rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20"
          >
            {post.category.name}
          </Link>
        )}
        <CardTitle className="line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-primary"
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                className="rounded-md bg-secondary px-2 py-1 text-xs hover:bg-secondary/80"
                style={{ color: tag.color }}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FaEye className="h-3 w-3" />
            {post.view_count}
          </span>
          <span className="flex items-center gap-1">
            <FaHeart className="h-3 w-3" />
            {post.like_count}
          </span>
          {post.reading_time && (
            <span className="flex items-center gap-1">
              <FaClock className="h-3 w-3" />
              {post.reading_time}分钟
            </span>
          )}
        </div>
        <time dateTime={post.published_at || post.created_at}>
          {formatRelativeTime(post.published_at || post.created_at)}
        </time>
      </CardFooter>
    </Card>
  )
}
