export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          job_title: string | null
          location: string | null
          website: string | null
          github_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          wechat_qr_url: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          job_title?: string | null
          location?: string | null
          website?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          wechat_qr_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          job_title?: string | null
          location?: string | null
          website?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          wechat_qr_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: 'frontend' | 'backend' | 'database' | 'tools' | 'soft'
          proficiency: 'expert' | 'proficient' | 'familiar'
          icon_url: string | null
          description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'frontend' | 'backend' | 'database' | 'tools' | 'soft'
          proficiency: 'expert' | 'proficient' | 'familiar'
          icon_url?: string | null
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'frontend' | 'backend' | 'database' | 'tools' | 'soft'
          proficiency?: 'expert' | 'proficient' | 'familiar'
          icon_url?: string | null
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          content: string | null
          cover_image_url: string | null
          demo_url: string | null
          github_url: string | null
          status: 'in_progress' | 'completed' | 'maintenance'
          start_date: string | null
          end_date: string | null
          role: string | null
          highlights: string[] | null
          view_count: number
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          content?: string | null
          cover_image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          status?: 'in_progress' | 'completed' | 'maintenance'
          start_date?: string | null
          end_date?: string | null
          role?: string | null
          highlights?: string[] | null
          view_count?: number
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          content?: string | null
          cover_image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          status?: 'in_progress' | 'completed' | 'maintenance'
          start_date?: string | null
          end_date?: string | null
          role?: string | null
          highlights?: string[] | null
          view_count?: number
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          category_id: string | null
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image_url: string | null
          status: 'draft' | 'published'
          view_count: number
          like_count: number
          reading_time: number | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          category_id?: string | null
          title: string
          slug: string
          excerpt?: string | null
          content: string
          cover_image_url?: string | null
          status?: 'draft' | 'published'
          view_count?: number
          like_count?: number
          reading_time?: number | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          category_id?: string | null
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          cover_image_url?: string | null
          status?: 'draft' | 'published'
          view_count?: number
          like_count?: number
          reading_time?: number | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          color?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          color?: string
          created_at?: string
        }
      }
      tech_stacks: {
        Row: {
          id: string
          name: string
          slug: string
          icon_url: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon_url?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon_url?: string | null
          color?: string | null
          created_at?: string
        }
      }
      media: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
          width: number | null
          height: number | null
          alt_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_url?: string
          file_type?: string
          file_size?: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_post_view_count: {
        Args: { post_id: string }
        Returns: void
      }
      increment_project_view_count: {
        Args: { project_id: string }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
