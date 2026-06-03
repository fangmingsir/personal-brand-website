export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // 由 Supabase 客户端用于自动匹配 PostgREST 行为
  __InternalSupabase: {
    PostgrestVersion: '12.2.3'
  }
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          alt_text: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'project_images_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: []
      }
      project_tech_stacks: {
        Row: {
          project_id: string
          tech_stack_id: string
          created_at: string
        }
        Insert: {
          project_id: string
          tech_stack_id: string
          created_at?: string
        }
        Update: {
          project_id?: string
          tech_stack_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'project_tech_stacks_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'project_tech_stacks_tech_stack_id_fkey'
            columns: ['tech_stack_id']
            isOneToOne: false
            referencedRelation: 'tech_stacks'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: []
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: 'posts_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          post_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          post_id?: string
          tag_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'post_tags_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      post_likes: {
        Row: {
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          post_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'post_likes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_likes_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
        ]
      }
      post_bookmarks: {
        Row: {
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          post_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'post_bookmarks_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_bookmarks_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'media_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      site_stats: {
        Row: {
          id: string
          date: string
          page_views: number
          unique_visitors: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date?: string
          page_views?: number
          unique_visitors?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          page_views?: number
          unique_visitors?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_post_view_count: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_project_view_count: {
        Args: { project_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
