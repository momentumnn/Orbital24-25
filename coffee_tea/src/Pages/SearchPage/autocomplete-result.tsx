import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import { updateRestaurant, getRestaurantId } from "../../api/restaurants";

interface Props {
  place: google.maps.places.Place | null;
}

const AutocompleteResult = ({ place }: Props) => {
  const map = useMap();
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [photo, setPhoto] = useState<string | null>();
  const [id, setId] = useState<string>();

  const [save, setSave] = useState<boolean>(false);

  useEffect(() => {
    // adjust the viewport of the map when the place is changed
    if (!map || !place) return;
    if (place.viewport) map.fitBounds(place.viewport);
    if (place && place.photos && place.photos.length > 0) {
      setPhoto(place.photos[0].getURI());
    } else {
      setPhoto(null);
    }
    setSave(false);
  }, [map, place]);

  if (!place) return null;
  updateRestaurant(place, photo);
  console.log(place);
  const fetchRestaurantData = async () => {
    try {
      const id = await getRestaurantId(place.id); // Await the result
      setId(id); // Set the state with the actual ID
    } catch (err: any) {
      console.error("Failed to fetch restaurant ID:", err);
    }
  };

  fetchRestaurantData();
 

  const onClick = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !id) 
  {
    alert("You are not an authenticated user. Please authenticate or use an authenticated account");
    return;
  }
  
    
  //need to check that it is saved already or not first
  const { data: existingSave, error: checkError } = await supabase
    .from("user_saves")
    .select("id")
    .eq("user_id", user.id)
    .eq("restaurant_id", id)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking existing save:", checkError);
    return;
  }

  // this is already have
  if (existingSave) {
    alert("You’ve already saved this restaurant.");
    return;
  }

  // if not then insert it
  const { error } = await supabase.from("user_saves").insert({
    user_id: user.id,
    visited: false,
    places_api_id: place.id,
    restaurant_id: id,
  });

  if (error) {
    console.error("Error saving:", error);
  } else {
    setSave(true);
  }
};
  // console.log(save);
  console.log(place);
  // add a marker for the selected place
  return (
    <AdvancedMarker
      position={place.location}
      ref={markerRef}
      onClick={() => setInfowindowOpen(true)}
    >
      <Pin
        background={place.iconBackgroundColor}
        glyph={place.svgIconMaskURI ? new URL(place.svgIconMaskURI) : null}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          // maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
          headerContent={<h2>{place.displayName}</h2>}
        >
          <div>
            <p>{place.formattedAddress}</p>
            <p>{place.rating} stars</p>
            <h6>
              {place.regularOpeningHours?.weekdayDescriptions.map((x) => {
                return <p>{x}</p>;
              })}
            </h6>
            {photo && (
              <img
                src={photo}
                alt={place?.displayName ?? "Place photo"}
                style={{ width: "250px" }}
              ></img>
            )}
            <button onClick={onClick} disabled={save}>{save ? "Already saved" : "Save to Profile"}</button>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default React.memo(AutocompleteResult);
