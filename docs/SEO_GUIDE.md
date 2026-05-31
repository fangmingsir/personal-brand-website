# SEO 配置指南

本指南将帮助你优化网站的搜索引擎排名。

## 📋 SEO 检查清单

- [ ] 配置 Meta 标签
- [ ] 生成 Sitemap
- [ ] 配置 Robots.txt
- [ ] 添加结构化数据
- [ ] 优化图片
- [ ] 提交到 Google Search Console
- [ ] 配置 Google Analytics
- [ ] 优化页面性能

## 🎯 Meta 标签配置

### 全局 Meta 标签

在 `app/layout.tsx` 中已配置全局 Meta 标签：

```typescript
export const metadata: Metadata = {
  title: {
    default: '个人品牌网站',
    template: '%s | 个人品牌网站',
  },
  description: '展示个人经历、项目作品和技术博客',
  keywords: ['个人网站', '作品集', '博客', '开发者'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: '个人品牌网站',
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

### 页面级 Meta 标签

每个页面可以自定义 Meta 标签：

```typescript
export async function generateMetadata({ params }: PageProps) {
  return {
    title: '页面标题',
    description: '页面描述',
    openGraph: {
      title: '页面标题',
      description: '页面描述',
      images: ['图片URL'],
    },
  }
}
```

## 🗺️ Sitemap 配置

项目已自动生成 Sitemap，位于 `app/sitemap.ts`。

访问 `https://yourdomain.com/sitemap.xml` 查看。

### 提交 Sitemap

1. 登录 [Google Search Console](https://search.google.com/search-console)
2. 选择你的网站
3. 进入"站点地图"
4. 输入 `sitemap.xml`
5. 点击"提交"

## 🤖 Robots.txt 配置

项目已配置 Robots.txt，位于 `app/robots.ts`。

访问 `https://yourdomain.com/robots.txt` 查看。

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://yourdomain.com/sitemap.xml
```

## 📊 结构化数据

### 个人信息 (Person Schema)

在首页添加个人信息结构化数据：

```typescript
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  jobTitle: '全栈开发者',
  url: 'https://yourdomain.com',
  sameAs: [
    'https://github.com/username',
    'https://linkedin.com/in/username',
    'https://twitter.com/username',
  ],
}
```

### 文章 (Article Schema)

在博客详情页添加文章结构化数据：

```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.cover_image_url,
  datePublished: post.published_at,
  dateModified: post.updated_at,
  author: {
    '@type': 'Person',
    name: post.author.full_name,
  },
}
```

### 网站 (WebSite Schema)

```typescript
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '个人品牌网站',
  url: 'https://yourdomain.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://yourdomain.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}
```

## 🖼️ 图片优化

### 使用 Next.js Image 组件

```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="描述性文字"
  width={800}
  height={600}
  priority // 首屏图片使用
/>
```

### 图片最佳实践

1. **使用描述性 Alt 文本**
   - ✅ `alt="Next.js 项目部署流程图"`
   - ❌ `alt="image1"`

2. **优化图片大小**
   - 封面图：1200x630px
   - 缩略图：600x400px
   - 头像：200x200px

3. **使用现代格式**
   - WebP（优先）
   - AVIF（更好的压缩）
   - JPEG/PNG（兼容）

4. **懒加载**
   - Next.js Image 自动懒加载
   - 首屏图片使用 `priority`

## 🔍 Google Search Console

### 1. 验证网站所有权

**方法 1: HTML 文件验证**
1. 下载验证文件
2. 放到 `public/` 目录
3. 访问验证

**方法 2: DNS 验证（推荐）**
1. 获取 TXT 记录
2. 添加到域名 DNS
3. 等待验证

**方法 3: HTML 标签验证**
在 `app/layout.tsx` 添加：
```typescript
<meta name="google-site-verification" content="your-verification-code" />
```

### 2. 提交 Sitemap

1. 进入"站点地图"
2. 输入 `sitemap.xml`
3. 点击"提交"

### 3. 请求索引

对于重要页面，可以手动请求索引：
1. 在顶部输入 URL
2. 点击"请求编入索引"

### 4. 监控性能

定期检查：
- 索引覆盖率
- 搜索效果
- 移动设备易用性
- Core Web Vitals

## 📈 Google Analytics

### 1. 创建 GA4 属性

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建账号和属性
3. 获取 Measurement ID (G-XXXXXXXXXX)

### 2. 添加到网站

在 `.env.local` 添加：
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

在 `app/layout.tsx` 添加：
```typescript
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
  `}
</Script>
```

## ⚡ 性能优化

### Core Web Vitals

优化以下指标：

1. **LCP (Largest Contentful Paint) < 2.5s**
   - 优化图片加载
   - 使用 CDN
   - 减少服务器响应时间

2. **FID (First Input Delay) < 100ms**
   - 减少 JavaScript 执行时间
   - 代码分割
   - 使用 Web Workers

3. **CLS (Cumulative Layout Shift) < 0.1**
   - 为图片设置尺寸
   - 避免动态插入内容
   - 使用 transform 动画

### 使用 Lighthouse

```bash
# 安装 Lighthouse CLI
npm install -g lighthouse

# 运行测试
lighthouse https://yourdomain.com --view
```

目标分数：
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 📝 内容优化

### 标题优化

1. **使用 H1-H6 层级结构**
   - 每页只有一个 H1
   - 按层级使用 H2-H6

2. **标题长度**
   - H1: 50-60 字符
   - Meta Title: 50-60 字符
   - Meta Description: 150-160 字符

### 关键词优化

1. **关键词研究**
   - 使用 Google Keyword Planner
   - 分析竞争对手
   - 长尾关键词

2. **关键词密度**
   - 自然使用关键词
   - 避免关键词堆砌
   - 使用同义词和相关词

### 内容质量

1. **原创内容**
   - 避免复制粘贴
   - 提供独特见解
   - 定期更新

2. **内容长度**
   - 博客文章: 1000+ 字
   - 项目描述: 300+ 字
   - 提供详细信息

3. **内部链接**
   - 链接到相关文章
   - 使用描述性锚文本
   - 保持链接有效

## 🔗 外部链接建设

1. **社交媒体分享**
   - 添加分享按钮
   - 定期分享内容
   - 互动回复

2. **技术社区**
   - 在 Dev.to 发布文章
   - 在 Medium 同步内容
   - 参与 GitHub 讨论

3. **反向链接**
   - 客座博客
   - 技术论坛
   - 开源贡献

## 📱 移动端优化

1. **响应式设计**
   - 使用 TailwindCSS 响应式类
   - 测试不同设备
   - 优化触摸交互

2. **移动端性能**
   - 减少资源大小
   - 优化字体加载
   - 使用渐进式增强

## 🔒 HTTPS 和安全

1. **使用 HTTPS**
   - Vercel 自动配置 SSL
   - 强制 HTTPS 重定向

2. **安全头部**
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options

## 📊 监控和分析

### 定期检查

1. **每周**
   - Google Search Console 错误
   - Analytics 流量数据
   - 页面加载速度

2. **每月**
   - 关键词排名
   - 反向链接
   - 竞争对手分析

3. **每季度**
   - 内容审核
   - SEO 策略调整
   - 技术 SEO 审计

## 🎯 SEO 最佳实践总结

✅ **必做事项**
- 每页独特的 Title 和 Description
- 使用语义化 HTML
- 优化图片 Alt 文本
- 创建 Sitemap
- 配置 Robots.txt
- 提交到 Google Search Console
- 优化页面加载速度
- 移动端友好
- 使用 HTTPS
- 定期发布高质量内容

❌ **避免事项**
- 关键词堆砌
- 隐藏文本
- 购买链接
- 复制内容
- 过度优化
- 忽略移动端
- 慢速加载
- 404 错误

## 📚 推荐工具

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Ahrefs](https://ahrefs.com/) - SEO 分析
- [SEMrush](https://www.semrush.com/) - 关键词研究
- [Schema.org](https://schema.org/) - 结构化数据

## 🎉 总结

SEO 是一个持续的过程，需要：
1. 技术优化（网站结构、性能）
2. 内容优化（高质量、原创）
3. 外部优化（链接建设、社交媒体）
4. 持续监控和改进

遵循本指南，你的网站将获得更好的搜索引擎排名！
