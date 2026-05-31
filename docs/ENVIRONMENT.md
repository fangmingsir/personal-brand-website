# 环境变量说明

本文档说明项目中使用的所有环境变量。

## 📋 环境变量列表

### Supabase 配置（必需）

```env
# Supabase 项目 URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase 匿名密钥（公开安全）
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Supabase 服务角色密钥（保密，仅服务端使用）
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**获取方式：**
1. 登录 [Supabase Dashboard](https://app.supabase.com/)
2. 选择你的项目
3. 进入 Settings > API
4. 复制 URL 和 Keys

### 网站配置（必需）

```env
# 网站 URL（生产环境使用实际域名）
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 网站名称
NEXT_PUBLIC_SITE_NAME=Your Name

# 网站描述
NEXT_PUBLIC_SITE_DESCRIPTION=Personal Brand Website
```

### OAuth 配置（可选）

#### Google OAuth

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

**配置步骤：**
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 添加授权重定向 URI：`https://your-project.supabase.co/auth/v1/callback`
6. 复制客户端 ID

#### GitHub OAuth

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
```

**配置步骤：**
1. 访问 [GitHub Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写信息：
   - Application name: Your App Name
   - Homepage URL: https://yourdomain.com
   - Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
4. 创建后复制 Client ID 和 Client Secret
5. 在 Supabase Dashboard 中配置 GitHub Provider

### Analytics 配置（可选）

```env
# Google Analytics Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**获取方式：**
1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建账号和属性
3. 获取 Measurement ID（格式：G-XXXXXXXXXX）

## 🔒 安全注意事项

### 公开变量 (NEXT_PUBLIC_*)

- ✅ 可以在客户端访问
- ✅ 会被打包到前端代码
- ✅ 用户可以在浏览器中看到
- ⚠️ 不要存储敏感信息

**示例：**
```typescript
// 客户端可以访问
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

### 私有变量

- ❌ 不能在客户端访问
- ✅ 仅在服务端可用
- ✅ 不会暴露给用户
- ✅ 用于存储敏感信息

**示例：**
```typescript
// 仅服务端可以访问
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
```

## 📝 环境文件

### 开发环境

创建 `.env.local` 文件（不提交到 Git）：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev_anon_key
SUPABASE_SERVICE_ROLE_KEY=dev_service_role_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name (Dev)
```

### 生产环境

在 Vercel Dashboard 中配置环境变量：

1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加所有必需的变量
4. 选择环境：Production / Preview / Development

## 🔄 环境变量优先级

Next.js 按以下顺序加载环境变量：

1. `.env.local` - 本地覆盖（所有环境）
2. `.env.production` - 生产环境
3. `.env.development` - 开发环境
4. `.env` - 默认值

**推荐做法：**
- `.env.example` - 提交到 Git，包含示例值
- `.env.local` - 不提交，包含实际值
- `.env` - 可选，包含默认值

## 🧪 验证环境变量

创建验证脚本 `scripts/check-env.js`：

```javascript
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SITE_URL',
]

const missingVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
)

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingVars.forEach((varName) => console.error(`  - ${varName}`))
  process.exit(1)
}

console.log('✅ All required environment variables are set')
```

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "check-env": "node scripts/check-env.js",
    "dev": "npm run check-env && next dev",
    "build": "npm run check-env && next build"
  }
}
```

## 📚 使用示例

### 在服务端组件中

```typescript
// app/page.tsx
export default async function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // 仅服务端
  
  return <div>{siteUrl}</div>
}
```

### 在客户端组件中

```typescript
'use client'

export default function ClientComponent() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL // ✅ 可以访问
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // ❌ undefined
  
  return <div>{siteUrl}</div>
}
```

### 在 API 路由中

```typescript
// app/api/route.ts
export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // ✅ 可以访问
  
  return Response.json({ ok: true })
}
```

## 🐛 常见问题

### 1. 环境变量未生效

**原因：** 修改环境变量后未重启开发服务器

**解决：**
```bash
# 停止服务器 (Ctrl+C)
# 重新启动
npm run dev
```

### 2. 客户端无法访问变量

**原因：** 变量名没有 `NEXT_PUBLIC_` 前缀

**解决：**
```env
# ❌ 错误
SITE_URL=http://localhost:3000

# ✅ 正确
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Vercel 部署失败

**原因：** 未在 Vercel 中配置环境变量

**解决：**
1. 进入 Vercel 项目设置
2. 添加所有必需的环境变量
3. 重新部署

### 4. Supabase 连接失败

**原因：** URL 或 Key 错误

**解决：**
1. 检查 Supabase Dashboard 中的 API 设置
2. 确保复制了正确的值
3. 检查是否有多余的空格

## 📋 检查清单

部署前确保：

- [ ] 所有必需的环境变量已配置
- [ ] Supabase URL 和 Keys 正确
- [ ] 生产环境使用实际域名
- [ ] OAuth 配置正确（如果使用）
- [ ] Analytics ID 正确（如果使用）
- [ ] 敏感信息未提交到 Git
- [ ] `.env.local` 在 `.gitignore` 中
- [ ] Vercel 环境变量已配置

## 🔗 相关资源

- [Next.js 环境变量文档](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase 环境变量](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Vercel 环境变量](https://vercel.com/docs/concepts/projects/environment-variables)
