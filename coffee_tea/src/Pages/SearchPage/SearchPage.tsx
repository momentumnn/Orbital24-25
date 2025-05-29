import React, { useState } from "react";
import "./SearchPage.css";
import CafeItem from "../../Components/CafeItemforSearch/CafeItem";
import FilterSection from "../../Components/FilterSection/FilterSection";
import MapSection from "../../Components/MapSection";
import { Cafe } from "../../types";
import mcdonalds from "../../Assets/McDonalds.jpg"


const INITIAL_CAFES: Cafe[] = [
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
    address: "123 sesame street",
    tags: ["cafe", "kfc"],
  },
  {
    name: "Mcdonalds",
    imageUrl:
      mcdonalds,
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
