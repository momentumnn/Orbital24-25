import { useContext, useEffect, useState } from "react";
// the mapsection styles are in this folder ^ under the .css file

import { Restaurant } from "../../types";

import mcdonalds from "../../Assets/McDonalds.jpg";
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import AutocompleteControl from "./autocomplete-control";
import AutocompleteResult from "./autocomplete-result";
import { UserLocationContext } from "../../Context/UserLocationContext";
import CafeCardList from "../../Components/CafeCardforMap/CafeCardList";

type LatLngLiteral = { LatLng: google.maps.LatLngLiteral };

const INITIAL_CAFES: Restaurant[] = [
  {
    id: "string",
  displayName: "string",
  formattedAddress: "string",
  image_url: "string",
  latlng: { lng: "string", lat: "string"}
  },
  
];

const mapsAPI: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
const mapID: string = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID as string;

const PanToCurrent = ({ LatLng }: LatLngLiteral) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.panTo(LatLng);

    // do something with the map instance
  }, [LatLng]);

  return (
    <>
      ...<AdvancedMarker position={LatLng}></AdvancedMarker>
    </>
  );
};
const MapSection = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);
  const userLocation: google.maps.LatLngLiteral =
    useContext(UserLocationContext);
  const position = { lat: 1.3521, lng: 103.8198 };

  console.log(userLocation);
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
        <PanToCurrent LatLng={userLocation} />
        <AutocompleteControl
          controlPosition={ControlPosition.TOP_LEFT}
          onPlaceSelect={setSelectedPlace}
        />
        <AutocompleteResult place={selectedPlace} />

        {/* <CafeCardList cafe={INITIAL_CAFES}></CafeCardList> */}
      </Map>
    </APIProvider>
  );
};

export default MapSection;
