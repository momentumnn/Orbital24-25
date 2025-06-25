import supabase from "../SupabaseAuthentication/SupabaseClient";

export const getRestaurantId = async (id: string) => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("id")
    // user.id is from the auth table
    // user_id in user_saves table is equal to the uuid of the current logged in user.
    .eq("places_api_id", id);

  if (error) {
    console.error("Error fetching saved restaurants:", error.message);
    return;
  }
  // console.log(data[0].id);
  if (data) {
    return data[0].id;
  }
  // setId(data[0].id);
};

export const updateRestaurant = async (
  place: google.maps.places.Place,
  photo: string | null | undefined
) => {
  const { error } = await supabase.from("restaurants").upsert(
    {
      displayName: place.displayName,
      formattedAddress: place.formattedAddress,
      image_url: photo,
      places_api_id: place.id,
      rating: place.rating,
      regularOpeningHours: place.regularOpeningHours,
      reviews: place.reviews,
      latlng: place.location,
    },
    { onConflict: "places_api_id" }
  );
  if (error) console.log(error);
};
