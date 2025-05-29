import React from "react";
import { Cafe } from "../../types";
import './CafeItem.css'

interface CafeProps {
  cafe: Cafe;
}

function CafeItem({ cafe }: CafeProps) {
  return (
    <div className="cafe-item">
      <div className="cafe-item-info">
        <div className="cafe-item-name">{cafe.name}</div>
        <div className="cafe-item-address">Address: {cafe.address}</div>
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
      <img src={cafe.imageUrl} alt="Restaurant" className="cafe-item-image" />
    </div>
  );
}

export default CafeItem;
