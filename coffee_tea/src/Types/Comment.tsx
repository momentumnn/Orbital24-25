export interface Comment {
  id: number;
  content: string;
  user_id: string;
  created_at: string;
  Public_Profile: {
    username: string | null;} | null;
}