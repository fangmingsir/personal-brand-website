# 个人品牌网站

一个现代化的个人品牌展示网站，使用 Next.js 15、TypeScript、TailwindCSS 和 Supabase 构建。

## ✨ 功能特性

- 🎨 **现代化设计** - 简约高级的黑白极简风格
- 📱 **响应式布局** - 完美适配桌面、平板和移动设备
- 🚀 **高性能** - 基于 Next.js 15 App Router，支持 SSR 和 SSG
- 📝 **博客系统** - Markdown 写作，支持代码高亮和全文搜索
- 💼 **项目展示** - 展示个人作品和项目经历
- 🔐 **用户认证** - 支持邮箱登录和 OAuth（Google/GitHub）
- 🎯 **SEO 优化** - 完整的 SEO 配置，包括 sitemap 和结构化数据
- 📊 **管理后台** - 功能完善的内容管理系统

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **组件库**: Shadcn UI
- **状态管理**: React Context / Zustand
- **表单处理**: React Hook Form + Zod
- **Markdown**: react-markdown + remark/rehype

### 后端
- **BaaS**: Supabase
  - 认证系统
  - PostgreSQL 数据库
  - 存储服务
  - Row Level Security (RLS)

### 部署
- **前端**: Vercel
- **数据库**: Supabase (托管 PostgreSQL)
- **CDN**: Vercel Edge Network

## 📦 项目结构

```
personal-brand-website/
├── app/                      # Next.js App Router
│   ├── (public)/            # 公开页面
│   │   ├── page.tsx         # 首页
│   │   ├── projects/        # 项目页面
│   │   └── blog/            # 博客页面
│   ├── admin/               # 管理后台
│   ├── api/                 # API 路由
│   ├── layout.tsx           # 根布局
│   └── globals.css          # 全局样式
├── components/              # React 组件
│   ├── ui/                  # Shadcn UI 组件
│   ├── layout/              # 布局组件
│   ├── home/                # 首页组件
│   ├── projects/            # 项目组件
│   ├── blog/                # 博客组件
│   └── shared/              # 共享组件
├── lib/                     # 工具库
│   ├── supabase/            # Supabase 客户端
│   ├── auth/                # 认证工具
│   └── utils.ts             # 通用工具
├── supabase/                # 数据库迁移
│   ├── migrations/          # SQL 迁移文件
│   └── seed.sql             # 种子数据
├── types/                   # TypeScript 类型
├── public/                  # 静态资源
└── docs/                    # 项目文档
```

## 🚀 快速开始

### 前置要求

- Node.js 18.17 或更高版本
- npm 或 yarn 或 pnpm
- Supabase 账号

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd personal-brand-website
```

### 2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填写配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name
```

### 4. 设置数据库

在 Supabase 项目中执行数据库迁移：

1. 进入 Supabase Dashboard
2. 打开 SQL Editor
3. 依次执行 `supabase/migrations/` 目录下的 SQL 文件（按文件名顺序）
4. 执行 `supabase/seed.sql` 插入初始数据

### 5. 创建管理员账号

1. 在网站注册一个账号
2. 在 Supabase Dashboard 的 SQL Editor 中执行：

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### 6. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

访问 [http://localhost:3000/admin](http://localhost:3000/admin) 进入管理后台。

## 📝 使用指南

### 发布博客文章

1. 登录管理后台
2. 进入"文章管理"
3. 点击"创建文章"
4. 填写文章信息（支持 Markdown）
5. 选择分类和标签
6. 点击"发布"

### 添加项目

1. 登录管理后台
2. 进入"项目管理"
3. 点击"添加项目"
4. 填写项目信息
5. 上传封面图和截图
6. 选择技术栈
7. 点击"保存"

### 自定义个人信息

1. 登录管理后台
2. 进入"设置"
3. 更新个人信息和社交媒体链接
4. 点击"保存更改"

## 🎨 自定义样式

项目使用 TailwindCSS，可以在以下文件中自定义样式：

- `tailwind.config.ts` - Tailwind 配置
- `app/globals.css` - 全局样式和 CSS 变量
- `components/ui/*` - UI 组件样式

## 📚 更多文档

- [部署指南](./docs/DEPLOYMENT.md)
- [SEO 配置指南](./docs/SEO_GUIDE.md)
- [环境变量说明](./docs/ENVIRONMENT.md)
- [数据库设计](./DATABASE.md)
- [系统架构](./ARCHITECTURE.md)
- [产品需求文档](./PRD.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

**Made with ❤️ by Your Name**
