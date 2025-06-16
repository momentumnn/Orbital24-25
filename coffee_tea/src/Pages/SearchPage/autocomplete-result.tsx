import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";

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
  }, [map, place]);
  if (!place) return null;
  const updateRestaurant = async () => {
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
  updateRestaurant();
  const getRestaurantId = async () => {
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
    // console.log(data[0].id);
    setId(data[0].id);
  };
  getRestaurantId();
  const updateSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    //no user so i stop
    if (!user) return;

    const { error } = await supabase.from("user_saves").upsert(
      {
        user_id: user.id,
        visited: false,
        places_api_id: place.id,
        restaurant_id: id,
      },
      { ignoreDuplicates: false }
    );
    if (error) console.log(error);
  };

  // console.log(place.location);

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
            <button onClick={() => updateSave()}> save to profile</button>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default React.memo(AutocompleteResult);
