// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://klykbeekvoaouftmintv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseWtiZWVrdm9hb3VmdG1pbnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzM0NTcsImV4cCI6MjA2OTA0OTQ1N30.9WuCOhRBxq6X3hTcj5ebmdIzPSfncoegOUk6YJjIoyM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
