export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: { id: string; name: string; sort_order: number };
        Insert: { id?: string; name: string; sort_order?: number };
        Update: { name?: string; sort_order?: number };
        Relationships: [];
      };
      crop_types: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string | null;
          season: string | null;
          image_url: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description?: string | null;
          season?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string;
          name?: string;
          description?: string | null;
          season?: string | null;
          image_url?: string | null;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      varieties: {
        Row: {
          id: string;
          crop_type_id: string;
          name: string;
          type_subtype: string | null;
          days_to_maturity: string | null;
          season: string | null;
          note: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          crop_type_id: string;
          name: string;
          type_subtype?: string | null;
          days_to_maturity?: string | null;
          season?: string | null;
          note?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['varieties']['Insert']>;
        Relationships: [];
      };
      client_submissions: {
        Row: {
          id: string;
          client_name: string;
          status: 'new' | 'planned' | 'planted' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          status?: 'new' | 'planned' | 'planted' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: { client_name?: string; status?: 'new' | 'planned' | 'planted' | null; updated_at?: string };
        Relationships: [];
      };
      submission_selections: {
        Row: {
          id: string;
          submission_id: string;
          crop_type_id: string;
          variety_id: string | null;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          crop_type_id: string;
          variety_id?: string | null;
          note?: string | null;
          created_at?: string;
        };
        Update: { variety_id?: string | null; note?: string | null };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type CropType = Database['public']['Tables']['crop_types']['Row'];
export type Variety = Database['public']['Tables']['varieties']['Row'];
export type ClientSubmission = Database['public']['Tables']['client_submissions']['Row'];
export type SubmissionSelection = Database['public']['Tables']['submission_selections']['Row'];

export type CropTypeWithVarieties = CropType & { varieties: Variety[] };
export type CategoryWithCropTypes = Category & { crop_types: CropTypeWithVarieties[] };
