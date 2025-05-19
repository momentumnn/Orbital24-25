import React, { useState } from "react";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import "./App.css";
import "./styles.css";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "search">(
    "landing",
  );

  return (
    <>
      {currentPage === "landing" && <LandingPage />}
      {currentPage === "search" && <SearchPage />}

      {/* Simple navigation for demo purposes */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setCurrentPage("landing")}
          style={{ marginRight: "10px" }}
        >
          Landing Page
        </button>
        <button onClick={() => setCurrentPage("search")}>Search Page</button>
      </div>
    </>
  );
}

export default App;
