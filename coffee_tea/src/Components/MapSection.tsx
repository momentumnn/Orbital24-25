import React, { useState } from "react";
import CafeCard from "./CafeCardforMap/CafeCard";
// the mapsection styles are in this folder ^ under the .css file

import { Cafe } from "../types";
import mcdonalds from "../Assets/McDonalds.jpg"

const INITIAL_CAFES: Cafe[] = [
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
];
const MapSection: React.FC = () => {
  const [cafeList, setCafeList] = useState<Cafe[]>(INITIAL_CAFES);

  return (
    <div className="map-section">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a51b130a8803da0dac1543abea6ef175c6b28cbf"
        alt="Map"
        className="map-image"
      />
      <div className="map-overlay">
        <div className="map-overlay-title">Other cafes in your list!</div>
        <div className="cafe-cards-container">
          {cafeList.map((cafe, index) => {
            return <CafeCard key={index} cafe={cafe} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
