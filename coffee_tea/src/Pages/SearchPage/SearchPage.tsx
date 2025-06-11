import React, { useState } from "react";
import "./SearchPage.css";
import CafeItem from "../../Components/CafeItemforSearch/CafeItem";
import FilterSection from "../../Components/FilterSection/FilterSection";
import MapSection from "./MapSection";
import { Restaurant } from "../../types";
import mcdonalds from "../../Assets/McDonalds.jpg";

const INITIAL_CAFES: Restaurant[] = [
  {
    id: 1,
    name: "Sushi Place",
    address: "123 Tokyo Street",
    image_url: mcdonalds,
    visited: false,
    save_id: 1,
    tags: ["sushi", "places"],
  },
  {
    id: 2,
    name: "Pasta Heaven",
    address: "456 Rome Avenue",
    image_url: mcdonalds,
    visited: false,
    save_id: 2,
    tags: ["sushi", "places"],
  },
  {
    id: 3,
    name: "Burger World",
    address: "789 New York Blvd",
    image_url: mcdonalds,
    visited: false,
    save_id: 3,
    tags: ["sushi", "places"],
  },
];
const SearchPage: React.FC = () => {
  const [cafeList, setCafeList] = useState<Restaurant[]>(INITIAL_CAFES);

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
    </div>
  );
};

export default SearchPage;
