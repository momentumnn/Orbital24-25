import React from "react";
import "./styles.css";
import CafeItem from "../../Components/CafeItem";
import FilterSection from "../../Components/FilterSection";
import MapSection from "../../Components/MapSection";

const SearchPage: React.FC = () => {
  return (
    <div className="search-container">
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-logo">Coffee, Tea or Me</div>
          <div className="nav-links">
            <div className="nav-link">Home</div>
            <div className="nav-link">Profile</div>
            <div className="nav-link">Restaurants</div>
            <div className="nav-link">Search</div>
          </div>
        </div>
      </nav>

      <MapSection />

      <div className="search-content">
        <div className="section-title">List of your saved cafes!</div>

        <FilterSection />

        <div className="cafe-list">
          <CafeItem
            name="Mcdonalds"
            address="123 sesame street"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/5b0dfdc542e541f1413d22a16f2c1e0dc072c3fe"
          />
          <CafeItem
            name="Mcdonalds"
            address="123 sesame street"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/53687148cf21aabbf5c11ab98dedb6dd5556b35a"
          />
          <CafeItem
            name="Mcdonalds"
            address="123 sesame street"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/1f3721451c1617bc6479e8fad55d15571577518a"
          />
          <CafeItem
            name="Mcdonalds"
            address="123 sesame street"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/38e28114e0af22056a996f2de1c50a3d450e9239"
          />
        </div>

        <button className="load-more-button">Load more cafes</button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">Site name</div>
          <div className="footer-links">
            {[1, 2, 3].map((index) => (
              <div key={index} className="footer-column">
                <div className="footer-topic">Topic</div>
                <div className="footer-page">Page</div>
                <div className="footer-page">Page</div>
                <div className="footer-page">Page</div>
              </div>
            ))}
          </div>
          <div className="social-links">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="social-icon">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<svg class="icon" style="width: 24px; height: 24px; fill: #828282"></svg>`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
