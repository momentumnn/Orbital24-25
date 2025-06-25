import React, { useState } from "react";
import "./FilterSection.css";

const FilterSection: React.FC = () => {
  const [radius, setRadius] = useState(10);
  const [price, setPrice] = useState(10);

  console.log(radius);
  return (
    <div className="filter-section">
      <div className="filter-container">
        <div className="filter-group">
          <div className="filter-label">Distance from you</div>
          <div className="filter-value">0-10km</div>
          <input
            type="range"
            min={0}
            max={100}
            step={10}
            onChange={(e) => setRadius(e.target.valueAsNumber)}
            defaultValue={radius}
          />
          <div className="filter-description">
            {radius / 10}km away from you
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-label">Price</div>
          <div className="filter-value">$0-$100</div>
          <input
            type="range"
            min={0}
            max={100}
            step={10}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            defaultValue={price}
          />
          <div className="filter-description">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
