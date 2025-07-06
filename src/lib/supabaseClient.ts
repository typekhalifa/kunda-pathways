import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wugzcmqtlctrccixqpvf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1Z3pjbXF0bGN0cmNjaXhxcHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTkzODQsImV4cCI6MjA2NjA3NTM4NH0.vl8EZvd66U1tGHdt1R_brxPYQY0gJ6N0-WUal51A_bY'; // From Supabase project settings

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
