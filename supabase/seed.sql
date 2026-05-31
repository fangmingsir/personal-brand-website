-- 种子数据：技能
INSERT INTO skills (name, category, proficiency, description, sort_order) VALUES
  ('React', 'frontend', 'expert', 'Modern UI library for building user interfaces', 1),
  ('Next.js', 'frontend', 'expert', 'React framework for production', 2),
  ('TypeScript', 'frontend', 'expert', 'Typed superset of JavaScript', 3),
  ('TailwindCSS', 'frontend', 'expert', 'Utility-first CSS framework', 4),
  ('Node.js', 'backend', 'proficient', 'JavaScript runtime', 5),
  ('PostgreSQL', 'database', 'proficient', 'Advanced open source database', 6),
  ('Supabase', 'backend', 'proficient', 'Open source Firebase alternative', 7),
  ('Git', 'tools', 'expert', 'Version control system', 8),
  ('Docker', 'tools', 'familiar', 'Containerization platform', 9),
  ('Communication', 'soft', 'expert', 'Clear and effective communication', 10);

-- 种子数据：技术栈
INSERT INTO tech_stacks (name, slug, color) VALUES
  ('React', 'react', '#61DAFB'),
  ('Next.js', 'nextjs', '#000000'),
  ('TypeScript', 'typescript', '#3178C6'),
  ('TailwindCSS', 'tailwindcss', '#06B6D4'),
  ('Node.js', 'nodejs', '#339933'),
  ('PostgreSQL', 'postgresql', '#4169E1'),
  ('Supabase', 'supabase', '#3ECF8E'),
  ('Vercel', 'vercel', '#000000'),
  ('Python', 'python', '#3776AB'),
  ('Docker', 'docker', '#2496ED');

-- 种子数据：分类
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('技术', 'tech', '技术相关文章', 1),
  ('教程', 'tutorial', '教程和指南', 2),
  ('思考', 'thoughts', '个人思考和见解', 3),
  ('生活', 'life', '生活随笔', 4);

-- 种子数据：标签
INSERT INTO tags (name, slug, color) VALUES
  ('JavaScript', 'javascript', '#F7DF1E'),
  ('React', 'react', '#61DAFB'),
  ('Next.js', 'nextjs', '#000000'),
  ('TypeScript', 'typescript', '#3178C6'),
  ('CSS', 'css', '#1572B6'),
  ('Node.js', 'nodejs', '#339933'),
  ('数据库', 'database', '#4169E1'),
  ('性能优化', 'performance', '#FF6B6B'),
  ('最佳实践', 'best-practices', '#51CF66'),
  ('开发工具', 'dev-tools', '#845EF7');

-- 注意：实际使用时需要先创建管理员账号，然后更新 role
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
