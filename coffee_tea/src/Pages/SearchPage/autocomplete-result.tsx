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

  // adjust the viewport of the map when the place is changed
  useEffect(() => {
    if (!map || !place) return;
    if (place.viewport) map.fitBounds(place.viewport);
    if (place && place.photos && place.photos.length > 0) {
      // Use the correct method: getUrl()
      setPhoto(place.photos[0].getURI());
    } else {
      setPhoto(null); // Clear photo if no photos or place is null
    }
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
        },
        { onConflict: "places_api_id" }
      );
      if (error) console.log(error);
    };
    updateRestaurant();
  }, [map, place]);
  if (!place) return null;

  console.log(place.rating);

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
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default React.memo(AutocompleteResult);
