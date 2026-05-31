# 数据库设计文档

## 1. 数据库概述

### 1.1 数据库类型
PostgreSQL 14+ (通过 Supabase 托管)

### 1.2 设计原则
- 遵循第三范式 (3NF)
- 使用 UUID 作为主键
- 所有表包含 created_at 和 updated_at 时间戳
- 使用 Row Level Security (RLS) 保护数据
- 软删除策略（重要数据）

---

## 2. 数据表设计

### 2.1 用户表 (profiles)

扩展 Supabase Auth 的用户信息表。

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  job_title TEXT,
  location TEXT,
  website TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  wechat_qr_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- RLS 策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 所有人可以查看公开信息
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 用户只能更新自己的信息
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

---

### 2.2 技能表 (skills)

存储个人技能信息。

```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'database', 'tools', 'soft')),
  proficiency TEXT NOT NULL CHECK (proficiency IN ('expert', 'proficient', 'familiar')),
  icon_url TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_sort_order ON skills(sort_order);

-- RLS 策略
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- 所有人可以查看
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

-- 只有管理员可以修改
CREATE POLICY "Only admins can modify skills"
  ON skills FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

### 2.3 项目表 (projects)

存储项目作品信息。

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT, -- Markdown 格式的详细描述
  cover_image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed', 'maintenance')),
  start_date DATE,
  end_date DATE,
  role TEXT, -- 我的角色
  highlights TEXT[], -- 项目亮点数组
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false, -- 是否精选
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- RLS 策略
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 所有人可以查看
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

-- 只有管理员可以修改
CREATE POLICY "Only admins can modify projects"
  ON projects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

### 2.4 项目截图表 (project_images)

存储项目的多张截图。

```sql
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_images_sort_order ON project_images(sort_order);

-- RLS 策略
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project images are viewable by everyone"
  ON project_images FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify project images"
  ON project_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

### 2.5 技术栈表 (tech_stacks)

存储技术栈标签。

```sql
CREATE TABLE tech_stacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  color TEXT, -- 标签颜色
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_tech_stacks_slug ON tech_stacks(slug);

-- RLS 策略
ALTER TABLE tech_stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tech stacks are viewable by everyone"
  ON tech_stacks FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify tech stacks"
  ON tech_stacks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

### 2.6 项目技术栈关联表 (project_tech_stacks)

多对多关系表。

```sql
CREATE TABLE project_tech_stacks (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tech_stack_id UUID REFERENCES tech_stacks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, tech_stack_id)
);

-- 索引
CREATE INDEX idx_project_tech_stacks_project_id ON project_tech_stacks(project_id);
CREATE INDEX idx_project_tech_stacks_tech_stack_id ON project_tech_stacks(tech_stack_id);

-- RLS 策略
ALTER TABLE project_tech_stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project tech stacks are viewable by everyone"
  ON project_tech_stacks FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify project tech stacks"
  ON project_tech_stacks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

### 2.7 博客分类表 (categories)

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_categories_slug ON categories(slug);

-- RLS 策略
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

### 2.8 博客标签表 (tags)

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#0070F3',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_tags_slug ON tags(slug);

-- RLS 策略
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify tags"
  ON tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

### 2.9 博客文章表 (posts)

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT, -- 摘要
  content TEXT NOT NULL, -- Markdown 格式
  cover_image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  reading_time INTEGER, -- 阅读时长（分钟）
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- 全文搜索索引
CREATE INDEX idx_posts_search ON posts USING gin(to_tsvector('english', title || ' ' || content));

-- RLS 策略
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 所有人可以查看已发布的文章
CREATE POLICY "Published posts are viewable by everyone"
  ON posts FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);

-- 作者可以创建文章
CREATE POLICY "Authors can create posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- 作者可以更新自己的文章
CREATE POLICY "Authors can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);

-- 作者可以删除自己的文章
CREATE POLICY "Authors can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = author_id);
```

---

### 2.10 文章标签关联表 (post_tags)

多对多关系表。

```sql
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, tag_id)
);

-- 索引
CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);

-- RLS 策略
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post tags are viewable by everyone"
  ON post_tags FOR SELECT
  USING (true);

CREATE POLICY "Only post authors can modify post tags"
  ON post_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_tags.post_id
      AND posts.author_id = auth.uid()
    )
  );
```

---

### 2.11 文章点赞表 (post_likes)

记录用户对文章的点赞。

```sql
CREATE TABLE post_likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- 索引
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);

-- RLS 策略
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post likes are viewable by everyone"
  ON post_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can like posts"
  ON post_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
  ON post_likes FOR DELETE
  USING (auth.uid() = user_id);
```

---

### 2.12 文章收藏表 (post_bookmarks)

记录用户对文章的收藏。

```sql
CREATE TABLE post_bookmarks (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- 索引
CREATE INDEX idx_post_bookmarks_user_id ON post_bookmarks(user_id);
CREATE INDEX idx_post_bookmarks_post_id ON post_bookmarks(post_id);

-- RLS 策略
ALTER TABLE post_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks"
  ON post_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can bookmark posts"
  ON post_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove bookmarks"
  ON post_bookmarks FOR DELETE
  USING (auth.uid() = user_id);
```

---

### 2.13 媒体文件表 (media)

存储上传的媒体文件信息。

```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- image/jpeg, image/png, etc.
  file_size INTEGER NOT NULL, -- 字节
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_media_user_id ON media(user_id);
CREATE INDEX idx_media_created_at ON media(created_at DESC);

-- RLS 策略
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own media"
  ON media FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload media"
  ON media FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media"
  ON media FOR DELETE
  USING (auth.uid() = user_id);
```

---

### 2.14 网站统计表 (site_stats)

存储网站访问统计数据。

```sql
CREATE TABLE site_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_site_stats_date ON site_stats(date DESC);

-- RLS 策略
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site stats are viewable by admins"
  ON site_stats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

## 3. 数据库函数

### 3.1 更新 updated_at 时间戳

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为需要的表创建触发器
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### 3.2 增加文章浏览量

```sql
CREATE OR REPLACE FUNCTION increment_post_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### 3.3 增加项目浏览量

```sql
CREATE OR REPLACE FUNCTION increment_project_view_count(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects
  SET view_count = view_count + 1
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### 3.4 更新文章点赞数

```sql
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_post_like_count_trigger
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_like_count();
```

---

## 4. 初始数据

### 4.1 创建管理员账号

```sql
-- 注意：实际操作中，先通过 Supabase Auth 注册账号，然后更新 role
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

---

## 5. 数据库关系图

```
profiles (用户)
  ├─ posts (1:N) - 用户发布的文章
  ├─ media (1:N) - 用户上传的媒体
  ├─ post_likes (1:N) - 用户点赞的文章
  └─ post_bookmarks (1:N) - 用户收藏的文章

posts (文章)
  ├─ profiles (N:1) - 作者
  ├─ categories (N:1) - 分类
  ├─ post_tags (N:M) - 标签
  ├─ post_likes (1:N) - 点赞
  └─ post_bookmarks (1:N) - 收藏

projects (项目)
  ├─ project_images (1:N) - 项目截图
  └─ project_tech_stacks (N:M) - 技术栈

categories (分类)
  └─ posts (1:N) - 该分类下的文章

tags (标签)
  └─ post_tags (N:M) - 使用该标签的文章

tech_stacks (技术栈)
  └─ project_tech_stacks (N:M) - 使用该技术栈的项目
```

---

## 6. 备份与恢复策略

### 6.1 自动备份
- Supabase 提供自动每日备份
- 保留最近 7 天的备份

### 6.2 手动备份
```bash
# 使用 pg_dump 导出数据库
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### 6.3 恢复
```bash
# 使用 psql 恢复数据库
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

---

**文档版本**：v1.0  
**创建日期**：2026-05-31  
**最后更新**：2026-05-31
