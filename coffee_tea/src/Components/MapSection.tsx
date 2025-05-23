import React, { useState } from "react";
import CafeCard from "./CafeCards/CafeCard";
import { Cafe } from "../types";
const INITIAL_CAFES: Cafe[] = [
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
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
