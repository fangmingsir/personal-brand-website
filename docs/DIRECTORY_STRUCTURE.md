# 项目目录结构

本文档详细说明项目的目录结构和文件组织。

## 📁 完整目录树

```
personal-brand-website/
├── .plan/                          # 计划文档（不提交）
│   └── implementation-plan.md      # 实施计划
│
├── app/                            # Next.js App Router
│   ├── (public)/                   # 公开页面组
│   │   ├── page.tsx               # 首页
│   │   ├── layout.tsx             # 公开页面布局
│   │   ├── projects/              # 项目页面
│   │   │   ├── page.tsx           # 项目列表
│   │   │   └── [slug]/            # 项目详情
│   │   │       └── page.tsx
│   │   └── blog/                  # 博客页面
│   │       ├── page.tsx           # 博客列表
│   │       ├── [slug]/            # 博客详情
│   │       │   └── page.tsx
│   │       ├── category/          # 分类页
│   │       │   └── [slug]/
│   │       │       └── page.tsx
│   │       └── tag/               # 标签页
│   │           └── [slug]/
│   │               └── page.tsx
│   │
│   ├── admin/                     # 管理后台
│   │   ├── page.tsx              # 仪表盘
│   │   ├── layout.tsx            # 后台布局
│   │   ├── posts/                # 文章管理
│   │   │   ├── page.tsx          # 文章列表
│   │   │   ├── new/              # 新建文章
│   │   │   │   └── page.tsx
│   │   │   └── [id]/             # 编辑文章
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── projects/             # 项目管理
│   │   │   ├── page.tsx          # 项目列表
│   │   │   ├── new/              # 新建项目
│   │   │   │   └── page.tsx
│   │   │   └── [id]/             # 编辑项目
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── media/                # 媒体库
│   │   │   └── page.tsx
│   │   └── settings/             # 设置
│   │       └── page.tsx
│   │
│   ├── api/                       # API 路由
│   │   ├── auth/                 # 认证 API
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── posts/                # 文章 API
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── projects/             # 项目 API
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── upload/               # 上传 API
│   │   │   └── route.ts
│   │   └── stats/                # 统计 API
│   │       └── route.ts
│   │
│   ├── layout.tsx                 # 根布局
│   ├── globals.css                # 全局样式
│   ├── not-found.tsx              # 404 页面
│   ├── sitemap.ts                 # Sitemap 生成
│   └── robots.ts                  # Robots.txt 生成
│
├── components/                    # React 组件
│   ├── ui/                       # Shadcn UI 基础组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── tabs.tsx
│   │   └── toast.tsx
│   │
│   ├── layout/                   # 布局组件
│   │   ├── Header.tsx            # 顶部导航
│   │   ├── Footer.tsx            # 底部信息
│   │   ├── Sidebar.tsx           # 侧边栏
│   │   └── MobileNav.tsx         # 移动端导航
│   │
│   ├── home/                     # 首页组件
│   │   ├── Hero.tsx              # 英雄区
│   │   ├── Skills.tsx            # 技能展示
│   │   ├── SkillCard.tsx         # 技能卡片
│   │   ├── Stats.tsx             # 统计数据
│   │   ├── FeaturedProjects.tsx  # 精选项目
│   │   └── RecentPosts.tsx       # 最新文章
│   │
│   ├── projects/                 # 项目组件
│   │   ├── ProjectCard.tsx       # 项目卡片
│   │   ├── ProjectGrid.tsx       # 项目网格
│   │   ├── ProjectDetail.tsx     # 项目详情
│   │   ├── ProjectFilter.tsx     # 项目筛选
│   │   └── ImageCarousel.tsx     # 图片轮播
│   │
│   ├── blog/                     # 博客组件
│   │   ├── PostCard.tsx          # 文章卡片
│   │   ├── PostList.tsx          # 文章列表
│   │   ├── PostDetail.tsx        # 文章详情
│   │   ├── PostSearch.tsx        # 文章搜索
│   │   ├── CategoryList.tsx      # 分类列表
│   │   ├── TagCloud.tsx          # 标签云
│   │   └── TableOfContents.tsx   # 目录导航
│   │
│   ├── admin/                    # 管理后台组件
│   │   ├── Dashboard.tsx         # 仪表盘
│   │   ├── PostEditor.tsx        # 文章编辑器
│   │   ├── ProjectEditor.tsx     # 项目编辑器
│   │   ├── MediaUploader.tsx     # 媒体上传
│   │   └── StatsChart.tsx        # 统计图表
│   │
│   └── shared/                   # 共享组件
│       ├── MarkdownRenderer.tsx  # Markdown 渲染
│       ├── ImageUpload.tsx       # 图片上传
│       ├── LoadingSpinner.tsx    # 加载动画
│       ├── ErrorBoundary.tsx     # 错误边界
│       └── SEO.tsx               # SEO 组件
│
├── lib/                          # 工具库
│   ├── supabase/                # Supabase 客户端
│   │   ├── client.ts            # 浏览器客户端
│   │   └── server.ts            # 服务端客户端
│   │
│   ├── auth/                    # 认证工具
│   │   ├── utils.ts             # 认证工具函数
│   │   ├── hooks.ts             # 认证 Hooks
│   │   └── middleware.ts        # 认证中间件
│   │
│   ├── api/                     # API 工具
│   │   ├── posts.ts             # 文章 API
│   │   ├── projects.ts          # 项目 API
│   │   ├── validation.ts        # 数据验证
│   │   └── error-handler.ts     # 错误处理
│   │
│   ├── seo/                     # SEO 工具
│   │   ├── metadata.ts          # Meta 数据
│   │   └── structured-data.ts   # 结构化数据
│   │
│   ├── markdown/                # Markdown 处理
│   │   └── processor.ts         # Markdown 处理器
│   │
│   └── utils.ts                 # 通用工具函数
│
├── types/                        # TypeScript 类型定义
│   ├── index.ts                 # 导出类型
│   └── database.types.ts        # 数据库类型
│
├── supabase/                     # Supabase 配置
│   ├── migrations/              # 数据库迁移
│   │   ├── 001_create_profiles.sql
│   │   ├── 002_create_skills.sql
│   │   ├── 003_create_projects.sql
│   │   ├── 004_create_blog.sql
│   │   └── 005_create_media.sql
│   └── seed.sql                 # 种子数据
│
├── public/                       # 静态资源
│   ├── images/                  # 图片
│   ├── icons/                   # 图标
│   └── fonts/                   # 字体
│
├── docs/                         # 项目文档
│   ├── DEPLOYMENT.md            # 部署指南
│   ├── SEO_GUIDE.md             # SEO 配置指南
│   ├── ENVIRONMENT.md           # 环境变量说明
│   ├── DIRECTORY_STRUCTURE.md   # 目录结构（本文件）
│   └── WIREFRAMES.md            # 页面原型图
│
├── .eslintrc.json               # ESLint 配置
├── .prettierrc                  # Prettier 配置
├── .gitignore                   # Git 忽略文件
├── .env.example                 # 环境变量示例
├── next.config.js               # Next.js 配置
├── postcss.config.js            # PostCSS 配置
├── tailwind.config.ts           # TailwindCSS 配置
├── tsconfig.json                # TypeScript 配置
├── package.json                 # 项目依赖
├── README.md                    # 项目说明
├── PRD.md                       # 产品需求文档
├── DATABASE.md                  # 数据库设计
└── ARCHITECTURE.md              # 系统架构
```

## 📂 目录说明

### `/app` - 应用目录

Next.js 15 App Router 的核心目录，包含所有页面和路由。

**路由组 (Route Groups)**
- `(public)` - 公开页面，使用公开布局
- `(auth)` - 认证页面，使用认证布局
- `admin` - 管理后台，需要管理员权限

**动态路由**
- `[slug]` - 动态参数，如 `/blog/my-post`
- `[id]` - ID 参数，如 `/admin/posts/123/edit`

### `/components` - 组件目录

所有 React 组件按功能分类。

**组件分类**
- `ui/` - 基础 UI 组件（Shadcn UI）
- `layout/` - 布局组件（Header, Footer）
- `home/` - 首页专用组件
- `projects/` - 项目相关组件
- `blog/` - 博客相关组件
- `admin/` - 管理后台组件
- `shared/` - 跨模块共享组件

### `/lib` - 工具库目录

所有工具函数和辅助代码。

**工具分类**
- `supabase/` - 数据库客户端
- `auth/` - 认证相关工具
- `api/` - API 调用和处理
- `seo/` - SEO 优化工具
- `markdown/` - Markdown 处理
- `utils.ts` - 通用工具函数

### `/types` - 类型定义目录

TypeScript 类型定义文件。

**类型文件**
- `index.ts` - 导出所有类型
- `database.types.ts` - 数据库表类型

### `/supabase` - 数据库目录

Supabase 相关配置和迁移文件。

**文件说明**
- `migrations/` - SQL 迁移文件（按顺序执行）
- `seed.sql` - 初始数据

### `/public` - 静态资源目录

公开访问的静态文件。

**资源分类**
- `images/` - 图片资源
- `icons/` - 图标文件
- `fonts/` - 字体文件

### `/docs` - 文档目录

项目相关文档。

**文档列表**
- `DEPLOYMENT.md` - 部署指南
- `SEO_GUIDE.md` - SEO 配置
- `ENVIRONMENT.md` - 环境变量
- `DIRECTORY_STRUCTURE.md` - 目录结构
- `WIREFRAMES.md` - 页面原型

## 🎯 命名规范

### 文件命名

- **组件文件**: PascalCase - `PostCard.tsx`
- **工具文件**: camelCase - `formatDate.ts`
- **配置文件**: kebab-case - `next.config.js`
- **类型文件**: camelCase - `database.types.ts`

### 目录命名

- **功能目录**: camelCase - `supabase/`
- **路由组**: kebab-case - `(public)/`
- **动态路由**: kebab-case - `[slug]/`

### 变量命名

- **组件**: PascalCase - `PostCard`
- **函数**: camelCase - `formatDate`
- **常量**: UPPER_SNAKE_CASE - `API_URL`
- **类型**: PascalCase - `Post`, `PostWithDetails`

## 📋 文件职责

### 页面文件 (`page.tsx`)

- 定义路由页面
- 获取数据（Server Component）
- 渲染页面内容
- 导出 Metadata

### 布局文件 (`layout.tsx`)

- 定义页面布局
- 包裹子页面
- 共享 UI 元素
- 提供 Context

### 路由文件 (`route.ts`)

- 定义 API 端点
- 处理 HTTP 请求
- 返回 JSON 响应
- 错误处理

### 组件文件 (`.tsx`)

- 可复用的 UI 组件
- 接收 Props
- 处理交互逻辑
- 导出组件

### 工具文件 (`.ts`)

- 纯函数
- 工具类
- 辅助函数
- 导出函数

## 🔄 导入路径

使用路径别名简化导入：

```typescript
// ✅ 使用别名
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types'

// ❌ 避免相对路径
import { Button } from '../../../components/ui/button'
```

**配置位置**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"]
    }
  }
}
```

## 📦 代码组织原则

### 1. 单一职责

每个文件只负责一个功能。

### 2. 就近原则

相关文件放在一起。

### 3. 分层架构

- 页面层 (`app/`)
- 组件层 (`components/`)
- 逻辑层 (`lib/`)
- 数据层 (`types/`, `supabase/`)

### 4. 可扩展性

便于添加新功能和模块。

## 🎨 样式组织

### 全局样式

`app/globals.css` - 全局样式和 CSS 变量

### 组件样式

使用 TailwindCSS 类名，避免单独的 CSS 文件。

### 主题配置

`tailwind.config.ts` - TailwindCSS 主题配置

## 🔍 查找文件技巧

### 按功能查找

- 首页相关 → `app/(public)/page.tsx`, `components/home/`
- 博客相关 → `app/(public)/blog/`, `components/blog/`
- 项目相关 → `app/(public)/projects/`, `components/projects/`
- 管理后台 → `app/admin/`, `components/admin/`

### 按类型查找

- 页面 → `app/**/page.tsx`
- 组件 → `components/**/*.tsx`
- API → `app/api/**/route.ts`
- 工具 → `lib/**/*.ts`
- 类型 → `types/**/*.ts`

## 📊 统计信息

- **总目录数**: ~50+
- **总文件数**: ~150+
- **代码行数**: ~15,000+
- **组件数量**: ~60+
- **页面数量**: ~20+
- **API 路由**: ~10+

## 🔗 相关文档

- [Next.js 项目结构](https://nextjs.org/docs/getting-started/project-structure)
- [App Router 文档](https://nextjs.org/docs/app)
- [组件组织最佳实践](https://react.dev/learn/thinking-in-react)
