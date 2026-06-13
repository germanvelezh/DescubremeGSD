export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      assessment_session: {
        Row: {
          anonymous_session_id: string | null
          completed_at: string | null
          expires_at: string | null
          id: string
          instrument_version_id: string
          organization_id: string | null
          progress: number
          started_at: string
          status: string
          user_id: string | null
        }
        Insert: {
          anonymous_session_id?: string | null
          completed_at?: string | null
          expires_at?: string | null
          id?: string
          instrument_version_id: string
          organization_id?: string | null
          progress?: number
          started_at?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          anonymous_session_id?: string | null
          completed_at?: string | null
          expires_at?: string | null
          id?: string
          instrument_version_id?: string
          organization_id?: string | null
          progress?: number
          started_at?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_session_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_session_organization_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_session_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          actor_role: string
          entity_id: string
          entity_type: string
          id: number
          meta: Json | null
          occurred_at: string
          prev_hash: string | null
          this_hash: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_role: string
          entity_id: string
          entity_type: string
          id?: never
          meta?: Json | null
          occurred_at?: string
          prev_hash?: string | null
          this_hash?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_role?: string
          entity_id?: string
          entity_type?: string
          id?: never
          meta?: Json | null
          occurred_at?: string
          prev_hash?: string | null
          this_hash?: string | null
        }
        Relationships: []
      }
      baremo: {
        Row: {
          id: string
          instrument_version_id: string
          population: string
          reference_data: Json | null
          type: string
        }
        Insert: {
          id?: string
          instrument_version_id: string
          population: string
          reference_data?: Json | null
          type: string
        }
        Update: {
          id?: string
          instrument_version_id?: string
          population?: string
          reference_data?: Json | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "baremo_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
        ]
      }
      baremo_fallback_event: {
        Row: {
          baremo_used: string
          country_requested: string
          id: string
          instrument_version_id: string
          occurred_at: string
        }
        Insert: {
          baremo_used: string
          country_requested: string
          id?: string
          instrument_version_id: string
          occurred_at?: string
        }
        Update: {
          baremo_used?: string
          country_requested?: string
          id?: string
          instrument_version_id?: string
          occurred_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "baremo_fallback_event_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
        ]
      }
      computed_score: {
        Row: {
          band: string | null
          baremo_id: string | null
          computed_at: string
          id: string
          normalized: number | null
          organization_id: string | null
          raw: number
          scoring_rule_id: string
          scoring_version: string
          user_id: string
        }
        Insert: {
          band?: string | null
          baremo_id?: string | null
          computed_at?: string
          id?: string
          normalized?: number | null
          organization_id?: string | null
          raw: number
          scoring_rule_id: string
          scoring_version: string
          user_id: string
        }
        Update: {
          band?: string | null
          baremo_id?: string | null
          computed_at?: string
          id?: string
          normalized?: number | null
          organization_id?: string | null
          raw?: number
          scoring_rule_id?: string
          scoring_version?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "computed_score_baremo_id_fkey"
            columns: ["baremo_id"]
            isOneToOne: false
            referencedRelation: "baremo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "computed_score_organization_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "computed_score_scoring_rule_id_fkey"
            columns: ["scoring_rule_id"]
            isOneToOne: false
            referencedRelation: "scoring_rule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "computed_score_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      consent: {
        Row: {
          consent_general: boolean
          consent_sensitive_data: boolean
          consent_version: string
          granted_at: string
          id: string
          ip_truncated: string | null
          locale: string
          product_code: string
          revoked_at: string | null
          text_sha256_hash: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          consent_general: boolean
          consent_sensitive_data: boolean
          consent_version: string
          granted_at?: string
          id?: string
          ip_truncated?: string | null
          locale?: string
          product_code: string
          revoked_at?: string | null
          text_sha256_hash: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          consent_general?: boolean
          consent_sensitive_data?: boolean
          consent_version?: string
          granted_at?: string
          id?: string
          ip_truncated?: string | null
          locale?: string
          product_code?: string
          revoked_at?: string | null
          text_sha256_hash?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      contention_resources: {
        Row: {
          country_code: string
          description_es_co: string
          hours: string | null
          id: string
          last_verified_at: string
          name: string
          phone: string | null
          type: string
          url: string | null
        }
        Insert: {
          country_code: string
          description_es_co: string
          hours?: string | null
          id?: string
          last_verified_at: string
          name: string
          phone?: string | null
          type: string
          url?: string | null
        }
        Update: {
          country_code?: string
          description_es_co?: string
          hours?: string | null
          id?: string
          last_verified_at?: string
          name?: string
          phone?: string | null
          type?: string
          url?: string | null
        }
        Relationships: []
      }
      distress_event: {
        Row: {
          action_taken: string
          created_at: string
          id: string
          instrument_version_id: string
          threshold_triggered: string
          user_id: string | null
        }
        Insert: {
          action_taken: string
          created_at?: string
          id?: string
          instrument_version_id: string
          threshold_triggered: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string
          created_at?: string
          id?: string
          instrument_version_id?: string
          threshold_triggered?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "distress_event_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "distress_event_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      entitlement: {
        Row: {
          expires_at: string | null
          granted_at: string
          id: string
          product_code: string
          status: string
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          granted_at?: string
          id?: string
          product_code: string
          status: string
          user_id: string
        }
        Update: {
          expires_at?: string | null
          granted_at?: string
          id?: string
          product_code?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entitlement_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_event: {
        Row: {
          created_at: string
          id: string
          report_snapshot_id: string | null
          stars: number
          text_free: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          report_snapshot_id?: string | null
          stars: number
          text_free?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          report_snapshot_id?: string | null
          stars?: number
          text_free?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_event_report_snapshot_id_fkey"
            columns: ["report_snapshot_id"]
            isOneToOne: false
            referencedRelation: "report_snapshot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_event_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      instrument: {
        Row: {
          code: string
          construct: string | null
          created_at: string
          ethical_flags: Json
          id: string
          name: string
          sensitivity: string
        }
        Insert: {
          code: string
          construct?: string | null
          created_at?: string
          ethical_flags?: Json
          id?: string
          name: string
          sensitivity?: string
        }
        Update: {
          code?: string
          construct?: string | null
          created_at?: string
          ethical_flags?: Json
          id?: string
          name?: string
          sensitivity?: string
        }
        Relationships: []
      }
      instrument_version: {
        Row: {
          centering_strategy: string
          created_at: string
          id: string
          instrument_id: string
          item_count: number | null
          lang: string
          likert_max: number | null
          likert_min: number | null
          plan_b_ref: string | null
          psychometric_status: Json | null
          version: string
          visual_type: string | null
        }
        Insert: {
          centering_strategy?: string
          created_at?: string
          id?: string
          instrument_id: string
          item_count?: number | null
          lang?: string
          likert_max?: number | null
          likert_min?: number | null
          plan_b_ref?: string | null
          psychometric_status?: Json | null
          version: string
          visual_type?: string | null
        }
        Update: {
          centering_strategy?: string
          created_at?: string
          id?: string
          instrument_id?: string
          item_count?: number | null
          lang?: string
          likert_max?: number | null
          likert_min?: number | null
          plan_b_ref?: string | null
          psychometric_status?: Json | null
          version?: string
          visual_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instrument_version_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "instrument"
            referencedColumns: ["id"]
          },
        ]
      }
      integrator_rule: {
        Row: {
          conditions: Json
          created_at: string
          id: string
          lang: string
          requires_dimensions: Json
          template_id: string | null
          template_text: string | null
          tier: string
          version: string
        }
        Insert: {
          conditions: Json
          created_at?: string
          id?: string
          lang?: string
          requires_dimensions?: Json
          template_id?: string | null
          template_text?: string | null
          tier: string
          version?: string
        }
        Update: {
          conditions?: Json
          created_at?: string
          id?: string
          lang?: string
          requires_dimensions?: Json
          template_id?: string | null
          template_text?: string | null
          tier?: string
          version?: string
        }
        Relationships: []
      }
      item: {
        Row: {
          anchor_max: string | null
          anchor_min: string | null
          dimension: string | null
          id: string
          instrument_version_id: string
          item_code: string | null
          reverse_key: boolean
          sequence_number: number
          stem: string
        }
        Insert: {
          anchor_max?: string | null
          anchor_min?: string | null
          dimension?: string | null
          id?: string
          instrument_version_id: string
          item_code?: string | null
          reverse_key?: boolean
          sequence_number: number
          stem: string
        }
        Update: {
          anchor_max?: string | null
          anchor_min?: string | null
          dimension?: string | null
          id?: string
          instrument_version_id?: string
          item_code?: string | null
          reverse_key?: boolean
          sequence_number?: number
          stem?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
        ]
      }
      item_response: {
        Row: {
          id: string
          item_id: string
          organization_id: string | null
          raw_value: number
          responded_at: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          id?: string
          item_id: string
          organization_id?: string | null
          raw_value: number
          responded_at?: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          id?: string
          item_id?: string
          organization_id?: string | null
          raw_value?: number
          responded_at?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_response_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_response_organization_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_response_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_session"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_response_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      membership: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membership_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      narrative_template: {
        Row: {
          band: string | null
          dimension: string | null
          id: string
          lang: string
          riasec_code: string | null
          slot: string
          template_text: string
          version: string
        }
        Insert: {
          band?: string | null
          dimension?: string | null
          id?: string
          lang?: string
          riasec_code?: string | null
          slot: string
          template_text: string
          version?: string
        }
        Update: {
          band?: string | null
          dimension?: string | null
          id?: string
          lang?: string
          riasec_code?: string | null
          slot?: string
          template_text?: string
          version?: string
        }
        Relationships: []
      }
      occupation: {
        Row: {
          code_onet: string
          education_level: string | null
          id: string
          name_es_co: string
          riasec_code: string
        }
        Insert: {
          code_onet: string
          education_level?: string | null
          id?: string
          name_es_co: string
          riasec_code: string
        }
        Update: {
          code_onet?: string
          education_level?: string | null
          id?: string
          name_es_co?: string
          riasec_code?: string
        }
        Relationships: []
      }
      organization: {
        Row: {
          created_at: string
          id: string
          name: string
          plan_code: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          plan_code?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          plan_code?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          code: string
          description: string | null
        }
        Insert: {
          code: string
          description?: string | null
        }
        Update: {
          code?: string
          description?: string | null
        }
        Relationships: []
      }
      product_stack: {
        Row: {
          id: string
          instrument_version_id: string
          layer: string | null
          order: number
          product_code: string
        }
        Insert: {
          id?: string
          instrument_version_id: string
          layer?: string | null
          order?: number
          product_code: string
        }
        Update: {
          id?: string
          instrument_version_id?: string
          layer?: string | null
          order?: number
          product_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_stack_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_stack_product_code_fkey"
            columns: ["product_code"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["code"]
          },
        ]
      }
      report_snapshot: {
        Row: {
          html_payload: Json
          id: string
          instrument_version_id: string
          narrative_version: string
          occupation_set_version: string
          organization_id: string | null
          rendered_at: string
          session_id: string
          user_id: string
        }
        Insert: {
          html_payload: Json
          id?: string
          instrument_version_id: string
          narrative_version: string
          occupation_set_version: string
          organization_id?: string | null
          rendered_at?: string
          session_id: string
          user_id: string
        }
        Update: {
          html_payload?: Json
          id?: string
          instrument_version_id?: string
          narrative_version?: string
          occupation_set_version?: string
          organization_id?: string | null
          rendered_at?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_snapshot_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_snapshot_organization_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_snapshot_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_session"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_snapshot_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      scoring_rule: {
        Row: {
          dimension: string
          formula: Json
          id: string
          instrument_version_id: string
          scoring_version: string
        }
        Insert: {
          dimension: string
          formula: Json
          id?: string
          instrument_version_id: string
          scoring_version?: string
        }
        Update: {
          dimension?: string
          formula?: Json
          id?: string
          instrument_version_id?: string
          scoring_version?: string
        }
        Relationships: [
          {
            foreignKeyName: "scoring_rule_instrument_version_id_fkey"
            columns: ["instrument_version_id"]
            isOneToOne: false
            referencedRelation: "instrument_version"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_log: {
        Row: {
          created_at: string
          event_type: string
          id: string
          meta: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          meta?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          meta?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          country_code: string
          created_at: string
          date_of_birth_encrypted: Json | null
          deleted: boolean
          email: string
          email_lookup_hash: string | null
          id: string
          lang: string
          name_encrypted: Json | null
          organization_id: string | null
        }
        Insert: {
          country_code?: string
          created_at?: string
          date_of_birth_encrypted?: Json | null
          deleted?: boolean
          email: string
          email_lookup_hash?: string | null
          id: string
          lang?: string
          name_encrypted?: Json | null
          organization_id?: string | null
        }
        Update: {
          country_code?: string
          created_at?: string
          date_of_birth_encrypted?: Json | null
          deleted?: boolean
          email?: string
          email_lookup_hash?: string | null
          id?: string
          lang?: string
          name_encrypted?: Json | null
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_organization_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          email: string
          id: string
          interest: string
          joined_at: string
          source: string
        }
        Insert: {
          email: string
          id?: string
          interest?: string
          joined_at?: string
          source?: string
        }
        Update: {
          email?: string
          id?: string
          interest?: string
          joined_at?: string
          source?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      anonymize_user_audit: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      delete_user_account: {
        Args: { target_user_id: string }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

