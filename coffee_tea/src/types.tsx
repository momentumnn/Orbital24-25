export interface Restaurant {
  id: number;
  name: string;
  address: string;
  image_url: string;
  visited: boolean;
  save_id: number;
  tags: string[];
}
export type AutocompleteMode = { id: string; label: string };

export type UserCoordinates = { lat: number; lng: number };
