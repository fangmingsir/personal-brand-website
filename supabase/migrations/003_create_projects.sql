-- 创建项目表
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  cover_image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed', 'maintenance')),
  start_date DATE,
  end_date DATE,
  role TEXT,
  highlights TEXT[],
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建项目截图表
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建技术栈表
CREATE TABLE tech_stacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建项目技术栈关联表
CREATE TABLE project_tech_stacks (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tech_stack_id UUID REFERENCES tech_stacks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, tech_stack_id)
);

-- 创建索引
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_images_sort_order ON project_images(sort_order);
CREATE INDEX idx_tech_stacks_slug ON tech_stacks(slug);
CREATE INDEX idx_project_tech_stacks_project_id ON project_tech_stacks(project_id);
CREATE INDEX idx_project_tech_stacks_tech_stack_id ON project_tech_stacks(tech_stack_id);

-- 启用 RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tech_stacks ENABLE ROW LEVEL SECURITY;

-- RLS 策略：所有人可以查看
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Project images are viewable by everyone"
  ON project_images FOR SELECT USING (true);

CREATE POLICY "Tech stacks are viewable by everyone"
  ON tech_stacks FOR SELECT USING (true);

CREATE POLICY "Project tech stacks are viewable by everyone"
  ON project_tech_stacks FOR SELECT USING (true);

-- RLS 策略：只有管理员可以修改
CREATE POLICY "Only admins can modify projects"
  ON projects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can modify project images"
  ON project_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can modify tech stacks"
  ON tech_stacks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can modify project tech stacks"
  ON project_tech_stacks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 创建触发器
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建增加项目浏览量函数
CREATE OR REPLACE FUNCTION increment_project_view_count(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects
  SET view_count = view_count + 1
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
