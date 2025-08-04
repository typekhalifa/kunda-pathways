export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      about_advisor: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          language_code: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          language_code?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          language_code?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_bookings: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          payment_status: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          services: string
          status: string | null
          total_price: number | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          services?: string
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          services?: string
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
          replied_at: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
          replied_at?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
          replied_at?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      extra_service_bookings: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: number
          message: string | null
          payment_method: string | null
          payment_status: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          services: Json | null
          status: string | null
          total_price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          message?: string | null
          payment_method?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          services?: Json | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          message?: string | null
          payment_method?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          services?: Json | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fb_consultation_bookings: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          payment_status: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          services: Json | null
          status: string | null
          total_price: number | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          services?: Json | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          services?: Json | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_campaigns: {
        Row: {
          click_count: number | null
          content: string
          created_at: string
          created_by: string | null
          html_content: string | null
          id: string
          open_count: number | null
          recipient_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          title: string
          updated_at: string
        }
        Insert: {
          click_count?: number | null
          content: string
          created_at?: string
          created_by?: string | null
          html_content?: string | null
          id?: string
          open_count?: number | null
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          title: string
          updated_at?: string
        }
        Update: {
          click_count?: number | null
          content?: string
          created_at?: string
          created_by?: string | null
          html_content?: string | null
          id?: string
          open_count?: number | null
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string | null
          preferences: Json | null
          subscribed_at: string
          unsubscribe_token: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
          preferences?: Json | null
          subscribed_at?: string
          unsubscribe_token?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
          preferences?: Json | null
          subscribed_at?: string
          unsubscribe_token?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          category: string
          created_at: string
          currency: string
          description: string | null
          discounted_price: number
          id: string
          is_active: boolean
          is_popular: boolean
          name: string
          original_price: number
          services: string[]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          currency?: string
          description?: string | null
          discounted_price: number
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name: string
          original_price: number
          services?: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          currency?: string
          description?: string | null
          discounted_price?: number
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name?: string
          original_price?: number
          services?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          download_count: number | null
          file_type: string
          file_url: string
          id: string
          is_featured: boolean | null
          language_code: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_type: string
          file_url: string
          id?: string
          is_featured?: boolean | null
          language_code?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_type?: string
          file_url?: string
          id?: string
          is_featured?: boolean | null
          language_code?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource: string | null
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string
          created_at: string
          currency: string
          description: string
          duration: string | null
          id: string
          is_active: boolean
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          currency?: string
          description: string
          duration?: string | null
          id?: string
          is_active?: boolean
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          currency?: string
          description?: string
          duration?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      study_abroad_bookings: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          payment_status: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: Json | null
          status: string | null
          total_price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: Json | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: Json | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      website_content: {
        Row: {
          content_key: string
          content_value: Json
          created_at: string | null
          id: string
          language_code: string | null
          section: string
          updated_at: string | null
        }
        Insert: {
          content_key: string
          content_value: Json
          created_at?: string | null
          id?: string
          language_code?: string | null
          section: string
          updated_at?: string | null
        }
        Update: {
          content_key?: string
          content_value?: Json
          created_at?: string | null
          id?: string
          language_code?: string | null
          section?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          category: string
          created_at: string
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          setting_key: string
          setting_value?: Json
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_identifier: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      log_security_event: {
        Args: {
          p_action: string
          p_resource?: string
          p_success?: boolean
          p_details?: Json
        }
        Returns: undefined
      }
      validate_input: {
        Args: { p_input: string; p_type?: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user"],
    },
  },
} as const
