import React from "react";

interface CafeItemProps {
  name: string;
  address: string;
  imageUrl: string;
}

const CafeItem: React.FC<CafeItemProps> = ({ name, address, imageUrl }) => {
  return (
    <div className="cafe-item">
      <div className="cafe-item-info">
        <div className="cafe-item-name">{name}</div>
        <div className="cafe-item-address">Address: {address}</div>
        <div className="cafe-item-details">
          <div className="cafe-item-hours">
            <div className="cafe-item-hours-title">Opening hours</div>
            <div className="cafe-item-tags">
              <div className="cafe-tag">Cafe</div>
              <div className="cafe-tag">Cafe</div>
              <div className="cafe-tag">Cafe</div>
            </div>
          </div>
        </div>
        <div className="cafe-item-link">Google maps link</div>
      </div>
      <img src={imageUrl} alt="Restaurant" className="cafe-item-image" />
    </div>
  );
};

export default CafeItem;
