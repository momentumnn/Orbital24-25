import React from "react";
import { RestaurantHome } from "../../Types/RestaurantHome";
import "./CafeCardLarge.css";

interface CafeProps {
  cafe: RestaurantHome;
}

function CafeCardLarge({ cafe }: CafeProps) {
           /* <div className="cafe-tags">
          {cafe.tags.map((tag, index) => {
            return <div className="cafe-tag">{tag}</div>;
          })}
        </div>*/
  return (
    <div className="cafe-card-large">
      <img
        src={cafe.image_url}
        alt={cafe.displayName}
        className="cafe-card-large-image"
      />
      <div className="cafe-card-large-content">
        <div className="cafe-card-large-name">{cafe.displayName}</div>
        <div className="cafe-card-large-address">Address: {cafe.formattedAddress}</div>
      </div>
    </div>
  );
}

export default CafeCardLarge;