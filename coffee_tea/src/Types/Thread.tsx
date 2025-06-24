export interface Thread {
  id: number;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  Public_Profile: {
    username: string | null;} | null;
  type: string;
}