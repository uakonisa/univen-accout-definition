// Database types
export interface AccountDefinition {
  id: string
  account_code: string
  account_name: string
  account_type: 'INCOME' | 'EXPENSE'
  description?: string
  notes?: string
  created_at: string
  updated_at: string
  created_by: string
}

export interface Document {
  id: string
  account_id: string
  file_name: string
  file_path: string
  file_size: number
  file_type: string
  uploaded_at: string
  uploaded_by: string
}

// Form types
export interface AccountFormData {
  account_code: string
  account_name: string
  account_type: 'INCOME' | 'EXPENSE'
  description?: string
  notes?: string
}

// API response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Filter types
export interface AccountFilters {
  search?: string
  account_type?: 'INCOME' | 'EXPENSE' | 'ALL'
  date_from?: string
  date_to?: string
}

// User types (extending Supabase User)
export interface AppUser {
  id: string
  email: string
  full_name?: string
  role?: 'admin' | 'user'
  created_at: string
}

// Email types
export interface EmailData {
  to: string
  subject: string
  document_url: string
  account_name: string
  sender_name: string
}
