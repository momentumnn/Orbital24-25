import React from "react";
import "./styles.css";
import CafeCardLarge from "../../Components/CafeCardLarge";
import ReviewCard from "../../Components/ReviewCard";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="landing-logo">Coffee, Tea or Me</div>
        <nav className="landing-nav">
          <div className="landing-nav-item">Home</div>
          <div className="landing-nav-item">Profile</div>
          <div className="landing-nav-item">Restaurants</div>
          <div className="landing-nav-item">Search</div>
        </nav>
      </header>

      <div className="landing-hero">
        <div className="landing-hero-title">Cafe Planner</div>
      </div>

      <div className="landing-cafes-section">
        <h2 className="landing-section-title">Other cafes in your list!</h2>
        <div className="landing-cafes-container">
          <CafeCardLarge
            name="Mcdonalds"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/df3a02cacabf2e6fd88f1844f3a50994905b4dac"
            address="123 sesame street"
          />
          <CafeCardLarge
            name="Mcdonalds"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/a1276691fa984a8862b1d3e30fd56ed59647ffe4"
            address="123 sesame street"
          />
          <CafeCardLarge
            name="Mcdonalds"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/8028f70ec42f47fc2b68e751ccfffaffedafe819"
            address="123 sesame street"
          />
          <CafeCardLarge
            name="Mcdonalds"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/fa8add6d10c721e75c3cd7407700ee9deb546e3c"
            address="123 sesame street"
          />
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
