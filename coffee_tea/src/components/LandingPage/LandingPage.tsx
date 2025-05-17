import React from "react";
import "./styles.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-logo">Coffee, Tea or Me</div>
          <div className="nav-links">
            <div className="nav-link">Home</div>
            <div className="nav-link">Profile</div>
            <div className="nav-link">Restaurants</div>
            <div className="nav-link">Reviews</div>
            <div className="nav-link">Search</div>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-title">Cafe Finder</div>
      </div>

      <div className="recommended-section">
        <div className="section-title">Recommended for you</div>
        <div className="restaurant-cards">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="restaurant-card">
              <img
                src={`URL_${index + 1}`}
                alt="Restaurant"
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <div className="restaurant-name">Mcdonalds</div>
                <div className="tag-container">
                  {[1, 2, 3].map((tagIndex) => (
                    <div key={tagIndex} className="tag">
                      <span>Cafe</span>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 12M4 4L12 12" stroke="#F5F5F5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <div className="section-title">Don't have a profile?</div>
        <div className="profile-content">
          <div className="profile-info">
            <div className="profile-heading">Join the Community!</div>
            <div className="profile-description">
              Body text for whatever you'd like to expand on the main point.
            </div>
            <div className="stats-container">
              <div className="stat-item">
                <div className="avatar-group">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef944bf895035c383d313f7169a67bf5aa8a20c9"
                    alt="Avatar"
                    className="avatar"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b28f0ba4ead349375de795c2d5a32b82ea8b8f06"
                    alt="Avatar"
                    className="avatar"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d94d23e176fb7efec2b45fe1a510c2e7fe535b33"
                    alt="Avatar"
                    className="avatar"
                  />
                  <div className="avatar-count">+1</div>
                </div>
                <div className="stat-text">1 reviewer</div>
              </div>
              <div className="stat-item">
                <div className="avatar-group">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef944bf895035c383d313f7169a67bf5aa8a20c9"
                    alt="Avatar"
                    className="avatar"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b28f0ba4ead349375de795c2d5a32b82ea8b8f06"
                    alt="Avatar"
                    className="avatar"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d94d23e176fb7efec2b45fe1a510c2e7fe535b33"
                    alt="Avatar"
                    className="avatar"
                  />
                  <div className="avatar-count">+1</div>
                </div>
                <div className="stat-text">10 Cafes</div>
              </div>
            </div>
            <div className="profile-actions">
              <div className="signup-button">Sign up now!</div>
              <div className="login-container">
                <div className="login-text">Already have an account?</div>
                <div className="login-button">Login</div>
              </div>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/355e051bb841e02d50311da87723f8a9032177ed"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      <div className="selections-section">
        <div className="section-title">Selections</div>
        <div className="selections-container">
          <div className="selection-card">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8165fab64111630a0c4ae3658aa14d1dd8cc4c2"
              alt="Selection"
              className="selection-image"
            />
            <div>
              <div className="selection-heading">Subheading</div>
              <div className="selection-description">
                Body text for whatever you'd like to add more to the subheading.
              </div>
            </div>
          </div>
          <div className="selection-card">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5776a6cd1322efa97a4f475d695b3301fe3970ac"
              alt="Selection"
              className="selection-image"
            />
            <div>
              <div className="selection-heading">Subheading</div>
              <div className="selection-description">
                Body text for whatever you'd like to expand on the main point.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <div className="section-title">Recent Reviews</div>
        <div className="reviews-container">
          {[
            "A terrific piece of praise",
            "A fantastic bit of feedback",
            "A genuinely glowing review",
          ].map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-text">&quot;{review}&quot;</div>
              <div className="reviewer">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="149" height="50" viewBox="0 0 149 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="22.5" cy="25" r="22.5" fill="#D9D9D9"/>
                    <text x="61" y="17.8182" fill="black" font-family="Inter" font-size="16" font-weight="500">Name</text>
                    <text x="61" y="43.8182" fill="#828282" font-family="Inter" font-size="16" font-weight="500">Description</text>
                  </svg>`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">Site name</div>
          <div className="social-links">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="social-icon" />
            ))}
          </div>
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
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
