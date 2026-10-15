import { createClient } from '@supabase/supabase-js';
import { runtime } from '../../shared/config/env';

export const supabase = createClient(runtime.supabaseUrl, runtime.supabaseKey);
