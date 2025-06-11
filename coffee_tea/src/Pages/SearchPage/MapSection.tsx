import React, { useState } from "react";
import CafeCard from "../../Components/CafeCardforMap/CafeCard";
// the mapsection styles are in this folder ^ under the .css file

import { Restaurant } from "../../types";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps";
import mcdonalds from "../../Assets/McDonalds.jpg";
import { Opacity } from "@mui/icons-material";

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
const MapSection: React.FC = () => {
  const [cafeList, setCafeList] = useState<Restaurant[]>(INITIAL_CAFES);
  const [open, setOpen] = useState(false);

  return (
    <div className="map-section">
      <APIProvider apiKey={mapsAPI}>
        <Map
          mapId={mapID}
          style={{ width: "100vw", height: "80vh" }}
          defaultZoom={13}
          defaultCenter={position}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        >
          <AdvancedMarker
            position={position}
            onClick={() => setOpen(true)}
          ></AdvancedMarker>
          {/* <div className="map-overlay">
            <div className="map-overlay-title">Other cafes in your list!</div>
            <div className="cafe-cards-container">
              {cafeList.map((cafe, index) => {
                return <CafeCard key={index} cafe={cafe} />;
              })}
            </div>
          </div> */}
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>hello</p>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapSection;
