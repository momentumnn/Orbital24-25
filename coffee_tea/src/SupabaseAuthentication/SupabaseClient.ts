import { createClient } from "@supabase/supabase-js";

const SupabaseUrl : string= process.env.REACT_APP_SUPABASE_URL as string ;
const SupabaseAnonKey : string = process.env.REACT_APP_SUPABASE_ANON_KEY as string ;

const supabase = createClient(SupabaseUrl, SupabaseAnonKey);
export default supabase;