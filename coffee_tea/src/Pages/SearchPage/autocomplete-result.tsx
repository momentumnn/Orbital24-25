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
  const onClick = () => {
    if (!save) {
      setSave(true);
      updateSave();
    } else {
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
            <button onClick={onClick}> save to profile</button>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default React.memo(AutocompleteResult);
