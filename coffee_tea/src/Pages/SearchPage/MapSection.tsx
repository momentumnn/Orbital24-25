import { useContext, useState } from "react";
// the mapsection styles are in this folder ^ under the .css file

import { Restaurant } from "../../types";

import mcdonalds from "../../Assets/McDonalds.jpg";
import { APIProvider, ControlPosition, Map } from "@vis.gl/react-google-maps";
import AutocompleteControl from "./autocomplete-control";
import AutocompleteResult from "./autocomplete-result";
import { UserLocationContext } from "../../Context/UserLocationContext";

type LatLngLiteral = google.maps.LatLngLiteral;

const INITIAL_CAFES: Restaurant[] = [
  {
    id: 1,
    name: "Sushi Place",
    address: "123 Tokyo Street",
    image_url: mcdonalds,
    visited: false,
    save_id: 1,
    tags: ["sushi", "places"],
  },
  {
    id: 2,
    name: "Pasta Heaven",
    address: "456 Rome Avenue",
    image_url: mcdonalds,
    visited: false,
    save_id: 2,
    tags: ["sushi", "places"],
  },
  {
    id: 3,
    name: "Burger World",
    address: "789 New York Blvd",
    image_url: mcdonalds,
    visited: false,
    save_id: 3,
    tags: ["sushi", "places"],
  },
];

const mapsAPI: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
const mapID: string = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID as string;

const MapSection = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);
  const userLocation: LatLngLiteral = useContext(UserLocationContext);
  const position = { lat: 1.3521, lng: 103.8198 };

  //console.log(userLocation);
  return (
    <APIProvider apiKey={mapsAPI}>
      <Map
        style={{ width: "100vw", height: "80vh" }}
        mapId={mapID}
        defaultZoom={13}
        defaultCenter={userLocation}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <AutocompleteControl
          controlPosition={ControlPosition.TOP_LEFT}
          onPlaceSelect={setSelectedPlace}
        />
        {selectedPlace?.displayName}
        <AutocompleteResult place={selectedPlace} />

        {/* <CafeCardList cafe={INITIAL_CAFES}></CafeCardList> */}
      </Map>
    </APIProvider>
  );
};

export default MapSection;
