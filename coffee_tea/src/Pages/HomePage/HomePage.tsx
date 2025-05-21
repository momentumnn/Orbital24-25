import React, { useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import CafeCardLarge from "../../Components/CafeCardLarge";
import ReviewCard from "../../Components/ReviewCard";
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

const LandingPage: React.FC = () => {
  const [tasks, setTasks] = useState<Cafe[]>(INITIAL_CAFES);
  
    {/*sign out function*/}
    const navigate = useNavigate();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/Login");
    };

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="landing-hero-title">Cafe Planner</div>
      </div>

      <div className="landing-cafes-section">
        <h2 className="landing-section-title">Other cafes in your list!</h2>
        <div className="landing-cafes-container">
          {tasks.map((task, index) => {
            return <CafeCardLarge key={index} cafe={task} />;
          })}
        </div>
        
        <button onClick={signOut}> This is tempo so that u can sign out lol Sign out</button>

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
