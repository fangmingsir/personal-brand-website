-- 创建媒体文件表
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建网站统计表
CREATE TABLE site_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_media_user_id ON media(user_id);
CREATE INDEX idx_media_created_at ON media(created_at DESC);
CREATE INDEX idx_site_stats_date ON site_stats(date DESC);

-- 启用 RLS
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- RLS 策略：媒体
CREATE POLICY "Users can view own media"
  ON media FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload media"
  ON media FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media"
  ON media FOR DELETE
  USING (auth.uid() = user_id);

-- RLS 策略：统计
CREATE POLICY "Site stats are viewable by admins"
  ON site_stats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
