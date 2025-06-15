import React, { useEffect, useState } from "react";
import "./HomePage.css";
import CafeCardLarge from "../../Components/CafeCardLargeforHome/CafeCardLarge";
import ReviewCard from "../../Components/ReviewCard";
import { Restaurant, UserCoordinates } from "../../types";
import mcdonalds from "../../Assets/McDonalds.jpg";
import { UserLocationContext } from "../../Context/UserLocationContext";

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

const LandingPage: React.FC = () => {
  const [cafeList, setCafeList] = useState<Restaurant[]>(INITIAL_CAFES);

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="landing-hero-title">Cafe Planner</div>
      </div>

      <div className="landing-cafes-section">
        <h2 className="landing-section-title">Other cafes in your list!</h2>
        <div className="landing-cafes-container">
          {cafeList.map((cafe, index) => {
            return <CafeCardLarge key={index} cafe={cafe} />;
          })}
        </div>
      </div>

      <div className="landing-reviews-section">
        <h2 className="landing-section-title">Recent Reviews</h2>
        <div className="landing-reviews-container">
          <ReviewCard
            reviewText="A terrific piece of praise"
            reviewerName="Name"
            reviewerDescription="Description"
          />
          <ReviewCard
            reviewText="A fantastic bit of feedback"
            reviewerName="Name"
            reviewerDescription="Description"
          />
          <ReviewCard
            reviewText="A genuinely glowing review"
            reviewerName="Name"
            reviewerDescription="Description"
          />
        </div>
      </div>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-logo">Site name</div>

          <div className="landing-footer-social">
            <i className="ti ti-brand-facebook"></i>
            <i className="ti ti-brand-linkedin"></i>
            <i className="ti ti-brand-youtube"></i>
            <i className="ti ti-brand-instagram"></i>
          </div>

          <div className="landing-footer-links">
            <div className="landing-footer-column">
              <div className="landing-footer-topic">Topic</div>
              <div className="landing-footer-page">Page</div>
              <div className="landing-footer-page">Page</div>
              <div className="landing-footer-page">Page</div>
            </div>
            <div className="landing-footer-column">
              <div className="landing-footer-topic">Topic</div>
              <div className="landing-footer-page">Page</div>
              <div className="landing-footer-page">Page</div>
              <div className="landing-footer-page">Page</div>
            </div>
            <div className="landing-footer-column">
              <div className="landing-footer-topic">Topic</div>
              <div className="landing-footer-page">Page</div>
              <div className="landing-footer-page">Page</div>
              <div className="landing-footer-page">Page</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
