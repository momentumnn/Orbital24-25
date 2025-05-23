import React, { useState } from "react";
import "./styles.css";
import CafeItem from "../../Components/CafeCards/CafeItem";
import FilterSection from "../../Components/FilterSection";
import MapSection from "../../Components/MapSection";
import { Cafe } from "../../types";

const INITIAL_CAFES: Cafe[] = [
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac",
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
];
const SearchPage: React.FC = () => {
  const [cafeList, setCafeList] = useState<Cafe[]>(INITIAL_CAFES);

  return (
    <div className="search-container">
      <MapSection />
      <div className="search-content">
        <div className="section-title">List of your saved cafes!</div>

        <FilterSection />

        <div className="cafe-list">
          {cafeList.map((cafe, index) => {
            return <CafeItem key={index} cafe={cafe} />;
          })}
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
