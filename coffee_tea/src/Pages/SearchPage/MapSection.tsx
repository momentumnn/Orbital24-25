import React, { useCallback, useRef, useState } from "react";
import CafeCard from "../../Components/CafeCardforMap/CafeCard";
// the mapsection styles are in this folder ^ under the .css file

import { AutocompleteMode, Restaurant } from "../../types";
import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer,
  useLoadScript,
} from "@react-google-maps/api";
import mcdonalds from "../../Assets/McDonalds.jpg";
import { Opacity, WidthFull } from "@mui/icons-material";
import Places from "./Places";
import { APIProvider, ControlPosition, Map } from "@vis.gl/react-google-maps";
import AutocompleteControl from "./autocomplete-control";
import AutocompleteResult from "./autocomplete-result";

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
const position = { lat: 1.3521, lng: 103.8198 };
const options = { disableDefaultUI: true };
const implementations: Array<AutocompleteMode> = [
  { id: "custom-hybrid", label: "Custom w/ UI Library" },
];
export default function MapSection() {
  const [selectedImplementation, setSelectedImplementation] =
    useState<AutocompleteMode>(implementations[0]);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);

  return (
    <APIProvider apiKey={mapsAPI}>
      <Map
        style={{ width: "100vw", height: "80vh" }}
        mapId={mapID}
        defaultZoom={13}
        defaultCenter={position}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <AutocompleteControl
          controlPosition={ControlPosition.TOP_LEFT}
          selectedImplementation={selectedImplementation}
          onPlaceSelect={setSelectedPlace}
        />
        {selectedPlace?.displayName}
        <AutocompleteResult place={selectedPlace} />
      </Map>
    </APIProvider>
  );
}
{
  /* <div className="map-overlay">
        <div className="map-overlay-title">Other cafes in your list!</div>
        <Places setOffice={} />
        <div className="cafe-cards-container">
          {INITIAL_CAFES.map((cafe, index) => {
            return <CafeCard key={index} cafe={cafe} />;
          })}
        </div>
      </div> */
}
