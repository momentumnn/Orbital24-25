import React from "react";
import './FilterSection.css'

const FilterSection: React.FC = () => {
  return (
    <div className="filter-section">
      <div className="filter-container">
        <div className="filter-group">
          <div className="filter-label">Distance from you</div>
          <div className="filter-value">0-10km</div>
          <div className="filter-slider">
            <div className="filter-slider-track">
              <div className="filter-slider-handle" />
              <div className="filter-slider-space" />
              <div className="filter-slider-handle" />
            </div>
          </div>
          <div className="filter-description">Range</div>
        </div>

        <div className="filter-group">
          <div className="filter-label">Price</div>
          <div className="filter-value">$0-100</div>
          <div className="filter-slider">
            <div className="filter-slider-track">
              <div className="filter-slider-handle" />
              <div className="filter-slider-space" />
              <div className="filter-slider-handle" />
            </div>
          </div>
          <div className="filter-description">Price Range</div>
        </div>

        <div className="filter-tags">
          <div className="filter-tag">
            <span>Cafe</span>
            <div
              dangerouslySetInnerHTML={{
                __html: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="#F5F5F5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>`,
              }}
            />
          </div>
          <div className="filter-tag">Cafe</div>
          <div className="filter-tag">Cafe</div>
          <div className="filter-tag">Cafe</div>
          <div className="filter-tag">Cafe</div>
          <div className="filter-tag">Cafe</div>
        </div>

        <div className="filter-icon-container">
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 6H4L20 24.92V38L28 42V24.92L44 6Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
