import React, { useEffect, useState } from "react";
import { Restaurant } from "../../types";
import "./CafeItem.css";

interface CafeProps {
  place: google.maps.places.Place;
}

function CafeItem({ place }: CafeProps) {
  const [photo, setPhoto] = useState<string | null>();
  useEffect(() => {
    if (place && place.photos && place.photos.length > 0) {
      setPhoto(place.photos[0].getURI());
    } else {
      setPhoto(null);
    }
  }, [place]);
  return (
    <div className="cafe-item">
      <div className="cafe-item-info">
        <div className="cafe-item-name">{place.displayName}</div>
        <div className="cafe-item-address">
          Address: {place.formattedAddress}
        </div>
        <div className="cafe-item-details">
          <div className="cafe-item-hours">
            <div className="cafe-item-hours-title">Opening hours</div>
            {place.regularOpeningHours?.weekdayDescriptions.map((date) => {
              return <ul>{date}</ul>;
            })}
          </div>
          <div className="cafe-item-tags">
            <div className="cafe-tag">Cafe</div>
            <div className="cafe-tag">Cafe</div>
            <div className="cafe-tag">Cafe</div>
          </div>
        </div>
        {place.googleMapsURI && (
          <a href={place.googleMapsURI}>Google maps link</a>
        )}
      </div>
      {photo && (
        <img
          src={photo}
          alt={place?.displayName ?? "Place photo"}
          style={{ width: "250px" }}
        ></img>
      )}
    </div>
  );
}

export default CafeItem;
