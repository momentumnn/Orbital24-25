import supabase from "../SupabaseAuthentication/SupabaseClient";

export async function getRestaurantId(place: google.maps.places.Place) {
  const { data, error } = await supabase
    .from("restaurants")
    .select("id")
    // user.id is from the auth table
    // user_id in user_saves table is equal to the uuid of the current logged in user.
    .eq("places_api_id", place.id);

  if (error) {
    console.error("Error fetching saved restaurants:", error.message);
    return;
  }
  return await data[0].id;
  // console.log(data[0].id);
}
