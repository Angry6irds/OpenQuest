import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rofawofgaitfsdepdlhg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZmF3b2ZnYWl0ZnNkZXBkbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MzEwMjAsImV4cCI6MjA5NDEwNzAyMH0.PlLQVINh_rkXuKfCmt2IUbH3ki-GYQPyHopO2GQzqd4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
