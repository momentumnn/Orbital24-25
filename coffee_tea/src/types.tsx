export type AutocompleteMode = { id: string; label: string };

export type UserCoordinates = { lat: number; lng: number };

export interface Comment {
  id: number;
  content: string;
  user_id: string;
  created_at: string;
  Public_Profile: {
    username: string | null;} | null;
}

export interface Restaurant {
  id: string;
  displayName: string;
  formattedAddress: string;
  image_url: string;
  latlng: { lng: string; lat: string;};
}

export interface RestaurantHome {
  id:string;
  displayName: string;
  formattedAddress: string;
  image_url: string;
}

export interface Review {
  id: number;
  username: string;
  review: string;
  created_at: string;
}

export interface RestaurantSaved {
  id: string;
  name: string;
  address: string;
  image_url: string;
  visited: boolean;
  save_id: number;
}

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

export interface Filter {
  distance: number;
  category: string;
  latlng: UserCoordinates; 
}

export interface FilterInput {
  label: string;
  value: string;
  input: string;
}