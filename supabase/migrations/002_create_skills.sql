-- 创建技能表
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

-- 创建索引
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_sort_order ON skills(sort_order);

-- 启用 RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- RLS 策略：所有人可以查看
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

-- RLS 策略：只有管理员可以修改
CREATE POLICY "Only admins can modify skills"
  ON skills FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 创建触发器
CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
