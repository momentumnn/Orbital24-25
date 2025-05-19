import React from "react";

interface CafeCardLargeProps {
  name: string;
  imageUrl: string;
  address: string;
}

const CafeCardLarge: React.FC<CafeCardLargeProps> = ({
  name,
  imageUrl,
  address,
}) => {
  return (
    <div className="cafe-card-large">
      <img src={imageUrl} alt={name} className="cafe-card-large-image" />
      <div className="cafe-card-large-content">
        <div className="cafe-card-large-name">{name}</div>
        <div className="cafe-card-large-tags">
          <div className="cafe-card-large-tag">
            <span>Cafe</span>
            <i className="ti ti-x" />
          </div>
          <div className="cafe-card-large-tag">
            <span>Cafe</span>
            <i className="ti ti-x" />
          </div>
          <div className="cafe-card-large-tag">
            <span>Cafe</span>
            <i className="ti ti-x" />
          </div>
        </div>
        <div className="cafe-card-large-address">Address: {address}</div>
      </div>
    </div>
  );
};

export default CafeCardLarge;
