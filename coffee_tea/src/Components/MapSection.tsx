import React from "react";
import CafeCard from "./CafeCard";

const MapSection: React.FC = () => {
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
          <CafeCard
            name="Mcdonalds"
            url="https://cdn.builder.io/api/v1/image/assets/TEMP/d4a9f1446c7bff40fed32e4ea0ee7c8f84f94341"
            address="123 sesame street"
          />
          <CafeCard
            name="Mcdonalds"
            url="https://cdn.builder.io/api/v1/image/assets/TEMP/21318d627f743495c142351fdcb67e1f64beb114"
            address="123 sesame street"
          />
          <CafeCard
            name="Mcdonalds"
            url="https://cdn.builder.io/api/v1/image/assets/TEMP/f9401347f0a5fcca710fda02bbc8c74762c5655e"
            address="123 sesame street"
          />
        </div>
      </div>
    </div>
  );
};

export default MapSection;
