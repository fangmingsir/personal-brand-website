# 部署指南

本指南将帮助你将个人品牌网站部署到生产环境。

## 📋 部署前准备

### 1. 准备 Supabase 项目

1. 访问 [Supabase](https://supabase.com/) 并创建账号
2. 创建新项目
3. 记录以下信息：
   - Project URL
   - Anon Key
   - Service Role Key

### 2. 设置数据库

1. 进入 Supabase Dashboard
2. 打开 SQL Editor
3. 依次执行迁移文件：
   - `supabase/migrations/001_create_profiles.sql`
   - `supabase/migrations/002_create_skills.sql`
   - `supabase/migrations/003_create_projects.sql`
   - `supabase/migrations/004_create_blog.sql`
   - `supabase/migrations/005_create_media.sql`
4. 执行种子数据：`supabase/seed.sql`

### 3. 配置认证

在 Supabase Dashboard 中配置认证：

#### 邮箱认证
1. 进入 Authentication > Settings
2. 启用 Email provider
3. 配置邮件模板（可选）

#### Google OAuth
1. 进入 Authentication > Providers
2. 启用 Google provider
3. 填写 Google Client ID 和 Secret
4. 添加回调 URL：`https://your-project.supabase.co/auth/v1/callback`

#### GitHub OAuth
1. 进入 Authentication > Providers
2. 启用 GitHub provider
3. 填写 GitHub Client ID 和 Secret
4. 添加回调 URL：`https://your-project.supabase.co/auth/v1/callback`

### 4. 配置存储

1. 进入 Storage
2. 创建以下 buckets：
   - `avatars` - 用户头像
   - `covers` - 封面图片
   - `media` - 媒体文件
3. 设置 bucket 为 public（如果需要公开访问）

## 🚀 部署到 Vercel

### 方法 1: 通过 Vercel Dashboard

1. 访问 [Vercel](https://vercel.com/) 并登录
2. 点击 "New Project"
3. 导入你的 Git 仓库
4. 配置项目：
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. 添加环境变量（见下方）
6. 点击 "Deploy"

### 方法 2: 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your Description

# OAuth (可选)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id

# Analytics (可选)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🌐 配置自定义域名

### 在 Vercel 中配置

1. 进入项目设置
2. 点击 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS 记录

### DNS 配置

在你的域名提供商处添加以下记录：

**方法 1: A 记录**
```
Type: A
Name: @
Value: 76.76.21.21
```

**方法 2: CNAME 记录**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**www 子域名**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔒 SSL 证书

Vercel 会自动为你的域名配置 SSL 证书（Let's Encrypt），无需手动配置。

## 📊 配置 Google Analytics（可选）

1. 创建 Google Analytics 账号
2. 获取 Measurement ID (G-XXXXXXXXXX)
3. 在 Vercel 环境变量中添加：
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## 🔍 配置 Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加你的网站
3. 验证所有权（推荐使用 DNS 验证）
4. 提交 sitemap：`https://yourdomain.com/sitemap.xml`

## 🎯 性能优化

### 1. 图片优化

项目已配置 Next.js Image 组件，自动优化图片：
- 自动转换为 WebP/AVIF 格式
- 响应式图片
- 懒加载

### 2. 缓存策略

在 `next.config.js` 中已配置缓存策略：
- 静态资源：长期缓存
- API 响应：适当缓存
- 页面：ISR 增量静态再生成

### 3. CDN 加速

Vercel 自动使用全球 CDN 加速你的网站。

## 🔄 持续部署

### 自动部署

Vercel 会自动监听 Git 仓库的变化：
- Push 到 `main` 分支 → 自动部署到生产环境
- Push 到其他分支 → 自动创建预览部署

### 手动部署

```bash
# 部署到生产环境
vercel --prod

# 创建预览部署
vercel
```

## 🐛 故障排查

### 构建失败

1. 检查环境变量是否正确配置
2. 检查依赖是否正确安装
3. 查看 Vercel 构建日志

### 数据库连接失败

1. 检查 Supabase URL 和 Key 是否正确
2. 检查 Supabase 项目是否正常运行
3. 检查 RLS 策略是否正确配置

### 图片加载失败

1. 检查 `next.config.js` 中的 `remotePatterns` 配置
2. 确保图片 URL 可访问
3. 检查 Supabase Storage 权限

## 📈 监控和日志

### Vercel Analytics

1. 进入项目设置
2. 启用 Analytics
3. 查看性能指标和用户分析

### Vercel Logs

1. 进入项目 Dashboard
2. 点击 "Logs"
3. 查看实时日志和错误信息

## 🔐 安全建议

1. **环境变量**: 永远不要将敏感信息提交到 Git
2. **RLS 策略**: 确保数据库 RLS 策略正确配置
3. **API 限流**: 考虑添加 API 限流保护
4. **HTTPS**: 确保所有请求都通过 HTTPS
5. **定期更新**: 定期更新依赖包修复安全漏洞

## 📝 部署检查清单

- [ ] Supabase 项目已创建
- [ ] 数据库迁移已执行
- [ ] 种子数据已插入
- [ ] 管理员账号已创建
- [ ] 认证提供商已配置
- [ ] 存储 buckets 已创建
- [ ] Vercel 项目已创建
- [ ] 环境变量已配置
- [ ] 自定义域名已配置
- [ ] SSL 证书已生效
- [ ] Sitemap 已提交到 Google
- [ ] Analytics 已配置
- [ ] 性能测试已通过

## 🎉 部署完成

恭喜！你的个人品牌网站已成功部署。

访问你的网站并测试所有功能：
- ✅ 首页加载正常
- ✅ 项目页面显示正常
- ✅ 博客页面显示正常
- ✅ 用户注册登录正常
- ✅ 管理后台访问正常
- ✅ 图片加载正常
- ✅ SEO 配置正常

## 📞 获取帮助

如果遇到问题，可以：
- 查看 [Next.js 文档](https://nextjs.org/docs)
- 查看 [Supabase 文档](https://supabase.com/docs)
- 查看 [Vercel 文档](https://vercel.com/docs)
- 提交 Issue 到项目仓库
