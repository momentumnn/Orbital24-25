import React from "react";

import { Cafe } from "../types";

interface CafeProps {
  cafe: Cafe;
}

function CafeCardLarge({ cafe }: CafeProps) {
  return (
    <div className="cafe-card-large">
      <img
        src={cafe.imageUrl}
        alt={cafe.name}
        className="cafe-card-large-image"
      />
      <div className="cafe-card-large-content">
        <div className="cafe-card-large-name">{cafe.name}</div>

        <div className="cafe-tags">
          {cafe.tags.map((tag, index) => {
            return <div className="cafe-tag">{tag}</div>;
          })}
        </div>
        <div className="cafe-card-large-address">Address: {cafe.address}</div>
      </div>
    </div>
  );
}

export default CafeCardLarge;
