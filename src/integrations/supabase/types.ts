export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      calendar_integrations: {
        Row: {
          access_token: string | null
          calendar_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          provider: string
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_integrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_combinations: {
        Row: {
          connection_strength: number | null
          created_at: string | null
          id: string
          last_meeting_date: string | null
          meeting_count: number | null
          participant_1_id: string | null
          participant_2_id: string | null
          updated_at: string | null
        }
        Insert: {
          connection_strength?: number | null
          created_at?: string | null
          id?: string
          last_meeting_date?: string | null
          meeting_count?: number | null
          participant_1_id?: string | null
          participant_2_id?: string | null
          updated_at?: string | null
        }
        Update: {
          connection_strength?: number | null
          created_at?: string | null
          id?: string
          last_meeting_date?: string | null
          meeting_count?: number | null
          participant_1_id?: string | null
          participant_2_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_combinations_participant_1_id_fkey"
            columns: ["participant_1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_combinations_participant_2_id_fkey"
            columns: ["participant_2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_feedback: {
        Row: {
          created_at: string | null
          effectiveness_score: number | null
          follow_up_actions: string[] | null
          id: string
          meeting_id: string | null
          private_notes: string | null
          rating: number | null
          reviewer_id: string | null
          updated_at: string | null
          would_meet_again: boolean | null
        }
        Insert: {
          created_at?: string | null
          effectiveness_score?: number | null
          follow_up_actions?: string[] | null
          id?: string
          meeting_id?: string | null
          private_notes?: string | null
          rating?: number | null
          reviewer_id?: string | null
          updated_at?: string | null
          would_meet_again?: boolean | null
        }
        Update: {
          created_at?: string | null
          effectiveness_score?: number | null
          follow_up_actions?: string[] | null
          id?: string
          meeting_id?: string | null
          private_notes?: string | null
          rating?: number | null
          reviewer_id?: string | null
          updated_at?: string | null
          would_meet_again?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_feedback_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_feedback_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_participants: {
        Row: {
          id: string
          meeting_id: string | null
          participant_id: string | null
          status: string | null
        }
        Insert: {
          id?: string
          meeting_id?: string | null
          participant_id?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          meeting_id?: string | null
          participant_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_participants_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_reminders: {
        Row: {
          created_at: string | null
          id: string
          meeting_id: string | null
          participant_id: string | null
          reminder_time: string
          sent: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meeting_id?: string | null
          participant_id?: string | null
          reminder_time: string
          sent?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meeting_id?: string | null
          participant_id?: string | null
          reminder_time?: string
          sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_reminders_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_reminders_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          agenda: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_recurring: boolean | null
          location_details: string | null
          location_type: Database["public"]["Enums"]["meeting_location"]
          meeting_type: Database["public"]["Enums"]["meeting_type"]
          notes: string | null
          recording_url: string | null
          recurrence_pattern: string | null
          scheduled_date: string
          status: Database["public"]["Enums"]["meeting_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          agenda?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          location_details?: string | null
          location_type: Database["public"]["Enums"]["meeting_location"]
          meeting_type: Database["public"]["Enums"]["meeting_type"]
          notes?: string | null
          recording_url?: string | null
          recurrence_pattern?: string | null
          scheduled_date: string
          status?: Database["public"]["Enums"]["meeting_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          agenda?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["meeting_location"]
          meeting_type?: Database["public"]["Enums"]["meeting_type"]
          notes?: string | null
          recording_url?: string | null
          recurrence_pattern?: string | null
          scheduled_date?: string
          status?: Database["public"]["Enums"]["meeting_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          cohort_id: string | null
          id: string
          is_active: boolean | null
          join_date: string | null
          profile_id: string | null
        }
        Insert: {
          cohort_id?: string | null
          id?: string
          is_active?: boolean | null
          join_date?: string | null
          profile_id?: string | null
        }
        Update: {
          cohort_id?: string | null
          id?: string
          is_active?: boolean | null
          join_date?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability_status: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          interests: string[] | null
          linkedin_url: string | null
          phone: string | null
          role: string | null
          skills: string[] | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string | null
        }
        Insert: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          full_name?: string | null
          id: string
          interests?: string[] | null
          linkedin_url?: string | null
          phone?: string | null
          role?: string | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
        }
        Update: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          interests?: string[] | null
          linkedin_url?: string | null
          phone?: string | null
          role?: string | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      meeting_location: "in_person" | "video" | "hybrid"
      meeting_status: "scheduled" | "completed" | "cancelled" | "rescheduled"
      meeting_type: "one_on_one" | "group" | "braindate" | "project_sync"
      user_status: "online" | "offline" | "busy" | "away"
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
      meeting_location: ["in_person", "video", "hybrid"],
      meeting_status: ["scheduled", "completed", "cancelled", "rescheduled"],
      meeting_type: ["one_on_one", "group", "braindate", "project_sync"],
      user_status: ["online", "offline", "busy", "away"],
    },
  },
} as const
