export interface Restaurant {
  id: string;
  displayName: string;
  formattedAddress: string;
  image_url: string;
  latlng: { lng: string; lat: string; };
  rating?: number;
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
  };

}